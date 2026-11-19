import { TraceStep } from '../../types';

export interface LinkedListNode {
  id: string;
  value: number | string;
  nextId: string | null;
}

export function generateStackOperationsTrace(initialStack: (number | string)[] = [10, 25, 42]): {
  push: (item: number | string) => TraceStep[];
  pop: () => TraceStep[];
} {
  return {
    push: (item: number | string) => {
      const current = [...initialStack];
      const steps: TraceStep[] = [];
      steps.push({
        step: 0,
        description: `Preparing to push element ${item} onto the top of the Stack (LIFO: Last-In, First-Out).`,
        stack: [...current],
        activeLine: 1,
      });

      current.push(item);

      steps.push({
        step: 1,
        description: `Pushed ${item} onto stack. New stack top is ${item}. Stack depth is now ${current.length}.`,
        stack: [...current],
        activeLine: 2,
        isComplete: true,
      });
      return steps;
    },
    pop: () => {
      const current = [...initialStack];
      const steps: TraceStep[] = [];
      if (current.length === 0) {
        steps.push({
          step: 0,
          description: `Stack underflow! Cannot pop from an empty stack.`,
          stack: [],
          activeLine: 3,
          isComplete: true,
        });
        return steps;
      }

      const popped = current.pop();
      steps.push({
        step: 0,
        description: `Popped top element ${popped} from the stack. Remaining stack depth is ${current.length}.`,
        stack: [...current],
        activeLine: 4,
        isComplete: true,
      });
      return steps;
    },
  };
}

export function generateQueueOperationsTrace(initialQueue: (number | string)[] = ['A', 'B', 'C']): {
  enqueue: (item: number | string) => TraceStep[];
  dequeue: () => TraceStep[];
} {
  return {
    enqueue: (item: number | string) => {
      const current = [...initialQueue];
      const steps: TraceStep[] = [];
      steps.push({
        step: 0,
        description: `Enqueue element ${item} at the rear/back of the FIFO Queue (First-In, First-Out).`,
        queue: [...current],
        activeLine: 1,
      });

      current.push(item);

      steps.push({
        step: 1,
        description: `Enqueued ${item} at rear. Total items in queue: ${current.length}.`,
        queue: [...current],
        activeLine: 2,
        isComplete: true,
      });
      return steps;
    },
    dequeue: () => {
      const current = [...initialQueue];
      const steps: TraceStep[] = [];
      if (current.length === 0) {
        steps.push({
          step: 0,
          description: `Queue underflow! Queue is empty.`,
          queue: [],
          activeLine: 3,
          isComplete: true,
        });
        return steps;
      }

      const dequeued = current.shift();
      steps.push({
        step: 0,
        description: `Dequeued front element ${dequeued}. Next item in line is now ${current[0] || 'None'}.`,
        queue: [...current],
        activeLine: 4,
        isComplete: true,
      });
      return steps;
    },
  };
}
