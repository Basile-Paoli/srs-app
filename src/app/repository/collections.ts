import {QueryResultRow, sql} from "@vercel/postgres";
import {collectionFactory} from "@/app/repository/factories";

export async function createCollection(userId: string, name?: string): Promise<QueryResultRow> {
    const {rows} = await sql`INSERT INTO collections (creator, name)
                             values (${userId}, ${name || null})
                             RETURNING id`
    return rows[0]
}

export async function getCollections(userId: string): Promise<Collection[]> {
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