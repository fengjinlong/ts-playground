export {};
function add(x: number): number[];
function add(x: string): string;
function add(x: any) {
  return x;
}
let aaa = add(1);

interface im {
  (a: number): number[];
}
let a: im = (x) => {
  return [];
};
let a1 = a(1);

interface obt {
  a: number;
  [b: string]: number;
}
const ob: obt = {
  a: 1,
  b: 2,
  p: 1,
};
ob.a = 2;

ob.p = 2;

interface FunctionWithProps {
  (x: number): number;
  fnname: string;
}
const fnn: FunctionWithProps = (x: number) => x;
fnn.fnname = "";

class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  speak(): void {
    console.log(`${this.name} is speaking`);
  }
}

const p1 = new Person("lin"); // 新建实例

p1.name; // 访问属性和方法
p1.speak();

class Person1 {
  spack(): void {}
}
abstract class P {
  constructor(name: string) {
    this.name = name;
  }
  name: string;
  abstract spack(): void;
  abstract eat(): string;
}
class S extends P {
  constructor(name: string) {
    super(name);
  }
  spack(): void {}
  eat(): string {
    return "";
  }
}
const s = new S("");
let aad = s.eat();

// 类实现接口
interface MusicInterface {
  name: string;
  fun(n: string): string;
}
class M implements MusicInterface {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  fun(n: string): string {
    return "";
  }
}

interface CircleStatic {
  new (radius: number): void;
  pi: number;
}
// static 是静态属性，可以理解为是类上的一些常量，实例不能访问。
const Circle: CircleStatic = class Circle {
  static pi: number;
  public radius: number;
  public constructor(radius: number) {
    this.radius = radius;
  }
};

class Student extends Person {
  study() {
    console.log(`${this.name} needs study`);
  }
}
const s1 = new Student("lin");
s1.study();
abstract class Animal {
  constructor(name: string) {
    this.name = name;
  }
  public name: string;
  public abstract sayHi(): void;
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }
  public sayHi() {
    console.log("wang");
  }
}

abstract class Animal5 {
  constructor(name: string) {
    this.name = name;
  }
  public name: string;
  public abstract sayHi(): void;
}

class Dog5 extends Animal5 {
  constructor(name: string) {
    super(name);
  }
  public sayHi() {
    console.log("wang");
  }
}

class Cat extends Animal5 {
  constructor(name: string) {
    super(name);
  }
  public sayHi() {
    console.log("miao");
  }
}

interface MusicInterface1 {
  playMusic(): void;
}

interface CallInterface {
  makePhoneCall(): void;
}

class Cellphone implements MusicInterface1, CallInterface {
  playMusic() {}
  makePhoneCall() {}
}

interface CircleStatic {
  new (radius: number): void;
  pi: number;
}

const Circle9: CircleStatic = class Circle {
  static pi: 3.14;
  public radius: number;
  public constructor(radius: number) {
    this.radius = radius;
  }
};
interface D {
  d: boolean;
}
interface E {
  e: string;
}
interface F {
  f: number;
}

interface A {
  x: D;
}
interface B {
  x: E;
}
interface C {
  x: F;
}

type ABC = A & B & C;

let abc: ABC = {
  x: {
    d: true,
    e: "semlinker",
    f: 666,
  },
};

console.log("abc:", abc);

class Person2 {
  #name: string;

  constructor(name: string) {
    this.#name = name;
  }

  greet() {
    console.log(`Hello, my name is ${this.#name}!`);
  }
}

let semlinker = new Person2("Semlinker");

semlinker.greet();

//     ~~~~~
// Property '#name' is not accessible outside class 'Person'
// because it has a private identifier.

function Greeter(target: Function): void {
  target.prototype.greet = function (): void {
    console.log("Hello Semlinker!");
  };
}

@Greeter
class Greeting {
  constructor() {
    // 内部实现
  }
}

let myGreeting = new Greeting();
(myGreeting as any).greet(); // console output: 'Hello Semlinker!';

function Greeter1(greeting: string) {
  return function (target: Function) {
    target.prototype.greet = function (): void {
      console.log(greeting);
    };
  };
}

class Greeting1 {
  constructor() {
    // 内部实现
  }
}

let myGreeting2 = new Greeting();
(myGreeting as any).greet(); // console output: 'Hello TS!';
const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};
type MyReturnType<fn> = fn extends (...arg: any) => infer R ? R : never;
type a = MyReturnType<typeof fn>; // should be "1 | 2"

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type MyOmit<ob extends object, U> = {
  [key in keyof ob as key extends U ? never : key]: ob[key];
};
type TodoPreview = MyOmit<Todo, "description" | "title">;

const todo1: TodoPreview = {
  completed: false,
};

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type MyReadonly2<obj extends object, K extends keyof obj> = {
  readonly [p in K]: obj[p];
} & {
  [q in Exclude<keyof obj, K>]: obj[q];
};
const todo: MyReadonly2<Todo, "title" | "description"> = {
  title: "Hey",
  description: "foobar",
  completed: false,
};

// todo.title = "Hello"; // Error: cannot reassign a readonly property
// todo.description = "barFoo"; // Error: cannot reassign a readonly property
todo.completed = true; // OK

type X = {
  x: {
    a: 1;
    b: "hi";
  };
  y: "hey";
};

type Expected = {
  readonly x: {
    readonly a: 1;
    readonly b: "hi";
  };
  readonly y: "hey";
};

type DeepReadonly<X> = {
  +readonly [Key in keyof X]: X[Key] extends Record<PropertyKey, unknown>
    ? DeepReadonly<X[Key]>
    : X[Key];
};
type Todo9 = DeepReadonly<X>; // should be same as `Expected`
let ooo: Todo9;

type obj = { a: 1; b: 2 };
type kkk = obj[keyof obj];

type Arr = ["1", "2", "3"];
type TupleToUnion<Arr extends unknown[]> = Arr[number];
type Test = TupleToUnion<Arr>; // expected to be '1' | '2' | '3'

declare const config: Chainable;

type Chainable<Result = {}> = {
  get(): Result;
  option<Key extends string, Value>(
    k: Key extends keyof Result ? never : Key,
    v: Value
  ): Chainable<Omit<Result, Key> & Record<Key, Value>>;
};
const result = config
  .option("foo", 123)
  .option("name", "type-challenges")
  .option("bar", { value: "Hello World" })
  .get();

// expect the type of result to be:
interface Result {
  foo: number;
  name: string;
  bar: {
    value: string;
  };
}
// type arr1 = ["a", "b", "c"];
// type arr2 = [3, 2, 1];

type Last<arr> = arr extends [...infer a, infer b] ? b : never;
type tail1 = Last<arr1>; // expected to be 'c'
type tail2 = Last<arr2>; // expected to be 1
type arr1 = ["a", "b", "c", "d"];
type arr2 = [3, 2, 1];
type Pop<T extends unknown[]> = T extends [...infer a, infer b] ? a : never;
type re1 = Pop<arr1>; // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2>; // expected to be [3, 2]

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});
declare function PromiseAll<Value extends unknown[]>(
  Value: readonly [...Value]
): Promise<{
  [I in keyof Value]: Value[I] extends Promise<infer R> ? R : Value[I];
}>;

// declare function PromiseAll1<Values extends unknown[]>(
//   values: readonly [...Values]
// ): Promise<{
//   [Index in keyof Values]: Values[Index] extends Promise<infer Resolved>
//     ? Resolved
//     : Values[Index];
// }>;
// expected to be `Promise<[number, 42, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const);

interface C1at {
  type: "cat";
  breeds: "Abyssinian" | "Shorthair" | "Curl" | "Bengal";
}

interface D1og {
  type: "dog";
  breeds: "Hound" | "Brittany" | "Bulldog" | "Boxer";
  color: "brown" | "white" | "black";
}
type LookUp7<U, dog> = U extends { type: dog } ? U : never;
// your answers
type LookUp<U, T> = U extends { type: T } ? U : never;
// type LookUp<U, dog> = Extract<U, {type: dog}>
type MyDogType = LookUp<Cat | Dog, "dog">; // expected to be `Dog`

type iii = C1at | D1og;
type o66 = keyof iii;

type TrimLeft<str> = str extends ` ${infer r}` ? TrimLeft<r> : str;
type trimed = TrimLeft<"      Hello World  ">; // expected to be 'Hello World  '

type add = "   qwe  ";
type adda<s> = s extends `${infer f}${infer r}` ? f | adda<r> : never;
type aaaa = adda<add>;

type Trim2<str> = str extends ` ${infer f}` | `${infer f} ` ? Trim2<f> : str;
type trimmed = Trim2<"      Hello World       ">; // expected to be 'Hello World'

type Capitalize<str> = str extends `${infer f}${infer r}`
  ? `${Uppercase<f>}${r}`
  : never;
type capitalized = Capitalize<"hello world">; // expected to be 'Hello world'

type Replace<
  str,
  s1 extends string,
  s2 extends string
> = str extends `${infer f}${s1}${infer r}` ? `${f}${s2}${r}` : str;
type replaced = Replace<"types are fun!", "fun", "awesome">; // expected to be 'types are awesome!'

type ReplaceAll<
  str extends string,
  s1 extends string,
  s2 extends string
> = str extends `${infer f}${s1}${infer r}`
  ? ReplaceAll<`${f}${s2}${r}`, s1, s2>
  : str;
type replaced3 = ReplaceAll<"t y p e s", " ", "">; // expected to be 'types'

type Fn = (a: number, b: string) => number;
type AppendArgument1<Fn, A> = Fn extends (...args: infer F) => infer R
  ? (...args: [...F, A]) => R
  : never;
type Resultd = AppendArgument1<Fn, boolean>;
// expected be (a: number, b: string, x: boolean) => number

type AppendArgument3<Fn, Type> = Fn extends (...arg: infer Arg) => infer R
  ? (...Arg: [...Arg, { x: Type }]) => R
  : never;

type Permutation8<U, r = U> = [U] extends [never]
  ? []
  : r extends infer Temp
  ? [Temp, ...Permutation8<Exclude<U, Temp>>]
  : [];

type perm = Permutation8<"A" | "B" | "C">;
// ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']

type ae2 = "1qqwqw";
type Ae22<T, arr extends unknown[] = []> = T extends `${infer f}${infer r}`
  ? Ae22<r, [...arr, f]>
  : arr["length"];
type adad = Ae22<ae2>;

type Flatten<Arr extends unknown[]> = Arr extends [infer f, ...infer R]
  ? f extends any[]
    ? Flatten<[...f, ...R]>
    : [f, ...Flatten<[...R]>]
  : [];

type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, 5]

type Test3 = { id: "1" };
// type AppendToObject1<T extends object, kk extends PropertyKey, V> = {
//   [k in keyof T]: T[k];
// } & {
//   kk: V;
// };

type AppendToObject1<T extends Object, K extends PropertyKey, V> = {
  [key in keyof T | K]: key extends keyof T ? T[key] : V;
};
type Result33 = AppendToObject1<Test3, "value", 4>; // expected to be { id: '1', value: 4 }
let ooe: Result33;
// your answers

type Absoluter<N extends number | string | bigint> =
  `${N}` extends `-${infer f}` ? `${f}` : Absoluter<N>;
type Test33 = -100;
type Result333 = Absoluter<Test33>; // expected to be "100"

type Test21 = "123";
type StringToUnion<T extends string> = T extends `${infer f}${infer r}`
  ? f | StringToUnion<r>
  : never;
type Result21 = StringToUnion<Test21>; // expected to be "1" | "2" | "3"

type foo = {
  name: string;
  age: string;
};
type coo = {
  age: number;
  sex: string;
};
type t = Exclude<coo, foo>;
type Merge<O1 extends object, O2 extends object> = {
  [key in keyof O2 | keyof Exclude<O1, O2>]: key extends keyof O2
    ? O2[key]
    : key extends keyof O1
    ? O1[key]
    : never;
};
type Md<O1, O2> = {
  [key in keyof O1 | keyof O2]: key extends keyof O2
    ? O2[key]
    : key extends keyof O1
    ? O1[key]
    : never;
};

type Resultr = Md<foo, coo>; // expected to be {name: string, age: number, sex: string}

// your answers
type M1d<F, S> = {
  [P in keyof F | keyof S]: P extends keyof S
    ? S[P]
    : P extends keyof F
    ? F[P]
    : never;
};

// type KebabCase<Str> = Str extends `${infer f}${infer r}`
//   ? r extends Uppercase<r>
//     ? `${Uncapitalize<f>}${KebabCase<r>}`
//     : `${Uncapitalize<f>}-${KebabCase<r>}`
//   : Str;
type KebabCase<
  Str,
  b extends boolean = true
> = Str extends `${infer f}${infer r}`
  ? f extends Uppercase<f>
    ? b extends true
      ? `${Lowercase<f>}${KebabCase<r, false>}`
      : `-${Lowercase<f>}${KebabCase<r, false>}`
    : `${f}${KebabCase<r, false>}`
  : Str;
type FooBarBaz = KebabCase<"FooBarBaz">;
const foobarbaz: FooBarBaz = "foo-bar-baz";

type DoNothing = KebabCase<"do-nothing">;
const doNothing: DoNothing = "do-nothing";

// type KebabCase666<S> = S extends `${infer C}${infer T}`
//   ? T extends Uncapitalize<T>
//     ? `${Uncapitalize<C>}${KebabCase<T>}`
//     : `${Uncapitalize<C>}-${KebabCase<T>}`
//   : S;
type Diff<
  o extends Record<PropertyKey, unknown>,
  o1 extends Record<PropertyKey, unknown>
> = {
  [key in keyof (Omit<o, keyof o1> & Omit<o1, keyof o>)]: key extends keyof o
    ? o[key]
    : o1[key];
};

// type Diff<
// 	O extends Record<PropertyKey, unknown>,
//         O1 extends Record<PropertyKey, unknown>
// > = {
//        [Key in keyof (Omit<O, keyof O1> & Omit<O1, keyof O>)]: Key extends keyof O ? O[Key] : O1[Key]
// }
