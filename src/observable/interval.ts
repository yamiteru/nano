import { observable, publish } from ".";
import { _false, _null } from "../_/constants";
import { Observable } from "./_/types";

export function interval(ms: number): Observable<null> {
    const $observable = observable<null>();

    const interval = setInterval(() => {
        if($observable[0] === _false) {
            clearInterval(interval);
        } else {
            publish($observable, _null);
        }
    }, ms);

    return $observable;
}

export const observableInterval = interval;
