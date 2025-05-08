import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "../prisma"; // Adjust the import path as necessary
import { nextCookies } from "better-auth/next-js";
import { sendEmail } from "../email";

 
export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "sqlite", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {  
        enabled: true,
        minPasswordLength:8,
        maxPasswordLength:20,
        autoSignIn: true,
        sendResetPassword: async ({user, url}) =>{
            await sendEmail({
                to: user.email,
                subject: "Password Reset",
                text: `Click the link to reset your password: ${url}`,
            });
        },

        resetPasswordTokenExpiresIn: 3600,
    },
    account:{
        accountLinking:{
            enabled: true,
        },
    },

    plugins: [nextCookies()],
    
});