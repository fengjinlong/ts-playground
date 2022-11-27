export {};
type A = IsNever<never>; // expected to be true
type B = IsNever<undefined>; // expected to be false
type C = IsNever<null>; // expected to be false
type D = IsNever<[]>; // expected to be false
type E = IsNever<number>; // expected to be false

type IsNever<T> = [T] extends [never] ? true : false;

type case1 = IsUnion<string>; // false
type case2 = IsUnion<string | number>; // true
type case3 = IsUnion<[string | number]>; // false
type IsUnion1<T, B = T> = T extends never
  ? false
  : [T] extends [never]
  ? false
  : [B] extends [T]
  ? true
  : false;
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : false;
