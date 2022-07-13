import { on } from "./help";
import { Falsable, TSubscriber } from "../_/types";
import { Stream } from "./_/types";
import { ERROR_EMITTER } from "./_/constants";

export function onError<O, I>($stream: Falsable<Stream<I, O>>, subscriber: TSubscriber<string>) {
    return on(ERROR_EMITTER, $stream, subscriber);
}

export const streamOnError = onError;
