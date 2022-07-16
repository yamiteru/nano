import { _false } from "../_/constants";
import { Observable, Subsriber } from "./_/types";

export function subscribe<T>(
    $observable: Observable<T>,
    subscriber: Subsriber<T>
): void {
    if($observable[0] !== _false) {
        $observable[0] ??= new Set<Subsriber<T>>();
        ($observable[0] as Set<Subsriber<T>>).add(subscriber);
    }
}

export const observableSubscribe = subscribe;
