import {
    event,
    Event,
    onNext as eventOnNext,
    onError as eventOnError,
    onEnd as eventOnEnd,
    next as eventNext,
    error as eventError,
    end as eventEnd
} from "../event";
import { Nullable, TMap, TSubscriber, TSubscribers } from "../_/types";

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

// export function merge(events: Event<any, any>[]) {
//     const _$ = event();
//     const memo: any = Array.isArray(events) ? []: {};
//     const unsubs: any = Array.isArray(events) ? []: {};

//     for(const k in events) {
//         const event$ = events[k];

//         memo[k] = pull(event$);

//         unsubs[k] = onNext(event$, (value) => {
//             memo[k] = value;
//             next(_$, memo);
//         });
//     }

//     onEnd(_$, () => {
//         for(const k in unsubs) {
//             unsubs[k]();
//         }
//     });

//     return _$;
// }
