import Link from "next/link";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/auth";
import {Navbar} from "@/app/(dashboard)/Navbar";
import {SignOutButton} from "@/components/SignOutButton";

export async function Header() {
    const session = await getServerSession(authOptions)

    return (
        <div className={"flex w-screen my-1"}>
            <Navbar/>
            <div className={"flex justify-around w-full items-center"}>
                <div className={"justify-center"}>SRS App</div>
                {session && session.user ?
                    <SignOutButton>Sign out</SignOutButton> :
                    <Link href={"/api/auth/signin"}>Sign in</Link>
                }
            </div>
        </div>
    );
}