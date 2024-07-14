import {HamburgerMenuIcon, HomeIcon, ViewGridIcon, ViewVerticalIcon} from "@radix-ui/react-icons";
import {Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ElementType} from "react";

export function Navbar() {

    type menu = {
        name: string,
        href: string,
        icon: ElementType,
    }
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

    return (
        <Sheet>
            <SheetTrigger className={"my-1 ml-3"} asChild>
                <Button variant={"outline"}><HamburgerMenuIcon/></Button>
            </SheetTrigger>
            <SheetContent className={"flex flex-col p-0 pt-6"}>
                <SheetHeader>
                    <span className={"font-semibold text-primary pl-6"}>SRS App</span>
                </SheetHeader>
                {menus.map((menu) =>
                    <SheetClose asChild key={menu.name}>
                        <Link key={menu.name} href={menu.href}
                              className={"flex hover:bg-gray-100 hover:text-primary hover:font-semibold items-center gap-3 pl-6 py-1"}>
                            <menu.icon/>
                            {menu.name}
                        </Link>
                    </SheetClose>
                )}
            </SheetContent>
        </Sheet>
    );
}
