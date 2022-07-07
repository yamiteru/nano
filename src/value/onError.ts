import { onError as streamOnError } from "../stream";
import { TSubscriber } from "../_/types";
import { STREAM } from "./_/constants";
import { Value } from "./_/types";

export function onError<O, I>($value: Value<I, O>, subscriber: TSubscriber<string>) {
    return streamOnError($value[STREAM], subscriber);
}
