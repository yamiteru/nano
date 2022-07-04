import { on } from "./help";
import { TSubscriber } from "../_/types";
import { NEXT_OBSERVABLE } from "./_/constants";
import { Event } from "./_/types";

export function onNext<O, I>(event$: Event<I, O>, callback: TSubscriber<O>) {
    return on(NEXT_OBSERVABLE, event$, callback);
}
