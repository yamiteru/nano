import { observable, publish } from ".";
import { Observable } from "./_/types";

export function interval(ms: number): Observable<undefined> {
    const $observable = observable<undefined>();

    setInterval(() => {
        publish($observable, undefined);
    }, ms);

    return $observable;
}

export const observableInterval = interval;
