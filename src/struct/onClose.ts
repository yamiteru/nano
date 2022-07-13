import { STREAM } from "../value/_/constants";
import { TSubscriber } from "../_/types";
import { streamOnClose } from "../stream";

export function onClose($struct: any, subsciber: TSubscriber<undefined>) {
    return streamOnClose($struct[STREAM], subsciber);
}

export const structOnClose = onClose;
