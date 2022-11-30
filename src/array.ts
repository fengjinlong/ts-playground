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
type Res = Without<[1, 2], 1>; // expected to be [2]
type Res1 = Without<[1, 2, 4, 1, 5], [1, 2]>; // expected to be [4, 5]
type Res2 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>; // expected to be []

// 
type Res = IndexOf<[1, 2, 3], 2>; // expected to be 1
type Res1 = IndexOf<[2,6, 3,8,4,1,7, 3,9], 3>; // expected to be 2
type Res2 = IndexOf<[0, 0, 0], 2>; // expected to be -1
type IndexOf<Arr,n,R extends unknown[]=[]> Arr extends [infer f, ...infer r]? f extends n?R['length']:IndexOf<r,n,[...R,1]>:-1

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
