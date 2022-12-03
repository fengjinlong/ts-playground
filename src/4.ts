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

type Foo = {
  [key: string]: any;
  foo(): void;
};
type RemoveIndexSignature<T> = {
  [Key in keyof T as string extends Key
    ? never
    : number extends Key
    ? never
    : symbol extends Key
    ? never
    : Key]: T[Key];
};
type RemoveIndexSignature1<T> = {
  [Key in keyof T as keyof any extends T[Key] ? never : Key]: T[Key];
};
type A1 = RemoveIndexSignature1<Foo>; // expected { foo(): void }

type PString1 = "";
type PString2 = "+85%";
type PString3 = "-85%";
type PString4 = "85%";
type PString5 = "85";
type PercentageParser<S> = [
  S extends `${infer f}${infer r}` ? (f extends "+" | "-" | S ? S : "") : "",
  S extends `${"+" | "-"}${infer r}%`
    ? r
    : S extends `${"+" | "-"}${infer r}`
    ? r
    : S extends `${infer r}`
    ? r
    : S,
  S extends `${infer r}%` ? "%" : ""
];
type R1 = PercentageParser<PString1>; // expected ['', '', '']
type R2 = PercentageParser<PString2>; // expected ["+", "85", "%"]
type R3 = PercentageParser<PString3>; // expected ["-", "85", "%"]
type R4 = PercentageParser<PString4>; // expected ["", "85", "%"]
type R5 = PercentageParser<PString5>; // expected ["", "85", ""]

type DropChar<T, b> = T extends `${infer f}${infer r}`
  ? f extends b
    ? DropChar<r, b>
    : `${f}${DropChar<r, b>}`
  : T;
type Butterfly = DropChar<" b u t t e r f l y ! ", " ">; // 'butterfly!'

type b = "adca";
type aaa<t> = t extends `${infer r}${infer rr}` ? `${r}` | `${aaa<rr>}` : never;
type as = aaa<b>;
type am = Omit<1 | 2 | 3, 2>;

type MinusOne<
  N,
  A extends unknown[] = [1],
  B extends unknown[] = []
> = A["length"] extends N ? B["length"] : MinusOne<N, [...A, 1], [...B, 1]>;

type B2<N, arr extends unknown[] = []> = arr["length"] extends N
  ? arr
  : B2<N, [...arr, 1]>;

type MinusOne2<N> = B2<N> extends [...infer r, infer b] ? r["length"] : -1;
type Zero = MinusOne2<1>; // 0
type FiftyFour = MinusOne2<55>; // 54

type Flip<T extends Record<PropertyKey, any>> = {
  [Key in keyof T as T[Key] extends PropertyKey ? T[Key] : `${T[Key]}`]: Key;
};
type a = Flip<{ a: "x"; b: "y"; c: "z" }>; // {x: 'a', y: 'b', z: 'c'}
type a1a = Flip<{ a: 1; b: 2; c: 3 }>; // {1: 'a', 2: 'b', 3: 'c'}
type ooa = Flip<{ a: false; b: true }>; // {false: 'a', true: 'b'}

type IsAny<T> = "any" extends 1 & T ? true : false;
type IsAny2<T> = (<A>() => A extends T ? 1 : 0) extends <A>() => A extends any
  ? 1
  : 0
  ? true
  : false;
type ee22 = IsAny2<number>; //
type ee2 = IsAny2<any>;
