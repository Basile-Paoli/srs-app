type Nullable<T> = T | null

interface Collection {
    id: number,
    name: Nullable<string>,
    description: Nullable<string>,
    creator: number,
    defaultAnswerFields: Nullable<string[]>,
    isPublic: boolean,
    isStatic: boolean,
    itemCount?: number,
    items?: Item[],
}

interface CollectionWithItems extends Collection {
    itemCount: number,
    items: Item[],
}
interface Item {
    id: number,
    prompt: string,
    description: Nullable<string>,
    //answerFields: AnswerField[],
}

interface AnswerField {
    id: number,
    label: string,
    answers: string[],
}