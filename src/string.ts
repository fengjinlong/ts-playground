export {};
type AllCombinations_ABC = AllCombinations<"ABC">;
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
