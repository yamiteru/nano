import { copy, event, next, onNext } from "./event";

const count$ = event<number>();
const double$ = copy(count$, (v) => v * 2);

onNext(double$, console.log);

next(count$, 1);
next(count$, 2);
