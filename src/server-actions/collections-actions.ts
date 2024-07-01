"use server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/auth";
import {createCollection, getCollectionById, getCollectionsByUser} from "@/app/repository/collections";

export async function actionCreateCollection(): Promise<number | void> {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return
    }
    return (await createCollection(session.user.id)).id
}

export async function actionGetCollectionsByUser(userId: number): Promise<Collection[] | void> {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return
    }
    return await getCollectionsByUser(userId)
}

export async function actionGetCollectionById(collectionId: number): Promise<Nullable<Collection>> {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return null
    }
    return await getCollectionById(collectionId)
}