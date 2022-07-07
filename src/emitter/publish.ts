import { SET } from "./_/constants";
import { Emitter, EmitterSet } from "./_/types";

export function publish<T>($emitter: Emitter<T>, value: T): void {
    if($emitter[SET]) {
        for(const subscriber of ($emitter[SET] as EmitterSet<T>).values()) {
            subscriber(value);
        }
    }
}
