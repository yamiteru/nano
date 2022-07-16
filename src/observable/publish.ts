import { Thunk } from "../_/types";
import { Observable } from "./_/types";

export function publish<T>(
    $observable: Observable<T>,
    value: Thunk<T> | T
): void {
    if($observable[0]) {
        const lazyValue = typeof value === "function"
            ? value as Thunk<T>
            : () => value;

        for(const subscriber of $observable[0].values()) {
            subscriber(lazyValue);
        }
    }
}

export async function publishAsync<T>(
    $observable: Observable<T>,
    value: Thunk<T> | T
): Promise<void> {
    publish($observable, value);
}

export const observablePublish = publish;
export const observablePublishAsync = publishAsync;
