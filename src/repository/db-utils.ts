type Primitive = string | number | boolean | null | undefined;

export function stringifyArrayPostgres(array: Primitive[] | null) {
    if (!array) return null;
    return JSON.stringify(array).replace("[", "{").replace("]", "}");
}