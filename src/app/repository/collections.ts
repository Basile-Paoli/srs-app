import {db, sql} from "@vercel/postgres";
import {collectionFactory, itemFactory} from "@/app/repository/factories";

export async function createCollection(userId: number, name?: string): Promise<Collection> {
    const {rows} = await sql`INSERT INTO collections (creator, name)
                             values (${userId}, ${name || null})
                             RETURNING id`
    return collectionFactory(rows[0])
}

export async function getCollectionsByUser(userId: number): Promise<Collection[]> {
    const {rows} = await sql`SELECT collections.*,
                                    count(collections_items) as item_count
                             FROM collections
                                      LEFT JOIN collections_items ON collections.id = collections_items.collection_id
                             WHERE creator = ${userId}
                             group by collections.id`
    return rows.map(row => (
        collectionFactory(row)
    ))
}

export async function getCollectionById(collectionId: number): Promise<Nullable<CollectionWithItems>> {
    const client = await db.connect()
    let result = await client.sql`SElect *
                                  from collections
                                  where id = ${collectionId}`
    if (result.rows.length === 0) {
        return null
    }
    const collection = collectionFactory(result.rows[0])
    const {rows} = await client.sql`SELECT i.*
                                    from collections_items
                                             JOIN public.items i on i.id = collections_items.item_id
                                    where collection_id = ${collectionId}`

    const itemCount = rows.length
    const items = rows.map(row => (
        itemFactory(row)
    ))
    return {
        ...collection,
        items,
        itemCount,
    }
}


