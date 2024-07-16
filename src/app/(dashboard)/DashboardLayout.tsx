import {SrsBreadcrumb} from "@/components/SrsBreadcrumb";
import {Separator} from "@/components/ui/separator";
import {ReactNode} from "react";

type Props = {
    breadcrumbItems: { value: ReactNode, href: string }[]
    children: ReactNode
}

export default function DashboardLayout({breadcrumbItems, children}: Props) {
    return (
        <div className={" h-full flex flex-col"}>
            <SrsBreadcrumb items={breadcrumbItems} className={"p-3"}/>
            <Separator/>

            <div className={"flex justify-center h-full"}>
                <div
                    className={"flex flex-col items-center bg-gray-50 max-w-5xl self-center w-full  h-full border-l border-r"}>
                    {children}
                </div>
            </div>
        </div>
    )
        ;
}
