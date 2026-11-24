export interface AlgorithmDemoInfo {
  id: string;
  name: string;
  category: 'sorting' | 'search' | 'graph' | 'tree' | 'dp';
  tagline: string;
  icon: string;
  badge: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  summary: string;
  metaphor: string;
  howItWorks: string[];
  visualCues: {
    label: string;
    description: string;
    color: string;
  }[];
  recommendedControls: string;
  proTip: string;
}

export const PLAYGROUND_ALGORITHMS_DATA: Record<string, AlgorithmDemoInfo> = {
  // ==========================================
  // SORTING ALGORITHMS
  // ==========================================
  bubble: {
    id: 'bubble',
    name: 'Bubble Sort',
    category: 'sorting',
    tagline: 'The Fizzy Bubble Climb',
    icon: '🫧',
    badge: 'Beginner • O(n²)',
    timeComplexity: {
      best: 'O(n) (when nearly sorted)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1) Auxiliary',
    summary:
      'Bubble Sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order. With each full pass, the largest remaining element bubbles up to its final position at the end.',
    metaphor:
      'Imagine bubbles of carbonation in a garden watering can: heavier bubbles stay down, while the largest, lightest air bubbles naturally float to the surface one by one.',
    howItWorks: [
      'Compare adjacent pairs: index j and j+1.',
      'If the left element is larger than the right, swap them.',
      'Repeat until no swaps are needed across an entire pass.',
      'Each pass locks the next largest element at the right end (Sage Green).',
    ],
    visualCues: [
      { label: 'Amber Bars', description: 'Currently being compared', color: '#FFE0AF' },
      { label: 'Rose Bars', description: 'Active physical swap in motion (FLIP arc)', color: '#F1B4B1' },
      { label: 'Sage Green Bars', description: 'Locked in final sorted order', color: '#939F7F' },
    ],
    recommendedControls:
      'Try the "Reverse" preset to see the maximum number of bubble swaps, or "Nearly" to see how early-termination saves passes!',
    proTip:
      'While simple, Bubble Sort is quadratic O(n²). However, its adaptive early exit allows it to detect an already-sorted list in just O(n) comparisons!',
  },

  selection: {
    id: 'selection',
    name: 'Selection Sort',
    category: 'sorting',
    tagline: 'The Minimum Element Scavenger',
    icon: '🔍',
    badge: 'Essential • O(n²)',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1) Auxiliary',
    summary:
      'Selection Sort divides the list into a sorted prefix and an unsorted suffix. In each pass, it scans the entire unsorted region to find the absolute minimum value, then swaps it into the next slot of the sorted prefix.',
    metaphor:
      'Like a florist walking along a row of seedling pots: they scan the whole bench for the shortest sprout, place it at the beginning of the shelf, and then scan the remainder for the next shortest.',
    howItWorks: [
      'Assume the first unsorted item is the minimum.',
      'Scan the remaining unsorted items, updating the minimum index whenever a smaller item appears.',
      'At the end of the pass, perform a single swap to place the minimum into its permanent spot.',
      'Advance the sorted boundary by one and repeat.',
    ],
    visualCues: [
      { label: 'Mauve Pointer', description: 'Current minimum found so far', color: '#C6A8CE' },
      { label: 'Amber Scan', description: 'Scanning unsorted elements', color: '#FFE0AF' },
      { label: 'Rose Arc', description: 'Single swap placing minimum at front', color: '#F1B4B1' },
      { label: 'Sage Green', description: 'Permanently settled prefix', color: '#939F7F' },
    ],
    recommendedControls:
      'Watch how Selection Sort always makes at most n swaps, regardless of whether you choose Random or Reversed data!',
    proTip:
      'Selection Sort performs O(n²) comparisons, but only O(n) total swaps. This makes it valuable when writing to memory is significantly more expensive than reading!',
  },

  insertion: {
    id: 'insertion',
    name: 'Insertion Sort',
    category: 'sorting',
    tagline: 'Sorting a Hand of Playing Cards',
    icon: '🃏',
    badge: 'Adaptive • O(n²)',
    timeComplexity: {
      best: 'O(n) (already sorted)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1) Auxiliary',
    summary:
      'Insertion Sort builds the final sorted array one item at a time. It takes the next unsorted element and slides it backward through the already-sorted portion until it finds its correct home.',
    metaphor:
      'Imagine holding a hand of playing cards. When dealt a new card, you slide it leftward between the cards in your hand until it sits in the right numerical rank.',
    howItWorks: [
      'The first element is trivially sorted by itself.',
      'Take the next unsorted element as the "key".',
      'Shift all sorted elements larger than the key one position to the right.',
      'Insert the key into the vacant opening.',
    ],
    visualCues: [
      { label: 'Mauve Bar', description: 'The current "key" being inserted', color: '#C6A8CE' },
      { label: 'Amber Shift', description: 'Larger sorted items sliding right', color: '#FFE0AF' },
      { label: 'Sage Green', description: 'Steadily growing sorted hand', color: '#939F7F' },
    ],
    recommendedControls:
      'Click the "Nearly" sorted preset! Notice how lightning-fast Insertion Sort finishes with almost zero shifts.',
    proTip:
      'Insertion Sort is often the algorithm used inside production hybrid sorts (like Java and Python’s Timsort) for small partitions under 32 elements because of tiny constant factors and cache locality!',
  },

  merge: {
    id: 'merge',
    name: 'Merge Sort',
    category: 'sorting',
    tagline: 'Divide, Conquer & Zip Together',
    icon: '🌿',
    badge: 'Guaranteed • O(n log n)',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(n) Auxiliary buffer',
    summary:
      'Merge Sort is a classic divide-and-conquer algorithm. It recursively splits the array into two halves until single-element arrays remain, then merges adjacent sorted subarrays back together in sorted order.',
    metaphor:
      'Like two gardeners who each have a neat pile of flower bulbs sorted by size. To combine them into one master box, they look at the top bulb of each pile and pick whichever is smaller, zipping them together seamlessly.',
    howItWorks: [
      'Divide: Find the midpoint and split the array in half.',
      'Conquer: Recursively sort the left and right halves.',
      'Combine: Merge the two sorted halves by repeatedly comparing their front elements into an auxiliary array.',
      'Copy the merged values back to the original array.',
    ],
    visualCues: [
      { label: 'Subarray Brackets', description: 'Active left and right partitions', color: '#7EA172' },
      { label: 'Amber Compare', description: 'Comparing heads of both halves', color: '#FFE0AF' },
      { label: 'Zipped Bars', description: 'Values placed in merged order', color: '#939F7F' },
    ],
    recommendedControls:
      'Use the Step Forward button (>|) to watch the recursive descent split the array down to single elements before zipping them up!',
    proTip:
      'Merge Sort is stable (preserves the relative order of identical elements) and guarantees O(n log n) even in worst-case scenarios, making it popular for sorting linked lists and external files.',
  },

  quick: {
    id: 'quick',
    name: 'Quick Sort',
    category: 'sorting',
    tagline: 'Pivot Point Partition',
    icon: '⚡',
    badge: 'High Speed • O(n log n)',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(log n) Call Stack',
    summary:
      'Quick Sort picks a "pivot" element and partitions the array so all elements smaller than the pivot end up to its left, and all larger elements end up to its right. It then recursively applies this logic to both partitions.',
    metaphor:
      'Like choosing a reference height stick in a garden: all plants shorter than the stick go to the left bed, and all taller plants go to the right bed. The stick itself is now in its exact final spot!',
    howItWorks: [
      'Choose a pivot element (AlgoBloom uses the last element in the partition).',
      'Partition: Scan with two pointers (i and j), swapping elements smaller than the pivot to the front.',
      'Place the pivot into its final resting boundary.',
      'Recursively quicksort the left and right subarrays.',
    ],
    visualCues: [
      { label: 'Mauve Bar', description: 'The chosen Pivot element', color: '#C6A8CE' },
      { label: 'i & j Pointers', description: 'Partition boundary scanners', color: '#5B8C5A' },
      { label: 'Rose Swaps', description: 'Swapping small values to left partition', color: '#F1B4B1' },
      { label: 'Sage Green', description: 'Pivot locked in permanent position', color: '#939F7F' },
    ],
    recommendedControls:
      'Try "Random" vs "Reverse" presets. Notice how picking a good pivot splits the problem in half, yielding speedy O(n log n) execution!',
    proTip:
      'In practice, Quick Sort is often 2-3x faster than Merge Sort due to superb CPU cache locality and in-place partitioning with zero auxiliary array allocations.',
  },

  // ==========================================
  // SEARCH ALGORITHMS
  // ==========================================
  linear: {
    id: 'linear',
    name: 'Linear Search',
    category: 'search',
    tagline: 'Checking One Pebble at a Time',
    icon: '🚶',
    badge: 'Sequential • O(n)',
    timeComplexity: {
      best: 'O(1) (found at index 0)',
      average: 'O(n)',
      worst: 'O(n)',
    },
    spaceComplexity: 'O(1) Auxiliary',
    summary:
      'Linear Search inspects every element in order from start to finish until the target is found or the end of the array is reached. It requires no preconditions or sorted order.',
    metaphor:
      'Like walking down a row of unlabeled seed jars on a shelf, reading each label one by one from left to right until you find Sunflower seeds.',
    howItWorks: [
      'Start at index 0.',
      'Compare the current element with the target value.',
      'If it matches, return the index (Found!).',
      'If not, move to the next index and repeat.',
    ],
    visualCues: [
      { label: 'Amber Scan', description: 'Current candidate being checked', color: '#FFE0AF' },
      { label: 'Sage Green Target', description: 'Match found! Target verified', color: '#939F7F' },
      { label: 'Muted Lavender', description: 'Eliminated non-matches', color: '#B7B1C6' },
    ],
    recommendedControls:
      'Enter different target values in the "Target Value" input box to see both early matches and misses that scan all the way to the end!',
    proTip:
      'Linear Search is the only option when data is completely unsorted. However, for large collections, sorting once and using Binary Search saves enormous computing time.',
  },

  binary: {
    id: 'binary',
    name: 'Binary Search',
    category: 'search',
    tagline: 'Divide the Search Field in Half',
    icon: '🎯',
    badge: 'Logarithmic • O(log n)',
    timeComplexity: {
      best: 'O(1) (target at initial mid)',
      average: 'O(log n)',
      worst: 'O(log n)',
    },
    spaceComplexity: 'O(1) Auxiliary',
    summary:
      'Binary Search works on pre-sorted arrays. It checks the middle element: if the target is smaller, the entire right half is discarded; if larger, the left half is discarded. This cuts the remaining search space in half with every step.',
    metaphor:
      'Like looking up a word in a 1,000-page dictionary: you open directly to page 500. If your word starts with "M" and page 500 is "R", you discard the entire back half in one flip!',
    howItWorks: [
      'Maintain Low and High pointers defining the active window.',
      'Calculate the midpoint: Mid = (Low + High) / 2.',
      'If arr[Mid] == Target: success!',
      'If Target < arr[Mid]: High = Mid - 1 (discard right half).',
      'If Target > arr[Mid]: Low = Mid + 1 (discard left half).',
    ],
    visualCues: [
      { label: 'Low & High Pins', description: 'The active search window boundaries', color: '#7EA172' },
      { label: 'Mauve Midpoint', description: 'Calculated middle index being tested', color: '#C6A8CE' },
      { label: 'Faded Bars', description: 'Discarded halves (eliminated in 1 step)', color: '#D4CDE0' },
      { label: 'Sage Green', description: 'Target successfully located!', color: '#939F7F' },
    ],
    recommendedControls:
      'On an 8-element array, notice how Binary Search NEVER takes more than 3 or 4 comparisons to find ANY number!',
    proTip:
      'Binary Search is so efficient that searching through 1,000,000 items takes at most 20 comparisons (log₂ 1,000,000 ≈ 19.9)!',
  },

  // ==========================================
  // GRAPH ALGORITHMS
  // ==========================================
  bfs: {
    id: 'bfs',
    name: 'Breadth-First Search (BFS)',
    category: 'graph',
    tagline: 'Ripples Expanding Outward',
    icon: '🌊',
    badge: 'Layered • O(V + E)',
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
    },
    spaceComplexity: 'O(V) Queue space',
    summary:
      'Breadth-First Search traverses a graph level-by-level using a FIFO (First-In, First-Out) queue. It visits all immediate neighbors of the start vertex before moving outward to neighbors-of-neighbors.',
    metaphor:
      'Like dropping a pebble into a calm pond: concentric ripple waves expand outward evenly in all directions at the same speed.',
    howItWorks: [
      'Enqueue the start vertex and mark it as visited.',
      'While the queue is not empty: dequeue vertex U.',
      'For each unvisited neighbor V of U: mark V visited and enqueue V.',
      'Because it explores evenly, BFS naturally finds the shortest path in unweighted graphs!',
    ],
    visualCues: [
      { label: 'Rose Glowing Node', description: 'Currently active dequeued vertex', color: '#F1B4B1' },
      { label: 'Amber Ring', description: 'Vertices waiting in the FIFO Queue', color: '#FFE0AF' },
      { label: 'Sage Green Edge', description: 'Traversed graph tree edges', color: '#939F7F' },
    ],
    recommendedControls:
      'Click different Start Vertex buttons (A, B, C, D) and step forward to see how the ripple wave pattern shifts from different roots!',
    proTip:
      'BFS is the backbone of GPS navigation for turn-by-turn routing, social network friend recommendation (degrees of separation), and web crawlers.',
  },

  dfs: {
    id: 'dfs',
    name: 'Depth-First Search (DFS)',
    category: 'graph',
    tagline: 'Exploring a Garden Maze',
    icon: '🧭',
    badge: 'Deep Dive • O(V + E)',
    timeComplexity: {
      best: 'O(V + E)',
      average: 'O(V + E)',
      worst: 'O(V + E)',
    },
    spaceComplexity: 'O(V) Call Stack space',
    summary:
      'Depth-First Search plunges deep down each graph path using a LIFO (Last-In, First-Out) stack or recursion until it hits a dead end or visited node, then backtracks to explore unexplored forks.',
    metaphor:
      'Like navigating a botanical hedge maze: you always turn down the first open corridor, leaving breadcrumbs. When you hit a dead end, you retrace your steps backward to the last junction.',
    howItWorks: [
      'Push the start vertex onto the stack and mark visited.',
      'Look for any unvisited neighbor and advance immediately.',
      'If all neighbors of the current vertex are visited: backtrack (pop).',
      'Continue until the stack is empty.',
    ],
    visualCues: [
      { label: 'Rose Node', description: 'Current deepest exploration frontier', color: '#F1B4B1' },
      { label: 'Mauve Edges', description: 'Active traversal tree branch', color: '#C6A8CE' },
      { label: 'Backtrack Glow', description: 'Popping back to previous junction', color: '#FFE0AF' },
    ],
    recommendedControls:
      'Watch how DFS races all the way to vertex E or D immediately instead of spreading out evenly like BFS did!',
    proTip:
      'DFS is essential for topological sorting (dependency build graphs), detecting cycles in software packages, and solving mazes/puzzles.',
  },

  dijkstra: {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    category: 'graph',
    tagline: 'The Greedy Beacon of Shortest Paths',
    icon: '🗺️',
    badge: 'Weighted • O((V + E) log V)',
    timeComplexity: {
      best: 'O((V + E) log V)',
      average: 'O((V + E) log V)',
      worst: 'O((V + E) log V)',
    },
    spaceComplexity: 'O(V) Distance Table',
    summary:
      "Dijkstra's Algorithm finds the shortest path from a starting vertex to all other vertices in a weighted graph with non-negative edge costs. It greedily selects the unvisited node with the lowest tentative distance.",
    metaphor:
      'Like water flowing through a network of pipes with different resistance: the water naturally arrives at each junction along the path of least resistance first.',
    howItWorks: [
      'Set tentative distance to start vertex as 0, all other vertices as ∞.',
      'Pick the unvisited vertex with the smallest tentative distance.',
      'Relax its neighbors: if Distance(U) + EdgeWeight(U,V) < Distance(V), update Distance(V).',
      'Mark U as finalized and repeat until all nodes are settled.',
    ],
    visualCues: [
      { label: 'Weight Badges', description: 'Edge travel costs between vertices', color: '#7EA172' },
      { label: 'Tentative Distance', description: 'Current shortest known cost on each node', color: '#FFE0AF' },
      { label: 'Sage Green Path', description: 'Finalized optimal shortest route', color: '#939F7F' },
    ],
    recommendedControls:
      'Try starting at vertex A, then switch to vertex C to observe how edge weights dramatically alter the optimal route!',
    proTip:
      "Dijkstra requires all edge weights to be non-negative (≥ 0). If negative weights exist, you must use the Bellman-Ford algorithm instead.",
  },

  // ==========================================
  // TREE ALGORITHMS
  // ==========================================
  'tree-search': {
    id: 'tree-search',
    name: 'Binary Search Tree (BST) Search',
    category: 'tree',
    tagline: 'Left for Smaller, Right for Larger',
    icon: '🌲',
    badge: 'Hierarchical • O(h)',
    timeComplexity: {
      best: 'O(1) (target at root)',
      average: 'O(log n) (balanced tree)',
      worst: 'O(n) (skewed stick)',
    },
    spaceComplexity: 'O(h) Stack depth',
    summary:
      'A Binary Search Tree enforces the invariant: every node in the left subtree is smaller than the parent, and every node in the right subtree is larger. Searching compares against the current node and branches left or right.',
    metaphor:
      'Like a signpost at a garden trail fork: "All trees under 50 feet tall turn Left; all trees over 50 feet tall turn Right."',
    howItWorks: [
      'Start at the root node.',
      'If Target == Node.value: Match found!',
      'If Target < Node.value: Traverse to the left child.',
      'If Target > Node.value: Traverse to the right child.',
      'If child is null: Target does not exist in the tree.',
    ],
    visualCues: [
      { label: 'Rose Node', description: 'Currently inspected tree node', color: '#F1B4B1' },
      { label: 'Amber Branch', description: 'Directional decision chosen (Left/Right)', color: '#FFE0AF' },
      { label: 'Sage Green Node', description: 'Match found in the tree!', color: '#939F7F' },
    ],
    recommendedControls:
      'Change the Target input in the controls toolbar (e.g., 20, 60, or 80) and click Play to watch the tree descent!',
    proTip:
      'If elements are inserted in already-sorted order, a plain BST degenerates into a flat linked list with O(n) height. Self-balancing trees (AVL or Red-Black trees) prevent this by rotating nodes.',
  },

  'tree-inorder': {
    id: 'tree-inorder',
    name: 'Inorder Tree Traversal',
    category: 'tree',
    tagline: 'Sorted Ascending Floral Harvest',
    icon: '🌻',
    badge: 'L-N-R • O(n)',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)',
    },
    spaceComplexity: 'O(h) Call stack',
    summary:
      'Inorder traversal visits nodes in the sequence: Left Subtree, Current Node, Right Subtree (L-N-R). When executed on a Binary Search Tree, it visits all values in strict ascending sorted order!',
    metaphor:
      'Like pruning garden plants strictly from west to east: you inspect the leftmost bush first, trim the central trunk, and then prune the eastern branch.',
    howItWorks: [
      'Recursively traverse the left subtree.',
      'Process / print the current node.',
      'Recursively traverse the right subtree.',
      'Yields a perfectly sorted list for any valid BST!',
    ],
    visualCues: [
      { label: 'Traversed Sequence', description: 'Nodes appended in ascending order', color: '#939F7F' },
      { label: 'Amber Active', description: 'Node currently being processed', color: '#FFE0AF' },
    ],
    recommendedControls:
      'Switch between Inorder, Preorder, and Postorder in the "Operation" dropdown to compare their visit order side-by-side!',
    proTip:
      'Because Inorder on a BST visits items in sorted order, it is commonly used to validate whether a binary tree satisfies the BST property in O(n) time.',
  },

  // ==========================================
  // DYNAMIC PROGRAMMING ALGORITHMS
  // ==========================================
  fibonacci: {
    id: 'fibonacci',
    name: 'Fibonacci DP (Memoization & Tabulation)',
    category: 'dp',
    tagline: 'Golden Ratio Subproblem Re-use',
    icon: '🧮',
    badge: 'Linear DP • O(n)',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n) (vs O(2ⁿ) naive recursion)',
    },
    spaceComplexity: 'O(n) Table (or O(1) space)',
    summary:
      'The naive recursive Fibonacci recalculates identical subproblems exponentially O(2ⁿ). Dynamic Programming solves this by storing answers to smaller subproblems in a table, transforming exponential runtime into blazing O(n) linear time.',
    metaphor:
      'Writing answers down on a notepad: the first time you calculate 13 + 8 = 21, you jot it down. Next time anyone asks, you glance at the pad instead of recalculating from scratch!',
    howItWorks: [
      'Base cases: F(0) = 0, F(1) = 1.',
      'For each step i from 2 to N: look up F(i-1) and F(i-2).',
      'Compute F(i) = F(i-1) + F(i-2) and record in the memoization table.',
      'The final answer F(N) is computed in exactly N simple additions.',
    ],
    visualCues: [
      { label: 'Amber Dependency Cells', description: 'The two parent cells being added: F(i-1) + F(i-2)', color: '#FFE0AF' },
      { label: 'Rose Target Cell', description: 'The new table entry being populated', color: '#F1B4B1' },
      { label: 'Sage Green Table', description: 'Pre-computed subproblems ready for instant reuse', color: '#939F7F' },
    ],
    recommendedControls:
      'Change N to 10 or 12 in the input box and click Play to see the table fill up bottom-up in real time!',
    proTip:
      'Naive recursive Fibonacci for N=40 takes over 1,000,000,000 operations! With DP, it takes just 40 operations—a 25,000,000x speedup!',
  },

  'coin-change': {
    id: 'coin-change',
    name: 'Coin Change Problem (Min Coins)',
    category: 'dp',
    tagline: 'Greedy Pitfalls vs Optimal Subproblems',
    icon: '🪙',
    badge: 'Optimization • O(n × amount)',
    timeComplexity: {
      best: 'O(n × amount)',
      average: 'O(n × amount)',
      worst: 'O(n × amount)',
    },
    spaceComplexity: 'O(amount) DP Array',
    summary:
      'Given coin denominations (e.g. [1, 2, 5]), find the minimum number of coins needed to make target amount. Greedy choices can fail on arbitrary denominations, but Dynamic Programming tests all coin transitions to guarantee the absolute global minimum.',
    metaphor:
      'Like planning the fewest garden stone steps to cross a creek: at each step, you test stepping forward by 1, 2, or 5 stones, recording the path that required the fewest total hops.',
    howItWorks: [
      'Create DP array where dp[i] represents min coins to make amount i.',
      'Base case: dp[0] = 0, all other cells initialized to ∞.',
      'For each sub-amount i from 1 to target: check each coin c.',
      'If i >= c: dp[i] = min(dp[i], dp[i - c] + 1).',
    ],
    visualCues: [
      { label: 'Coin Choice Tabs', description: 'Denominations [1, 2, 5] being tested', color: '#7EA172' },
      { label: 'Amber Subproblem', description: 'Looking back at dp[amount - coin]', color: '#FFE0AF' },
      { label: 'Rose Minimum', description: 'Optimal minimum coins chosen for this amount', color: '#F1B4B1' },
    ],
    recommendedControls:
      'Try setting Target Amount to 7 or 11. Watch how the DP array considers using 5-cent coins to minimize the total coin count!',
    proTip:
      'In a coin system with denominations [1, 3, 4], making 6 cents with a greedy approach picks 4 + 1 + 1 (3 coins), whereas DP finds the true optimal solution 3 + 3 (only 2 coins)!',
  },
};

export function getAlgorithmDemo(algoKey: string, lab: string): AlgorithmDemoInfo {
  // Map lab + algorithm keys to our demo database
  if (lab === 'sorting') {
    return PLAYGROUND_ALGORITHMS_DATA[algoKey] || PLAYGROUND_ALGORITHMS_DATA['selection'];
  }
  if (lab === 'search') {
    return PLAYGROUND_ALGORITHMS_DATA[algoKey] || PLAYGROUND_ALGORITHMS_DATA['binary'];
  }
  if (lab === 'graph') {
    return PLAYGROUND_ALGORITHMS_DATA[algoKey] || PLAYGROUND_ALGORITHMS_DATA['bfs'];
  }
  if (lab === 'tree') {
    if (algoKey === 'search') return PLAYGROUND_ALGORITHMS_DATA['tree-search'];
    return PLAYGROUND_ALGORITHMS_DATA['tree-inorder'];
  }
  if (lab === 'dp') {
    return PLAYGROUND_ALGORITHMS_DATA[algoKey] || PLAYGROUND_ALGORITHMS_DATA['fibonacci'];
  }
  return PLAYGROUND_ALGORITHMS_DATA['selection'];
}
