type Nullable<T> = T | null
type Collection = {
    id: number,
    name: Nullable<string>,
    description: Nullable<string>,
    creator: number,
    defaultAnswerFields: Nullable<string[]>,
    isPublic: boolean,
    itemCount?: number,
    items?: Item[],
}

type Item = {
    id: number,
    prompt: string,
    description: Nullable<string>,
}

