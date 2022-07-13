import { streamError } from "../stream";
import { STREAM } from "../value/_/constants";

export function error($struct: any, message: string) {
    streamError($struct[STREAM], message);
}

export const structError = error;
