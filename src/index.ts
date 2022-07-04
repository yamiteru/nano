import { next } from "./event";
import { EVENT, pull, value } from "./value";

const a$ = value<number>(1);

next(a$[EVENT], 2);

console.log(`Current: ${pull(a$)}`);
