import { push } from "../observable";
import { Observable } from "../observable/_/types";
import { MAP, NEXT_OBSERVABLE } from "./_/constants";
import { Event } from "./_/types";

export function next<O, I>(event$: Event<I, O>, value: I) {
    if(event$?.[NEXT_OBSERVABLE]) {
        push(event$[NEXT_OBSERVABLE] as Observable<O>, event$[MAP](value));
    }
}
