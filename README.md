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