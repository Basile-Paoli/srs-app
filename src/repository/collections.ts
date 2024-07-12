import {db, sql} from "@vercel/postgres";
import {collectionFactory} from "@/repository/factories";
import {stringifyArray} from "@/repository/db-utils";
import {getItemsByCollectionId} from "@/repository/items";

export async function createCollection(userId: number, name?: string): Promise<Collection> {
    const {rows} = await sql`
        INSERT INTO collections (creator, name)
        VALUES (${userId}, ${name || null})
        RETURNING id`

    return collectionFactory(rows[0])
}

export async function getCollectionsByUser(userId: number): Promise<Collection[]> {
    const {rows} = await sql`
        SELECT collections.*, count(collections_items) AS item_count
        FROM collections
                 LEFT JOIN collections_items
                           ON collections.id = collections_items.collection_id
        WHERE creator = ${userId}
        GROUP BY collections.id`

    return rows.map(row => (
        collectionFactory(row)
    ))
}

export async function getCollectionById(collectionId: number): Promise<Nullable<Collection>> {
    const client = await db.connect()
    let result = await client.sql`
        SELECT *
        FROM collections
        WHERE id = ${collectionId}`

    if (result.rows.length === 0) {
        return null
    }
    return collectionFactory(result.rows[0])

}

export async function putCollection(collection: Collection): Promise<void> {
    await sql`
        UPDATE collections
        SET name                  = ${collection.name},
            description           = ${collection.description},
            default_answer_fields = ${stringifyArray(collection.defaultAnswerFields)},
            is_public             = ${collection.isPublic}
        WHERE id = ${collection.id}`
}

export async function getCollectionWithItems(collectionId: number): Promise<Nullable<CollectionWithItems>> {
    const [collection, items] = await Promise.all([
        getCollectionById(collectionId),
        getItemsByCollectionId(collectionId)
    ])

    if (!collection) {
        return null
    }

    return {
        ...collection,
        itemCount: items.length,
        items
    }
}
