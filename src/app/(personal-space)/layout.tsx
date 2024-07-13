import {Header} from "@/app/(personal-space)/Header";
import {Separator} from "@/components/ui/separator";
import {ReactNode} from "react";

export default function Layout({children}: { children: ReactNode }) {
    return (
        <div className="h-screen flex flex-col">
            <Header/>
            <Separator orientation={"horizontal"}/>
            <div className={"w-full h-full"}>
                {children}
            </div>
        </div>
    );
}
