"use client";
import {Button} from "@/components/ui/button";
import {createCollection} from "@/server-actions/collections-repo";
import {useRouter} from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {SrsBreadcrumb} from "@/components/ui/SrsBreadcrumb";


export default function Collections() {
    const router = useRouter();
    const clickHandler = async () => {
        const id = await createCollection();
        router.push(`/collections/edit/${id}`)
    }
    return (
        <>
            <SrsBreadcrumb items={[{label: "My Collections", href: "/collections"}]}/>
            <div className={"flex flex-col"}>
                <h1 className={"text-center"}>My Collections</h1>
                <div>
                    <Button onClick={clickHandler}>Create a collection</Button>
                </div>
            </div>
        </>
    );
}