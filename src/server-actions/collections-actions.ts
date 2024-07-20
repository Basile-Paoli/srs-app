"use server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/auth";
import {
    createCollection,
    getCollectionById,
    getCollectionsByUser,
    publishCollection,
    putCollection
} from "@/repository/collections";

export async function actionCreateCollection(): Promise<Nullable<number>> {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return null;
    }

    return await createCollection(session.user.id);
}

export async function actionGetCollectionsByUser(userId: number): Promise<Nullable<Collection[]>> {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return null;
    }

    return await getCollectionsByUser(userId);
}

export async function actionGetCollectionById(collectionId: number): Promise<Nullable<Collection>> {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return null;
    }

    const collection = await getCollectionById(collectionId);
    if (!collection || (!collection.isPublic && collection.creator !== session.user.id)) {
        return null;
    }
    return collection;
}

export async function actionPutCollection(collection: Collection): Promise<void> {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return;
    }

    const currentCollection = await getCollectionById(collection.id);
    if (!currentCollection || currentCollection.creator !== session.user.id || currentCollection.isStatic) {
        return;
    }

    await putCollection(collection);
}

export async function actionPublishCollection(collectionId: number): Promise<void> {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return;
    }

    const collection = await getCollectionById(collectionId);
    if (!collection || collection.creator !== session.user.id || collection.isStatic) {
        return;
    }

    await publishCollection(collectionId);
}