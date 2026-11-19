import { AlgorithmLesson } from '../../types';

export const bstLesson: AlgorithmLesson = {
  id: 'binary-search-tree',
  title: 'Binary Search Tree (BST)',
  tagline: 'The ordered branching arbor',
  difficulty: 'Intermediate',
  category: 'Trees',
  level: 6,
  estimatedMinutes: 20,
  flowerType: 'orchid',
  prerequisites: ['Recursion', 'Pointers / References', 'Binary Search'],
  objectives: [
    'Understand the BST Ordering Invariant: left < root < right',
    'Implement search, insertion, and deletion (3 cases)',
    'Trace Inorder, Preorder, and Postorder traversals',
    'Analyze why tree balance governs O(log n) vs O(n) worst-case performance',
  ],

  simpleExplanation:
    'A Binary Search Tree (BST) is an elegant hierarchical data structure where every node has at most two children: a left child and a right child. What makes it special is the BST Invariant: every value in the left subtree is strictly SMALLER than the root, and every value in the right subtree is strictly LARGER. This simple property turns the tree into a 2D binary search, allowing you to insert, search, and delete in O(log n) time!',
  eli5:
    'Imagine a branching rosebush. At every branch fork, a wooden sign has a number. If the number you are looking for is smaller than the sign, you take the left path. If it is bigger, you take the right path. You never have to wander through the wrong side of the bush!',

  whyNeeded: {
    problemSolved:
      'Maintaining a dynamic sorted collection with fast search, insertion, and deletion without shifting array elements.',
    historicalContext:
      'Proposed in 1960 by P.F. Windley, A.D. Booth, and A.J. Colin, BSTs unified the fast searching of sorted arrays with the dynamic insertion convenience of linked lists.',
    alternatives: ['Sorted Array (fast search, slow O(n) insert)', 'Linked List (fast insert, slow O(n) search)', 'Hash Table (O(1) search, but no ordering / range queries)'],
    whenToUse: [
      'Maintaining continuously updating datasets that need to remain sorted',
      'Range queries (e.g., find all flowers with heights between 20cm and 50cm)',
      'Finding the minimum, maximum, predecessor, or successor elements in logarithmic time',
    ],
    whenToAvoid: [
      'Data is inserted in pre-sorted order without self-balancing (degrades into a linked list of O(n) height)',
      'Only exact key lookups are needed without ordering (Hash Tables are faster at O(1))',
    ],
  },

  realLifeAnalogy: {
    title: 'The Botanical Nursery Classification System',
    story:
      'At a master botanical conservatory, greenhouse entrances are organized as a tree. The central foyer handles 50 species. Walk left for rare miniature flora (<50 species), walk right for giant tropical trees (>50 species). At every doorway, you make a single directional choice based on species size.',
    moral:
      'Recursive binary branching cuts the remaining choices in half at every step down the tree.',
  },

  steps: [
    {
      phase: 'Step 1: Start at Root',
      description: 'Begin search/insertion at the tree’s root node.',
      details: 'If tree is empty, new node becomes the root.',
    },
    {
      phase: 'Step 2: Compare Key with Current Node',
      description: 'Compare target value `val` with `current.value`.',
      details: 'If `val == current.value`: target found (or duplicate).',
    },
    {
      phase: 'Step 3: Branch Left or Right',
      description: 'If `val < current.value`, move to `current.left`. If `val > current.value`, move to `current.right`.',
      details: 'Repeat recursively or iteratively until match found or null pointer reached.',
    },
    {
      phase: 'Step 4: Attach on Insert',
      description: 'When reaching null during insertion, allocate a new node and link to parent.',
      details: 'Preserves BST ordering invariant across the entire tree.',
    },
  ],

  defaultInput: { rootValue: 50, target: 60 },

  pseudocode: [
    { line: 1, code: 'function search(root, key):', explanation: 'Searches for key in BST' },
    { line: 2, code: '  if root is null or root.val == key: return root', explanation: 'Base cases: not found or found' },
    { line: 3, code: '  if key < root.val:', explanation: 'Key is smaller' },
    { line: 4, code: '    return search(root.left, key)', explanation: 'Search left subtree' },
    { line: 5, code: '  else:', explanation: 'Key is larger' },
    { line: 6, code: '    return search(root.right, key)', explanation: 'Search right subtree' },
  ],

  code: {
    python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class BST:
    def __init__(self):
        self.root = None

    def insert(self, val):
        self.root = self._insert_node(self.root, val)

    def _insert_node(self, node, val):
        if not node:
            return TreeNode(val)
        if val < node.val:
            node.left = self._insert_node(node.left, val)
        elif val > node.val:
            node.right = self._insert_node(node.right, val)
        return node

    def search(self, val):
        curr = self.root
        while curr:
            if curr.val == val:
                return True
            elif val < curr.val:
                curr = curr.left
            else:
                curr = curr.right
        return False

    def inorder(self):
        res = []
        def dfs(n):
            if not n: return
            dfs(n.left)
            res.append(n.val)
            dfs(n.right)
        dfs(self.root)
        return res

# Usage:
tree = BST()
for x in [50, 30, 70, 20, 40, 60, 85]:
    tree.insert(x)
print(tree.inorder()) # [20, 30, 40, 50, 60, 70, 85] (Sorted!)`,

    javascript: `class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(val) {
    const newNode = new TreeNode(val);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let curr = this.root;
    while (true) {
      if (val < curr.val) {
        if (!curr.left) { curr.left = newNode; break; }
        curr = curr.left;
      } else {
        if (!curr.right) { curr.right = newNode; break; }
        curr = curr.right;
      }
    }
  }

  inorder(node = this.root, res = []) {
    if (!node) return res;
    this.inorder(node.left, res);
    res.push(node.val);
    this.inorder(node.right, res);
    return res;
  }
}

const tree = new BST();
[50, 30, 70, 20, 40, 60, 85].forEach(v => tree.insert(v));
console.log(tree.inorder()); // [20, 30, 40, 50, 60, 70, 85]`,

    cpp: `#include <iostream>
#include <vector>

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

TreeNode* insert(TreeNode* root, int val) {
    if (!root) return new TreeNode(val);
    if (val < root->val) root->left = insert(root->left, val);
    else if (val > root->val) root->right = insert(root->right, val);
    return root;
}

void inorder(TreeNode* root, std::vector<int>& out) {
    if (!root) return;
    inorder(root->left, out);
    out.push_back(root->val);
    inorder(root->right, out);
}

int main() {
    TreeNode* root = nullptr;
    for (int x : {50, 30, 70, 20, 40, 60, 85}) root = insert(root, x);
    std::vector<int> sorted;
    inorder(root, sorted);
    for (int v : sorted) std::cout << v << " ";
    return 0;
}`,

    java: `import java.util.*;

public class BinarySearchTree {
    static class Node {
        int val;
        Node left, right;
        Node(int v) { val = v; }
    }

    Node root;

    public void insert(int val) {
        root = insertRec(root, val);
    }

    private Node insertRec(Node root, int val) {
        if (root == null) return new Node(val);
        if (val < root.val) root.left = insertRec(root.left, val);
        else if (val > root.val) root.right = insertRec(root.right, val);
        return root;
    }
}`,
  },

  complexity: {
    bestTime: 'O(log n)',
    bestReason: 'When the tree is balanced (e.g. AVL or Red-Black), tree height is log₂(n).',
    averageTime: 'O(log n)',
    averageReason: 'Random insertions produce balanced trees with expected height ~2 ln(n).',
    worstTime: 'O(n)',
    worstReason: 'When elements are inserted in already-sorted order (1, 2, 3, 4, 5), the tree degrades into a straight linked list of height n.',
    space: 'O(n)',
    spaceReason: 'Stores n dynamic node objects in heap memory.',
    auxiliarySpace: 'O(h)',
  },

  whenToUsePractical: [
    {
      scenario: 'Implementing C++ `std::map` or Java `TreeMap`',
      reason: 'Self-balancing BSTs (Red-Black Trees) guarantee O(log n) operations while keeping keys in order.',
      recommendation: 'Use self-balancing BSTs.',
    },
    {
      scenario: 'Retrieving all elements between two values A and B',
      reason: 'BST inorder traversal allows efficient range queries in O(log n + k) time.',
      recommendation: 'Use BST (Hash tables cannot perform range queries efficiently).',
    },
    {
      scenario: 'Inserting strictly sorted sequential data without balancing',
      reason: 'Unbalanced BST degenerates into a linear list with O(n) search time.',
      recommendation: 'Use an AVL Tree, Red-Black Tree, or B-Tree instead.',
    },
  ],

  commonMistakes: [
    {
      mistake: 'Assuming a standard BST is always O(log n)',
      whyItHappens: 'Forgetting that without balance rotations (like AVL or Red-Black), worst-case BST operations are O(n).',
      howToFix: 'Recognize that tree height h governs complexity; use self-balancing variants in production.',
    },
    {
      mistake: 'Failing to handle the 2-children deletion case',
      whyItHappens: 'Deleting a node with two children requires replacing it with its inorder predecessor (max of left) or inorder successor (min of right).',
      howToFix: 'Find the inorder successor, overwrite value, and delete the successor from the subtree.',
    },
    {
      mistake: 'Allowing duplicate keys without defined tie-breaking rules',
      whyItHappens: 'Standard BST definitions use strict inequality (< and >). Duplicates can violate traversal expectations if not consistently sent left or right.',
      howToFix: 'Store a frequency count inside each node, or strictly define `<=` as left.',
    },
  ],

  quiz: [
    {
      id: 'bst-q1',
      type: 'definition',
      question: 'What is the fundamental invariant of a Binary Search Tree (BST)?',
      options: [
        'Left subtree values < root value < right subtree values',
        'Every node must have exactly two children',
        'Left subtree depth must always equal right subtree depth',
        'All leaf nodes must contain even numbers',
      ],
      correctIndex: 0,
      explanation:
        'The BST ordering property guarantees that all keys in the left branch are strictly less than the node, and all keys in the right branch are strictly greater.',
      whyWrong: [
        'Nodes can have 0, 1, or 2 children.',
        'Strictly equal depths describe perfect binary trees, not general BSTs.',
        'Node values can be any comparable data type.',
      ],
      miniExample: 'Left: 30 < Root: 50 < Right: 70.',
    },
    {
      id: 'bst-q2',
      type: 'step-by-step',
      question: 'Which tree traversal visits the nodes of a Binary Search Tree in sorted ascending order?',
      options: ['Inorder Traversal (Left, Root, Right)', 'Preorder Traversal', 'Postorder Traversal', 'Level-Order Traversal'],
      correctIndex: 0,
      explanation:
        'Because left < root < right, visiting left first, then root, then right produces the elements in non-decreasing order.',
      whyWrong: [
        'Preorder visits root before subtrees.',
        'Postorder visits root after both subtrees.',
        'Level-order visits horizontal tiers.',
      ],
      miniExample: 'Inorder on BST [50, 30, 70] yields [30, 50, 70].',
    },
    {
      id: 'bst-q3',
      type: 'complexity',
      question: 'What is the worst-case time complexity of searching an unbalanced BST formed by inserting [1, 2, 3, 4, 5] in order?',
      options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
      correctIndex: 0,
      explanation:
        'Inserting sorted data into an unbalanced BST produces a degenerate "skewed" tree that resembles a singly linked list of height n.',
      whyWrong: [
        'O(log n) requires the tree to be balanced.',
        'O(1) lookups belong to hash tables.',
        'O(n log n) is sorting complexity.',
      ],
    },
    {
      id: 'bst-q4',
      type: 'practical',
      question: 'When deleting a node that has TWO children from a BST, what node can safely replace it?',
      options: [
        'Its inorder successor (smallest node in the right subtree) or inorder predecessor',
        'Any random leaf node',
        'The root of the entire tree',
        'Its left child directly',
      ],
      correctIndex: 0,
      explanation:
        'The inorder successor is guaranteed to be greater than all nodes in the left subtree and smaller than all remaining nodes in the right subtree, preserving the BST invariant.',
      whyWrong: [
        'A random leaf would violate the BST ordering property.',
        'The root cannot replace an arbitrary descendant.',
        'Promoting the left child directly fails because it has its own children.',
      ],
    },
    {
      id: 'bst-q5',
      type: 'conceptual',
      question: 'How do AVL Trees and Red-Black Trees prevent the O(n) worst-case degeneracy of a standard BST?',
      options: [
        'They perform tree rotations during insertions and deletions to guarantee logarithmic height O(log n)',
        'They delete half the nodes whenever the tree gets too deep',
        'They convert the tree into a flat array every second',
        'They require quantum processors',
      ],
      correctIndex: 0,
      explanation:
        'Self-balancing trees monitor balance factors or node color invariants and execute Left/Right rotations to maintain height O(log n).',
      whyWrong: [
        'Nodes are never arbitrarily deleted.',
        'No flattening to arrays occurs.',
        'Self-balancing runs on standard silicon computers.',
      ],
    },
  ],

  recap: {
    takeaways: [
      'BST Invariant: left < root < right across all subtrees.',
      'Inorder traversal prints elements in ascending sorted order.',
      'Average search, insert, and delete take O(log n) time.',
      'Worst case is O(n) if unbalanced (skewed tree).',
      'Self-balancing trees (AVL, Red-Black) maintain guaranteed O(log n) height.',
    ],
    keyTerms: [
      { term: 'Inorder Traversal', definition: 'Traversing Left subtree, Root, then Right subtree.' },
      { term: 'Inorder Successor', definition: 'The node with the smallest key strictly greater than the current node.' },
      { term: 'Tree Rotation', definition: 'Local pointer manipulation that changes tree height without violating BST invariant.' },
    ],
    finalChallengePrompt: 'Can you implement a method to validate whether an arbitrary binary tree satisfies the BST property?',
  },

  relearn: {
    conceptKey: 'bst-basics',
    simplifiedTitle: 'The Branching Rose Tree',
    differentAnalogy:
      'Imagine a majestic rose tree. At the main fork, a wooden tag says "50". If you are looking for flower #30, which way do you look? Left! Because 30 is smaller than 50. What if you look for flower #70? Right! Because 70 is bigger than 50. Every time you hit a branch, smaller goes left, bigger goes right. That is a Binary Search Tree!',
    babySteps: [
      '1. Start at the top of the tree (Root).',
      '2. Look at the number in front of you.',
      '3. Is your target smaller? Climb down the LEFT branch.',
      '4. Is your target bigger? Climb down the RIGHT branch.',
      '5. Is it equal? You found it! Celebrate!',
      '6. If you fall off a branch into empty air, the number is not in the tree.',
    ],
    workedExample:
      'Search for 60 in tree with Root 50, Left 30, Right 70:\n- At 50: 60 > 50 → Go RIGHT to 70.\n- At 70: 60 < 70 → Go LEFT to 60.\n- At 60: 60 == 60 → FOUND in only 3 checks!',
    miniPractice: [
      {
        id: 'bst-mini-1',
        type: 'step-by-step',
        question: 'If root is 40 and you want to insert 25, which side does it go on?',
        options: ['Left side', 'Right side', 'On top of 40', 'It is thrown away'],
        correctIndex: 0,
        explanation: '25 is smaller than 40, so the BST rule says it must go on the left!',
      },
      {
        id: 'bst-mini-2',
        type: 'conceptual',
        question: 'What special order do you get when reading a BST with Left-Root-Right (Inorder)?',
        options: [
          'Sorted numbers from smallest to largest!',
          'Reverse order',
          'Completely random numbers',
          'Only even numbers',
        ],
        correctIndex: 0,
        explanation: 'Because left < root < right, reading left-root-right naturally sorts the numbers!',
      },
      {
        id: 'bst-mini-3',
        type: 'definition',
        question: 'Can a binary tree node have 5 children?',
        options: [
          'No! Binary means at most 2 children (Left and Right)',
          'Yes, up to 100',
          'Only in autumn',
          'Yes, if they are all small',
        ],
        correctIndex: 0,
        explanation: '"Binary" comes from Latin meaning "two by two"—at most 2 children per node!',
      },
    ],
    buddyEncouragement:
      "Trees are the crown jewels of computer science! Like branches growing toward the sun, BSTs keep data beautifully organized. You are blooming! 🌸",
  },
};
