import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


export const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
   
});

export async function sendEmail({
    to,
    subject,
    text,
}: {
    to: string;
    subject: string;
    text: string;
}) {
    await transporter.sendMail ({
        from: process.env.GMAIL_FROM,
        to,
        subject,
        html:`
        <p>you requested a password reset</p>
        <p>${text}</p>
        <p>if you did not request this, please ignore this email</p>
        <p>thank you</p>`
    });

}