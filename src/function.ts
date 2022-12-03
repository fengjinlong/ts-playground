export {};
type FlipArguments<Fn> = Fn extends (...args: infer fff) => infer r
  ? (...args: Reversea1<fff>) => r
  : Fn;
type Flipped = FlipArguments<
  (arg0: string, arg1: number, arg2: boolean) => void
>;
// (arg0: boolean, arg1: number, arg2: string) => void

type Reversea1<Arr> = Arr extends [...infer f, infer r]
  ? [r, ...Reversea1<f>]
  : [];
type aar = Reversea1<[1, 2, 3]>;

// 斐波那契
type Fibonacci<
  N,
  Arr extends unknown[] = [1],
  prev extends unknown[] = [1],
  curr extends unknown[] = [1]
> = N extends Arr["length"]
  ? prev["length"]
  : Fibonacci<N, [...Arr, 1], curr, [...prev, ...curr]>;
type Result1 = Fibonacci<3>; // 2
type Result2 = Fibonacci<8>; // 21

// 柯里化
const add = (a: number, b: number) => a + b;
const three = add(1, 2);

const curriedAdd = Currying(add);
const five = curriedAdd(2)(3);
type Currying<Fn> = Fn extends (...args: [infer F, ...infer R]) => infer T
  ? R extends []
    ? Fn
    : (args: F) => Currying<(...args: [...R]) => T>
  : never;

//
type I1 = UnionToIntersection<"foo" | 42 | true>; // expected to be 'foo' & 42 & true
// type I11 = {
//   a: 1;
// } & {
//   b: 2;
// };
type I11 = UnionToIntersection<{ a: 1 } | { b: 2 }>;

type UToFu<U> = U extends unknown ? (arg: U) => unknown : never;
type Union2Intersection<U> = UToFu<U> extends (args: infer A) => unknown
  ? A
  : never;

type UnionToIntersection<U> = (U extends U ? (a: U) => void : never) extends (
  a: infer R
) => void
  ? R
  : never;

// your answers

type StringJoin<D extends string, T extends Array<string>> = T extends [
  `${infer F}`,
  ...infer R extends string[]
]
  ? R extends []
    ? F
    : `${F}${D}${StringJoin<D, R>}`
  : "";

declare function join<D extends string>(
  delimiter: D
): <T extends Array<string>>(...parts: T) => StringJoin<D, T>;

// type aa = join('#')('a', 'b', 'c') // = 'a#b#c'
declare function join11<D extends string>(
  d: D
): <T extends string[]>(...p: T) => Fun<D, T>;

type Fun<D extends string, T extends string[]> = T extends [
  `${infer F}`,
  ...infer R extends string[]
]
  ? R extends []
    ? F
    : `${F}${D}${Fun<D, R>}`
  : "";
