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
type Eg = PickByValue<{ key1: number; key2: string; key3: number }, number>;
