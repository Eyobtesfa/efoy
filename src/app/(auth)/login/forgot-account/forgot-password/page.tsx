'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forgetPassword } from "@/lib/auth/auth-client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import React, { Suspense } from "react";

  function ForgotPassword(){

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const params = useSearchParams();
    const emailFromQuery = params.get('email') || '';
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [email, setEmail] = useState(emailFromQuery);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [message, setMessage] = useState('');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    const {error}= await forgetPassword({
            email,
            redirectTo:`${window.location.origin}/login/forgot-account/forgot-password/reset-password`,
        });
        if (error) {
            setMessage(`Error sending password reset link. Please try again. ${error.message}`);
        } else {
            setMessage('Password reset link sent to your email address.');
        }
        setEmail('');
    }

    return(
        <Suspense>
        <form 
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-full h-full gap-4 p-4">
            
            <h1 className="text-2xl font-bold">Forgot Password</h1>
            <Input
            type="email"
            required
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full max-w-sm"
            />
            <div className=" flex items-center justify-between w-full max-w-sm">
                <Button type="submit" className="w-full max-w-sm">Send Reset Link</Button>
                <Button
                    asChild
                    variant={"outline"}
                   >
                    <Link
                        href="/login"
                        className="link intent-info variant-ghost text-sm">
                        Back to Login </Link>
                        </Button>
                   

            </div>
            {message && <p className="text-sm text-red-500">{message}</p>}

        </form>
        </Suspense>
    )
};

export default function Page(){
    return (
        <Suspense fallback={<div className="flex items-center justify-center w-full h-full">Loading...</div>}>
            <ForgotPassword />
        </Suspense>
    );
}