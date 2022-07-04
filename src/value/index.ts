import {
    event,
    Event,
    onNext as eventOnNext,
    onError as eventOnError,
    onEnd as eventOnEnd,
    next as eventNext,
    error as eventError,
    end as eventEnd,
    copy as eventCopy
} from "../event";
import { Noop, Nullable, TMap, TSubscriber, TSubscribers } from "../_/types";

export const VALUE = Symbol();
export const EVENT = Symbol();

export type Value<I, O> = {
    [EVENT]: Event<I, O>,
    [VALUE]: O;
};

export function value<O, I = O>(
    value: O,
    map?: Nullable<TMap<I, O>>,
    subscribers?: Nullable<TSubscribers<O>>
): Value<I, O> {
    const res = {
        [EVENT]: event<O, I>(map, subscribers),
        [VALUE]: value
    };

    eventOnNext(res[EVENT], (value) => {
        res[VALUE] = value as unknown as O;
    });

    return res as Value<I, O>;
}

export function pull<O, I>(value$: Value<I, O>): O {
    return value$[VALUE];
}

export function next<O, I>(value$: Value<I, O>, value: I) {
    eventNext(value$[EVENT], value);
}

export function error<O, I>(value$: Value<I, O>, message: string) {
    eventError(value$[EVENT], message);
}

export function end<O, I>(value$: Value<I, O>) {
    eventEnd(value$[EVENT]);
}

export function onNext<O, I>(value$: Value<I, O>, callback: TSubscriber<O>) {
    return eventOnNext(value$[EVENT], callback as any);
}

export function onError<O, I>(value$: Value<I, O>, callback: TSubscriber<string>) {
    return eventOnError(value$[EVENT], callback);
}

export function onEnd<O, I>(value$: Value<I, O>, callback: TSubscriber<undefined>) {
    return eventOnEnd(value$[EVENT], callback);
}

export function copy<II, IO, O = IO>(
    value$: Value<IO, II>,
    map: TMap<IO, O>,
    subscribers?: Nullable<TSubscribers<O>>
) {
    return eventCopy(value$[EVENT], map, subscribers);
}

export type Either<L, R> = L | R;

export type TValueArray = Value<any, any>[];

export type TValueObject = Record<string, Value<any, any>>;

export type TValues = Either<TValueArray, TValueObject>;

export type TValueInput = any[] | Record<string, any>;

export type TInferValues<T extends TValueInput> = T extends TValueInput
    ? T extends infer X
        ? { [K in keyof X]: Value<any, X[K]> }
        : never
    : never;

export function merge<
    T extends TValueInput,
    O extends TValues = TInferValues<T>
>(events: O) {
    const _$ = value<T, T>(undefined as any);

    const memo: any = Array.isArray(events) ? []: {};
    const unsubs: Noop[] = [];

    for(const k in events) {
        const event$ = events[k] as unknown as Value<any, any>;

        memo[k] = pull(event$);

        unsubs.push(onNext(event$, (value) => {
            memo[k] = value;
            next(_$, memo);
        }));
    }

    onEnd(_$, () => {
        for(const k in unsubs) {
            unsubs[k]();
        }
    });

    return _$;
}
