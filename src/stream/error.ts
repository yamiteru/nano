import { Emitter, emitterPublish } from "../emitter";
import { Falsable } from "../_/types";
import { close } from "./close";
import { ERROR_EMITTER } from "./_/constants";
import { Stream } from "./_/types";


export function error<O, I>($stream: Falsable<Stream<I, O>>, message: string) {
    if($stream) {
        if($stream?.[ERROR_EMITTER]) {
            emitterPublish($stream[ERROR_EMITTER] as Emitter<string>, message);
        }

        close($stream);
    }
}

export const streamError = error;
