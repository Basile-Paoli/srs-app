import {SrsBreadcrumb} from "@/components/SrsBreadcrumb";
import {Separator} from "@/components/ui/separator";
import {ReactNode} from "react";

type Props = {
    breadcrumbItems: { value: ReactNode, href: string }[]
    children: ReactNode
};

export default function DashboardLayout({breadcrumbItems, children}: Props) {
    return (
        <div className={"flex flex-col"}>
            <SrsBreadcrumb items={breadcrumbItems} className={"p-3"}/>
            <Separator/>

            <div className={"flex justify-center h-full"}>

                <div className={"relative max-w-5xl w-full min-h-screen border-r border-l bg-gray-50"}>
                    <div className={"flex flex-col items-center w-full h-full"}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
        ;
}
