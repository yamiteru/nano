import { END } from "./_/constants";
import { Event } from "./_/types";

export function end<O, I>(event$: Event<I, O>) {
    event$?.[END]();
}
