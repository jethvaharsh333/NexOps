import nodemailer from "nodemailer";

import dotenv from 'dotenv';
dotenv.config();


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    logger: true,
});

export const sendVerificationEmail = async (email, token) => {
    console.log(email, token);
    console.log("USER: ", process.env.EMAIL_USER)
    console.log("PASS: ", process.env.EMAIL_PASS)

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Confirm your email",
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #4CAF50;">Welcome!</h2>
                <p style="font-size: 16px;">Thank you for joining our service.</p>
                <p style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">
                    Please verify your email address to get started.${token}
                </p>
            </div>
        `,
    });
};