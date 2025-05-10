import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";


export default function Layout({
    children} : Readonly<{children: React.ReactNode}>) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
            <Button className="fixed top-5 left-3" variant={"outline"} asChild>
                <Link href={"/"}>
                <Icons.arrowLeft className="h-4 w-4" />
                Back
                </Link>
            </Button>
            {children}
        </div>
    );
};