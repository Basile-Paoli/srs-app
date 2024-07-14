import {sql} from "@vercel/postgres";
import {itemFactory} from "@/repository/factories";

export async function getItemsByCollectionId(collectionId: number): Promise<Item[]> {
    const {rows} = await sql`
        SELECT i.*
        FROM items i
        WHERE collection_id = ${collectionId}`
    return rows.map(row => (
        itemFactory(row)
    ))
}