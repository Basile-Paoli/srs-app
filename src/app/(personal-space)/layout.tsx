import {Header} from "@/app/(personal-space)/Header";
import {Separator} from "@/components/ui/separator";
import {ReactNode} from "react";

export default function Layout({children}: { children: ReactNode }) {
    return (
        <>
            <Header/>
            <Separator orientation={"horizontal"}/>
            <div className={"w-full h-full"}>
                {children}
            </div>
        </>
    );
}
