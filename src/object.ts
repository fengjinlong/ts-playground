export {};
type TupleToNestedObject<Arr, b> = Arr extends []
  ? b
  : Arr extends [infer f extends string, ...infer r]
  ? Record<f, TupleToNestedObject<r, b>>
  : Arr extends [infer ff extends string]
  ? Record<ff, b>
  : never;
type a2 = TupleToNestedObject<["a"], string>; // {a: string}
type b2 = TupleToNestedObject<["a", "b"], number>; // {a: {b: number}}
type c2 = TupleToNestedObject<[], boolean>; // boolean. if the tuple is empty, just return the U type

//
interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}
type modelEntries = ObjectEntries<Model>; // ['name', string] | ['age', number] | ['locations', string[] | null];

type ObjectEntries<T, k extends keyof T = keyof T> = k extends k
  ? [k, [Required<T>[k]] extends [never] ? never : T[k]]
  : never;

type aa = Required<{ a?: string; b: number }>["a"]; // string
//
type Flip<T extends Record<PropertyKey, any>> = {
  [Key in keyof T as T[Key] extends PropertyKey ? T[Key] : `${T[Key]}`]: Key;
};
type a = Flip<{ a: "x"; b: "y"; c: "z" }>; // {x: 'a', y: 'b', z: 'c'}
type a1a = Flip<{ a: 1; b: 2; c: 3 }>; // {1: 'a', 2: 'b', 3: 'c'}
type ooa = Flip<{ a: false; b: true }>; // {false: 'a', true: 'b'}
