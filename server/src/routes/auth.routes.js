import { Router } from "express";
import { 
    registerUser, 
    verifyWithEmail, 
    loginUser, 
    updateUser,
    googleAuth,
    googleCallback,
    githubAuth,
    githubCallback,
    generateAccessToken
} from "../controllers/auth.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser);
router.route("/verify-by-email").post(verifyWithEmail);
router.route("/login").post(loginUser);
router.route("/update").patch(verifyJWT, updateUser);
router.route("/generate-access-token").get(generateAccessToken);    

router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);

router.get("/github", githubAuth);
router.get("/github/callback", githubCallback);

export default router