export type Undefinable<TObj extends object> = {
    [Key in keyof TObj]?: undefined;
}