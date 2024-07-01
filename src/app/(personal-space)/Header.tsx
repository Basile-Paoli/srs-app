import Link from "next/link";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/auth";
import {Navbar} from "@/app/(personal-space)/Navbar";

export async function Header() {
    const session = await getServerSession(authOptions)

    return (
        <div className={"flex w-screen"}>
            <Navbar/>
            <div className={"flex justify-around w-full items-center"}>
                <div className={"justify-center"}>SRS App</div>
                {session && session.user ?
                    <Link href={"/api/auth/signout"}>Sign out</Link> :
                    <Link href={"/api/auth/signin"}>Sign in</Link>
                }
            </div>
        </div>
    );
}
