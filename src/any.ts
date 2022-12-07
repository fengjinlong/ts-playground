type IsAny2<T> = (<A>() => A extends T ? 1 : 0) extends <A>() => A extends any
  ? 1
  : 0
  ? true
  : false;

type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T1
>() => T1 extends B ? 1 : 2
  ? true
  : false;
export {};
