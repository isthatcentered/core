// ets_tracing: off

import "../../Operator"

import type * as Chunk from "../../Collections/Immutable/Chunk"

export abstract class Subscription<A> {
  abstract isEmpty(): boolean
  abstract poll(default_: A): A
  abstract pollUpTo(n: number): Chunk.Chunk<A>
  abstract size(): number
  abstract unsubscribe(): void
}

export abstract class Hub<A> {
  abstract readonly capacity: number
  abstract isEmpty(): boolean
  abstract isFull(): boolean
  abstract publish(a: A): boolean
  abstract publishAll(as: Iterable<A>): Chunk.Chunk<A>
  abstract size(): number
  abstract slide(): void
  abstract subscribe(): Subscription<A>
}
