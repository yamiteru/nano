import { close } from "./close";
import { emitter } from "./emitter";
import { subscribe } from "./subscribe";
import { Emitter } from "./_/types";


export function once<T>(): Emitter<T> {
    const $emitter = emitter<T>();

    subscribe($emitter, () => {
        close($emitter);
    });

    return $emitter;
}
