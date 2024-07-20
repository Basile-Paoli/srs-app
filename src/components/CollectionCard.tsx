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

                    <CardTitle
                        className={"break-words text-primary"}>{collection.name || "Collection sans nom"}</CardTitle>
                </Link>
            </CardHeader>
            <CardContent className={"flex flex-col"}>
                <div className={"whitespace-pre-wrap  leading-6 max-h-[72px] overflow-hidden mb-2"}>
                    {collection.description}
                </div>

                {collection.itemCount !==undefined &&
					<p>{collection.itemCount} {collection.itemCount === 1 ? "item" : "items"}</p>
                }

                {editable &&
					<div className={"w-1/2 self-end flex justify-center items-center h-10"}>
						<Link
							href={`/collections/${collection.id}/edit`}
							className={"hover:bg-gray-100 hover:text-primary h-4/5 hover:h-full p-1 "}
						>
							<PencilIcon className={"w-full h-full"}/>
						</Link>
					</div>
                }
            </CardContent>
        </Card>
    );
}
