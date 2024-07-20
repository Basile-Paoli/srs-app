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
        items: row.items.map((i: any) => itemFactory(i))
    };
}

export function itemFactory(row: QueryResultRow): Item {
    return {
        id: row.id,
        prompt: row.prompt,
        description: row.description,
        collectionId: row.collection_id,
        answerFields: row.answer_fields.map((af: any) => answerFieldFactory(af))
    };
}

export function userFactory(row: QueryResultRow): User {
    return {
        id: row.id,
        name: row.name,
    };
}

export function answerFieldFactory(row: QueryResultRow): AnswerField {
    return {
        id: row.id,
        label: row.label,
        answers: row.answers,
        itemId: row.item_id,
    };
}