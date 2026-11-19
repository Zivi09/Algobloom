import { TraceStep } from '../../types';

export interface TreeNodeData {
  id: string;
  value: number;
  left?: string;
  right?: string;
  x: number;
  y: number;
}

export interface TreeData {
  rootId: string;
  nodes: Record<string, TreeNodeData>;
}

export const DEFAULT_BST: TreeData = {
  rootId: '50',
  nodes: {
    '50': { id: '50', value: 50, left: '30', right: '70', x: 280, y: 50 },
    '30': { id: '30', value: 30, left: '20', right: '40', x: 160, y: 130 },
    '70': { id: '70', value: 70, left: '60', right: '85', x: 400, y: 130 },
    '20': { id: '20', value: 20, x: 100, y: 210 },
    '40': { id: '40', value: 40, x: 220, y: 210 },
    '60': { id: '60', value: 60, x: 340, y: 210 },
    '85': { id: '85', value: 85, x: 460, y: 210 },
  },
};

export function generateBstSearchTrace(tree: TreeData = DEFAULT_BST, target: number = 60): TraceStep[] {
  const steps: TraceStep[] = [];
  let currId: string | undefined = tree.rootId;
  const visited: string[] = [];

  steps.push({
    step: 0,
    description: `Start searching for key ${target} at tree root (node ${tree.nodes[tree.rootId].value}).`,
    activeNodes: [tree.rootId],
    visitedNodes: [],
    activeLine: 1,
  });

  let found = false;

  while (currId && tree.nodes[currId]) {
    const node: TreeNodeData = tree.nodes[currId];
    visited.push(currId);

    steps.push({
      step: steps.length,
      description: `Comparing target ${target} with current node value ${node.value}.`,
      activeNodes: [currId],
      visitedNodes: [...visited],
      activeLine: 2,
    });

    if (node.value === target) {
      found = true;
      steps.push({
        step: steps.length,
        description: `Target ${target} matches node ${currId}! Search succeeded in O(h) comparisons.`,
        activeNodes: [currId],
        visitedNodes: [...visited],
        activeLine: 3,
        isComplete: true,
      });
      break;
    } else if (target < node.value) {
      steps.push({
        step: steps.length,
        description: `Target ${target} < node ${node.value}. BST invariant dictates searching LEFT subtree.`,
        activeNodes: [currId],
        visitedNodes: [...visited],
        activeLine: 5,
      });
      currId = node.left;
    } else {
      steps.push({
        step: steps.length,
        description: `Target ${target} > node ${node.value}. BST invariant dictates searching RIGHT subtree.`,
        activeNodes: [currId],
        visitedNodes: [...visited],
        activeLine: 7,
      });
      currId = node.right;
    }
  }

  if (!found) {
    steps.push({
      step: steps.length,
      description: `Reached null pointer. Target ${target} does not exist in this Binary Search Tree.`,
      activeNodes: [],
      visitedNodes: [...visited],
      activeLine: 9,
      isComplete: true,
    });
  }

  return steps;
}

export function generateTreeTraversalTrace(
  tree: TreeData = DEFAULT_BST,
  type: 'inorder' | 'preorder' | 'postorder' = 'inorder'
): TraceStep[] {
  const steps: TraceStep[] = [];
  const visited: string[] = [];
  const traversalOutput: number[] = [];

  steps.push({
    step: 0,
    description: `Begin ${type.toUpperCase()} traversal of Binary Search Tree starting at root.`,
    activeNodes: [tree.rootId],
    visitedNodes: [],
    queue: [],
    activeLine: 1,
  });

  function traverse(nodeId?: string) {
    if (!nodeId) return;
    const node = tree.nodes[nodeId];

    if (type === 'preorder') {
      visited.push(nodeId);
      traversalOutput.push(node.value);
      steps.push({
        step: steps.length,
        description: `[PREORDER: ROOT FIRST] Visited node ${node.value}. Output: [${traversalOutput.join(', ')}].`,
        activeNodes: [nodeId],
        visitedNodes: [...visited],
        queue: [...traversalOutput],
        activeLine: 2,
      });
    }

    if (node.left) {
      steps.push({
        step: steps.length,
        description: `Traversing left child of ${node.value}...`,
        activeNodes: [node.left],
        visitedNodes: [...visited],
        queue: [...traversalOutput],
        activeLine: 3,
      });
      traverse(node.left);
    }

    if (type === 'inorder') {
      visited.push(nodeId);
      traversalOutput.push(node.value);
      steps.push({
        step: steps.length,
        description: `[INORDER: ROOT] Visited node ${node.value}. Output in ascending sorted order: [${traversalOutput.join(', ')}].`,
        activeNodes: [nodeId],
        visitedNodes: [...visited],
        queue: [...traversalOutput],
        activeLine: 4,
      });
    }

    if (node.right) {
      steps.push({
        step: steps.length,
        description: `Traversing right child of ${node.value}...`,
        activeNodes: [node.right],
        visitedNodes: [...visited],
        queue: [...traversalOutput],
        activeLine: 5,
      });
      traverse(node.right);
    }

    if (type === 'postorder') {
      visited.push(nodeId);
      traversalOutput.push(node.value);
      steps.push({
        step: steps.length,
        description: `[POSTORDER: ROOT LAST] Visited node ${node.value} after both subtrees. Output: [${traversalOutput.join(', ')}].`,
        activeNodes: [nodeId],
        visitedNodes: [...visited],
        queue: [...traversalOutput],
        activeLine: 6,
      });
    }
  }

  traverse(tree.rootId);

  steps.push({
    step: steps.length,
    description: `${type.toUpperCase()} traversal complete! Final ordered sequence: [${traversalOutput.join(', ')}].`,
    activeNodes: [],
    visitedNodes: [...visited],
    queue: [...traversalOutput],
    activeLine: 7,
    isComplete: true,
  });

  return steps;
}
