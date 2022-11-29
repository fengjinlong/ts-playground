export {};
type FlipArguments<Fn> = Fn extends (...args: infer fff) => infer r
  ? (...args: Reversea1<fff>) => r
  : Fn;
type Flipped = FlipArguments<
  (arg0: string, arg1: number, arg2: boolean) => void
>;
// (arg0: boolean, arg1: number, arg2: string) => void

type Reversea1<Arr> = Arr extends [...infer f, infer r]
  ? [r, ...Reversea1<f>]
  : [];
type aar = Reversea1<[1, 2, 3]>;

// 斐波那契
type Fibonacci<
  N,
  Arr extends unknown[] = [1],
  prev extends unknown[] = [1],
  curr extends unknown[] = [1]
> = N extends Arr["length"]
  ? prev["length"]
  : Fibonacci<N, [...Arr, 1], curr, [...prev, ...curr]>;
type Result1 = Fibonacci<3>; // 2
type Result2 = Fibonacci<8>; // 21
