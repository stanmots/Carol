/*
 * File: TypeUtils.ts
 *
 * Copyright (c) Stan Mots. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

//### Type Casting

export type AsType<T1, T2> = T1 extends T2 ? T1 : never
export type AsAnyArray<T> = T extends AnyArray ? T : never
export type AsStringArray<T> = T extends string[] ? T : never
export type AsAnyObject<T> = T extends AnyObject ? T : never
export type AsString<T> = T extends string ? T : never

//### Primitive Utils

export type Primitive = string | symbol | number | bigint | boolean
export type IsEqual<T1 extends Primitive, T2 extends Primitive> = T1 extends T2
    ? true
    : false
export type IsString<T> = T extends string ? true : false
export type IsNumber<T> = T extends number ? true : false

//### Recursion Utils

/**
 * Checks whether the `TypeScript` recursion limit
 * has been exceeded.
 *
 * **Note:** For large numbers of elements `TypeScript` triggers
 * recursive heuristics. See [Tail-Recursion Elimination on Conditional Types](https://devblogs.microsoft.com/typescript/announcing-typescript-4-5/#tailrec-conditional)
 *
 * @template A - The accumulator type whose `length` property
 * determines the recursion count.
 * @template N - The recursion depth limit. Default is `10`.
 */
export type IsRecursionLimitExceeded<
    A extends AnyArray,
    N extends number = 10
> = A["length"] extends N ? true : false

//### Array Utils

/**
 * Represents an array type of `unknown` elements.
 */
export type AnyArray = unknown[]

/**
 * Converts the given array type to a union of the array values.
 *
 * @template A - The input array type.
 */
export type ArrayToUnion<A extends AnyArray> = A[number]

//### Tuple Utils

/**
 * Removes the specified number of elements from a tuple
 * starting from the first position (zero-based index).
 *
 * @template T - A tuple to remove elements from.
 * @template N - A number of elements to remove. Defaults to `1`.
 * @template E - A type of the tuple elements. Defaults to `unknown`.
 * @template A - The accumulator parameter. **Must not be overridden.**
 */
export type RemoveLeading<
    T extends E[],
    N extends number = 1,
    E = unknown,
    A extends E[] = []
> = IsEqual<A["length"], N> extends true
    ? T
    : T extends [T[0], ...infer R]
    ? RemoveLeading<AsType<R, E[]>, N, E, [...A, T[0]]>
    : never

/**
 * Constructs a tuple with the specified number of elements
 * of type `T`.
 *
 * @template T - The type of the resulting tuple elements.
 * @template L - The number of the elements in the tuple.
 * The value must be greater than `0`.
 * @template A - The accumulator parameter.
 * **Must not be overridden.**
 */
export type TupleOfLength<T, L extends number, A extends T[] = [T]> = IsEqual<
    A["length"],
    L
> extends true
    ? A
    : TupleOfLength<T, L, [...A, T]>

/**
 * Creates a tuple type with two elements which represent
 * the splitted input tuple at the given position.
 *
 * @example
 * // Resulting type: [["str1", "str2"], ["str3", "str4"]]
 * type Test = SplitTupleAtPosition<["str1", "str2", "str3","str4"], 2>
 *
 * @template T - The input tuple to split.
 * @template P - Zero-based position index to split the tuple at. The element
 * at the index is pushed to the second element of the resulting tuple.
 * @template A - Helper type to store the temp values.
 * **Must not be overridden.**
 */
export type SplitTupleAtPosition<
    T extends AnyArray,
    P extends number,
    A extends AnyArray = []
> = T extends [T[0], ...infer R]
    ? IsEqual<A["length"], P> extends true
        ? [A, T]
        : SplitTupleAtPosition<R, P, [...A, T[0]]>
    : never

/**
 * Creates a tuple type with two elements which represent
 * the splitted input tuple at the given element.
 *
 * @example
 * // Resulting type: [["str1", "str2"], ["str3", "str4"]]
 * type Test = SplitTupleAtElement<["str1", "str2", "str3","str4"], "str3">
 *
 * @template T - The input tuple to split.
 * @template E - An element to split the tuple at. It is pushed
 * to the second element of the resulting tuple.
 * @template A - Helper type to store the temp values.
 * **Must not be overridden.**
 */
export type SplitTupleAtElement<
    T extends AnyArray,
    E,
    A extends AnyArray = []
> = T extends [T[0], ...infer R]
    ? E extends T[0]
        ? [A, [E, ...R]]
        : SplitTupleAtElement<R, E, [...A, T[0]]>
    : never

/**
 * Conditionally calls `SplitTupleAtPosition`, `SplitTupleAtElement`, or
 * `SplitString` depending on the given parameters.
 *
 * @template T - The input type to split. Can be a string or a tuple.
 * @template S - Specifies where to split the input. Can be a string,
 * a number, or any object.
 */
export type Split<T, S> = T extends string
    ? SplitString<T, AsString<S>>
    : T extends AnyArray
    ? S extends number
        ? SplitTupleAtPosition<T, S>
        : SplitTupleAtElement<T, S>
    : never

/**
 * Constructs a type by removing the specified number of elements
 * from the specified position in a tuple.
 *
 * @example
 * // Resulting type: ["str1", "str4"]
 * type Test = Splice<["str1", "str2", "str3", "str4"], 1, 2>
 *
 * @template T - Input tuple.
 * @template P - A zero-based index indicating where `N` number of
 * elements will be removed.
 * @template N - A number of elements to remove.
 * @template A - The helper parameter. **Must not be overridden.**
 */
export type Splice<
    T extends string[],
    P extends number,
    N extends number,
    A extends AnyArray = Split<T, P>
> = [...AsAnyArray<A[0]>, ...AsAnyArray<RemoveLeading<AsAnyArray<A[1]>, N>>]

//### Union Utils

/**
 * Creates a union of the `T` object values.
 */
export type UnionOfValues<T extends object> = T[keyof T]

/**
 * @title
 * Constructs a union of elements shared between all unions
 * of the given tuple.
 *
 * @example
 * // Resulting type: "str3" | "str4"
 * type Test = CommonOfUnions<["str2" | "str3" | "str4", "str3" | "str4" | 23]>
 *
 * @template T - A tuple where each element represents a union.
 * The number of elements must be greater than `0`.
 */
export type CommonOfUnions<T extends AnyArray> = IsEqual<
    T["length"],
    1
> extends true
    ? T[0]
    : Extract<T[0], CommonOfUnions<RemoveLeading<T>>>

//### Object Utils

export type ObjectKey = string | number | symbol
export type AnyObject = { [k: ObjectKey]: unknown }

/**
 * Represents any js object with `string` keys.
 */
export type StringKeyedObject = { [k: string]: unknown }

/**
 * Creates a union of the `T` object values.
 */
export type UnionOfValues<T extends object> = T[keyof T]

/**
 * Constructs an `object` type with keys at the given key path.
 *
 * @example
 * // Resulting type: { key: { sub_key: unknown } }
 * type Test = ObjectWithKeysAtKeyPath<["key", "sub_key"]>
 *
 * @template KP - The key path with keys the resulting object
 * should contain.
 *
 */
export type ObjectWithKeysAtKeyPath<KP extends ObjectKey[]> = IsEqual<
    KP["length"],
    0
> extends false
    ? {
          [k in KP[0]]: ObjectWithKeysAtKeyPath<RemoveLeading<KP, 1, ObjectKey>>
      }
    : unknown

/**
 * @title
 * Returns `true` if the given key path exists in the object; `false` otherwise.
 *
 * @template T - The object to check the key path in.
 * @template KP - The key path.
 */
export type IsKeyPathValid<T extends AnyObject, KP extends string[]> = IsEqual<
    KP["length"],
    1
> extends true
    ? T[KP[0]] extends AnyObject | Primitive
        ? true
        : false
    : T[KP[0]] extends AnyObject
    ? IsKeyPathValid<T[KP[0]], RemoveLeading<KP, 1, string>>
    : false

/**
 * Returns a type of a value at the given key path.
 *
 * @example
 * // Resulting type: "str"
 * type Test = ValueAtKeyPath<{ key1: { key2: {key3: "str" } } }, ["key1", "key2", "key3"]>
 *
 * @template T - An object to search a value in.
 * @template KP - A key path pointing to a value.
 */
export type ValueAtKeyPath<
    T extends AnyObject,
    KP extends ObjectKey[]
> = IsEqual<KP["length"], 1> extends true
    ? T[KP[0]]
    : ValueAtKeyPath<AsAnyObject<T[KP[0]]>, RemoveLeading<KP, 1, ObjectKey>>

/**
 * Returns all key paths to the values of `string` type.
 *
 * @example
 * // Resulting type: ["key2"] | ["key3", "sub_key2"]
 * type Test = KeyPathsOfStringValues<{
 *    key1: 10
 *    key2: "str1"
 *    key3: { sub_key1: 23; sub_key2: "str2" }
 * }>
 *
 * @template T - The object to search key paths in.
 * @template A - The accumulator type. Must not be overridden.
 */
export type KeyPathsOfStringValues<
    T extends AnyObject,
    A extends string[] = []
> = UnionOfValues<{
    [k in keyof T]: T[k] extends string
        ? [...A, AsString<k>]
        : T[k] extends AnyObject
        ? KeyPathsOfStringValues<T[k], [...A, AsString<k>]>
        : never
}>

/**
 * Returns all `string` literal values from the given object.
 *
 * @example
 * // Resulting type: "str1" | "str2"
 * type Test = StringValues<{
 *    key1: 10
 *    key2: "str1"
 *    key3: { sub_key1: 12; sub_key2: "str2" }
 * }>
 *
 * @template T - An `object` type to extract `string` literals from.
 */
export type StringValues<T extends AnyObject> = UnionOfValues<{
    [k in keyof T]: T[k] extends string
        ? T[k]
        : T[k] extends AnyObject
        ? StringValues<T[k]>
        : never
}>

//### String Utils

/**
 * Represents any type that can be converted to a string
 * using `toString` method.
 */
export interface StringConvertible {
    [K: string]: { toString(): string }
}

/**
 * Creates a tuple type with two elements which represent
 * the substrings splitted at the specified delimiter.
 *
 * @example
 * // Resulting type: ["str1", "str2"]
 * type Test = SplitString<"str1/str2", "/">
 *
 * @template S - The input string.
 * @template D - The delimiter to split the string at.
 */
export type SplitString<
    S extends string,
    D extends string
> = S extends `${infer L}${D}${infer R}` ? [L, R] : never

/**
 * Constructs a union of the strings extracted between the specified
 * delimiters from the given string.
 *
 * @example
 * // Resulting type: "str1" | "str2"
 * type Test = SubstringsFromString<"abc{str1}def{str2}", "{", "}">
 *
 * @template S - The input string to extract substrings from.
 * @template SD - The start position delimiter.
 * @template ED - The end position delimiter.
 * @template A - The accumulator type.
 */
export type SubstringsFromString<
    S extends string,
    SD extends string,
    ED extends string,
    A extends string[] = []
> = S extends `${infer L}${SD}${infer I}${ED}${infer R}`
    ? SubstringsFromString<`${L}${R}`, SD, ED, [...A, I]>
    : IsEqual<A["length"], 0> extends true
    ? never
    : ArrayToUnion<A>

/**
 * Constructs a union of the strings extracted between
 * the specified delimiters from the object values defined
 * as string literals.
 *
 * @example
 * // Resulting type: "str1" | "str2"
 * type Test = SubstringsFromObject<{ key: "abc{str1}def{str2}" }, "{", "}">
 *
 * @template T - The object to extract substrings from.
 * @template SD - The start position delimiter.
 * @template ED - The end position delimiter.
 * @template A - The accumulator type used to control recursion depth.
 * **Must not be overridden.**
 */
export type SubstringsFromObject<
    T extends AnyObject,
    SD extends string,
    ED extends string,
    A extends AnyArray = []
> = UnionOfValues<{
    [k in keyof T]: IsRecursionLimitExceeded<A, 5> extends true
        ? never
        : T[k] extends string
        ? SubstringsFromString<T[k], SD, ED>
        : T[k] extends AnyObject
        ? SubstringsFromObject<T[k], SD, ED, [...A, T[k]]>
        : never
}>

/**
 * Conditionally calls either `SubstringsFromString` or
 * `SubstringsFromObject` depending on the `T` parameter.
 */
export type Substrings<
    T extends string | AnyObject,
    SD extends string,
    ED extends string
> = T extends string
    ? SubstringsFromString<T, SD, ED>
    : SubstringsFromObject<AsAnyObject<T>, SD, ED>

/**
 * Constructs a type by creating a union of combinations of the string
 * literals extracted from the given string union.
 *
 * @example
 * // `Test` => "str1" | "str2" | "str1 str2" | "str2 str1"
 * type Test = Permutations<"str1" | "str2">
 *
 * @template SU - A string union.
 * @template A - Helper type used to store the input union.
 * **Must not be overridden.**
 */
export type Permutations<
    SU extends string,
    A extends string = SU
> = SU extends string ? SU | `${SU} ${Permutations<Exclude<A, SU>>}` : never
