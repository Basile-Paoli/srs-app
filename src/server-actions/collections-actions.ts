"use server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/auth";
import {createCollection, getCollectionsByUser, getCollectionWithItems, putCollection} from "@/repository/collections";

export async function actionCreateCollection(): Promise<Nullable<number>> {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return null
    }

    return (await createCollection(session.user.id)).id
}

export async function actionGetCollectionsByUser(userId: number): Promise<Nullable<Collection[]>> {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return null
    }

    return await getCollectionsByUser(userId)
}

export async function actionGetCollectionById(collectionId: number): Promise<Nullable<CollectionWithItems>> {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return null
    }

    return await getCollectionWithItems(collectionId)
}

export async function actionPutCollection(collection: Collection): Promise<void> {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return
    }

    await putCollection(collection)
}