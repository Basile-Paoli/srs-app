import type {Metadata} from "next";
import "./globals.css";
import {getServerSession} from "next-auth";
import SessionProvider from "@/components/SessionProvider";
import {authOptions} from "@/app/api/auth/[...nextauth]/auth";
import {redirect} from "next/navigation";
import {ReactNode} from "react";


export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout(
    {
        children,
    }: Readonly<{
        children: ReactNode;
    }>) {
    const session = await getServerSession(authOptions).catch(() => null);
    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }
    return (
        <html lang="en">
        <body className={"font-noto h-screen flex flex-col"}>
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
        </body>
        </html>
    );
}
