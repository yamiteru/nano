import { Noop } from "../_/types";
import { subscribe } from "./subscribe";
import { Observable } from "./_/types";

export function effect(callback: Noop, dependencies: Observable<any>[]): void {
    for(const $observable of dependencies) {
        subscribe($observable, callback);
    }
}

export const observableEffect = effect;
