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
