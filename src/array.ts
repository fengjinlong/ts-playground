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
