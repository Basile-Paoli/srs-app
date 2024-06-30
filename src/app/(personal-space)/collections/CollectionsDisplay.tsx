"use client";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {CollectionCard} from "@/components/CollectionCard";
import {getCollectionsAction} from "@/server-actions/collections-actions";
import {LoadingSpinner} from "@/components/ui/LoadingSpinner";

export function CollectionsDisplay() {
    const [isLoading, setIsLoading] = useState(true)
    const session = useSession()
    const [collections, setCollections] = useState<Collection[]>([])
    useEffect(() => {
        getCollectionsAction(session!.data!.user.id).then((result) => {
            setCollections(result!)
            setIsLoading(false)
        })

    }, [session]);
    return (
        <>
            <div className="flex flex-wrap justify-evenly gap-6 max-w-3xl p-3">
                {isLoading && <LoadingSpinner size={200}/>}
                {collections.map((collection) =>
                    <CollectionCard key={collection.id} collection={collection}/>
                )}
            </div>
        </>);
}
