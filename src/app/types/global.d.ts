export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
  type MyUser = {
    id: number;
    name: string;
  };

  type MyTask = {
    id: number;
    description: string;
    assigneeId: number;
    completed: boolean;
  };
}