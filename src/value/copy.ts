import { Either, Nullable, TMap, TSubscribers } from "../_/types";
import { close, next, onClose, onNext, pull, value } from ".";
import { Value } from "./_/types";
import { _undefined } from "../_/constants";

export function copy<II, IO, O = IO>(
    $value: Value<II, IO>,
    map?: Nullable<TMap<IO, O, Either<undefined, O>>>,
    subscribers?: Nullable<TSubscribers<Either<undefined, O>>>
): Value<IO, Either<undefined, O>> {
    const inputValue = pull($value);
    const _$ = value<O | undefined, IO>(
        map
            ? map(
                inputValue,
                _undefined
            )
            : inputValue as unknown as O,
        map,
        subscribers
    );

    const unsub = onNext($value, (v) => next(_$, v));

    onClose($value, () => close(_$));
    onClose(_$, () => unsub());

    return _$;
}

export const valueCopy = copy;
