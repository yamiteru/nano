// export * from "./_/types";

import { struct } from "./struct";
import { merge } from "./value";
import { Value } from "./value/_/types";

type UserStruct = {
  first_name: string;
  second_name: string;
  age: number;
  full_name: Value<string>;
  full_name_with_age: Value<string>
};

const test = struct<UserStruct>({
  first_name: "Petr",
  second_name: "Novak",
  age: 25,
  full_name: ({ $first_name, $second_name }) => merge(
    [$first_name(), $second_name()],
    ([first, second]) => `${first} ${second}`
  ),
  full_name_with_age: ({ $full_name, $age }) => merge(
    [$full_name(), $age()],
    ([full, age]) => `${full}: ${age}`
  )
});

console.log(test.full_name_with_age());
