import { observableWithSubscribers, close } from ".";
import { Observable } from "./_/types";

export function once<T>(): Observable<T> {
    const $observable: Observable<T> = observableWithSubscribers<T>([
        () => close($observable)
    ]);

    return $observable;
}

export const observableOnce = once;
