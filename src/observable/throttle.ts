import { observableWithSubscribers } from "./observable";
import { publish } from "./publish";
import { Observable } from "./_/types";

export function throttle<T>($source: Observable<T>, ms: number): Observable<T> {
    return observableWithSubscribers<T>([
        (value) => {
            setTimeout(() => {
                publish($source, value);
            }, ms);
        }
    ]);
}

export const observableThrottle = throttle;
