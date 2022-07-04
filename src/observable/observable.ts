import { TSubscriber } from "../_/types";
import { OBSERVABLE, SET } from "./_/constants";
import { Observable } from "./_/types";

export function observable<T>(): Observable<T> {
    return Object.create(OBSERVABLE);
}

export function observableWithCallbacks<T>(
    callbacks: TSubscriber<T>[]
): Observable<T> {
    return {
        [SET]: new Set<TSubscriber<T>>(callbacks)
    };
}
