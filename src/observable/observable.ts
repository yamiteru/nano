import { OBSERVABLE } from "./_/constants";
import { Observable, Subsriber } from "./_/types";

export function observable<T>(): Observable<T> {
    return Object.create(OBSERVABLE);
}

export function observableWithCallbacks<T>(
    subscribers: Subsriber<T>[]
): Observable<T> {
    return [new Set<Subsriber<T>>(subscribers)];
}

export const createObservable = observable;
export const createObservableWithCallbacks = observableWithCallbacks;
