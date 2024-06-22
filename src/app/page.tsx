import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
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
