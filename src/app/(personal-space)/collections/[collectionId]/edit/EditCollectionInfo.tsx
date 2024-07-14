"use client";

import {useState} from "react";
import InlineEditText from "@/components/ui/InlineEditText";
import {actionPutCollection} from "@/server-actions/collections-actions";
import InlineEditTextArea from "@/components/ui/InlineEditTextArea";
import CollectionSettingsDialog from "@/app/(personal-space)/collections/[collectionId]/edit/CollectionSettingsDialog";

export default function EditCollectionInfo({collection}: { collection: CollectionWithItems }) {
    const [newCollection, setNewCollection] = useState(collection)

    const validate = () => {
        actionPutCollection(newCollection)
    }
    return <div className={"w-full relative"}>
        <div className={"absolute right-4 top-0"}>
            <CollectionSettingsDialog
                answerFields={newCollection.defaultAnswerFields ?? []}
                setAnswerFields={(fields) => setNewCollection({
                    ...newCollection,
                    defaultAnswerFields: fields
                })}
                validate={validate}
            />
        </div>
        <InlineEditText
            value={newCollection.name ?? ""}
            onChange={(e) => setNewCollection({...newCollection, name: e.target.value})}
            onValidate={validate}
            placeholder={"Enter a name"}
            maxLength={80}
            className={"px-32 w-full"}
        />
        <InlineEditTextArea
            value={newCollection.description ?? ""}
            onTextChange={(e) => setNewCollection({...newCollection, description: e.target.value})}
            onValidate={validate}
            placeholder={"Enter a description"}
        />
    </div>
}
