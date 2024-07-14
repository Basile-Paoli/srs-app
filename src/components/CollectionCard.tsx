import React, {ComponentProps} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {PencilIcon} from "lucide-react";

type Props = {
    collection: Collection;
    editable?: boolean;
} & ComponentProps<"div">;

export function CollectionCard({collection, editable = true, className, ...props}: Props) {
    return (
        <Card {...props} className={cn(className, "min-w-64 max-w-sm")}>
            <CardHeader>
                <Link href={`/collections/${collection.id}`}>

                    <CardTitle>{collection.name || "Collection sans nom"}</CardTitle>
                </Link>
            </CardHeader>
            <CardContent>
                <div className={"flex flex-col"}>
                    <div
                        className={"whitespace-pre-wrap  leading-6 max-h-[72px] overflow-hidden mb-2"}>{collection.description}</div>
                    <p>{collection.itemCount} items</p>
                    {editable && <Link href={`/collections/${collection.id}/edit`}
									   className={"hover:bg-gray-100 hover:text-primary w-[30px] h-[30px] self-end p-1 flex justify-center items-center"}><PencilIcon
						className={"w-[20px] h-[20px] hover:w-[28px] hover:h-[28px]"}/></Link>}
                </div>
            </CardContent>
        </Card>
    );
}
