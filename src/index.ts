// export * from "./_/types";

import { struct } from "./struct";
import { Any } from "./struct/_/types";
import { merge, value } from "./value";

const user = struct({
    first_name: "Petr",
    second_name: "Novák",
    age: 25,
    test: () => value<number>(25),
    // full_name: ({ $first_name, $second_name }) => merge(
    //     [$first_name(), $second_name()],
    //     ([first_name, second_name]) => `${first_name} ${second_name}`
    // )
});
