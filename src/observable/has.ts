import { _false } from "../_/constants";
import { Observable, Subscriber } from "./_/types";

export function has<T>(
    $observable: Observable<T>,
    subscriber: Subscriber<T>
): boolean {
    return $observable[0]
        ? $observable[0].has(subscriber)
        : _false;
}

export const observableHas = has;
