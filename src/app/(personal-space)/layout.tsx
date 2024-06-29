import {Header} from "@/app/(personal-space)/Header";

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <div className="h-screen flex flex-col">
            <Header/>
            <div className={"flex grow"}>
                <main className={"w-full p-6"}>
                    {children}
                </main>
            </div>
        </div>
    );
}
