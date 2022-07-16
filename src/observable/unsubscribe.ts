import { Observable, Subsriber } from "./_/types";

export function unsubscribe<T>(
    $observable: Observable<T>,
    subscriber: Subsriber<T>
): void {
    if($observable[0]) {
        $observable[0].delete(subscriber);
    }
}

export const observableUnsubscribe = unsubscribe;
