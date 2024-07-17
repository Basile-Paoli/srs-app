import {QueryResultRow} from "@vercel/postgres";

export function collectionFactory(row: QueryResultRow): Collection {
    return {
        id: row.id,
        name: row.name,
        description: row.description,
        creator: row.creator,
        defaultAnswerFields: row.default_answer_fields,
        isPublic: row.is_public,
        isStatic: row.is_static,
        itemCount: row.item_count !== undefined ? parseInt(row.item_count) : undefined,
    };
}

export function itemFactory(row: QueryResultRow): Item {
    return {
        id: row.id,
        prompt: row.prompt,
        description: row.description,
    };
}