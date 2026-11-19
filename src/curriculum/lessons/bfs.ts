import { AlgorithmLesson } from '../../types';

export const bfsLesson: AlgorithmLesson = {
  id: 'breadth-first-search',
  title: 'Breadth-First Search (BFS)',
  tagline: 'The ripple in the pond',
  difficulty: 'Intermediate',
  category: 'Graphs',
  level: 7,
  estimatedMinutes: 20,
  flowerType: 'lotus',
  prerequisites: ['Queues (FIFO)', 'Graph Adjacency Lists', 'Visited Sets'],
  objectives: [
    'Understand level-by-level frontier expansion using a FIFO queue',
    'Prove why BFS guarantees unweighted shortest paths',
    'Track visited vertices to prevent infinite cycles',
    'Implement BFS across Python, JavaScript, C++, and Java',
  ],

  simpleExplanation:
    'Breadth-First Search (BFS) explores a graph like ripples expanding outwards when a stone drops into a calm garden pond. Starting from a chosen root vertex, it visits all immediate neighbors (distance 1) first. Only after every neighbor at distance 1 has been visited does it move to distance 2, then distance 3, and so on. Because it visits layer by layer, it is guaranteed to find the shortest path in any unweighted graph!',
  eli5:
    'Imagine you are looking for your lost pet puppy in your neighborhood. First, you check your own front yard and backyard (1 step away). Still no puppy? Next, you check all your immediate neighbors’ houses (2 steps away). You do not run 5 miles down the highway before checking your neighbor next door! You search in widening circles. That is BFS!',

  whyNeeded: {
    problemSolved:
      'Finding the shortest path (minimum edge count) between nodes in an unweighted graph and exploring connected frontiers.',
    historicalContext:
      'Conceived by Edward F. Moore in 1959 for finding the shortest path through a maze, and independently developed by C.Y. Lee in 1961 for routing wires on circuit boards.',
    alternatives: ['Depth-First Search (DFS - uses stack, goes deep)', 'Dijkstra’s Algorithm (for weighted graphs)', 'A* Search (for heuristic pathfinding)'],
    whenToUse: [
      'Finding the shortest path in unweighted graphs or uniform-cost grids',
      'Finding all nodes within k hops of a starting user (e.g. LinkedIn 1st/2nd degree connections)',
      'Finding connected components or island counts in 2D grids',
      'Web crawlers discovering links level-by-level',
    ],
    whenToAvoid: [
      'Edges have varying positive weights (use Dijkstra’s Algorithm instead)',
      'Memory is strictly limited on graphs with high branching factor (queue size grows to O(V))',
      'Searching for any solution where depth-first backtracking is more natural (e.g. Sudoku, N-Queens)',
    ],
  },

  realLifeAnalogy: {
    title: 'Watering the Botanical Terraces',
    story:
      'Water enters a stone fountain at the summit of a botanical garden terrace. It spills evenly into all Tier 1 basins. When Tier 1 basins overflow, water trickles down to fill Tier 2 basins. Water never skips Tier 1 to fill Tier 3 first; it advances layer by layer across the entire landscape.',
    moral:
      'BFS respects distance tiers, ensuring every node at distance d is reached before distance d + 1.',
  },

  steps: [
    {
      phase: 'Step 1: Initialize Queue & Visited Set',
      description: 'Create an empty FIFO queue and a visited set.',
      details: 'Enqueue the starting node and add it to the visited set to prevent reprocessing.',
    },
    {
      phase: 'Step 2: Dequeue Current Node',
      description: 'While queue is not empty, dequeue front vertex `u`.',
      details: 'Process `u` (e.g. check if target found or record traversal order).',
    },
    {
      phase: 'Step 3: Explore Neighbors',
      description: 'Iterate over every adjacent neighbor `v` of `u`.',
      details: 'If `v` has NOT been visited yet: mark `v` as visited and enqueue `v`.',
    },
    {
      phase: 'Step 4: Continue Until Empty',
      description: 'Repeat Steps 2–3 until the queue is exhausted.',
      details: 'Every reachable vertex has now been visited at its minimum edge distance.',
    },
  ],

  defaultInput: { startNode: 'A' },

  pseudocode: [
    { line: 1, code: 'function BFS(graph, startNode):', explanation: 'Takes graph and origin vertex' },
    { line: 2, code: '  visited = set([startNode])', explanation: 'Track visited nodes to prevent cycles' },
    { line: 3, code: '  queue = [startNode]', explanation: 'Initialize FIFO queue with start node' },
    { line: 4, code: '  while queue is not empty:', explanation: 'Continue while frontier nodes exist' },
    { line: 5, code: '    current = queue.pop_front()', explanation: 'Dequeue node at front of line' },
    { line: 6, code: '    for neighbor in graph[current]:', explanation: 'Check all adjacent connections' },
    { line: 7, code: '      if neighbor not in visited:', explanation: 'Only visit undiscovered vertices' },
    { line: 8, code: '        visited.add(neighbor)', explanation: 'Mark visited immediately upon discovery' },
    { line: 9, code: '        queue.push_back(neighbor)', explanation: 'Add neighbor to back of queue' },
  ],

  code: {
    python: `from collections import deque

def bfs(graph, start_node):
    """
    Breadth-First Search on adjacency graph.
    Returns list of vertices in BFS order.
    Time: O(V + E), Space: O(V)
    """
    visited = set([start_node])
    queue = deque([start_node])
    order = []

    while queue:
        vertex = queue.popleft()
        order.append(vertex)

        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return order

# Example:
garden_graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'C'],
    'C': ['A', 'B', 'D', 'E'],
    'D': ['B', 'C', 'F'],
    'E': ['C', 'F'],
    'F': ['D', 'E']
}
print(bfs(garden_graph, 'A'))
# Output: ['A', 'B', 'C', 'D', 'E', 'F']`,

    javascript: `function bfs(graph, startNode) {
  const visited = new Set([startNode]);
  const queue = [startNode];
  const order = [];

  while (queue.length > 0) {
    const vertex = queue.shift();
    order.push(vertex);

    const neighbors = graph[vertex] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return order;
}

// Example:
const garden = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A', 'E'],
  D: ['B', 'F'],
  E: ['C', 'F'],
  F: ['D', 'E']
};
console.log(bfs(garden, 'A')); // ['A', 'B', 'C', 'D', 'E', 'F']`,

    cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>
#include <unordered_set>

std::vector<std::string> bfs(const std::unordered_map<std::string, std::vector<std::string>>& graph, const std::string& start) {
    std::vector<std::string> order;
    std::unordered_set<std::string> visited;
    std::queue<std::string> q;

    visited.insert(start);
    q.push(start);

    while (!q.empty()) {
        std::string curr = q.front();
        q.pop();
        order.push_back(curr);

        if (graph.find(curr) != graph.end()) {
            for (const auto& neighbor : graph.at(curr)) {
                if (visited.find(neighbor) == visited.end()) {
                    visited.insert(neighbor);
                    q.push(neighbor);
                }
            }
        }
    }
    return order;
}

int main() {
    std::unordered_map<std::string, std::vector<std::string>> graph = {
        {"A", {"B", "C"}}, {"B", {"D"}}, {"C", {"E"}}, {"D", {"F"}}, {"E", {"F"}}, {"F", {}}
    };
    auto res = bfs(graph, "A");
    for (const auto& s : res) std::cout << s << " ";
    return 0;
}`,

    java: `import java.util.*;

public class BFS {
    public static List<String> traverse(Map<String, List<String>> graph, String start) {
        List<String> order = new ArrayList<>();
        Set<String> visited = new HashSet<>();
        Queue<String> queue = new LinkedList<>();

        visited.add(start);
        queue.add(start);

        while (!queue.isEmpty()) {
            String curr = queue.poll();
            order.add(curr);

            List<String> neighbors = graph.getOrDefault(curr, Collections.emptyList());
            for (String neighbor : neighbors) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.add(neighbor);
                }
            }
        }
        return order;
    }

    public static void main(String[] args) {
        Map<String, List<String>> graph = new HashMap<>();
        graph.put("A", Arrays.asList("B", "C"));
        graph.put("B", Arrays.asList("D"));
        graph.put("C", Arrays.asList("E"));
        System.out.println(traverse(graph, "A"));
    }
}`,
  },

  complexity: {
    bestTime: 'O(V + E)',
    bestReason: 'Every vertex is enqueued at most once and every edge is traversed once in an adjacency list.',
    averageTime: 'O(V + E)',
    averageReason: 'Linear in total vertices V plus total edges E.',
    worstTime: 'O(V + E)',
    worstReason: 'Full exploration of disconnected or dense components inspects all V vertices and E edges.',
    space: 'O(V)',
    spaceReason: 'Queue can hold up to V/2 vertices at the widest layer, and visited set stores all V vertices.',
    auxiliarySpace: 'O(V)',
  },

  whenToUsePractical: [
    {
      scenario: 'Finding the shortest subway route between two stations',
      reason: 'If every subway stop is considered 1 hop, BFS guarantees finding the route with minimum stops.',
      recommendation: 'Use BFS.',
    },
    {
      scenario: 'Finding 1st and 2nd degree friends on social media',
      reason: 'BFS naturally groups nodes by exact hop distance (Level 1 = 1st degree, Level 2 = 2nd degree).',
      recommendation: 'Use BFS with level tracking.',
    },
    {
      scenario: 'Finding the shortest driving route where roads have different speed limits and lengths',
      reason: 'BFS only considers edge count, not edge weights; a path with 2 slow miles might lose to 3 fast miles.',
      recommendation: 'Do NOT use BFS. Use Dijkstra or A*.',
    },
  ],

  commonMistakes: [
    {
      mistake: 'Marking a node as visited when dequeuing instead of when enqueuing',
      whyItHappens: 'If you wait until `popleft()` to mark visited, the same neighbor will be added to the queue dozens of times by other neighbors before being popped, causing exponential queue explosion!',
      howToFix: 'Always mark `visited.add(neighbor)` immediately at the moment you enqueue it.',
    },
    {
      mistake: 'Using a LIFO Stack instead of a FIFO Queue',
      whyItHappens: 'In JavaScript or Python, using `pop()` instead of `shift()` / `popleft()` accidentally converts your BFS into a DFS!',
      howToFix: 'Ensure FIFO order: push to back, pop from front.',
    },
    {
      mistake: 'Assuming BFS finds shortest paths on weighted graphs',
      whyItHappens: 'Forgetting that BFS treats all edges as having weight 1.',
      howToFix: 'If edges have non-unit weights, use Dijkstra’s algorithm.',
    },
  ],

  quiz: [
    {
      id: 'bfs-q1',
      type: 'definition',
      question: 'Which fundamental data structure powers Breadth-First Search?',
      options: [
        'FIFO Queue (First-In, First-Out)',
        'LIFO Stack (Last-In, First-Out)',
        'Binary Heap',
        'Hash Map',
      ],
      correctIndex: 0,
      explanation:
        'A FIFO queue ensures that nodes discovered earlier (closer levels) are processed before nodes discovered later (deeper levels).',
      whyWrong: [
        'A LIFO Stack powers Depth-First Search (DFS).',
        'A Binary Heap powers Dijkstra’s algorithm or Prim’s MST.',
        'A Hash Map stores key-value pairs or adjacency lists.',
      ],
      miniExample: 'Enqueue A → Enqueue B, C → Dequeue A → Process B, C in arrival order.',
    },
    {
      id: 'bfs-q2',
      type: 'conceptual',
      question: 'Why does BFS guarantee the shortest path in an UNWEIGHTED graph?',
      options: [
        'Because it visits all nodes at distance d before ever visiting any node at distance d + 1',
        'Because it sorts the edge weights using merge sort',
        'Because it only visits nodes with prime numbers',
        'Because it guesses the destination using heuristics',
      ],
      correctIndex: 0,
      explanation:
        'Since BFS explores radially in concentric rings of distance 1, 2, 3..., the first time the destination node is encountered is mathematically guaranteed to be the shortest edge path.',
      whyWrong: [
        'Unweighted graphs have no edge weights to sort.',
        'Node values or prime numbers do not affect graph geometry.',
        'Heuristic guessing belongs to A* search, not BFS.',
      ],
    },
    {
      id: 'bfs-q3',
      type: 'step-by-step',
      question: 'Starting from A in graph A->[B, C], B->[D], C->[E], which node is visited third in BFS?',
      options: ['Node C', 'Node D', 'Node E', 'Node B'],
      correctIndex: 0,
      explanation:
        'Order: 1st is A (level 0). 2nd is B (level 1). 3rd is C (level 1). Only after level 1 completes do D and E (level 2) get visited.',
      whyWrong: [
        'Node D is level 2, visited 4th.',
        'Node E is level 2, visited 5th.',
        'Node B is visited 2nd.',
      ],
      miniExample: 'Level 0: [A] → Level 1: [B, C] → Level 2: [D, E].',
    },
    {
      id: 'bfs-q4',
      type: 'practical',
      question: 'When must you mark a neighbor node as `visited` in BFS to prevent queue memory blowout?',
      options: [
        'Immediately when the node is added to the queue',
        'When the node is removed from the queue',
        'After all of its neighbors are visited',
        'At the very end of the entire program',
      ],
      correctIndex: 0,
      explanation:
        'If you mark visited only when popping, multiple earlier neighbors can add duplicate copies of the same node into the queue, causing catastrophic memory waste.',
      whyWrong: [
        'Marking upon dequeue causes duplicate enqueues.',
        'Waiting until all neighbors are visited causes infinite loops on cycles.',
        'Marking at program end offers zero cycle protection.',
      ],
    },
    {
      id: 'bfs-q5',
      type: 'complexity',
      question: 'What is the time complexity of BFS on a graph with V vertices and E edges represented as an adjacency list?',
      options: ['O(V + E)', 'O(V * E)', 'O(V²)', 'O(log V)'],
      correctIndex: 0,
      explanation:
        'Each vertex is pushed and popped from the queue at most once (O(V)), and each edge is inspected at most once per direction (O(E)). Total time is O(V + E).',
      whyWrong: [
        'O(V * E) is Bellman-Ford complexity.',
        'O(V²) is adjacency matrix BFS complexity, but adjacency lists take O(V + E).',
        'O(log V) is insufficient to inspect an entire graph.',
      ],
    },
  ],

  recap: {
    takeaways: [
      'BFS explores graphs level-by-level using a FIFO queue.',
      'Guarantees shortest path in unweighted graphs.',
      'Time complexity is O(V + E) using adjacency lists.',
      'Auxiliary space is O(V) for the queue and visited set.',
      'Mark nodes visited upon enqueue to prevent redundant queue bloat.',
    ],
    keyTerms: [
      { term: 'Frontier', definition: 'The active set of nodes currently queued for expansion.' },
      { term: 'FIFO Queue', definition: 'First-in, first-out ordering ensuring level-by-level processing.' },
      { term: 'Unweighted Graph', definition: 'A graph where every edge has identical traversal cost.' },
    ],
    finalChallengePrompt: 'Can you modify BFS to output the actual shortest path list of nodes from start to destination, not just the distance?',
  },

  relearn: {
    conceptKey: 'bfs-basics',
    simplifiedTitle: 'The Ripple in the Garden Pond',
    differentAnalogy:
      'Imagine dropping a rose pebble into a quiet pond. What happens? A tiny circle ripples outwards. Then a bigger circle. Then a bigger circle. The ripple touches everything 1 foot away first. Then 2 feet away. Then 3 feet away. It never teleports 10 feet away before finishing the closer circles! That gentle ripple is Breadth-First Search.',
    babySteps: [
      '1. Put your starting flower in a line (the Queue).',
      '2. Mark it with a little tag: "I have been here!"',
      '3. Take the first flower out of the line.',
      '4. Look at all its neighboring petals.',
      '5. For any petal that does not have a tag: tag it and put it at the end of the line.',
      '6. Repeat until the line is completely empty.',
    ],
    workedExample:
      'Start at Home (H). Neighbors: Park (P) and School (S).\n- Line: [H]\n- Pop H: Add untagged neighbors P and S to line: [P, S].\n- Pop P: Add its neighbor Library (L): [S, L].\n- Pop S: Done.\n- Pop L: Done.\n- Explored: H → P, S (1 step) → L (2 steps)!',
    miniPractice: [
      {
        id: 'bfs-mini-1',
        type: 'definition',
        question: 'Does BFS search wide (across neighbors) or deep (down a single tunnel)?',
        options: ['Wide (across all neighbors first)', 'Deep (down a single tunnel)', 'It does not move at all', 'Backwards only'],
        correctIndex: 0,
        explanation: 'BFS stands for Breadth-First: it expands broadly across neighbors first!',
      },
      {
        id: 'bfs-mini-2',
        type: 'conceptual',
        question: 'Why do we need a "Visited" tag on nodes?',
        options: [
          'To stop us from walking in endless circles forever',
          'To make the node turn pink',
          'To erase the graph',
          'It is not needed at all',
        ],
        correctIndex: 0,
        explanation: 'Without a visited tag, two connected nodes would keep adding each other to the queue endlessly!',
      },
      {
        id: 'bfs-mini-3',
        type: 'step-by-step',
        question: 'If you want to find the fewest subway transfers, is BFS the right tool?',
        options: [
          'Yes! BFS finds the route with the fewest hops',
          'No, you should use a coin flip',
          'Only if the train is blue',
          'No, BFS only works on trees',
        ],
        correctIndex: 0,
        explanation: 'Because each transfer is 1 hop, BFS naturally finds the fewest hops!',
      },
    ],
    buddyEncouragement:
      "Water ripples outward so naturally, and so does BFS! You're flowing through graph theory like a calm mountain brook. Ready to bloom on the quiz? 🌸",
  },
};
