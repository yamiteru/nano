import { TSubscriber } from "../_/types";
import { SET } from "./_/constants";
import { Emitter, EmitterSet } from "./_/types";

export function unsubscribe<T>($emitter: Emitter<T>, subscriber: TSubscriber<T>) {
    if($emitter[SET]) {
        ($emitter[SET] as EmitterSet<T>).delete(subscriber);
    }
}

export const emitterUnsubscribe = unsubscribe;
