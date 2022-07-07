import { TSubscriber } from "../_/types";
import { EMITTER, SET } from "./_/constants";
import { Emitter } from "./_/types";

export function emitter<T>(): Emitter<T> {
    return Object.create(EMITTER);
}

export function emitterWithCallbacks<T>(
    subscribers: TSubscriber<T>[]
): Emitter<T> {
    return {
        [SET]: new Set<TSubscriber<T>>(subscribers)
    };
}
