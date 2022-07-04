import { on } from "./help";
import { TSubscriber } from "../_/types";
import { ERROR_OBSERVABLE } from "./_/constants";
import { Event } from "./_/types";

export function onError<O, I>(event$: Event<I, O>, callback: TSubscriber<string>) {
    return on(ERROR_OBSERVABLE, event$, callback);
}
