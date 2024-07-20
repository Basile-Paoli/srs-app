import {ReactNode} from "react";
import {cn} from "@/lib/utils";

export function PageHeading({children, className}: { children: ReactNode, className?: string }) {
    return (
        <div className={cn(" text-3xl self-center p-5", className)}>
            {children}
        </div>
    );
}
export function SectionHeading({children, className}: { children: ReactNode, className?: string }) {
    return (
        <div className={cn(" text-2xl self-start px-2 my-3", className)}>
            {children}
        </div>
    );
}