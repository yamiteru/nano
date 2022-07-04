export type Nullable<T> = T | null;
export type Noop = () => void;

export type TMap<I, O> = (value: I) => O;

export type TSubscriber<T> = (value: T) => void;
export type TSubscribers<T> = {
    next?: TSubscriber<T>;
    error?: TSubscriber<string>;
    end?: TSubscriber<undefined>;
};

export type EventActionKey = "next" | "error" | "end";
export type EventActionKeyMap<O> = {
    next: O;
    error: string;
    end: undefined;
};
