export {};
interface L {
  length: number;
}
// T extends Length 用于告诉编译器，我们支持已经实现 Length 接口的任何类型。
//之后，当我们使用不含有 length 属性的对象作为参数调用 identity 函数时，TypeScript 会提示相关的错误信息
function getL<T extends L>(p: T) {
  return p.length;
}
getL([1, 2, 3]);
getL("123");
// getL({});
//
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
getProperty({ a: 1, b: 2 }, "a");
// getProperty({ a: 1, b: 2 }, "a1");

// 默认泛型参数
interface A<T = string> {
  name: T;
}

const strA: A = { name: "Semlinker" };
const numB: A<number> = { name: 101 };
// const nq: A = { name: true };
const nq1: A<boolean> = { name: false };

//
async function stringPromise() {
  return "Hello, Semlinker!";
}

interface Person {
  name: string;
  age: number;
}

async function personPromise() {
  return { name: "Semlinker", age: 30 } as Person;
}

type PromiseType<T> = (args: any[]) => Promise<T>;
type UnPromisify<T> = T extends PromiseType<infer U> ? U : never;

type extractStringPromise = UnPromisify<typeof stringPromise>; // string
type extractPersonPromise = UnPromisify<typeof personPromise>; // Person

type oo = Record<keyof { a: string; b: boolean }, number>;

// 构造签名
class FirstClass {
  id: number | undefined;
}

class SecondClass {
  name: string | undefined;
}

// class GenericCreator<T> {
//   create(): T {
//     return new T();
//   }
// }

// const creator1 = new GenericCreator<FirstClass>();
// const firstClass: FirstClass = creator1.create();
// firstClass.id = 1;

// const creator2 = new GenericCreator<SecondClass>();
// const secondClass: SecondClass = creator2.create();

//  x
// interface Point {
//   new (x: number, y: number): Point;
//   x: number;
//   y: number;
// }
// class Point2D implements Point {
//   readonly x: number;
//   readonly y: number;
//   constructor(x: number, y: number) {
//     this.x = x;
//     this.y = y;
//   }
// }
// const point: Point = new Point2D(1, 2);
// 改
interface Point1 {
  x: number;
  y: number;
}
interface PointConstructor {
  new (x: number, y: number): Point1;
}
class Point2D1 implements Point1 {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

function newPoint(
  pointConstructor: PointConstructor,
  x: number,
  y: number
): Point1 {
  return new pointConstructor(x, y);
}

const point1: Point1 = newPoint(Point2D1, 1, 2);

//
class GenericCreator1<T> {
  create<T>(c: { new (a: number): T }, n: number): T {
    return new c(n);
  }
}
const creator11 = new GenericCreator1<FirstClass>();
const firstClass1: FirstClass = creator11.create(FirstClass, 1);

const creator21 = new GenericCreator1<SecondClass>();
const secondClass1: SecondClass = creator21.create(SecondClass, 2);
