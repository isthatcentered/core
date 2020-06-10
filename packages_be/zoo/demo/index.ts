import * as Z from "../src"

import * as T from "@matechs/core/Effect"
import { pipe } from "@matechs/core/Function"

// work in progress
/* istanbul ignore file */

const program = T.forever(
  T.delay(
    T.sync(() => {
      console.log("process!!")
    }),
    3000
  )
)

const main = pipe(
  program,
  Z.Election("/election/bbbb").with(
    Z.Client({
      connectionString: "127.0.0.1:2181"
    })
  ).use
)

const can = T.run(main, (ex) => {
  console.log(ex)
})

process.on("SIGTERM", () => {
  can()
})
process.on("SIGINT", () => {
  can()
})
