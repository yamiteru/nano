import { Observable } from "./_/types";

export function clear<T>($observable: Observable<T>): void {
    $observable[0] = null;
}

export const observableClear = clear;
