// // export * from "./_/types";

// import { emitter } from "./emitter";
// import { stream } from "./stream";
// import { struct } from "./struct";
// import { merge, value } from "./value";
// import { Value } from "./value/_/types";

// type UserStruct = {
//   first_name: string;
//   second_name: string;
//   age: number;
//   full_name: Value<string>;
//   full_name_with_age: Value<string>
// };

// const test = struct<UserStruct>({
//   first_name: "Petr",
//   second_name: "Novak",
//   age: 25,
//   full_name: ({ $first_name, $second_name }) => merge(
//     [$first_name(), $second_name()],
//     ([first, second]) => `${first} ${second}`
//   ),
//   full_name_with_age: ({ $full_name, $age }) => merge(
//     [$full_name(), $age()],
//     ([full, age]) => `${full}: ${age}`
//   )
// });

// console.log(test.full_name_with_age());


// // Emitter tools
// const $emitter = emitter();

// emitterToStream($emitter);
// emitterToValue($emitter, 0);


// // Stream tools
// const $stream = stream();

// streamToEmitter($stream);
// streamToValue($stream, 0);


// // Value tools
// const $value = value(0);

// valueToEmitter($value);
// valueToStream($value);


// // Struct tools
// const $struct = struct({});

// structToEmitter($struct);
// structToValue($struct);


// // Batch
// // Temporarily stops event propagation
// // QUESTION: but what if I need it to propagate ie. in merge?
// batch([
//   [$count, 1],
//   [$price, 100]
// ]);


// // Pipe
// // Could be used for mapping
// // value("0 USD", pipe(...))
// pipe(
//   round,
//   double,
//   toUSD,
//   duplicate
// );


// // Effect
// // Subscribe to multiple onNext
// effect(([count, price]) => {
//   // ...
// }, [$count, $price]);
