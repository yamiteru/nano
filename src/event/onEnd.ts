import { on } from "./help";
import { TSubscriber } from "../_/types";
import { END_OBSERVABLE } from "./_/constants";
import { Event } from "./_/types";

export function onEnd<O, I>(event$: Event<I, O>, callback: TSubscriber<undefined>) {
    return on(END_OBSERVABLE, event$, callback);
}
