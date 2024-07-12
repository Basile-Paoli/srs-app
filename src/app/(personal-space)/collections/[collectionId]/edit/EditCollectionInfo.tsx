"use client";

import {useState} from "react";
import InlineEditText from "@/components/ui/InlineEditText";
import {actionPutCollection} from "@/server-actions/collections-actions";
import InlineEditTextArea from "@/components/ui/InlineEditTextArea";

export function EditCollectionInfo({collection}: { collection: CollectionWithItems }) {
    const [collectionName, setCollectionName] = useState(collection.name)
    const [collectionDescription, setCollectionDescription] = useState(collection.description)

    const validateName = () => {
        if (collectionName && collectionName.length > 80) {
            setCollectionName(collectionName.slice(0, 80))
            actionPutCollection({...collection, name: collectionName.slice(0, 80)})
            return
        }
        actionPutCollection({...collection, name: collectionName})
    }
    const validateDescription = () => {
        actionPutCollection({...collection, description: collectionDescription})
    }
    return <>
        <InlineEditText value={collectionName ?? ""}
                        onChange={(e) => setCollectionName(e.target.value)}
                        onValidate={validateName}
                        placeholder={"Enter a name"}
                        maxLength={80}
        />
        <InlineEditTextArea value={collectionDescription ?? ""}
                            onTextChange={(e) => setCollectionDescription(e.target.value)}
                            onValidate={validateDescription}
                            placeholder={"Enter a description"}/>
    </>
}
