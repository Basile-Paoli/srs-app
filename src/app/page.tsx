import Image from "next/image";
import {sql} from "@vercel/postgres";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {signIn} from "next-auth/react";
import {authOptions} from "@/app/api/auth/[...nextauth]/auth";

export default async function Home() {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        redirect("/api/auth/signin")
    }
    return (
        <div>
            {session ? session?.user?.name : "Not connected"}
        </div>
    );
}
