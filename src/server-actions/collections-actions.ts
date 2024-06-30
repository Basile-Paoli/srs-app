"use server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/auth";
import {createCollection, getCollections} from "@/app/repository/collections";

export async function createCollectionAction(): Promise<number | void> {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return
    }
    return (await createCollection(session.user.id)).id
}

export async function getCollectionsAction(userId: string): Promise<Collection[] | void> {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return
    }
    return await getCollections(userId)
}