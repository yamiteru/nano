import { push } from "../observable";
import { end } from ".";
import { Observable } from "../observable/_/types";
import { END_OBSERVABLE, ERROR_OBSERVABLE } from "./_/constants";
import { Event } from "./_/types";

export function error<O, I>(event$: Event<I, O>, message: string) {
    if(event$?.[ERROR_OBSERVABLE]) {
        push(event$[ERROR_OBSERVABLE] as Observable<string>, message);
    }

    if(event$?.[END_OBSERVABLE]) {
        push(event$[END_OBSERVABLE] as Observable<undefined>, undefined);
    }

    end(event$);
}
