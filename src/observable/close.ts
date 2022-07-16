import { Observable } from "./_/types";

export function close<T>($observable: Observable<T>): void {
    $observable[0] = false;
}

export const observableClose = close;
