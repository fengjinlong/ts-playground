export {};
type GetPropsIns<T> = T extends new (...args: any[]) => infer P
  ? T extends (...args: any[]) => infer R
    ? R
    : P
  : T;

type GetPropsArr<T, K = T> = T extends K ? GetPropsIns<T> : never;

type GetPropsType<T> = T extends (infer P)[] ? GetPropsArr<P> : GetPropsIns<T>;

type Props<P> = {
  [K in keyof P]: {} extends P[K]
    ? any
    : P[K] extends { type: infer T }
    ? GetPropsType<T>
    : GetPropsType<P[K]>;
};

type Computed<C> = {
  [K in keyof C]: C[K] extends () => infer P ? P : never;
};

type Options<P, D, C, M> = {
  props: P;
  data: (this: Props<P>) => D;
  computed: C;
  methods: M;
} & ThisType<Props<P> & D & Computed<C> & M>;

declare function VueBasicProps<P = {}, D = {}, C = {}, M = {}>(
  options: Options<P, D, C, M>
): any;

const instance = VueBasicProps({
  props: {
    foo: { type: [Boolean, Number, String] },
    boo: 1,
  },
  data() {
    return {
      firstname: "Type",
      lastname: "Challenges",
      amount: 10,
    };
  },
  computed: {
    fullname() {
      return this.firstname + " " + this.lastname;
    },
  },
  methods: {
    hi() {
      alert(this.fullname.toLowerCase());
    },
  },
});
