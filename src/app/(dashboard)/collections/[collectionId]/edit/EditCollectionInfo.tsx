"use client";

import {useState} from "react";
import InlineEditText from "@/components/ui/InlineEditText";
import {actionPutCollection} from "@/server-actions/collections-actions";
import InlineEditTextArea from "@/components/ui/InlineEditTextArea";
import CollectionSettingsDialog from "@/app/(dashboard)/collections/[collectionId]/edit/CollectionSettingsDialog";
import {useRouter} from "next/navigation";

export default function EditCollectionInfo({collection}: { collection: CollectionWithItems }) {
    const router = useRouter()

    const [newCollection, setNewCollection] = useState(collection)

    const validate = () => {
        actionPutCollection(newCollection)
    }

    const publish = () => {
        setNewCollection({...newCollection, isPublic: true, isStatic: true})
        actionPutCollection({...newCollection, isPublic: true, isStatic: true})
        router.replace(`/collections/${collection.id}`)
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
                publish={publish}
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
