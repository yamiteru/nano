import { Noop } from "../_/types";
import { subscribe } from "./subscribe";
import { Observable } from "./_/types";

export function effect(callback: Noop, dependencie: Observable<any>[]): void {
    const subscriber = () => callback();

    for(const $observable of dependencie) {
        subscribe($observable, subscriber);
    }
}

export const observableEffect = effect;
