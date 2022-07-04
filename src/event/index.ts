import {
    Observable,
    observableWithCallbacks,
    push,
    on as onObservable,
    off
} from "../observable";
import { EventActionKey, EventActionKeyMap, Noop, Nullable, TMap, TSubscriber, TSubscribers } from "../_/types";

export const NEXT_OBSERVABLE = Symbol();
export const ERROR_OBSERVABLE = Symbol();
export const END_OBSERVABLE = Symbol();
export const MAP = Symbol();
export const END = Symbol();

export type Event<I, O> = Nullable<{
    [NEXT_OBSERVABLE]: Nullable<Observable<O>>;
    [ERROR_OBSERVABLE]: Nullable<Observable<string>>;
    [END_OBSERVABLE]: Nullable<Observable<undefined>>;
    [MAP]: TMap<I, O>;
    [END]: Noop;
}>;

function defaultMap(value: any) {
    return value;
}

type EventActionSymbol = typeof NEXT_OBSERVABLE | typeof ERROR_OBSERVABLE | typeof END_OBSERVABLE;

type EventActionSymbolMap<O> = {
    [NEXT_OBSERVABLE]: O;
    [ERROR_OBSERVABLE]: string;
    [END_OBSERVABLE]: undefined;
};

function createOptionalObservable<O, A extends EventActionKey, T = EventActionKeyMap<O>[A]>(
    subscribers: Nullable<TSubscribers<O>>,
    action: A,
): Observable<T> | null {
    return subscribers?.[action]
        ? observableWithCallbacks<T>([(subscribers as any)[action]])
        : null;
}

export function event<O, I = O>(
    map?: Nullable<TMap<I, O>>,
    subscribers?: Nullable<TSubscribers<O>>
): Event<I, O> {
    map ??= defaultMap;
    subscribers ??= null;

    let obj: Event<I, O> = {
        [NEXT_OBSERVABLE]: createOptionalObservable(subscribers, "next"),
        [ERROR_OBSERVABLE]: createOptionalObservable(subscribers, "error"),
        [END_OBSERVABLE]: createOptionalObservable(subscribers, "end"),
        [MAP]: map,
        [END]: () => {
            obj = null
        }
    };

    return obj;
}

function on<
    O,
    I,
    S extends EventActionSymbol,
    T = EventActionSymbolMap<O>[S]
>(
    symbol: S,
    event$: Event<O, I>,
    callback: TSubscriber<T>
): Noop {
    if(event$?.[symbol]) {
        onObservable((event$ as any)[symbol], callback);
    } else {
        (event$ as any)[symbol] = observableWithCallbacks([callback]);
    }

    return () => {
        event$?.[symbol] && off((event$ as any)[symbol], callback);
    };
}

export function onNext<O, I>(event$: Event<O, I>, callback: TSubscriber<O>) {
    return on(NEXT_OBSERVABLE, event$, callback);
}

export function onError<O, I>(event$: Event<O, I>, callback: TSubscriber<string>) {
    return on(ERROR_OBSERVABLE, event$, callback);
}

export function onEnd<O, I>(event$: Event<O, I>, callback: TSubscriber<undefined>) {
    return on(END_OBSERVABLE, event$, callback);
}

export function next<O, I>(event$: Event<I, O>, value: I) {
    if(event$?.[NEXT_OBSERVABLE]) {
        push(event$[NEXT_OBSERVABLE], event$[MAP](value));
    }
}

export function error<O, I>(event$: Event<O, I>, message: string) {
    event$?.[ERROR_OBSERVABLE] && push(event$[ERROR_OBSERVABLE], message);
    event$?.[END_OBSERVABLE] && push(event$[END_OBSERVABLE], undefined);

    end(event$);
}

export function end<O, I>(event$: Event<O, I>) {
    event$?.[END]();
}

export function copy<II, IO, O = IO>(
    event$: Event<IO, II>,
    map: TMap<IO, O>,
    subscribers?: Nullable<TSubscribers<O>>
): Event<O, IO> {
    const _$ = event<IO, O>(map as unknown as TMap<O, IO>, subscribers as any);

    const unsub = onNext(event$, (value) => {
        next(_$, value as unknown as O);
    });

    onEnd(event$, () => {
        end(_$);
    });

    onEnd(_$, () => {
        unsub();
    });

    return _$;
}
