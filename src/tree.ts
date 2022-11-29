const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as const;
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}
type A = InorderTraversal1<typeof tree1>; // [1, 3, 2]
type InorderTraversal1<T extends TreeNode | null> = [T] extends [TreeNode]
  ? [
      ...InorderTraversal1<T["left"]>,
      T["val"],
      ...InorderTraversal1<T["right"]>
    ]
  : [];

export {};
