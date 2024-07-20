
type Nullable<T> = T | null;

interface Collection {
    id: number,
    name: Nullable<string>,
    description: Nullable<string>,
    creator: number,
    defaultAnswerFields: Nullable<string[]>,
    isPublic: boolean,
    isStatic: boolean,
    items: Item[],
}

interface CollectionInsert {
    name: Nullable<string>,
    description: Nullable<string>,
    creator: number,
    defaultAnswerFields: Nullable<string[]>,
    isPublic: boolean,
    isStatic: boolean,
}


interface Item {
    id: number,
    prompt: string,
    description: Nullable<string>,
    collectionId: number,
    answerFields: AnswerField[],
}


interface AnswerField {
    id: number,
    label: string,
    answers: string[],
    itemId: number,
}

interface User {
    id: number,
    name: Nullable<string>
}