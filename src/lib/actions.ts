'use server';

import { APIError } from "better-auth/api";
import { auth } from "./auth/auth";
import { redirect } from "next/navigation";
import { db } from "./prisma";


interface State {
    errorMessage?: string | null;
}

export async function signUp(prevState: State ,formData: FormData){
   const rawFormData = {
        firstname: formData.get('firstname') as string,
        lastname: formData.get('lastname') as string,
        email: formData.get('email') as string,
        password: formData.get('pwd') as string,
   };


   const { email, password, firstname, lastname } = rawFormData;

   try {
    await auth.api.signUpEmail({
        body: {
            email,
            name: `${firstname} ${lastname}`,
            password,
        },
    });
   } catch (error) {
    if (error instanceof APIError){

        switch (error.status) {
            case "UNPROCESSABLE_ENTITY":
                return {errorMessage: "User already exists"};
            case "BAD_REQUEST":
                return {errorMessage: "Invalid input"};
            default:
                return {errorMessage: "Something went wrong"};
        };
    };

    console.error("Error signing up:", error);
   };
    redirect('/login');
};

export async function signIn(prevState: State ,formData: FormData){
    const rawFormData = {
         email: formData.get('email') as string,
         password: formData.get('pwd') as string,
    };
 
 
    const { email, password} = rawFormData;
 
    try {
     await auth.api.signInEmail({
         body: {
             email,
             password,
         },
     });
    } catch (error) {
     if (error instanceof APIError){
 
         switch (error.status) {
             case "UNAUTHORIZED":
                 return {errorMessage: "User Not Found"};
             case "BAD_REQUEST":
                 return {errorMessage: "Invalid input"};
             default:
                 return {errorMessage: "Something went wrong"};
         };
     };
 
     console.error("Error signing in:", error);
    };
     redirect('/dashboard');
 };


 export async function searchAccount(email: string){
    const user = await db.user.findUnique({
        where:{email},
 });
 return !!user;;
}