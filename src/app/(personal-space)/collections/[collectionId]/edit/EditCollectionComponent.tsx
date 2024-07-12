"use client";

import {useState} from "react";
import InlineEditText from "@/components/ui/InlineEditText";
import {actionPutCollection} from "@/server-actions/collections-actions";

export function EditCollectionComponent({collection}: { collection: CollectionWithItems }) {
    const [collectionName, setCollectionName] = useState(collection.name)

    const handleValidate = () => {
        actionPutCollection({...collection, name: collectionName})
    }
    return <>
        <h1>Edit Collection {collection.name}</h1>
        <InlineEditText value={collectionName ?? ""}
                        onChange={(e) => setCollectionName(e.target.value)}
                        onValidate={() => {
                            handleValidate()
                        }}
                        placeholder={"Enter a name"}
        />

    </>
}
