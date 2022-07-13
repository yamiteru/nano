import { Emitter, emitterPublish } from "../emitter";
import { _false, _undefined } from "../_/constants";
import { Falsable } from "../_/types";
import { CLOSE_EMITTER, ERROR_EMITTER, MAP, NEXT_EMITTER } from "./_/constants";
import { Stream } from "./_/types";

export function close<O, I>($stream: Falsable<Stream<I, O>>) {
    if($stream) {
        if($stream?.[CLOSE_EMITTER]) {
            emitterPublish($stream[CLOSE_EMITTER] as Emitter<undefined>, _undefined);
        }

        $stream[NEXT_EMITTER] = _false;
        $stream[ERROR_EMITTER] = _false;
        $stream[CLOSE_EMITTER] = _false;
        $stream[MAP] = _false;
    }
}

export const streamClose = close;
