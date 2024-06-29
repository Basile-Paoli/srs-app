type Collection = {
    id: number,
    name: Nullable<string>,
    description: Nullable<string>,
    creator: number,
    defaultAnswerFields: Nullable<string[]>,
    isPublic: boolean,
    itemCount?: number,
}