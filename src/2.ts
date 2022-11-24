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
