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

// type
type X = {
  name: "Tom";
  age: 30;
  married: false;
  addr: {
    home: "123456";
    phone: "13111111111";
  };
};

type Expected = {
  name: string;
  age: number;
  married: boolean;
  addr: {
    home: string;
    phone: string;
  };
};
type Todo = ToPrimitive<X>; // should be same as `Expected`
type ToPrimitive<T> = {
  [k in keyof T]: T[k] extends string
    ? string
    : T[k] extends number
    ? number
    : T[k] extends boolean
    ? boolean
    : ToPrimitive<T[k]>;
};

// type
type X1 = {
  readonly a: () => 1;
  readonly b: string;
  readonly c: {
    readonly d: boolean;
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true;
          readonly j: "s";
        };
        readonly k: "hello";
      };
    };
  };
};

type Expected1 = {
  a: () => 1;
  b: string;
  c: {
    d: boolean;
    e: {
      g: {
        h: {
          i: true;
          j: "s";
        };
        k: "hello";
      };
    };
  };
};

type Todo1 = DeepMutable<X1>; // should be same as `Expected1`

type DeepMutable<T> = {
  -readonly [Key in keyof T]: T[Key] extends object
    ? DeepMutable<T[Key]>
    : T[Key];
};

type DeepMutable1<T extends object> = {
  -readonly [P in keyof T]: T[P] extends (...args: unknown[]) => unknown
    ? T[P]
    : T[P] extends object
    ? DeepMutable<T[P]>
    : T[P];
};
//
type I = GetRequired<{ foo: number; bar?: string }>; // expected to be { foo: number }
type GetRequired<T> = {
  [Key in keyof T as Omit<T, Key> extends T ? never : Key]: T[Key];
};

type I12 = GetOptional<{ foo: number; bar?: string }>; // expected to be { bar?: string }
type GetOptional<T> = {
  [Key in keyof T as Omit<T, Key> extends T ? Key : never]: T[Key];
};

type Result = RequiredKeys<{ foo: number; bar?: string; c?: number }>;
// expected to be “foo”
/**
 * 1 必须属性
 * 2 val 变 key
 * 3 T[keyof T]
 */
// 2
type C<T> = {
  [Key in keyof T]: Key;
};
type RequiredKeys<T> = C<GetRequired<T>>[keyof C<GetRequired<T>>];
type Result1 = RequiredKeys1<{ foo: number; bar?: string; c?: number }>;
// expected to be “foo”|'c'

type RequiredKeys1<T> = C<GetOptional<T>>[keyof C<GetOptional<T>>];

// Get
type Data = {
  foo: {
    bar: {
      value: "foobar";
      count: 6;
    };
    included: true;
  };
  hello: "world";
};

type A = Get<Data, "hello">; // 'world'
type B = Get<Data, "foo.bar.count">; // 6
type C1 = Get<Data, "foo.bar">; // { value: 'foobar', count: 6 }

type Get<T, K extends string> = K extends keyof T
  ? T[K]
  : K extends `${infer K1}.${infer K2}`
  ? K1 extends keyof T
    ? Get<T[K1], K2>
    : never
  : never;

//

type obj = {
  name: "hoge";
  age: 20;
  friend: {
    name: "fuga";
    age: 30;
    family: {
      name: "baz";
      age: 1;
    };
  };
};

type T1 = DeepPick<obj, "name">; // { name : 'hoge' }
type T2 = DeepPick<obj, "name" | "friend.name">; // { name : 'hoge' } & { friend: { name: 'fuga' }}
type T3 = DeepPick<obj, "name" | "friend.name" | "friend.family.name">; // { name : 'hoge' } &  { friend: { name: 'fuga' }} & { friend: { family: { name: 'baz' }}}

type DeepPick<T extends Record<string, any>, U extends string> = (
  U extends string
    ? U extends `${infer F}.${infer R}`
      ? (arg: {
          [K in F]: DeepPick<T[F], R>;
        }) => void
      : U extends keyof T
      ? (arg: Pick<T, U>) => void
      : (arg: unknown) => void
    : never
) extends (arg: infer Z) => void
  ? Z
  : never;
