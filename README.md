# ts-playground

# 特殊类型要记牢
### isAny
```ts
type isAny1<T> = "a" extends "b" & T ? true : false;
```
### IsEqual
```ts
// 不能处理 any
type IsEqual1<A, B> = (A extends B ? true : false) &
  (B extends A ? true : false);

// 处理 any
type IsEqual2<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T
>() => T extends B ? 1 : 2
  ? true
  : false;
```

### IsUnion 判断联合类型
```ts
type IsUnion<A, B> = A extends A ? ([B] extends [A] ? false : true) : never;
```
### IsNever 判断是否 never
```ts
type IsNever<T> = T extends never ? true : false;
type IsNever1 = IsNever<never>; // never

type IsNever2<T> = [T] extends [never] ? true : false;
type IsNever21 = IsNever2<never>; // true
```

### NotEqual 判断不想等
```ts
type NotEqual<A, B> = (<T>() => T extends A ? true : false) extends <
  T
>() => T extends B ? true : false
  ? false
  : true;
type aq1 = NotEqual<1, 2>;
```
### IsTuple 判断元组
```ts
// 元组类型的 length 是数字字面量，而数组的 length 是 number。
type y1 = [1]["length"]; // 1
type y2 = number[]["length"]; // number

type IsTuple<T> = T extends [...pa: infer arr]
  ? NotEqual<arr["length"], number>
  : false;
```

### GetOptional 提取索引类型中的可选索引
```ts
// 这里的 Pick 是 ts 提供的内置高级类型，就是取出某个 Key 构造新的索引类型
type GetOptional<Obj extends Record<string, any>> = {
  [Key in keyof Obj as {} extends Pick<Obj, Key> ? Key : never]: Obj[Key];
};

type GetOptional1 = GetOptional<{ a: string; b?: string }>;
// type GetOptional1 = {
//     b?: string | undefined;
// }
```

### 过滤所有非可选的索引构造成新的索引类型
```ts
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
```

### 去除索引签名
```ts
type RemoveIndexSignature<Obj extends Record<string, any>> = {
  [Key in keyof Obj as Key extends `${infer str}` ? str : never]: Obj[Key];
};
type Dong = {
  [key: string]: any;
  sleep(): void;
};
type Dong2 = RemoveIndexSignature<Dong>;
// type Dong2 = {
//   sleep: () => void;
// }
```

### 过滤出 class 的 public 的属性
keyof 只能拿到 class 的 public 索引，private 和 protected 的索引会被忽略。
```ts
type ClassPublicProps<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Obj[Key];
};

class Dong3 {
  public name: string;
  protected age: number;
  private hobbies: string[];

  constructor() {
    this.name = "dong";
    this.age = 20;
    this.hobbies = ["sleep", "eat"];
  }
}
type Dong31 = ClassPublicProps<Dong3>;
// type Dong31 = {
//   name: string;
// }
```

### TypeScript 默认推导出来的类型并不是字面量类型。
```ts
const oa = {
  a: 1,
  b: 2,
};
const oa2 = {
  a: 1,
  b: 2,
} as const;
type oa11 = typeof oa;
// type oa11 = {
//   a: number;
//   b: number;
// }
type oa22 = typeof oa2;
// type oa22 = {
//   readonly a: 1;
//   readonly b: 2;
// };
```
### 总结
1. any 与任何类型交叉都是 any，根据这个特性可以判读 any
2. 联合类型作为类型参数出现在条件左侧时候，分散为单个类型传入，最后合并
3. never做为类型参数出现在条件左侧时，直接返回 never
4. any 作为类型参数出现在条件左侧时，返回 trueType falseType的联合类型
5. 元组也是数组，元组的 length 是字面量，数字的 length 是number,可以用来判断元组类型。
6. 可选索引的索引可能没有,Pick 出来就是 {}，可以用来过滤可选索引，反过来也可以过滤非可选索引。
7. 索引类型的索引为字符串字面量类型，可索引签名不是，可以用这个特性过滤掉可索引签名。
8. keyof 只能拿出 class 的 public
9. 默认推导出来的不是字面量类型，加上 as const 可以推导出字面量类型，但带有 readonly 修饰，这样模式匹配的时候也得加上 readonly 才行


## 类型体操顺口溜

模式匹配做提取，重新构造做变换。

递归复用做循环，数组长度做计数。

联合分散可简化，特殊特性要记清。

基础扎实套路熟，类型体操可通关。
### 模式匹配做提取
```ts
type GetReturnType<F extends Function> = F extends (
  ...args: any
) => infer ReturnType
  ? ReturnType
  : never;
type ft = GetReturnType<()=>number>
// type ft = number
```
### 重新构造做变换
```ts
// 把索引变为大写
type UppercaseKey11<Obj extends Record<string, any>> = {
  [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key];
};
type oob = UppercaseKey11<{a:1}>
// type oob = {
//   A: 1;
// }
```
### 递归复用做循环
```ts
// 长度不确定的字符串转为联合类型
type StringToUnion3<Str extends string> = Str extends `${infer F}${infer L}`
  ? F | StringToUnion3<L>
  : never;

type ssr = StringToUnion3<"aqqw">;
// type ssr = "a" | "q" | "w"

```
### 数组长度做计数
```ts
// 减法
type BuildArray5<
  L extends number,
  Ele = unknown,
  Arr extends unknown[] = []
> = Arr["length"] extends L ? Arr : BuildArray5<L, Ele, [...Arr, Ele]>;
type Subtract5<
  num1 extends number,
  num2 extends number
> = BuildArray5<num1> extends [...BuildArray5<num2>, ...infer Rest]
  ? Rest["length"]
  : never;
// 也可以 BuildArray5<num1> extends [...a: BuildArray5<num2>, ...b: infer Rest]
type amn = Subtract5<20, 12>; // 8
```
### 联合分散可简化
```ts
// 联合类型的判断

type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;
```
### 特殊特性要记清
```ts
type isAny<T> = 1 extends 2 & T ? true : false;
```

### 实战
#### ParseQueryString
```ts

type ParseQueryString<str extends string> = str extends `${infer F}&${infer L}`
  ? merge<ParseParam<F>, ParseQueryString<L>>
  : ParseParam<str>;
type ss123 = "a=1&b=2&c=3";
// type result = {
//   a: 1;
//   b: 2;
//   c: 3;
// };
type result = ParseQueryString<ss123>;

// 处理一个 a=1 -> {a: 1}
type ParseParam<str extends string> = str extends `${infer f}=${infer l}`
  ? Record<f, l>
  : never;
type pr = ParseParam<"a=1">;

// 合并多个 参数 {a: 1} {b: 2} -> {a:1,b:2}
type merge<obj1 extends object, obj2 extends object> = {
  [Key in keyof obj1 | keyof obj2]: Key extends keyof obj1
    ? obj1[Key]
    : Key extends keyof obj2
    ? obj2[Key]
    : never;
};
type m1 = merge<{ a: 1 }, { b: 2 }>;

```