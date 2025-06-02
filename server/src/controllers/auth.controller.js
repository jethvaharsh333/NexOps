import { User } from "../models/user.model.js";
import { Verification } from "../models/verification.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { sendVerificationEmail } from "../utils/mail.js";
import { generateAccessAndRefereshToken } from "../helpers/generate-access-and-referesh-token.js";
import { generateVerificationToken } from "../helpers/generate-verification-token.js";
import axios from 'axios';
import jwt from "jsonwebtoken";
import { startSession } from 'mongoose';
import { WorkSpace } from "../models/workspace.model.js";
import { WorkspaceMember } from "../models/workspace-member.js";

const registerUser = asyncHandler(
    async (req, res) => {        
        const { username, email, password, code } = req.body;
        const userName = username;

        const session = await startSession();
        session.startTransaction();

        if ([userName, email, password].some(f => f?.trim === "")) {
            throw new ApiError(404, "All fields are necessary");
        }

        if (!code || String(code).trim().length !== 6) {
            throw new ApiError(404, "Code length must be exactly 6 digits");
        }

        const existedUser = await User.findOne({
            $or: [{ userName, email }]
        }).session(session);

        if (existedUser) {
            throw new ApiError(409, "User with username or email  already exists.")
        }

        // verify code with database
        const verify = await Verification.findOne({ email }).session(session);

        if (code !== verify.token) {
            throw new ApiError(404, "Invalid code");
        }

        const user = await User({
            userName: userName.toLowerCase(),
            email,
            password
        });
        await user.save({ session });
        console.log("user created...." + user._id);

        const workspace = await WorkSpace({
            name: "My workspace",
            description: `WorkSpace created by ${userName}\nEmail: ${email}`,
            owner: user._id,
        });
        await workspace.save({ session });

        console.log("workspace created...." + workspace._id);

        const member = await WorkspaceMember({
            user: user._id,
            workspace: workspace._id,
            role: 'ADMINISTRATOR'
        });
        await member.save({ session });

        console.log("WorkspaceMember: " + member._id);
        
        user.currentWorkspace = workspace._id;
        await user.save({ session });
        
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        ).session(session);

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user")
        }

        await session.commitTransaction();
        session.endSession();
        console.log("End Session...");

        return res.status(201).json(
            new ApiResponse(200, createdUser, "User registered Successfully")
        )
    }
)

const verifyWithEmail = asyncHandler(
    async (req, res) => {
        const { userName, email, password } = req.body;

        console.log(req.body);

        if ([userName, email, password].some(f => f?.trim === "")) {
            throw new ApiError(404, "All fields are necessary");
        }

        const existedUser = await User.findOne({
            $or: [{ userName, email }]
        });

        if (existedUser) {
            throw new ApiError(409, "User with username or email  already exists.")
        }

        const verificationToken = await generateVerificationToken(email);

        await sendVerificationEmail(verificationToken.email, verificationToken.token);

        return res.status(200).send("Successfully send email.");
    }
)

const loginUser = asyncHandler(
    async(req, res) => {
        const {identifier, password} = req.body;

        if ([identifier, password].some(f => f?.trim === "")) {
            throw new ApiError(404, "All fields are necessary");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let user = null;
        if(emailRegex.test(identifier)){
            user = await User.findOne({email: identifier});
        }else{
            user = await User.findOne({userName: identifier});
        }

        if(!user){
            throw new ApiError(404, "User not found");
        }

        const isPasswordValid = await user.isPasswordCorrect(password);
        if(!isPasswordValid){
            throw new ApiError(401, "Invalid password");
        }

        const { accessToken, refreshToken } = await generateAccessAndRefereshToken(user._id);

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
        .status(200)
        // .cookie("accessToken", accessToken, options)        // To access the details through out login user 
        .cookie("refreshToken", refreshToken, options)      // Storing this for generating access token when it expire 
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken  // Here we passed both tokens for, if user try to login by mobile app
                },
                "Login Successfull"
            )
        )
    }
)

const updateUser = asyncHandler(
    async (req, res) => {
        const authenticatedUser = req.user;
        const updateUser = req.body;

        console.log(updateUser);

        const updatedUser = await User.findByIdAndUpdate(
            authenticatedUser._id,
            { $set: updateUser },
            { new: true, runValidators: true }
        );

        console.log(updatedUser);
        
        if (!updatedUser) {
            throw new ApiError(404, "User not found or update failed");
        }

        return res.status(200).json(
            new ApiResponse(200, "User updated successfully")
        );
    }
)

const googleAuth = asyncHandler(
    async (req, res) => {
    const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(process.env.GOOGLE_REDIRECT_URI)}` +
    `&response_type=code` +
    `&scope=${encodeURIComponent('openid email profile')}` +
    `&access_type=offline` +
    `&prompt=consent`; // optional but useful for refresh tokens in dev
        res.redirect(redirectUrl);
    }
);

const googleCallback = asyncHandler(
    async (req, res) => {
        const code = req.query.code;

        const tokenRes = await axios.post("https://oauth2.googleapis.com/token", null, {
            params: {
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                code,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI,
                grant_type: "authorization_code"
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        const { access_token } = tokenRes.data;

        const userRes = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        const { email, name, picture } = userRes.data;

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                email,
                userName: email.split('@')[0],
                name,
                avatar: picture,
                password: Math.random().toString(36).slice(-8), // random password (not used)
            });
        }

        // const { accessToken, refreshToken } = await generateAccessAndRefereshToken(user._id);
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;

        await user.save();

        const options = {
            httpOnly: true,
            secure: true
        }

        const params = new URLSearchParams({
            userName: user.userName,
            email: user.email,
            name: user.name || "",
            avatar: user.avatar || ""
        }).toString();

        return res
        .cookie("refreshToken", refreshToken, options)
        .redirect(`http://localhost:5173/oauth?${params}`);
    }
);

const githubAuth = asyncHandler(async (req, res) => {
    const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=user:email`;
    res.redirect(redirectUrl);
});

const githubCallback = asyncHandler(async (req, res) => {
    const code = req.query.code;

    const tokenRes = await axios.post("https://github.com/login/oauth/access_token", {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
    }, {
        headers: {
            Accept: "application/json"
        }
    });

    const { access_token } = tokenRes.data;

    const userRes = await axios.get("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${access_token}` }
    });

    const emailsRes = await axios.get("https://api.github.com/user/emails", {
        headers: { Authorization: `Bearer ${access_token}` }
    });

    const primaryEmail = emailsRes.data.find(e => e.primary).email;

    let user = await User.findOne({ email: primaryEmail });

    if (!user) {
        user = await User.create({
            email: primaryEmail,
            userName: userRes.data.login,
            name: userRes.data.name || userRes.data.login,
            avatar: userRes.data.avatar_url,
            password: Math.random().toString(36).slice(-8)
        });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshToken(user._id);

    return res
        .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
        .redirect(`http://localhost:3000/oauth?accessToken=${accessToken}`);
});

const generateAccessToken = asyncHandler(
    async(req, res) => {
        const token = req.cookies?.refreshToken;
        const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);
        const accessToken = user.generateAccessToken();

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken  // Here we passed both tokens for, if user try to login by mobile app
                },
                "Access token generate successfully."
            )
        )
    }
)

export { registerUser, verifyWithEmail, loginUser, updateUser, googleAuth, googleCallback, githubAuth, githubCallback, generateAccessToken};