import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {ReactNode} from "react";

type Props = {
    items: { label: ReactNode, href: string }[]
}

export function SrsBreadcrumb({items}: Props) {
    return (

        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href={"/home"}>Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {items.map((item, index) => (
                    <>
                        <BreadcrumbSeparator key={index}/>
                        <BreadcrumbItem key={index}>
                            <BreadcrumbLink asChild>
                                <Link href={item.href}>{item.label}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
