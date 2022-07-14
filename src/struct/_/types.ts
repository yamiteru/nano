import { Stream } from "../../stream";
import { STREAM } from "../../value/_/constants";
import { Value } from "../../value/_/types";
import { Thunk } from "../../_/types";

export type StructLazy<T> = {
  [K in keyof T]: T[K] extends Value<any, infer O>
    ? () => O
    : (value?: T[K]) => T[K];
};

export type StructValues<T> = {
  [K in keyof T as `$${string & K}`]: T[K] extends Value<infer I, infer O>
    ? () => Value<I, O>
    : () => Value<T[K], T[K]>;
};

export type StructData<T> = {
  [K in keyof T]: T[K] extends Value<any, infer O>
    ? (data: Struct<T>) => Value<any, O>
    : T[K];
};

export type StructInput = Record<string, any | Value<any, any>>;

export type StructStream<T> = {
    [STREAM]: Thunk<Stream<T, T>>;
};

export type Struct<T> =
    & StructLazy<T>
    & StructValues<T>
    & StructStream<T>;
