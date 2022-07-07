import { _undefined } from "../_/constants";
import {
    Noop,
    Nullable,
    TInferValues,
    TMap,
    TSubscribers,
    TValueInput
} from "../_/types";
import { next } from "./next";
import { onClose } from "./onClose";
import { onNext } from "./onNext";
import { pull } from "./pull";
import { value } from "./value";
import { Value } from "./_/types";

export function merge<
    E extends TValueInput,
    I extends TInferValues<E>,
    O = I,
>(
    values: E,
    map?: Nullable<TMap<I, O>>,
    subscribers?: Nullable<TSubscribers<O>>
) {
    const $_ = value<O, I>(_undefined as any, map, subscribers);

    const memo: any = Array.isArray(values) ? []: {};
    const unsubs: Noop[] = [];

    for(const k in values) {
        const $value = values[k] as unknown as Value<any, any>;

        memo[k] = pull($value);

        unsubs.push(onNext($value, (v) => {
            memo[k] = v;
            next($_, memo);
        }));
    }

    onClose($_, () => {
        for(const k in unsubs) {
            unsubs[k]();
        }
    });

    next($_, memo);

    return $_;
}
