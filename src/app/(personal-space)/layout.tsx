import {Header} from "@/app/(personal-space)/Header";
import {Separator} from "@/components/ui/separator";

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <div className="h-screen flex flex-col">
            <Header/>
            <Separator orientation={"horizontal"} className={"mt-2"}/>
            <div className={"flex grow"}>
                <main className={"w-full p-3"}>
                    {children}
                </main>
            </div>
        </div>
    );
}
