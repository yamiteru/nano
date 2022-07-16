import { once, publish } from ".";
import { Observable } from "./_/types";

export function timeout(ms: number): Observable<undefined> {
    const $observable = once<undefined>();

    setTimeout(() => {
        publish($observable, undefined);
    }, ms);

    return $observable;
}

export const observableTimeout = timeout;
