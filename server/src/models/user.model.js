import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        avatar: {
            type: String,
            default: 'default-avatar.png'
          },        
        name: {
            type: String,
        },
        currentWorkspace: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Workspace'
        },        
        lastActive: Date,
        refreshToken: {
            type: String
        }
    }, {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()  
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// We will use access token through out logged in user and it is for shorter period of time [security concerns]
// Access token does not contains any password field as it will be stored in cookies, and we have to protect cookie
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// This token is use to regenerate the access token as access token expire before refresh token, so we have to regenerate
// it by taking refresh token from "cookie" and "database" then check for equality. If matched regenerate access token
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,  
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);