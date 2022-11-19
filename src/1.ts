export {};
// 重新构造

type s<str extends string> = str extends `${infer _s1}${infer s2}${infer _s3}`
  ? s2
  : "";
type a = s<"123">;

// dong_dong_dong 到 dongDongDong 的变换
// 递归
type t1<str extends string> = str extends `${infer s1}_${infer s2}${infer Rest}`
  ? `${s1}${Uppercase<s2>}${t1<Rest>}`
  : str;
type t11 = t1<"dong_dong_dong">;

/**
 * 删除 do~ng~~~~ 的 ~
 * 递归
 */
type t2<
  str extends string,
  str2 extends string
> = str extends `${infer s1}${str2}${infer s2}` ? t2<`${s1}${s2}`, str2> : str;

type t22 = t2<"do~ng~~~~", "~">;

/**
 * 函数添加参数类型
 */
type t3<Func extends Function, arg> = Func extends (
  ...args: infer Args
) => infer ReturnType
  ? (...args: [...Args, arg]) => ReturnType
  : never;

type t33 = t3<(name: string, age: number) => boolean, object>;
let fn: t33 = (a: string, b: number, c: object) => true;

/**
 * 索引类型的重新构造
 */

type o1 = {
  name: string;
  age: number;
};
type Mapping<obj extends object> = {
  [Key in keyof obj]: [obj[Key], obj[Key]];
};
type o11 = Mapping<o1>;
// type o11 = {
//   name: [string, string];
//   age: [number, number];
// }

// key 大写的转换
type UppercaseKey<Obj extends object> = {
  // 索引可能为 string、number、symbol 类型，而这里只能接受 string 类型，所以要 & string
  [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key];
};
type o2 = {
  name: string;
  age: number;
};
type o3 = UppercaseKey<o2>;
// type o3 = {
//   NAME: string;
//   AGE: number;
// }

/**
 * Record
 */
type t = Record<string, number>;
const obj: t = {
  a: 1,
};
type UppercaseKey1<Obj extends Record<string, number>> = {
  [Key in keyof Obj]: Obj[Key];
};
type o = {
  name: number;
  age: number;
};
const obj1: UppercaseKey1<o> = {
  name: 1,
  age: 1,
};
/**
 * readonly
 */
type ToReadonly<T> = {
  readonly [key in keyof T]: T[key];
};
type t4 = ToReadonly<{
  name: string;
  age: number;
}>;
// type t4 = {
//   readonly name: string;
//   readonly age: number;
// }

/**
 * ToPartial
 * 可选属性
 */
type ToPartial<T> = {
  [Key in keyof T]?: T[Key];
};
type t5 = ToPartial<{ name: string }>;

/**
 * ToMutable
 * 去掉 readonly
 */

type ToMutable<T> = {
  -readonly [Key in keyof T]: T[Key];
};
type t6 = ToMutable<{ readonly name: string }>;

/**
 * ToRequired
 * 去掉修饰符
 */
type ToRequired<T> = {
  [Key in keyof T]-?: T[Key];
};
type t7 = ToRequired<{ name?: string }>;

/**
 * 点到数组
 *
 */
type t8 = [1, 2, 3, 4, 5];
type ReverseArr<Arr extends unknown[]> = Arr extends [infer first, ...infer R]
  ? [...ReverseArr<R>, first]
  : Arr;
type t88 = ReverseArr<t8>;
// type t88 = [5, 4, 3, 2, 1]

/**
 * 查找某个元素
 * [1,2,3,4,5] 5 true
 */

type IsEqual<A, B> = (A extends B ? true : false) &
  (B extends A ? true : false);

// type aa = IsEqual<1, 1>; true
type Includes<Arr extends unknown[], FindItem> = Arr extends [
  infer F,
  ...infer Other
]
  ? IsEqual<F, FindItem> extends true
    ? true
    : Includes<Other, FindItem>
  : false;
// type t9 = Includes<[1, 2, 3, 4, 5], 5>; true

/**
 * 构造数组
 */
type BuildArray<
  Length extends number,
  Ele,
  Arr extends unknown[] = []
> = Arr["length"] extends Length ? Arr : BuildArray<Length, Ele, [...Arr, Ele]>;

type t10 = BuildArray<2, number>; // [number, number]
type t12 = BuildArray<2, 1>; // [1, 1];

/**
 * 字符串递归
 */
type ReplaceStr<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer f}${From}${infer t}`
  ? `${f}${To}${ReplaceStr<t, From, To>}`
  : Str;
type ss = "ccvv";
type ss1 = ReplaceStr<ss, "c", "m">; // mmvv

/**
 * 分割字符串
 */
type StringToUnion<str extends string> = str extends `${infer F}${infer L}`
  ? F | StringToUnion<L>
  : never;
type ss11 = StringToUnion<"dong">; // "d" | "o" | "n" | "g"

/**
 * 字符串反转
 */

type ReverseStr<
  str extends string,
  R extends string = ""
> = str extends `${infer F}${infer L}` ? ReverseStr<L, `${F}${R}`> : R;
type rr = ReverseStr<"abcdef">;

/**
 * 递归对象
 */

// 因为 ts 的类型只有被用到的时候才会做计算。
// 所以可以在前面加上一段 Obj extends never ? never 或者 Obj extends any 等，从而触发计算：
type DeepReadonly<Obj extends Record<string, any>> = Obj extends any
  ? {
      readonly [key in keyof Obj]: Obj[key] extends object
        ? DeepReadonly<Obj[key]>
        : Obj[key];
    }
  : never;
type obj = {
  a: 1;
  b: {
    c: 1;
  };
};
type rra = DeepReadonly<obj>;
// type rra = {
//   readonly a: 1;
//   readonly b: {
//       readonly c: 1;
//   };
// }

/**
 * 数组长度实现加减乘除
 */
// add

// 1 构建一个数组
type BuildArray1<
  Length extends number,
  ele = unknown,
  Arr extends unknown[] = []
> = Arr["length"] extends Length
  ? Arr
  : BuildArray1<Length, ele, [...Arr, ele]>;

type arr = BuildArray1<3, 1>; // [1,1,1]
// 2 计算加法
type Add<num1 extends number, num2 extends number> = [
  ...BuildArray1<num1>,
  ...BuildArray1<num2>
]["length"];
type AddResult = Add<2, 3>; // 5

// 减法
type Subtract1<
  num1 extends number,
  num2 extends number
> = BuildArray1<num1> extends [...BuildArray1<num2>, ...infer L]
  ? L["length"]
  : any;

type sub = Subtract1<5, 3>; // 2

type Divide<
  num1 extends number,
  num2 extends number,
  Arr extends unknown[] = []
> = num1 extends 0
  ? Arr["length"]
  : Divide<Subtract1<num1, num2>, num2, [unknown, ...Arr]>;

type tt = Divide<10, 2>; // 5

type StrLen<
  Str extends string,
  Arr extends unknown[] = []
> = Str extends `${infer f}${infer L}`
  ? StrLen<L, [...Arr, unknown]>
  : Arr["length"];

type sl = StrLen<"aaaaa">; // 5

/**
 * 比大小
 */
type GreaterThan<
  num1 extends number,
  num2 extends number,
  Arr extends unknown[] = []
> = num1 extends num2
  ? false
  : Arr["length"] extends num2
  ? true
  : Arr["length"] extends num1
  ? false
  : GreaterThan<num1, num2, [...Arr, unknown]>;

type gthan = GreaterThan<3, 11>; // false

type Bem<
  A extends string,
  B extends string[],
  C extends string[]
> = `${A}__${B[number]}--${C[number]}}`;

// type Br = "a__c--d}" | "a__c--c}" | "a__b--d}" | "a__b--c}"
type Br = Bem<"a", ["b", "c"], ["c", "d"]>;

type ad = Exclude<"ab", "">;

type Combination<A extends string, B extends string> =
  | A
  | B
  | `${A}${B}`
  | `${B}${A}`;

// type ab = "a" | "b" | "ba" | "ab"
type ab = Combination<"a", "b">;
type AllCombinations<A extends string, B extends string = A> = A extends A
  ? Combination<A, AllCombinations<Exclude<B, A>>>
  : never;
// type ar = "a" | "c" | "b" | "ba" | "cba" | "ab" | "cb" | "bc" | "ac" | "acb" | "abc" | "ca" | "bca" | "cab" | "bac"
type ar = AllCombinations<"a" | "b" | "c">;

type isAny1<T> = "a" extends "b" & T ? true : false;
type isAny11 = isAny1<any>;

type IsEqual1<A, B> = (A extends B ? true : false) &
  (B extends A ? true : false);
type IsEqual11 = IsEqual1<"a", any>;

type IsEqual2<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T
>() => T extends B ? 1 : 2
  ? true
  : false;
type IsEqual21 = IsEqual2<any, any>;

type IsUnion<A, B> = A extends A ? ([B] extends [A] ? false : true) : never;
type IsUnion1 = IsUnion<1, 1>;

type IsNever<T> = T extends never ? true : false;
type IsNever1 = IsNever<never>; // never

type IsNever2<T> = [T] extends [never] ? true : false;
type IsNever21 = IsNever2<never>; // true
type y1 = [1]["length"]; // 1
type y2 = number[]["length"]; // number

type NotEqual<A, B> = (<T>() => T extends A ? true : false) extends <
  T
>() => T extends B ? true : false
  ? false
  : true;
type aq1 = NotEqual<1, 2>;

type IsTuple<T> = T extends [...pa: infer arr]
  ? NotEqual<arr["length"], number>
  : false;
type IsTuple1 = IsTuple<number[]>;

type GetOptional<Obj extends Record<string, any>> = {
  [Key in keyof Obj as {} extends Pick<Obj, Key> ? Key : never]: Obj[Key];
};

type GetOptional1 = GetOptional<{ a: string; b?: string }>;

type isRequired<Key extends keyof Obj, Obj> = {} extends Pick<Obj, Key>
  ? never
  : Key;

type GetRequired3<Obj extends Record<string, any>> = {
  [Key in keyof Obj as isRequired<Key, Obj>]: Obj[Key];
};
type GetRequiredResult = GetRequired3<{
  name: string;
  age?: number;
}>;
