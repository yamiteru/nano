import { _false, _null, _zero } from "../_/constants";
import { TSubscriber } from "../_/types";

export const SET = Symbol();
export const OBSERVABLE = {
    [SET]: _null
};

export type Observable<T> = {
    [SET]: null | false | Set<TSubscriber<T>>;
};

export function observable<T = null>(): Observable<T> {
    return Object.create(OBSERVABLE);
}

export function observableWithCallbacks<T = null>(callbacks: TSubscriber<T>[]): Observable<T> {
    return {
        [SET]: new Set<TSubscriber<T>>(callbacks)
    };
}

export function once<T>(): Observable<T> {
    const _$ = observable<T>();

    on(_$, () => end(_$));

    return _$;
}

export function off<T>(observable$: Observable<T>, callback: TSubscriber<T>) {
    if(observable$[SET]) {
        observable$[SET].delete(callback);
    }
}

export function on<T>(observable$: Observable<T>, callback: TSubscriber<T>): void {
    if(observable$[SET] !== _false) {
        (observable$[SET] || (observable$[SET] = new Set<TSubscriber<T>>())).add(callback);
    }
}

export function push<T>(observable$: Observable<T>, value: T): void {
    if(observable$[SET]) {
        for(const callback of observable$[SET].values()) {
            callback(value);
        }
    }
}

export function size<T>(observable$: Observable<T>): number {
    return observable$[SET] ? observable$[SET].size: _zero;
}

export function has<T>(observable$: Observable<T>, callback: TSubscriber<T>): boolean {
    return observable$[SET] ? observable$[SET].has(callback): _false;
}

export function clear<T>(observable$: Observable<T>): void {
    observable$[SET] = _null;
}

export function end<T>(observable$: Observable<T>): void {
    observable$[SET] = _false;
}
