import Link from "next/link";
import {Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {HamburgerMenuIcon, HomeIcon, ViewGridIcon, ViewVerticalIcon} from "@radix-ui/react-icons";
import {ElementType} from "react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/auth";

type menu = {
    name: string,
    href: string,
    icon: ElementType,
}

export async function Header() {
    const session = await getServerSession(authOptions)
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

    const Navbar = () =>
        <Sheet>
            <SheetTrigger className={"mt-2 ml-3"} asChild>
                <Button variant={"outline"}><HamburgerMenuIcon/></Button>
            </SheetTrigger>
            <SheetContent className={"flex flex-col pt-6"}>
                <SheetHeader>
                    <span className={"font-semibold text-primary"}>SRS App</span>
                </SheetHeader>
                {menus.map((menu) =>
                    <SheetClose asChild key={menu.name}>
                        <Link key={menu.name} href={menu.href}
                              className={"flex hover:bg-gray-100 hover:text-primary hover:font-semibold items-center gap-3 "}>
                            <menu.icon/>
                            {menu.name}
                        </Link>
                    </SheetClose>
                )}
            </SheetContent>
        </Sheet>

    return (
        <div className={"flex w-screen"}>
            <Navbar/>
            <div className={"flex justify-around w-full items-center"}>

                <div className={"justify-center"}>SRS App</div>
                {session && session.user ?
                    <Link href={"/api/auth/signout"}>Sign out</Link> :
                    <Link href={"/api/auth/signin"}>Sign in</Link>
                }
            </div>
        </div>
    );
}
