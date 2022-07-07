import { _false } from "../_/constants";
import { TSubscriber } from "../_/types";
import { SET } from "./_/constants";
import { Emitter, EmitterSet } from "./_/types";

export function has<T>(
    $emitter: Emitter<T>,
    subscriber: TSubscriber<T>
): boolean {
    return $emitter[SET]
        ? ($emitter[SET] as EmitterSet<T>).has(subscriber)
        : _false;
}
