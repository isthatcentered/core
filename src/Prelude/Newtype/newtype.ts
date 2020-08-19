/**
 * @since 1.0.0
 */
export interface Newtype<URI, A> {
  readonly _URI: URI
  readonly _A: A
}

/**
 * @since 1.0.0
 */
export type AnyNewtype = Newtype<any, any>

/**
 * @since 1.0.0
 */
export interface Constructor<T, URI> {
  URI: URI
  wrap: (_: T) => Newtype<URI, T>
  unwrap: (_: Newtype<URI, T>) => T
}

/**
 * @since 1.0.0
 */
export interface GenericConstructor<URI> {
  URI: URI
  wrap: <T>(_: T) => Newtype<URI, T>
  unwrap: <T>(_: Newtype<URI, T>) => T
  of: <T>() => Constructor<T, URI>
}

/**
 * @since 1.0.0
 */
export interface ConstructorK<T, URI, K extends Newtype<URI, T>> {
  wrap: (_: T) => K
  unwrap: (_: K) => T
}

/**
 * @since 1.0.0
 */
export function typeDef<T>(): <URI extends string>(URI: URI) => Constructor<T, URI> {
  return (URI) => {
    return {
      URI,
      wrap: (_) => _ as any,
      unwrap: (_) => _ as any
    }
  }
}

/**
 * @since 1.0.0
 */
export function genericDef<URI extends string>(URI: URI): GenericConstructor<URI> {
  return {
    URI,
    wrap: (_: any) => _ as any,
    unwrap: (_: any) => _ as any,
    of: () => ({
      URI,
      wrap: (_) => _ as any,
      unwrap: (_) => _ as any
    })
  }
}

/**
 * @since 1.0.0
 */
export const newtype = <K extends Newtype<any, any>>() => (
  _: Constructor<K["_A"], K["_URI"]>
): ConstructorK<K["_A"], K["_URI"], K> => _ as any

/**
 * @since 1.0.0
 */
export type TypeOf<T extends Constructor<any, any>> = [T] extends [
  Constructor<infer K, infer URI>
]
  ? Newtype<URI, K>
  : never

/**
 * @since 1.0.0
 */
export type Generic<T, K extends GenericConstructor<any>> = [K] extends [
  GenericConstructor<infer URI>
]
  ? Newtype<URI, T>
  : never
