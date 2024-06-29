import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React, {DetailedHTMLProps, Fragment, HTMLAttributes, ReactNode} from "react";
import {JSX} from "react/jsx-runtime";
import IntrinsicAttributes = JSX.IntrinsicAttributes;
import {HomeIcon} from "@radix-ui/react-icons";

type Props = {
    items: { value: ReactNode, href: string }[]
    separator?: React.ReactNode
} & IntrinsicAttributes & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

export function SrsBreadcrumb({items, ...props}: Props) {
    return (

        <Breadcrumb {...props}>
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
