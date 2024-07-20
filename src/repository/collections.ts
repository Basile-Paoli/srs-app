import {sql} from "@vercel/postgres";
import {collectionFactory} from "@/repository/factories";
import {stringifyArrayPostgres} from "@/repository/db-utils";

export async function createCollection(userId: number, name?: string): Promise<number> {
    const {rows} = await sql`
        INSERT INTO collections (creator, name)
        VALUES (${userId}, ${name || null})
        RETURNING id`;

    return rows[0].id;
}

export async function getCollectionsByUser(userId: number): Promise<Collection[]> {
    const {rows} = await sql`
        SELECT collections.*, collections.items
        FROM collections
        WHERE creator = ${userId}`;

    return rows.map(row => (
        collectionFactory(row)
    ));
}

export async function getCollectionById(collectionId: number): Promise<Nullable<Collection>> {

    let result = await sql`
        SELECT *, c.items
        FROM collections c
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

