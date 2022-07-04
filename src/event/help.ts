import { observableWithCallbacks, off, on as onObservable } from "../observable";
import { Observable } from "../observable/_/types";
import { Noop, Nullable, TSubscriber, TSubscribers } from "../_/types";
import { Event } from "./_/types";

export function defaultMap(value: any) {
    return value;
}

export function createOptionalObservable(
    subscribers: Nullable<TSubscribers<any>>,
    action: string,
): Observable<any> | null {
    return (subscribers as any)?.[action]
        ? observableWithCallbacks<any>([(subscribers as any)[action]])
        : null;
}

export function on<O, I>(
    symbol: symbol,
    event$: Event<I, O>,
    callback: TSubscriber<any>
): Noop {
    if((event$ as any)[symbol]) {
        onObservable((event$ as any)[symbol], callback);
    } else {
        (event$ as any)[symbol] = observableWithCallbacks([callback]);
    }

    return () => {
        (event$ as any)[symbol] && off((event$ as any)[symbol], callback);
    };
}
