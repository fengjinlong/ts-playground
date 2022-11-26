export {};
let obj = {
  a: 1,
  b: "",
};
type objt = typeof obj;
// type objt = {
//   a: number;
//   b: string;
// }
type objt1 = objt[keyof objt];
// type objt1 = string | number

type obj2 = {
  a?: string;
  b: number;
};

type obj22 = obj2[keyof obj2];
// type obj22 = string | number | undefined

type ot<T> = {
  [Key in keyof T]: {} extends Pick<T, Key> ? never : Key;
}[keyof T];
type ot1 = ot<obj2>;
// type ot1 = "a" | undefined

// 数组转联合
type arr = [1, 2, 3, 4];
type arr1 = arr[number];
// type arr1 = 1 | 4 | 2 | 3

type q = Pick<obj2, "a" | "b">;

/**
 * @example
 *  type Eg = {
 *    key1: number;
 *    key3: number;
 *  }
 */
type PickByValue<T extends object, V> = Pick<
  T,
  { [K in keyof T]: T[K] extends V ? K : never }[keyof T]
>;
type Eg = PickByValue<{ key1: number; key2: string; key3: number }, string>;

type Intersection<T extends object, U extends object> = Pick<
  T,
  Extract<keyof T, keyof U> & Extract<keyof U, keyof T>
>;

type Eg1 = Intersection<{ key1: number }, { key1: string; key2: number }>;

/**
 * @example
 * type Eg = {
 *   name: string;
 *   age: string;
 *   other: string;
 * }
 */
type Eg3 = Assign<
  { name: string; age: number },
  { age: string; other: string }
>;
type Assign<T1, T2, T3 = Exclude<T1, T2> & T2> = Pick<T3, keyof T3>;
type MyReadonly<T> = {
  readonly [key in keyof T]: T[key];
};
type a = MyReadonly<{ a: string }>;

type TupleToObject<T extends readonly (string | number)[]> = {
  [key in T[number]]: key;
};
const tuple = ["tesla", "model 3", "model X", "model Y", 1] as const;
type tuple1 = ["tesla", "model 3", "model X", "model Y"];
type dds = typeof tuple;
type result = TupleToObject<typeof tuple>;

type TupleToObject1<T extends string[]> = {
  [key in T[number]]: key;
};
type dada = TupleToObject1<tuple1>;

type arr11 = ["a", "b", "c"];
type arr2 = [3, 2, 1];
type First<T extends any[]> = T extends [infer f, ...infer r] ? f : never;
type head1 = First<arr11>; // expected to be 'a'
type head2 = First<arr2>;

type tesla = ["tesla", "model 3", "model X", "model Y"];
type spaceX = [
  "FALCON 9",
  "FALCON HEAVY",
  "DRAGON",
  "STARSHIP",
  "HUMAN SPACEFLIGHT"
];
type Length<T> = T extends any[] ? T["length"] : "";
type teslaLength = Length<tesla>; // expected 4
type spaceXLength = Length<spaceX>; // expected 5

type MyExclude<k extends keyof T, a> = k extends a ? never : k;
type MyExclude1<T, a> = T extends a ? never : T;
type Result = MyExclude1<"a" | "b" | "c", "a">; // 'b' | 'c'

type ExampleType = Promise<string>;
type MyAwaited<T> = T extends Promise<infer f> ? f : never;
type Result1 = MyAwaited<ExampleType>; // string

type If<boo, a, b> = boo extends true ? a : b;
type A = If<true, "a", "b">; // expected to be 'a'
type B = If<false, "a", "b">; // expected to be 'b'

type Concat<A extends any[], B extends any[]> = [...A, ...B];
type Result4 = Concat<[1], [2]>; // expected to be [1, 2]
type arra = k extends keyof [1][number] | [2, 3][number] ? k : "";

type Includes<Arr extends unknown[], B> = Arr[number] extends B ? true : false;
type isPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">; // expected to be `false`

type Push<Arr extends unknown[], e> = [...Arr, e];
type Result12 = Push<[1, 2], "3">; // [1, 2, '3']

type Unshift<Arr extends unknown[], e> = [e, ...Arr];
type Resul1t = Unshift<[1, 2], 0>; // [0, 1, 2,]

const foo = (arg1: string, arg2: number): void => {};
type MyParameters<T extends Function> = T extends (...args: infer aa) => any
  ? [...aa]
  : "";
type FunctionParamsType = MyParameters<typeof foo>; // [arg1: string, arg2: number]


function add(x: number): number
function add(x: string): string
function add(x: any): any {
  return x + ''
}
let aaa = add(1)