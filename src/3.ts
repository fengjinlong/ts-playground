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
