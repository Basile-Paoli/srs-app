"use client";
import Link from "next/link";
import {signOut, signIn, useSession} from "next-auth/react";
import {Sheet, SheetContent, SheetHeader, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {HamburgerMenuIcon, HomeIcon, ViewGridIcon, ViewVerticalIcon} from "@radix-ui/react-icons";
import {usePathname} from "next/navigation";
import {ElementType} from "react";

type menu = {
    name: string,
    href: string,
    icon: ElementType,
}

export function Header() {
    const session = useSession()
    const menus: menu[] = [
        {
            name: "Home",
            href: "/home",
            icon: HomeIcon,
        },
        {
            name: "Reviews",
            href: "/reviews",
            icon: ViewVerticalIcon,
        },
        {
            name: "My Collections",
            href: "/collections",
            icon: ViewGridIcon,
        },
    ]
    const pathname = usePathname()
    return (
        <div className={"flex w-screen"}>

            <Sheet>
                <SheetTrigger className={"mt-2 ml-3"} asChild>
                    <Button variant={"outline"}><HamburgerMenuIcon/></Button>
                </SheetTrigger>

                <SheetContent className={"flex flex-col pt-6"}>
                    <SheetHeader>
                        <span className={"font-semibold text-primary"}>SRS App</span>
                    </SheetHeader>
                    {menus.map((menu) => (
                        <Link key={menu.name} href={menu.href}
                              className={"flex hover:bg-gray-100 hover:text-primary hover:font-semibold items-center gap-3 "}>
                            <menu.icon/>
                            {menu.name}
                        </Link>
                    ))}
                </SheetContent>
            </Sheet>
            <div className={"flex justify-around w-full items-center"}>

                <div className={"justify-center"}>SRS App</div>
                {session && session.data ?
                    <button onClick={() => signOut()}>Log out</button> :
                    <button onClick={() => signIn()}>Log in</button>}
            </div>
        </div>
    );
}
