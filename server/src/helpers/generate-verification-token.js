import { Verification } from "../models/verification.model.js";
import {generateSecureRandomCode} from "../utils/generateSecureRandomCode.js";

export const generateVerificationToken = async(email) => {
    const code = generateSecureRandomCode();
    
    const existedToken = await Verification.findOne({email});

    if(existedToken){
        await Verification.deleteOne({_id: existedToken._id});
    }

    const expires = new Date(new Date().getTime() + 2*60*1000); // 1sec=1000ms

    const verificationToken = await Verification.create({
        email,
        token: code,
        expires
    });

    return verificationToken;
}