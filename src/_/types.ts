import { Subscriber } from "../observable";
import { Value } from "../value/_/types";

export type Either<L, R> = L | R;
export type Nullable<T> = Either<null, T>;
export type Falsable<T> = Either<false, T>;
export type Thunk<T> = () => T;
export type Noop = Thunk<void>;

export type Subscribers<T> = {
    next?: Subscriber<T>;
    error?: Subscriber<string>;
    close?: Subscriber<undefined>;
} | Subscriber<T>;

export type TValueArray = Value<any, any>[];

export type TValueObject = Record<string, Value<any, any>>;

export type TValues = Either<TValueArray, TValueObject>;

export type TValueInput = Value<any, any>[] | Record<any, Value<any, any>>;

export type TValueAny = any[] | Record<any, any>;

export type TInferValues<T extends TValueInput> = T extends TValueInput
    ? T extends infer X
        ? {
            [K in keyof X]: X[K] extends Value<any, infer T>
                ? T
                : never
        }
        : never
    : never;
