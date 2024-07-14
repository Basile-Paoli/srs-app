import {Header} from "@/app/(dashboard)/Header";
import {Separator} from "@/components/ui/separator";
import {ReactNode} from "react";

export default function Layout({children}: { children: ReactNode }) {
    return (
        <>
            <Header/>
            <Separator orientation={"horizontal"}/>
            {children}
        </>
    );
}
