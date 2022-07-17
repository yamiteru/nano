import { Thunk } from "../_/types";
import { Observable } from "./_/types";

export function publish<T>(
    $observable: Observable<T, any>,
    value: Thunk<T> | T
): void {
    if($observable[0] && $observable[0].size) {
        const mappedValue = $observable[1](typeof value === "function"
            ? (value as Thunk<T>)()
            : value
        );

        if(mappedValue !== undefined) {
            for(const subscriber of $observable[0].values()) {
                subscriber(mappedValue);
            }
        }
    }
}

export async function publishAsync<T>(
    $observable: Observable<T, any>,
    value: Thunk<T> | T
): Promise<void> {
    publish($observable, value);
}

export const observablePublish = publish;
export const observablePublishAsync = publishAsync;
