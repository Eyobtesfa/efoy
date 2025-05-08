'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchAccount } from "@/lib/actions";
import { useRouter } from "next/navigation";
import  { useState } from "react";

export default function page(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [email, setEmail] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

    const found = await searchAccount(email);

        if(found){
            router.push(`/login/forgot-account/forgot-password?email=${encodeURIComponent(email)}`);
        }
        else{
            router.push('/sign-up');
        };

    };
    return(
        <form 
        onSubmit={handleSearch}
        className="flex flex-col items-center justify-center w-full h-full gap-4 p-4"
        >
            <h1 className="text-2xl font-bold">Find your account?</h1>
            <Input
                type='email'
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full max-w-sm"
            />
            <Button type="submit" className="w-full max-w-sm">Send Reset Link</Button>
        </form>
    )
}