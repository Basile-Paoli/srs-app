import {sql} from "@vercel/postgres";
import {itemFactory} from "@/repository/factories";

export async function getItemsByCollectionId(collectionId: number): Promise<Item[]> {
    const {rows} = await sql`
        SELECT i.*, i.answer_fields
        FROM items i
        WHERE i.collection_id = ${collectionId}`;
    return rows.map(row => (
        itemFactory(row)

    ));
}


export async function getItemById(itemId: number): Promise<Nullable<Item>> {
    const {rows} = await sql`
        SELECT i.*, i.answer_fields
        FROM items i
        WHERE i.id = ${itemId}`;

    if (rows.length === 0) {
        return null;
    }

    return itemFactory(rows[0]);
}