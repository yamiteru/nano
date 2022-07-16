import { publishAsync } from ".";
import { Thunk } from "../_/types";
import { Observable } from "./_/types";

export async function batch<
    T extends any[],
    O extends [Observable<any>, Thunk<any> | any ][] = {
        [K in keyof T]: [Observable<T[K]>, T[K]];
    }
>(
    observables: O
): Promise<void> {
    const queue: Promise<void>[] = [];

    for(const [$observable, value] of observables) {
        queue.push(publishAsync($observable, value));
    }

    await Promise.all(queue);
}

export const observableBatch = batch;
