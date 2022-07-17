import { _false, _null } from "../_/constants";
import { Nullable, TMap, TSubscribers } from "../_/types";
import { createOptionalEmitter, defaultMap } from "./help";
import { CLOSE_EMITTER, ERROR_EMITTER, MAP, NEXT_EMITTER } from "./_/constants";
import { Stream } from "./_/types";

export function stream<O, I = O>(
    map?: Nullable<TMap<I, O>>,
    subscribers?: Nullable<TSubscribers<O>>
): Stream<I, O> {
    map ??= defaultMap;
    subscribers ??= _null;

    return {
        [NEXT_EMITTER]: createOptionalEmitter(subscribers, "next"),
        [ERROR_EMITTER]: createOptionalEmitter(subscribers, "error"),
        [CLOSE_EMITTER]: createOptionalEmitter(subscribers, "close"),
        [MAP]: map
    };
}

export const createStream = stream;
