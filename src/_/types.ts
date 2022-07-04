export type Nullable<T> = T | null;
export type Noop = () => void;

export type TMap<Input, Output> = (value: Input) => Output;

export type TSubscriber<T> = (value: T) => void;
export type TSubscribers<T> = {
    next?: TSubscriber<T>;
    error?: TSubscriber<string>;
    end?: TSubscriber<undefined>;
};
