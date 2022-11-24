
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


# 类型体操顺口溜

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

# TypeScript 内置了哪些高级类型
### Parameters
```ts
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
// Parameters 用于提取函数类型的参数类型
type pas = Parameters<(a: string, b: number) => void>;
// type pas = [a: string, b: number]
```

### ReturnType
```ts
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;
```
### ThisParameterType
```ts
type Person = {
    name: string
};

function hello(this: Person) {
    console.log(this.name);
}

hello.call({name:''});

type ThisParameterTypeRes = ThisParameterType<typeof hello>;

// type ThisParameterTypeRes = {
//     name: 'guang';
// }

// 原理
type ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any
  ? U
  : unknown;
```

### 删除 this 的类型可以用 OmitThisParameter。
```ts
// 原理
type OmitThisParameter<T> = unknown extends ThisParameterType<T>
  ? T
  : T extends (...a: infer P) => infer R
  ? (...a: P) => R
  : T;

type Oo = {
  name: string;
};
function Fun(this: Oo, age: number) {}
type delthis = OmitThisParameter<typeof Fun>;
// type delthis = (age: number) => void
```

### Partial 把索引变为可选
```ts
// 实现原理
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

### Required 去掉可选，也就是 Required 类型
```ts
// 实现原理

type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

### Readonly
### Pick
```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

### Exclude
当想从一个联合类型中去掉一部分类型时，可以用 Exclude 类型
```ts
type Exclude<T, U> = T extends U ? never : T;
```

### Extract
Exclude 反过来就是 Extract，也就是取交集
```ts
type Extract<T, U> = T extends U ? T : never;
```

### Omit delete some property
Pick 可以取出索引类型的一部分索引构造成新的索引类型，那反过来就是去掉这部分索引构造成新的索引类型
```ts
type del<T, D extends keyof any> = Pick<T, Exclude<keyof T, D>>;
type ddd = del<{ a: string; b: number }, "a">;

```

### NonNullable 就是用于判断是否为非空类型，也就是不是 null 或者 undefined 的类型的
```ts
type NonNullable<T> = T extends null | undefined ? never : T;
```

### Uppercase、Lowercase、Capitalize、Uncapitalize
四个类型是分别实现大写、小写、首字母大写、去掉首字母大写的

### 总结

1. 比如用模式匹配可以实现：Parameters、ReturnType、ConstructorParameters、InstanceType、ThisParameterType。

2. 用模式匹配 + 重新构造可以实现：OmitThisParameter

3. 用重新构造可以实现：Partial、Required、Readonly、Pick、Record

4. 用模式匹配 + 递归可以实现： Awaited

5. 用联合类型在分布式条件类型的特性可以实现： Exclude

6. 此外还有 NonNullable 和四个编译器内部实现的类型：Uppercase、Lowercase、Capitalize、Uncapitalize。

# 实战
### [1,2,3] - [[1,2], [3]]
```ts
type Chunk<
  Arr extends unknown[],
  ItemLength,
  CurArr extends unknown[] = [],
  Res extends unknown[] = []
> = Arr extends [infer F, ...infer R]
  ? CurArr["length"] extends ItemLength
    ? Chunk<R, ItemLength, [F], [...Res, CurArr]>
    : Chunk<R, ItemLength, [F, ...CurArr], Res>
  : [...Res, CurArr];
type aads = Chunk<[1, 2, 3, 4, 5], 2>;
// type aads = [[2, 1], [4, 3], [5]]
```

### [] - {}
```ts
type TupleToNestedObject<Arr extends unknown[], value> = Arr extends [
  infer F,
  ...infer R
]
  ? {
      [Key in F as Key extends keyof any ? Key : never]: R extends unknown[]
        ? TupleToNestedObject<R, value>
        : value;
    }
  : value;
type ddda = TupleToNestedObject<["a", "b", "c"], 666>;
// type ddda = {
//   a: {
//       b: {
//           c: 666;
//       };
//   };
// }
```

### 特殊
```ts
// 联合类型有分布式条件类型的特性，会分发传入
type Test<T> = T extends number ? 1 : 2;
type res = Test<1 | "a">; // 2|1

// boolean 也是联合类型
type Test1<T> = T extends true ? 1 : 2;
type res1 = Test1<boolean>; // 2 | 1

// any 会直接返回 trueType 和 falseType 的联合类型
type Test2<T> = T extends true ? 1 : 2;
type res2 = Test2<any>; // 1 | 2

// never 会直接返回 never，严格来说这个也是分布式条件类型的一种情况
type Test3<T> = T extends true ? 1 : 2;
type res3 = Test3<never>; // never
### infer extends
4.7 实现了 infer extends 的语法，可以指定推导出的类型，这样简化了类型编程。
而且，infer extends 还可以用来做类型转换，比如 string 转 number、转 boolean 等。
要注意的是，4.7 的时候，推导出的只是 extends 约束的类型，比如 number、boolean，但是 4.8 就能推导出字面量类型了，比如 1、2、true、false 这种。
```ts
type numi<str> = str extends `${infer m extends number}`?m:str
type nmuii = numi<'123a'>

enum Code {
  a = 111,
  b = 222,
  c = "abc"
}
type aade = `${Code}`
// 类型变了 type aade = "abc" | "111" | "222"
type aade1 = numi<`${Code}`>
// type aade1 = "abc" | 111 | 222
```

### 函数参数
```ts
type fp = Parameters<(a: string, b: number) => void>;
// type fp = [a: string, b: number]
type Parameters2<T extends (...args: any) => any> = T extends (
  ...args: infer p
) => any
  ? p
  : never;
```

### 获取数组内类型
```ts
type FalttenArray<T extends Array<any>> = T extends Array<infer p> ? p : never;
type tad = FalttenArray<[number, string]>;
// type tad = string | number
```
### 返回值类型
```ts
type ReturnType1<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer p
  ? p
  : never;

  type ReturnType111 = ReturnType1<(a: string)=>number> // number
```

### 数组转联合   对象转联合
```ts
// 数组转联合
type arr = [1, 2, 3, 4];
type arr1 = arr[number];
// type arr1 = 1 | 4 | 2 | 3


// 对象
let obj = {
  a: 1,
  b: "",
};
type objt = typeof obj;
// type objt = {
//   a: number;
//   b: string;
// }
type objt1 = objt[keyof objt];
// type objt1 = string | number

// 对象只转可选类型为联合
type obj2 = {
  a?: string;
  b: number;
};

type ot<T> = {
  [Key in keyof T]: 'a';
}[keyof T];
type ot1 = ot<obj2>;
// type ot1 = "a" | undefined
// 即下
type ot<T> = {
  [Key in keyof T]: {} extends Pick<T, Key> ? Key : never;
}[keyof T];
```

### PickByValue提取指定值的类型
```ts
/**
 * @example
 *  type Eg = {
 *    key1: number;
 *    key3: number;
 *  }
 */
type PickByValue<T extends object, V> = Pick<
  T,
  { [K in keyof T]: T[K] extends V ? K : never }[keyof T]
>;
type Eg = PickByValue<{ key1: number; key2: string; key3: number }, number>;
```

### Intersection<T, U>从T中提取存在于U中的key和对应的类型。（注意，最终是从T中提取key和类型）
```ts
type Intersection<T extends object, U extends object> = Pick<T,
  Extract<keyof T, keyof U> & Extract<keyof U, keyof T>
>

type Eg = Intersection<{key1: string}, {key1:number, key2: number}>
// {key1, string}  以前面的为主

```

### Overwrite<T, U>从U中的同名属性的类型覆盖T中的同名属性类型。(后者中的同名属性覆盖前者)
```ts
type Overwrite<
  T extends object,
  U extends object,
  I = Diff<T, U> & Intersection<U, T>
> = Pick<I, keyof I>;

/**
 * @example
 * type Eg1 = { key1: number; }
 */
type Eg1 = Overwrite<{key1: string}, {key1: number, other: boolean}>

```
### 如何实现一个Assign<T, U>（类似于Object.assign()）用于合并
```ts
/**
 * @example
 * type Eg = {
 *   name: string;
 *   age: string;
 *   other: string;
 * }
 */
type Eg3 = Assign<
  { name: string; age: number },
  { age: string; other: string }
>;
type Assign<T1, T2, T3 = Exclude<T1, T2> & T2> = Pick<T3, keyof T3>;
```