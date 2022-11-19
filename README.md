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