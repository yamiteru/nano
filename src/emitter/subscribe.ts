import { _false } from "../_/constants";
import { TSubscriber } from "../_/types";
import { SET } from "./_/constants";
import { Emitter } from "./_/types";

export function subscribe<T>($emitter: Emitter<T>, subscriber: TSubscriber<T>): void {
    if($emitter[SET] !== _false) {
        $emitter[SET] ??= new Set<TSubscriber<T>>();
        ($emitter[SET] as Set<TSubscriber<T>>).add(subscriber);
    }
}
