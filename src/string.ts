export {};
// type AllCombinations_ABC = AllCombinations<"ABC">;
// should be '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'

// 首字母大写
type CapitalizeWords<
  S extends string,
  L extends string = ""
> = S extends `${infer A}${infer B}`
  ? Lowercase<L> extends Uppercase<L>
    ? `${Uppercase<A>}${CapitalizeWords<B, A>}`
    : `${A}${CapitalizeWords<B, A>}`
  : S;
type capitalized = C<"hello world, my friends">; // expected to be 'Hello World, My Friends'

type C<S, L extends string = ""> = S extends `${infer A}${infer B}`
  ? Lowercase<L> extends Uppercase<L>
    ? `${Uppercase<A>}${C<B, A>}`
    : `${A}${C<B, A>}`
  : S;

// '123' -> 123
type TN<
  S extends string,
  arr extends unknown[] = []
> = `${arr["length"]}` extends `${S}` ? arr["length"] : TN<S, [...arr, 1]>;

type aa1 = TN<"139">; // expected to be 123

// enum
type e = Enum<["macOS", "e"]>;
// -> { readonly MacOS: "macOS", readonly Windows: "Windows", readonly Linux: "Linux" }
type ee = Enum<["macOS", "Windows", "Linux"], true>;
// -> { readonly MacOS: 0, readonly Windows: 1, readonly Linux: 2 }

type Enum<
  T extends unknown[],
  B extends boolean = false,
  Arr extends unknown[] = []
> = {
  readonly [k in T[number] & string]: B extends false
    ? k
    : Exclude<T, k>["length"];
};

//
type FormatCase1 = Format<"%sabc">; // FormatCase1 : string => string
type FormatCase2 = Format<"%s%dabc">; // FormatCase2 : string => number => string
type FormatCase3 = Format<"sdabc">; // FormatCase3 :  string
type FormatCase4 = Format<"sd%abc">; // FormatCase4 :  string

type Format11<T extends string> = T extends `${
  | string
  | ""}%${infer Type}${infer Rest}`
  ? Type extends "s"
    ? (s1: string) => Format<Rest>
    : Type extends "d"
    ? (s1: number) => Format<Rest>
    : Format<Rest>
  : string;

type Format<T extends string> = T extends `${string | ""}%${infer A}${infer B}`
  ? A extends "s"
    ? (s1: string) => Format<B>
    : A extends "d"
    ? (s1: number) => Format<B>
    : Format<B>
  : string;

type _CamelizeHelp<P> = P extends `${infer F}_${infer C}${infer Rest}`
  ? `${F}${Uppercase<C>}${_CamelizeHelp<Rest>}`
  : P;

type Camelize<T> = T extends Record<string, unknown>
  ? { [P in keyof T as _CamelizeHelp<P>]: Camelize<T[P]> }
  : T extends [infer F, ...infer Rest]
  ? [Camelize<F>, ...Camelize<Rest>]
  : T;

type aa = Camelize<{
  some_prop: string;
  prop: { another_prop: string };
  array: [{ snake_case: string }];
}>;

// expected to be
// {
//   someProp: string,
//   prop: { anotherProp: string },
//   array: [{ snakeCase: string }]
// }

type Butterfly = DropString<"foobar!", "fb">; // 'ooar!'
type aaa = Exclude<1 | 2 | 3, 3 | 1>; // 1|2
type U<str> = str extends `${infer a}${infer b}` ? a | U<b> : never;
type Ua<U, s extends string = ""> = U extends `${infer a}|${infer b}`
  ? Ua<Exclude<U, a>, `${s}${a}`>
  : `${s}${U}`;
type Uaa1 = Ua<1 | 2 | 3>;
type aaaa = U<"123">; // 1|2|3

type A1<A, B, arr extends unknown[] = []> = A extends [infer F, ...infer R]
  ? F extends B
    ? A1<R, B, arr>
    : A1<R, B, [...arr, F]>
  : arr;

type a222 = A1<[1, 2, 3, 4, 3], 3>;

type Ste<str, s, r extends string = ""> = str extends `${infer a}${infer b}`
  ? a extends s
    ? Ste<b, s, r>
    : Ste<b, s, `${r}${a}`>
  : r;
type DropString<str, s> = s extends `${infer a}${infer b}`
  ? DropString<Ste<str, a>, b>
  : Ste<str, s>;
type aad = Ste<"123", "2">; // 13

// your answers
type Reverse<T extends string> = T extends `${infer First}${infer Rest}`
  ? `${Reverse<Rest>}${First}`
  : T;
type adad = "asd" extends Reverse<"asd"> ? 1 : 2; // 321
type nnn = "123" extends Reverse<"123"> ? 1 : 2;
type IsPalindrome<T extends string | number> = `${T}` extends Reverse<`${T}`>
  ? true
  : false;
type adaaa = IsPalindrome<"abc">; // false
type adad = IsPalindrome<121>; // true
