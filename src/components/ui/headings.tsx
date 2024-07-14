import {ReactNode} from "react";
import {cn} from "@/lib/utils";

export function PageHeading({children, className}: { children: ReactNode, className?: string }) {
    return (
        <div className={cn(" text-3xl self-start p-5", className)}>
            {children}
        </div>
    );
}
export function SectionHeading({children, className}: { children: ReactNode, className?: string }) {
    return (
        <div className={cn(" text-2xl self-start p-5", className)}>
            {children}
        </div>
    );
}