import {twMerge} from "tailwind-merge";
import {ReactNode} from "react";

export function PageHeading({children, className}: { children: ReactNode, className?: string }) {
    return (
        <div className={twMerge(" text-3xl self-start p-5", className)}>
            {children}
        </div>
    );
}
