import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React, {ComponentPropsWithoutRef, Fragment,  ReactNode} from "react";
import {HomeIcon} from "@radix-ui/react-icons";
import {cn} from "@/lib/utils";

interface Props extends ComponentPropsWithoutRef<"nav"> {
    items: { value: ReactNode, href: string }[]
    separator?: React.ReactNode
}

export function SrsBreadcrumb({items,className, ...props}: Props) {
    return (
        <Breadcrumb className={cn("text-primary" ,className)} {...props} >
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href={"/home"}><HomeIcon/></Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {items.map((item, index) => (
                    <Fragment key={index}>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={item.href}>{item.value}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}