"use client";

import {useState} from "react";
import InlineEditText from "@/components/ui/InlineEditText";
import {actionPublishCollection, actionPutCollection} from "@/server-actions/collections-actions";
import InlineEditTextArea from "@/components/ui/InlineEditTextArea";
import CollectionSettingsDialog from "@/app/(dashboard)/collections/[collectionId]/edit/CollectionSettingsDialog";
import {useRouter} from "next/navigation";

export default function EditCollectionInfo({collection}: { collection: Collection }) {
    const router = useRouter();

    const [newCollection, setNewCollection] = useState(collection);

    const save = () => {
        actionPutCollection(newCollection);
    };

    const publish = () => {
        actionPublishCollection(newCollection.id);
        router.replace(`/collections/${collection.id}`);
    };

    return (
        <div className={"w-full h-full flex-col flex items-center"}>
            <CollectionSettingsDialog
                answerFields={newCollection.defaultAnswerFields ?? []}
                setAnswerFields={(fields) => setNewCollection({
                    ...newCollection,
                    defaultAnswerFields: fields
                })}
                save={save}
                publish={publish}
            />
            <InlineEditText
                value={newCollection.name ?? ""}
                onChange={(e) => setNewCollection({...newCollection, name: e.target.value})}
                onValidate={save}
                placeholder={"Enter a name"}
                maxLength={80}
                className={"px-32 w-full max-w-[980px]"}
            />
            <InlineEditTextArea
                value={newCollection.description ?? ""}
                onTextChange={(e) => setNewCollection({...newCollection, description: e.target.value})}
                onValidate={save}
                placeholder={"Enter a description"}
                className={"px-4"}
            />
        </div>
    );
}
