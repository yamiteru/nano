import { on } from "./help";
import { Falsable, TSubscriber } from "../_/types";
import { Stream } from "./_/types";
import { NEXT_EMITTER } from "./_/constants";

export function onNext<O, I>($stream: Falsable<Stream<I, O>>, subscriber: TSubscriber<O>) {
    return on(NEXT_EMITTER, $stream, subscriber);
}
