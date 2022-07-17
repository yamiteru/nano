export type Map<I, O, T = undefined> = (value: I) => O | T;

export type Subscriber<T> = (value: T) => void;

export type Observable<I, O = I> = [
    subscribers: null | false | Set<Subscriber<O>>,
    map: Map<I, O>
];
