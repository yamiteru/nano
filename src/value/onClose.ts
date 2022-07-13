import { streamOnClose } from "../stream";
import { TSubscriber } from "../_/types";
import { STREAM } from "./_/constants";
import { Value } from "./_/types";

export function onClose<O, I>($value: Value<I, O>, subscriber: TSubscriber<undefined>) {
    return streamOnClose($value[STREAM], subscriber);
}

export const valueOnClose = onClose;
