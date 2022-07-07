import { Value } from "../value/_/types";

export type Either<L, R> = L | R;
export type Nullable<T> = Either<null, T>;
export type Falsable<T> = Either<false, T>;
export type Noop = () => void;

export type TMap<
    Input,
    Output,
    Previous = undefined
> = (value: Input, previous: Previous) =>
    Either<undefined, Output>;

export type TSubscriber<T> = (value: T) => void;
export type TSubscribers<T> = {
    next?: TSubscriber<T>;
    error?: TSubscriber<string>;
    close?: TSubscriber<undefined>;
} | TSubscriber<T>;

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
