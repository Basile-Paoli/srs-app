"use client";
import {signOut} from "next-auth/react";
import {ReactNode} from "react";

export function SignOutButton({children}: {
    children: ReactNode
}) {
    return (
        <button onClick={() => {
            signOut();
        }}>{children}</button>
    );
}
