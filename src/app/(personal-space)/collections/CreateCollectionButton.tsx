"use client";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {createCollectionAction} from "@/server-actions/collections-actions";

export function CreateCollectionButton() {
    const router = useRouter();
    const clickHandler = async () => {
        const id = await createCollectionAction();
        router.push(`/collections/edit/${id}`)
    }
    return (
        <Button onClick={clickHandler}>Create a collection</Button>
    );
}
