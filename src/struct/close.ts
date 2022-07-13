import { streamClose } from "../stream";
import { STREAM } from "../value/_/constants";

export function close($struct: any) {
    streamClose($struct[STREAM]);
}

export const structClose = close;
