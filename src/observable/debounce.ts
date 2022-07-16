import { observableWithCallbacks, publish } from ".";
import { _null } from "../_/constants";
import { Observable } from "./_/types";

export function debounce<T>($source: Observable<T>, ms: number): Observable<T> {
    let timeout: any = _null;

    const $observable = observableWithCallbacks<T>([
        (value) => {
            timeout = setTimeout(() => {
                publish($source, value());
                clearTimeout(timeout);
            }, ms);
        }
    ]);

    return $observable;
}

export const observableDebounce = debounce;
