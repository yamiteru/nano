import { _false } from "../_/constants";
import { Observable, Subscriber } from "./_/types";

export function subscribe<T>(
    $observable: Observable<any, T>,
    subscriber: Subscriber<T>
): void {
    if($observable[0] !== _false) {
        $observable[0] ??= new Set<Subscriber<T>>();
        ($observable[0] as Set<Subscriber<T>>).add(subscriber);
    }
}

export const observableSubscribe = subscribe;
