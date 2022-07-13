import { STREAM } from "../value/_/constants";
import { TSubscriber } from "../_/types";
import { streamOnNext } from "../stream";

export function onNext($struct: any, subsciber: TSubscriber<any>) {
    return streamOnNext($struct[STREAM], subsciber);
}

export const structOnNext = onNext;
