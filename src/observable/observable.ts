import { OBSERVABLE } from "./_/constants";
import { defaultMap } from "./_/help";
import { Map, Observable, Subscriber } from "./_/types";

export function observable<I, O = I>(): Observable<I, O> {
    return Object.create(OBSERVABLE);
}

export function observableWithMap<I, O = I>(map: Map<I, O>): Observable<I, O> {
    return [null, map];
}

export function observableWithSubscribers<I, O = I>(
    subscribers: Subscriber<O>[]
): Observable<I, O> {
    return [new Set<Subscriber<O>>(subscribers), defaultMap];
}

export function observableWithMapAndSubscribers<I, O = I>(
    map: Map<I, O>,
    subscribers: Subscriber<O>[]
): Observable<I, O> {
    return [new Set<Subscriber<O>>(subscribers), map];
}

export const createObservable = observable;
export const createObservableWithMap = observableWithMap;
export const createObservableWithSubscribers = observableWithSubscribers;
export const createObservableWithMapAndSubscribers = observableWithMapAndSubscribers;
