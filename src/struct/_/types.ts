import { Stream } from "../../stream";
import { STREAM } from "../../value/_/constants";
import { Value } from "../../value/_/types";
import { Thunk } from "../../_/types";

export type Prefix<
    Symbol extends string,
    Value extends string
> = `${Symbol}${Value}`;

export type PrefixDollar<T> = T extends string
    ? Prefix<"$", T>
    : never;

export type Any = string | number;

export type StructInput<T extends StructInput<any>> = Record<
    string,
    Any | ((value: Struct<T>) => any)
>;

export type StructLazy<T extends StructInput<any>> = {
    [K in keyof T]: T[K] extends (value: Struct<T>) => Value<any, infer X>
        ? () => X
        : (value?: T[K]) => T[K];
};

export type StructValues<T extends StructInput<any>> = {
    [K in PrefixDollar<keyof T>]: K extends `$${infer X}`
        ? Thunk<
            T[X] extends (value: Struct<T>) => Value<infer I, infer O>
                ? Value<I, O>
                : Value<T[X], T[X]>
        >
        : never;
};

export type StructStream<T> = {
    [STREAM]: Thunk<Stream<T, T>>;
};

export type Struct<T extends StructInput<any>> =
    & StructLazy<T>
    & StructValues<T>
    & StructStream<T>;
