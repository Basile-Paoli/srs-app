"use client";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {CollectionCard} from "@/components/CollectionCard";
import {actionGetCollectionsByUser} from "@/server-actions/collections-actions";
import {LoadingSpinner} from "@/components/ui/LoadingSpinner";

export function CollectionsDisplay() {
    const [isLoading, setIsLoading] = useState(true)
    const {data} = useSession()
    const [collections, setCollections] = useState<Collection[]>([])
    useEffect(() => {
        actionGetCollectionsByUser(data!.user.id).then((result) => {
            setCollections(result!)
            setIsLoading(false)
        })
    }, [data]);
    return (
        <div className="flex flex-wrap justify-evenly gap-6 max-w-3xl p-3">
            {isLoading && <LoadingSpinner size={200}/>}
            {collections.map((collection) =>
                <CollectionCard key={collection.id} collection={collection}/>
            )}
        </div>
    );
}
