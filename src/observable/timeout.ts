import { once, publish } from ".";
import { _null } from "../_/constants";
import { Observable } from "./_/types";

export function timeout(ms: number): Observable<null> {
    const $observable = once<null>();

    const timeout = setTimeout(() => {
        clearTimeout(timeout);
        publish($observable, _null);
    }, ms);

    return $observable;
}

export const observableTimeout = timeout;
