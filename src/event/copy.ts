import { event, next, onEnd, onNext, end } from ".";
import { Nullable, TMap, TSubscribers } from "../_/types";
import { Event } from "./_/types";

export function copy<II, IO, O = IO>(
    event$: Event<II, IO>,
    map: TMap<IO, O>,
    subscribers?: Nullable<TSubscribers<O>>
): Event<IO, O> {
    const _$ = event(map, subscribers);

    const unsub = onNext(event$, (value) => {
        next(_$, value);
    });

    onEnd(event$, () => {
        end(_$);
    });

    onEnd(_$, () => {
        unsub();
    });

    return _$;
}
