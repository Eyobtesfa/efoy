"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/lib/auth/auth-client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const searchParams = useSearchParams ();
    const token = searchParams.get('token');
    const router = useRouter();


    useEffect(() => {
        if (!token) {
            setMessage('Invalid or expired token. Please try again.');
           
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!token) return;

        const error = await resetPassword({
            token,
            newPassword: password,
    });
    if (error) {
        setMessage('Error resetting password. Please try again.');
    }
    else {
        setMessage('Password reset successfully. You can now log in with your new password.');
        setTimeout(() => router.push('/login'), 3000);
    }


    };

    return(

        <form 
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-full h-full gap-4 p-4">
            <h1 className="text-2xl font-bold">Reset Password</h1>
            {message && <p className="text-sm text-red-500">{message}</p>}
            <Input
                type='password'
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full max-w-sm"
            />
            <Button type="submit" className="w-full max-w-sm">Reset Password</Button>
        </form>
    )
}
