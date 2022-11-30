export {};
type q = GreaterThan<2, 1>; //should be true
type qq = GreaterThan<1, 1>; //should be false
type q1 = GreaterThan<10, 100>; //should be false
type q2 = GreaterThan<111, 11>; //should be true

type GreaterThan<n1, n2, Arr extends unknown[] = []> = Arr["length"] extends n1
  ? false
  : Arr["length"] extends n2
  ? true
  : GreaterThan<n1, n2, [...Arr, 1]>;

// tuple
type Zip<T, U> = T extends [infer f1, ...infer l1]
  ? U extends [infer f2, ...infer l2]
    ? [[f1, f2], ...Zip<l1, l2>]
    : []
  : [];
type exp = Zip<[1, 2], [true, false]>; // expected to be [[1, true], [2, false]]
// 元祖
/**
 * 排查 分布式
 * 只读
 * length
 */
type case1 = IsTuple<[number]>; // true
type case2 = IsTuple<readonly [number]>; // true
type case3 = IsTuple<number[]>; // false
type IsTuple<T> = [T] extends [never]
  ? false
  : T extends readonly any[]
  ? number extends T["length"]
    ? false
    : true
  : false;

type exp1 = Chunk<[1, 2, 3], 2>; // expected to be [[1, 2], [3]]
type exp2 = Chunk<[1, 2, 3], 4>; // expected to be [[1, 2, 3]]
type exp3 = Chunk<[1, 2, 3], 1>; // expected to be [[1], [2], [3]]
type Chunk<
  Arr extends unknown[],
  n,
  C extends unknown[] = []
> = C["length"] extends n
  ? [C, ...Chunk<Arr, n>]
  : Arr extends [infer f, ...infer r]
  ? r extends []
    ? [[...C, f]]
    : Chunk<r, n, [...C, f]>
  : [];

//
type Without<T, n> = T extends []
  ? T
  : T extends [infer f, ...infer l]
  ? f extends (n extends unknown[] ? n[number] : n)
    ? Without<l, n>
    : [f, ...Without<l, n>]
  : never;
type Res5 = Without<[1, 2], 1>; // expected to be [2]
type Res15 = Without<[1, 2, 4, 1, 5], [1, 2]>; // expected to be [4, 5]
type Res25 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>; // expected to be []

//
// type Res6 = IndexOf<[1, 2, 3], 2>; // expected to be 1
// type Res16 = IndexOf<[2,6, 3,8,4,1,7, 3,9], 3>; // expected to be 2
// type Res26= IndexOf<[0, 0, 0], 2>; // expected to be -1
// type IndexOf<Arr,n,R extends unknown[]=[]> Arr extends [infer f, ...infer r]? f extends n?R['length']:IndexOf<r,n,[...R,1]>:-1

type Res = Join<["a", "p", "p", "l", "e"], "-">; // expected to be 'a-p-p-l-e'
type Res1 = Join<["Hello", "World"], " ">; // expected to be 'Hello World'
type Res2 = Join<["2", "2", "2"], 1>; // expected to be '21212'
type Res3 = Join<["o"], "u">; // expected to be 'o'

type Join<Arr extends unknown[], j extends string | number> = Arr extends [
  infer ff
]
  ? ff
  : Arr extends [infer f extends string | number, ...infer r]
  ? `${f}${j}${Join<r, j>}`
  : "";

type Res11 = LastIndexOf<[1, 2, 3, 2, 1], 2>; // 3
type Res21 = LastIndexOf<[0, 0, 0], 2>; // -1

type B<n, arr extends unknown[] = []> = arr["length"] extends n
  ? arr
  : B<n, [...arr, 1]>;
type LastIndexOf<Arr, n, r extends unknown[] = B<Arr["length"]>> = Arr extends [
  ...infer l,
  infer f
]
  ? f extends n
    ? l["length"]
    : LastIndexOf<l, n, B<l["length"]>>
  : -1;

// 去重复
type Equal<a, b> = [a] extends [b] ? true : false;
type aqaa = Unique<[1, 2, 3, 1, 2, 3]>;
type Includes1<T, U> = U extends [infer F, ...infer Rest]
  ? Equal<F, T> extends true
    ? true
    : Includes1<T, Rest>
  : false;

type Unique<T, U extends any[] = []> = T extends [infer R, ...infer F]
  ? Includes1<R, U> extends true
    ? Unique<F, [...U]>
    : Unique<F, [...U, R]>
  : U;

//
type CombinationForUnion<
  U extends string,
  T extends string = U
> = T extends unknown
  ? T | `${T} ${CombinationForUnion<Exclude<U, T>>}`
  : never;
type arr = ["1", "2", "3"];
type arrr = CombinationForUnion<arr[number]>;
// expected to be `"foo" | "bar" | "baz" | "foo bar" | "foo bar baz" | "foo baz" | "foo baz bar" | "bar foo" | "bar foo baz" | "bar baz" | "bar baz foo" | "baz foo" | "baz foo bar" | "baz bar" | "baz bar foo"`
type Keys = Combination<["foo", "bar", "baz"]>;
type Combination<Arr extends any[]> = CombinationForUnion<Arr[number]>;

// type
type A1 = Subsequence<[1, 2]>; // [] | [1] | [2] | [1, 2]
type Subsequence<Arr> = Arr extends [infer f, ...infer r]
  ? Subsequence<r> | [f, ...Subsequence<r>]
  : [];

// type
type GetMiddleElement<
  Arr,
  T extends unknown[] = [],
  R extends unknown[] = []
> = Arr extends [infer f, ...infer r, infer l]
  ? T["length"] extends Arr["length"]
    ? R
    : GetMiddleElement<r, [...T, f, l], [f, l]>
  : Arr extends [infer f, ...infer r]
  ? GetMiddleElement<r, [...T, f], [f]>
  : R;
type simple1 = GetMiddleElement<[1, 2, 3, 4, 5, 6, 7]>; // expected to be [3]
type simple2 = GetMiddleElement<[1, 2, 3, 4, 5, 6]>; // expected to be [3, 4]

type Integer<T> = T extends number | string
  ? `${T}` extends `${string}.${string}`
    ? never
    : `${T}`
  : never;
type aad = Integer<1.8>;

type Test1 = [1, 1, 1];
type Test2 = [1, 1, 2];

type Todo = All<Test1, 1>; // should be same as true
type Todo2 = All<Test2, 1>; // should be same as false
type All1<T, n, res extends unknown[] = []> = T extends [infer f, ...infer r]
  ? f extends n
    ? All1<r, n, [...res, 1]>
    : All1<r, n, [...res]>
  : res;

type All<T extends unknown[], n> = T["length"] extends All1<T, n>["length"]
  ? true
  : false;

type Filter<T extends unknown[], P> = T extends [infer F, ...infer L]
  ? F extends P
    ? [F, ...Filter<L, P>]
    : Filter<L, P>
  : [];
