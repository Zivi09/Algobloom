import { AlgorithmLesson } from '../../types';

export const dfsLesson: AlgorithmLesson = {
  id: 'depth-first-search',
  title: 'Depth-First Search (DFS)',
  tagline: 'The daring maze explorer',
  difficulty: 'Intermediate',
  category: 'Graphs',
  level: 7,
  estimatedMinutes: 20,
  flowerType: 'orchid',
  prerequisites: ['Recursion', 'Call Stack', 'Graph Adjacency Lists'],
  objectives: [
    'Master deep branch exploration and recursive backtracking',
    'Understand topological sorting and cycle detection with back edges',
    'Compare call-stack recursion with explicit LIFO stack iteration',
    'Implement DFS across Python, JavaScript, C++, and Java',
  ],

  simpleExplanation:
    'Depth-First Search (DFS) is like exploring a mysterious botanical hedge maze by picking one hallway and running as deep as possible until you hit a dead end. When you hit a dead end, you backtrack one step to the previous junction and explore the next untried hallway. It uses a LIFO stack (or recursion) to remember the breadcrumbs of your journey.',
  eli5:
    'Imagine digging for treasure. Instead of sweeping the surface of the whole yard, you pick one spot and dig straight down as deep as you can! If you hit bedrock without finding treasure, you climb up one meter and dig a side tunnel. You explore every tunnel to its very end before coming back up.',

  whyNeeded: {
    problemSolved:
      'Exhaustive state space exploration, path finding, cycle detection, topological sorting, and solving constraint satisfaction puzzles (mazes, Sudoku).',
    historicalContext:
      'Formally investigated in the 19th century by French mathematician Pierre Charles Trémaux as a strategy for solving arbitrary mazes without getting lost (Trémaux’s algorithm).',
    alternatives: ['Breadth-First Search (BFS - level by level)', 'Dijkstra (weighted shortest paths)', 'A* (heuristic search)'],
    whenToUse: [
      'Topological sorting of Directed Acyclic Graphs (DAGs) like package dependency resolution',
      'Cycle detection in graphs (detecting deadlocks in operating systems)',
      'Finding strongly connected components (Tarjan / Kosaraju)',
      'Backtracking puzzle solving (mazes, N-Queens, Sudoku)',
    ],
    whenToAvoid: [
      'Finding shortest paths in unweighted graphs (BFS is strictly superior; DFS can find needlessly convoluted paths)',
      'Graphs with infinite or extremely deep branches where memory stack overflow occurs',
    ],
  },

  realLifeAnalogy: {
    title: 'The Labyrinth and the Ball of Yarn',
    story:
      'Theseus enters the Cretan labyrinth holding a ball of golden yarn tied to the entrance. He walks forward, unspooling yarn behind him. At every fork, he chooses a path and keeps marching until hitting a dead end. He then rewinds his yarn back to the junction and tries the other branch.',
    moral:
      'The call stack is the algorithmic spool of golden yarn: pushing frames as you descend, and popping frames as you backtrack.',
  },

  steps: [
    {
      phase: 'Step 1: Start at Origin',
      description: 'Call `DFS(startNode)`. Mark `startNode` as visited.',
      details: 'Push `startNode` onto the call stack.',
    },
    {
      phase: 'Step 2: Inspect Neighbors',
      description: 'Loop through all adjacent vertices `neighbor` of `current`.',
      details: 'If `neighbor` is NOT visited, immediately recurse into `DFS(neighbor)`.',
    },
    {
      phase: 'Step 3: Dive Deep',
      description: 'Continue recursing down the branch until a node with no unvisited neighbors is reached.',
      details: 'This is the "dead end" of the current branch.',
    },
    {
      phase: 'Step 4: Backtrack',
      description: 'When all neighbors of a node are visited, pop the current node from the call stack and return to caller.',
      details: 'Allows exploring untried sister branches.',
    },
  ],

  defaultInput: { startNode: 'A' },

  pseudocode: [
    { line: 1, code: 'function DFS(graph, node, visited):', explanation: 'Recursive traversal' },
    { line: 2, code: '  visited.add(node)', explanation: 'Mark node as visited' },
    { line: 3, code: '  process(node)', explanation: 'Handle current node' },
    { line: 4, code: '  for neighbor in graph[node]:', explanation: 'Examine adjacent connections' },
    { line: 5, code: '    if neighbor not in visited:', explanation: 'Only proceed to unvisited vertices' },
    { line: 6, code: '      DFS(graph, neighbor, visited)', explanation: 'Recurse deeper down branch' },
  ],

  code: {
    python: `def dfs(graph, start, visited=None, order=None):
    """
    Depth-First Search using recursion.
    Time: O(V + E), Space: O(V)
    """
    if visited is None: visited = set()
    if order is None: order = []

    visited.add(start)
    order.append(start)

    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            dfs(graph, neighbor, visited, order)

    return order

# Example:
garden = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['E'],
    'D': ['F'],
    'E': ['F'],
    'F': []
}
print(dfs(garden, 'A')) # ['A', 'B', 'D', 'F', 'E', 'C']`,

    javascript: `function dfs(graph, start, visited = new Set(), order = []) {
  visited.add(start);
  order.push(start);

  const neighbors = graph[start] || [];
  for (const neighbor of neighbors) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited, order);
    }
  }

  return order;
}

const garden = {
  A: ['B', 'C'],
  B: ['D'],
  C: ['E'],
  D: ['F'],
  E: ['F'],
  F: []
};
console.log(dfs(garden, 'A'));`,

    cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <unordered_set>

void dfs(const std::unordered_map<std::string, std::vector<std::string>>& graph,
         const std::string& curr,
         std::unordered_set<std::string>& visited,
         std::vector<std::string>& order) {
    visited.insert(curr);
    order.push_back(curr);

    if (graph.find(curr) != graph.end()) {
        for (const auto& neighbor : graph.at(curr)) {
            if (visited.find(neighbor) == visited.end()) {
                dfs(graph, neighbor, visited, order);
            }
        }
    }
}`,

    java: `import java.util.*;

public class DFS {
    public static void traverse(Map<String, List<String>> graph, String curr, Set<String> visited, List<String> order) {
        visited.add(curr);
        order.add(curr);

        for (String neighbor : graph.getOrDefault(curr, Collections.emptyList())) {
            if (!visited.contains(neighbor)) {
                traverse(graph, neighbor, visited, order);
            }
        }
    }
}`,
  },

  complexity: {
    bestTime: 'O(V + E)',
    bestReason: 'Every vertex and edge in the connected component is inspected exactly once.',
    averageTime: 'O(V + E)',
    averageReason: 'Linear traversal across adjacency graph representation.',
    worstTime: 'O(V + E)',
    worstReason: 'Full component graph traversal.',
    space: 'O(V)',
    spaceReason: 'Call stack depth can reach V in a linear degenerated tree/line graph.',
    auxiliarySpace: 'O(V)',
  },

  whenToUsePractical: [
    {
      scenario: 'Detecting cycles in a software build dependency graph (e.g. package A depends on B which depends on A)',
      reason: 'DFS tracks "in-progress" nodes on the active recursion stack (back edges detect cycles).',
      recommendation: 'Use DFS 3-color cycle detection.',
    },
    {
      scenario: 'Solving a Sudoku or N-Queens puzzle',
      reason: 'Placing a candidate and backtracking upon conflict matches DFS execution tree perfectly.',
      recommendation: 'Use DFS with backtracking.',
    },
    {
      scenario: 'Finding the shortest road route between two cities',
      reason: 'DFS does not find shortest paths; it might take a 20-city detour before exploring the direct 1-hop path.',
      recommendation: 'Do NOT use DFS. Use BFS or Dijkstra.',
    },
  ],

  commonMistakes: [
    {
      mistake: 'Assuming DFS finds the shortest path',
      whyItHappens: 'Because it dives deep, the first path it finds can be needlessly long and circuitous.',
      howToFix: 'Use BFS for unweighted shortest paths and Dijkstra for weighted shortest paths.',
    },
    {
      mistake: 'Causing stack overflow on massive graphs',
      whyItHappens: 'Languages like Python have default recursion limits (1,000 frames). A chain of 5,000 nodes will crash.',
      howToFix: 'Use an iterative DFS with an explicit `list` as a heap-allocated stack.',
    },
    {
      mistake: 'Forgetting to backtrack state when solving puzzles',
      whyItHappens: 'In maze or Sudoku backtracking, forgetting to reset `visited.remove(node)` or undo choices when returning prevents exploring other valid branches.',
      howToFix: 'Pair each forward move with an explicit undo step after recursive return.',
    },
  ],

  quiz: [
    {
      id: 'dfs-q1',
      type: 'definition',
      question: 'Which underlying data structure governs Depth-First Search execution?',
      options: [
        'LIFO Stack (or system call stack)',
        'FIFO Queue',
        'Min-Heap Priority Queue',
        'Doubly Linked Circular List',
      ],
      correctIndex: 0,
      explanation:
        'DFS operates via Last-In, First-Out (LIFO) semantics, either through the function call stack or an explicit stack data structure.',
      whyWrong: [
        'A FIFO queue powers BFS.',
        'A Min-Heap powers Dijkstra or Prim’s algorithm.',
        'Doubly linked lists do not define DFS semantics.',
      ],
      miniExample: 'Push A → Push B → Push D → Pop D (backtrack) → Pop B.',
    },
    {
      id: 'dfs-q2',
      type: 'conceptual',
      question: 'How does DFS detect a cycle in a directed graph?',
      options: [
        'By encountering an edge that points to an ancestor node currently active on the recursion call stack (a back edge)',
        'By checking if total vertices is an odd number',
        'By timing how many seconds the loop runs',
        'By calculating the determinant of the adjacency matrix',
      ],
      correctIndex: 0,
      explanation:
        'If a node points back to a vertex that is currently being visited (on the recursion stack), a directed cycle exists.',
      whyWrong: [
        'Vertex count parity has no relation to cycles.',
        'Timing does not prove cycle existence.',
        'Matrix determinants do not directly identify directed cycle paths.',
      ],
    },
    {
      id: 'dfs-q3',
      type: 'step-by-step',
      question: 'In graph with root A, children B and C, where B has child D and C has child E: what is a valid DFS order?',
      options: ['A → B → D → C → E', 'A → B → C → D → E', 'A → D → E → B → C', 'D → E → B → C → A'],
      correctIndex: 0,
      explanation:
        'DFS visits A, dives deep into branch B, dives into D, hits dead end, backtracks to A, then explores branch C and E.',
      whyWrong: [
        'A → B → C → D → E is BFS level order.',
        'D cannot be visited before B.',
        'Root A must be visited first.',
      ],
      miniExample: 'A → [B → D] → [C → E].',
    },
    {
      id: 'dfs-q4',
      type: 'practical',
      question: 'For which of the following problems is DFS specifically preferred over BFS?',
      options: [
        'Topological Sorting of task dependencies in a build system',
        'Finding the shortest path by fewest hops in a subway map',
        'Finding all friends within 1 degree on social media',
        'Broadcasting a packet to closest routers first',
      ],
      correctIndex: 0,
      explanation:
        'Topological sort is naturally implemented by recording nodes in reverse postorder during a DFS traversal.',
      whyWrong: [
        'Subway fewest hops is a shortest-path problem for BFS.',
        '1st degree friends is radial search for BFS.',
        'Router distance broadcasting is level-order BFS.',
      ],
    },
    {
      id: 'dfs-q5',
      type: 'complexity',
      question: 'What is the auxiliary space complexity of DFS on a graph with V vertices in the worst case (a long linear chain)?',
      options: ['O(V)', 'O(1)', 'O(V²)', 'O(log V)'],
      correctIndex: 0,
      explanation:
        'If the graph is a single straight path (v1 → v2 → v3 ... → vn), the recursion call stack will hold all V frames simultaneously.',
      whyWrong: [
        'O(1) space is only possible if no stack or visited set is kept.',
        'O(V²) space is not needed.',
        'O(log V) is only achieved on balanced trees, not worst-case graphs.',
      ],
    },
  ],

  recap: {
    takeaways: [
      'DFS explores deep down a branch before backtracking using a LIFO stack.',
      'Superb for maze solving, cycle detection, and topological sorting.',
      'Time complexity is O(V + E) using adjacency lists.',
      'Auxiliary space is O(V) for the recursion call stack.',
      'Does NOT guarantee shortest paths (use BFS instead).',
    ],
    keyTerms: [
      { term: 'Backtracking', definition: 'Returning to the previous decision point after exhausting a branch.' },
      { term: 'Back Edge', definition: 'An edge in DFS pointing back to an active ancestor in the call stack.' },
      { term: 'Topological Order', definition: 'Linear ordering of vertices where for every edge u → v, u comes before v.' },
    ],
    finalChallengePrompt: 'Can you implement Kahn’s Algorithm vs DFS Postorder Topological Sort and compare their cycle detection strategies?',
  },

  relearn: {
    conceptKey: 'dfs-basics',
    simplifiedTitle: 'The Maze Explorer with Golden Yarn',
    differentAnalogy:
      'Imagine entering a dark garden hedge maze. You tie one end of a golden string to the entrance. You walk down the first path you see. Fork in the road? Pick left! Keep walking! You hit a stone wall (dead end). What do you do? You don’t panic: you reel in your string step-by-step back to the fork, and try the right path instead. That is Depth-First Search!',
    babySteps: [
      '1. Step onto your starting stone.',
      '2. Mark it with chalk so you never repeat it.',
      '3. Pick any path leading forward and walk all the way until you hit a dead end.',
      '4. Back up one step to the last intersection.',
      '5. Try another untried path.',
      '6. When all paths are tried, back up another step.',
    ],
    workedExample:
      'Maze: Entrance (A) leads to Hallway (B). B leads to Dead End (D). A also leads to Garden (C).\n- Walk: A → B → D (Dead end!).\n- Back up to B → Back up to A.\n- Try remaining path: A → C.\n- Explored: A, B, D, C!',
    miniPractice: [
      {
        id: 'dfs-mini-1',
        type: 'definition',
        question: 'Does DFS explore wide across all neighbors or deep down one hallway?',
        options: ['Deep down one hallway until a dead end', 'Wide across all neighbors', 'It stands still', 'It jumps randomly'],
        correctIndex: 0,
        explanation: 'DFS stands for Depth-First: it dives as deep as possible before coming back up!',
      },
      {
        id: 'dfs-mini-2',
        type: 'conceptual',
        question: 'What is it called when you hit a dead end and step backwards?',
        options: [
          'Backtracking',
          'Fast-forwarding',
          'Restarting the whole computer',
          'Deleting the maze',
        ],
        correctIndex: 0,
        explanation: 'Backtracking is the process of reversing your steps back to the last untried fork in the road!',
      },
      {
        id: 'dfs-mini-3',
        type: 'step-by-step',
        question: 'Does DFS guarantee the shortest path to the exit?',
        options: [
          'No! It might take a long winding detour before finding the exit',
          'Yes, it always finds the shortest route',
          'Only on Tuesdays',
          'Only if the exit is painted blue',
        ],
        correctIndex: 0,
        explanation: 'Because it charges deep down the first branch it sees, it often finds long paths. Use BFS for shortest paths!',
      },
    ],
    buddyEncouragement:
      "Backtracking is how we learn from our mistakes and find the true path through any labyrinth! You're an incredible problem solver. Let's bloom on the quiz! 🌸",
  },
};
