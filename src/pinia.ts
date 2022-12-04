export {};
declare function defineStore<
  State,
  Getters,
  Actions,
  DefinedGetters extends Readonly<{
    [Key in keyof Getters]: Getters[Key] extends () => infer Value
      ? Value
      : never;
  }>,
  DefinedStore extends State & DefinedGetters & Actions
>(store: {
  id: string;
  state: () => State;
  getters: Getters & ThisType<Readonly<DefinedStore>>;
  actions: Actions & ThisType<DefinedStore>;
}): DefinedStore;

const store = defineStore({
  id: "main",
  state: () => ({
    count: 0,
    age: 18,
  }),
  getters: {
    g() {
      return 1;
    },
  },
  actions: {
    deeffect() {
      this.count++;
      this.ac();
      this.g;
    },
    ac() {},
  },
});

declare function defineStore1<
  State,
  Getterss,
  Actions,
  DefinedGetters extends {
    readonly [key in keyof Getterss]: Getterss[key] extends () => infer Value
      ? Value
      : never;
  },
  // DefinedStore 就是封装一下  方便一些类型的集中使用（  State & DefinedGetters & Actions ）
  DefinedStore extends State & DefinedGetters & Actions
>(store: {
  // 定义 defineStore 的参数的类型 object
  id: string;
  // state 是个函数，函数返回值类型是 State
  /**
   * state: () => ({count: 0,age: 18,})
   * State 是 {count: number,age: number,}
   */
  state: () => State;
  /**
   * 定义 getters 的类型，计算属性
   *  getters 是个对象 { key, value }，如果 value 是个有返回值 R 的函数，
   * 那么 value 就是 这个 R 类型
   */
  getters: Getterss & ThisType<Readonly<State & Actions & DefinedGetters>>;
  // {
  //   readonly [key in keyof Getterss]: Getterss[key] extends () => infer Value
  //     ? Value
  //     : never;
  // };
  actions: Actions & ThisType<State & DefinedGetters & Actions>;
}): DefinedStore;
defineStore1({
  id: "main",
  state: () => ({
    age: 18,
  }),
  getters: {
    g() {
      // 访问 state   getters: Getterss & ThisType<State>;
      this.age;
      // 访问 actions
      this.fun();
      return 1;
    },
  },
  actions: {
    fun() {
      // 访问 state  actions: Actions & ThisType<State>;
      this.age;
      // 访问 getters  actions: Actions & ThisType<State & Getterss>;
      this.g; // 调用 ?
      /**
       * 因为 Getterss[key] extends () => infer Value ? Value : never;
       * 所以 不能 this.g()
       */
      this.f();
    },
    f() {},
  },
});
