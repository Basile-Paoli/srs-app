import React, {ComponentProps} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

type Props = {
    collection: Collection;
} & ComponentProps<"div">;

export function CollectionCard({collection,className, ...props}: Props) {
    return (
        <Card {...props} className={"min-w-64"}>
            <CardHeader>
                <CardTitle>{collection.name || "Collection sans nom"}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{collection.description}</p>
                <p>{collection.itemCount} items</p>
            </CardContent>
        </Card>
    );
}
