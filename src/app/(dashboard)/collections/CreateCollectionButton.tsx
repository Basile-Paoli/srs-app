"use client";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {actionCreateCollection} from "@/server-actions/collections-actions";

export default function CreateCollectionButton() {
    const router = useRouter();
    const clickHandler = async () => {
        const id = await actionCreateCollection();
        router.push(`/collections/${id}/edit`)
    }
    return (
        <Button onClick={clickHandler}>Create a collection</Button>
    );
}
