import {sql} from "@vercel/postgres";
import {collectionFactory} from "@/repository/factories";
import {stringifyArrayPostgres} from "@/repository/db-utils";
import {getItemsByCollectionId} from "@/repository/items";

export async function createCollection(userId: number, name?: string): Promise<Collection> {
    const {rows} = await sql`
        INSERT INTO collections (creator, name)
        VALUES (${userId}, ${name || null})
        RETURNING id`;

    return collectionFactory(rows[0]);
}

export async function getCollectionsByUser(userId: number): Promise<Collection[]> {
    const {rows} = await sql`
        SELECT collections.*, count(items) AS item_count
        FROM collections
                 LEFT JOIN items
                           ON collections.id = items.collection_id
        WHERE creator = ${userId}
        GROUP BY collections.id`;

    return rows.map(row => (
        collectionFactory(row)
    ));
}

export async function getCollectionById(collectionId: number): Promise<Nullable<Collection>> {

    let result = await sql`
        SELECT *
        FROM collections
        WHERE id = ${collectionId}`;

    if (result.rows.length === 0) {
        return null;
    }
    return collectionFactory(result.rows[0]);

}

export async function putCollection(collection: Collection): Promise<void> {

    await sql`
        UPDATE collections
        SET name                  = ${collection.name},
            description           = ${collection.description},
            default_answer_fields = ${stringifyArrayPostgres(collection.defaultAnswerFields)},
            is_public             = ${collection.isPublic},
            is_static             = ${collection.isStatic},
            last_edited           = NOW()
        WHERE id = ${collection.id}`;
}

export async function publishCollection(collectionId: number): Promise<void> {
    await sql`
        UPDATE collections
        SET is_public   = TRUE,
            is_static   = TRUE,
            upload_date = NOW()
        WHERE id = ${collectionId}`;
}

export async function getCollectionWithItems(collectionId: number): Promise<Nullable<CollectionWithItems>> {
    const [collection, items] = await Promise.all([
        getCollectionById(collectionId),
        getItemsByCollectionId(collectionId)
    ]);
    if (!collection) {
        return null;
    }

    return {
        ...collection,
        itemCount: items.length,
        items
    };
}

