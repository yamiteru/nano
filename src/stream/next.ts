import { _undefined } from "../_/constants";
import { Falsable } from "../_/types";
import { nextWithPreviosuValue } from "./help";
import { Stream } from "./_/types";

export function next<O, I>($stream: Falsable<Stream<I, O>>, value: I) {
    nextWithPreviosuValue($stream, value, _undefined);
}

export const streamNext = next;
