"use client";

import {useEffect, useState} from "react";
import {actionGetCollectionById} from "@/server-actions/collections-actions";
import {LoadingSpinner} from "@/components/ui/LoadingSpinner";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export function EditCollectionComponent({collectionId}: { collectionId: number }) {

    const [collection, setCollection] = useState<Nullable<Collection>>(null);

    const session = useSession();
    const router = useRouter();
    useEffect(() => {
        actionGetCollectionById(collectionId).then((result) => {
            if (session.status === "loading" || !session.status) {
                return;
            }
            if (!result || session?.data?.user.id !== result.creator) {
                router.push("/collections");
                return;
            }
            setCollection(result!);
        })
    }, [collectionId, session, router]);
    return <>
        {collection ?
            <h1>Edit Collection {collection.name}</h1> :
            <LoadingSpinner size={200}/>
        }
    </>
}
