import { Map, Observable, observablePublish, observableSubscribe, observableUnsubscribe, observableWithSubscribers, Subscriber } from "../observable";
import { _undefined } from "../_/constants";
import {
    Falsable,
    Noop,
    Nullable,
    Subscribers
} from "../_/types";
import { MAP, NEXT_EMITTER } from "./_/constants";
import { Stream } from "./_/types";

export function createOptionalEmitter(
    subscribers: Nullable<Subscribers<any>>,
    action: string,
): Observable<any> | null {
    return typeof subscribers === "function" && action === "next"
        ? observableWithSubscribers<any>([subscribers])
        : (subscribers as any)?.[action]
            ? observableWithSubscribers<any>([(subscribers as any)[action]])
            : null;
}

export function nextWithPreviosuValue<O, I>(
    $stream: Falsable<Stream<I, O>>,
    value: I,
    previousValue: any,
    callback?: (value: O) => void
) {
    if($stream) {
        const nextValue = ($stream[MAP] as Map<I, O>)(value, previousValue);

        if(nextValue !== _undefined) {
            callback?.(nextValue as O);

            if($stream?.[NEXT_EMITTER]) {
                observablePublish($stream[NEXT_EMITTER] as Observable<O>, nextValue);
            }
        }
    }
}

export function on<O, I>(
    symbol: symbol,
    $stream: Falsable<Stream<I, O>>,
    callback: Subscriber<any>
): Noop {
    if($stream) {
        if(($stream as any)[symbol]) {
            observableSubscribe(($stream as any)[symbol], callback);
        } else {
            ($stream as any)[symbol] = observableWithSubscribers([callback]);
        }
    }

    return () => {
        if($stream && ($stream as any)?.[symbol]) {
            observableUnsubscribe(($stream as any)[symbol], callback);
        }
    };
}
