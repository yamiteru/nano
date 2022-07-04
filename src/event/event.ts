import { Nullable, TMap, TSubscribers } from "../_/types";
import { createOptionalObservable, defaultMap } from "./help";
import { END, END_OBSERVABLE, ERROR_OBSERVABLE, MAP, NEXT_OBSERVABLE } from "./_/constants";
import { Event } from "./_/types";

export function event<O, I = O>(
    map?: Nullable<TMap<I, O>>,
    subscribers?: Nullable<TSubscribers<O>>
): Event<I, O> {
    map ??= defaultMap;
    subscribers ??= null;

    let obj = {
        [NEXT_OBSERVABLE]: createOptionalObservable(subscribers, "next"),
        [ERROR_OBSERVABLE]: createOptionalObservable(subscribers, "error"),
        [END_OBSERVABLE]: createOptionalObservable(subscribers, "end"),
        [MAP]: map,
        [END]: () => {
            obj = null
        }
    } as Event<I, O>;

    return obj;
}
