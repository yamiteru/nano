import { publish, observableWithSubscribers } from ".";
import { _null } from "../_/constants";
import { Observable } from "./_/types";

export function debounce<T>($source: Observable<T>, ms: number): Observable<T> {
    let timeout: any = _null;

    return observableWithSubscribers<T>([
        (value) => {
            timeout && clearTimeout(timeout);

            timeout = setTimeout(() => {
                clearTimeout(timeout);
                publish($source, value);
            }, ms);
        }
    ]);
}

export const observableDebounce = debounce;
