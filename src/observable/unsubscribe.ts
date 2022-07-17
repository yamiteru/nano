import { Observable, Subscriber } from "./_/types";

export function unsubscribe<T>(
    $observable: Observable<any, T>,
    subscriber: Subscriber<T>
): void {
    if($observable[0]) {
        $observable[0].delete(subscriber);
    }
}

export const observableUnsubscribe = unsubscribe;
