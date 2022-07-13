import {
    Emitter,
    emitterWithCallbacks,
    emitterPublish,
    emitterSubscribe,
    emitterUnsubscribe
} from "../emitter";
import { _undefined } from "../_/constants";
import {
    Falsable,
    Noop,
    Nullable,
    TMap,
    TSubscriber,
    TSubscribers
} from "../_/types";
import { MAP, NEXT_EMITTER } from "./_/constants";
import { Stream } from "./_/types";

export function defaultMap(value: any) {
    return value;
}

export function createOptionalEmitter(
    subscribers: Nullable<TSubscribers<any>>,
    action: string,
): Emitter<any> | null {
    return typeof subscribers === "function" && action === "next"
        ? emitterWithCallbacks<any>([subscribers])
        : (subscribers as any)?.[action]
            ? emitterWithCallbacks<any>([(subscribers as any)[action]])
            : null;
}

export function nextWithPreviosuValue<O, I>(
    $stream: Falsable<Stream<I, O>>,
    value: I,
    previousValue: any,
    callback?: (value: O) => void
) {
    if($stream) {
        const nextValue = ($stream[MAP] as TMap<I, O>)(value, previousValue);

        if(nextValue !== _undefined) {
            callback?.(nextValue as O);

            if($stream?.[NEXT_EMITTER]) {
                emitterPublish($stream[NEXT_EMITTER] as Emitter<O>, nextValue);
            }
        }
    }
}

export function on<O, I>(
    symbol: symbol,
    $stream: Falsable<Stream<I, O>>,
    callback: TSubscriber<any>
): Noop {
    if($stream) {
        if(($stream as any)[symbol]) {
            emitterSubscribe(($stream as any)[symbol], callback);
        } else {
            ($stream as any)[symbol] = emitterWithCallbacks([callback]);
        }
    }

    return () => {
        if($stream && ($stream as any)?.[symbol]) {
            emitterUnsubscribe(($stream as any)[symbol], callback);
        }
    };
}
