import { on } from "./help";
import { Falsable, TSubscriber } from "../_/types";
import { Stream } from "./_/types";
import { CLOSE_EMITTER } from "./_/constants";

export function onClose<O, I>($stream: Falsable<Stream<I, O>>, subscriber: TSubscriber<undefined>) {
    return on(CLOSE_EMITTER, $stream, subscriber);
}
