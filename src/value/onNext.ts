import { onNext as streamOnNext } from "../stream";
import { TSubscriber } from "../_/types";
import { STREAM } from "./_/constants";
import { Value } from "./_/types";

export function onNext<O, I>($value: Value<I, O>, subscriber: TSubscriber<O>) {
    return streamOnNext($value[STREAM], subscriber);
}
