import { STREAM } from "../value/_/constants";
import { TSubscriber } from "../_/types";
import { streamOnError } from "../stream";

export function onError($struct: any, subsciber: TSubscriber<string>) {
    return streamOnError($struct[STREAM], subsciber);
}

export const structOnError = onError;
