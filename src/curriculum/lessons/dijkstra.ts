import { AlgorithmLesson } from '../../types';

export const dijkstraLesson: AlgorithmLesson = {
  id: 'dijkstra',
  title: "Dijkstra's Shortest Path",
  tagline: 'The optimal pathfinder across weighted terrains',
  difficulty: 'Intermediate',
  category: 'Shortest Path',
  level: 8,
  estimatedMinutes: 25,
  flowerType: 'sunflower',
  prerequisites: ['Breadth-First Search', 'Priority Queues / Min-Heaps', 'Weighted Graphs'],
  objectives: [
    'Master greedy frontier relaxation on weighted graphs',
    'Understand why Dijkstra strictly requires non-negative edge weights',
    'Implement Dijkstra using Min-Heaps for O((V + E) log V) efficiency',
    'Contrast Dijkstra with Bellman-Ford and A* search',
  ],

  simpleExplanation:
    "Dijkstra's Algorithm finds the shortest route from a starting vertex to every other vertex in a weighted graph. Unlike BFS (which only counts the number of hops), Dijkstra accounts for actual edge costs—like miles, toll fees, or minutes. It works greedily: at every step, it chooses the unvisited vertex with the smallest known tentative distance, finalizes that distance as optimal, and updates (relaxes) all of its neighbors.",
  eli5:
    'Imagine you are hiking through a mountain garden with signposts. Every trail has a sign saying how many minutes it takes. You want to reach the tea house as fast as possible. At every trail junction, you always choose the path that gets you closest to your goal based on total minutes walked so far. Once you reach a junction via the shortest path, you never need to reconsider it!',

  whyNeeded: {
    problemSolved:
      'Single-source shortest paths on directed or undirected graphs with non-negative edge weights.',
    historicalContext:
      'Designed by Dutch computer scientist Edsger W. Dijkstra in 1956 in just 20 minutes while having coffee with his fiancée in Amsterdam! He wanted to demonstrate the computing prowess of the new ARMAC computer by finding the shortest road route between Dutch cities.',
    alternatives: ['Bellman-Ford (supports negative weights, but slower O(V * E))', 'Floyd-Warshall (all-pairs O(V³))', 'A* Search (faster single-destination pathfinding using heuristics)'],
    whenToUse: [
      'GPS navigation and mapping applications (Google Maps, OpenStreetMap)',
      'Network routing protocols (OSPF - Open Shortest Path First, IS-IS)',
      'Transportation logistics, flight routing, and package delivery optimization',
    ],
    whenToAvoid: [
      'Graphs with negative edge weights (Dijkstra fails because finalized nodes cannot be updated; use Bellman-Ford instead)',
      'Unweighted graphs (simple BFS is faster at O(V + E) without heap overhead)',
      'Single-pair goal-directed pathfinding with spatial coordinates (A* is much faster)',
    ],
  },

  realLifeAnalogy: {
    title: 'The Irrigation Canal Network',
    story:
      'Imagine turning on a master water valve at a garden spring. Water flows simultaneously into connecting stone aqueducts at speeds determined by their slope and width. Whichever garden terrace the water reaches first has its minimum arrival time permanently established. The water then continues advancing outward from that new terrace.',
    moral:
      'Greedy selection of the earliest arrival time guarantees optimal path lengths because edge weights are positive and time never moves backwards.',
  },

  steps: [
    {
      phase: 'Step 1: Distance Initialization',
      description: 'Set `dist[start] = 0` and `dist[v] = ∞` for all other vertices `v`.',
      details: 'Insert `(0, start)` into a Priority Queue (Min-Heap).',
    },
    {
      phase: 'Step 2: Extract Minimum Vertex',
      description: 'Pop vertex `u` with the smallest tentative distance from the priority queue.',
      details: 'If `u` has already been visited (finalized), discard and pop next.',
    },
    {
      phase: 'Step 3: Edge Relaxation',
      description: 'For each neighbor `v` of `u` with edge weight `w`:',
      details: 'If `dist[u] + w < dist[v]`, update `dist[v] = dist[u] + w` and push `(dist[v], v)` into the priority queue.',
    },
    {
      phase: 'Step 4: Repeat Until Heap Empty',
      description: 'Continue popping and relaxing until all reachable nodes are finalized.',
      details: 'Array `dist` now holds the optimal shortest path from origin to all nodes.',
    },
  ],

  defaultInput: { startNode: 'A' },

  pseudocode: [
    { line: 1, code: 'function Dijkstra(graph, start):', explanation: 'Takes weighted graph and start node' },
    { line: 2, code: '  dist = map with default infinity, dist[start] = 0', explanation: 'Initialize distance table' },
    { line: 3, code: '  pq = PriorityQueue()', explanation: 'Min-Heap ordered by tentative distance' },
    { line: 4, code: '  pq.push((0, start))', explanation: 'Push origin with 0 distance' },
    { line: 5, code: '  while not pq.isEmpty():', explanation: 'Process until all nodes are settled' },
    { line: 6, code: '    (d, u) = pq.pop()', explanation: 'Extract unvisited node with smallest distance' },
    { line: 7, code: '    if d > dist[u]: continue', explanation: 'Skip outdated heap entries' },
    { line: 8, code: '    for (v, weight) in graph[u]:', explanation: 'Inspect all outgoing weighted edges' },
    { line: 9, code: '      if dist[u] + weight < dist[v]:', explanation: 'Edge relaxation check' },
    { line: 10, code: '        dist[v] = dist[u] + weight', explanation: 'Update distance to lower value' },
    { line: 11, code: '        pq.push((dist[v], v))', explanation: 'Enqueue improved distance' },
  ],

  code: {
    python: `import heapq

def dijkstra(graph, start):
    """
    Dijkstra's shortest path algorithm using a Min-Heap.
    Time: O((V + E) log V), Space: O(V)
    Requires non-negative edge weights!
    """
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)] # (distance, node)

    while pq:
        curr_dist, u = heapq.heappop(pq)

        # Skip outdated duplicate entries in priority queue
        if curr_dist > distances[u]:
            continue

        for neighbor, weight in graph[u]:
            new_dist = curr_dist + weight
            if new_dist < distances[neighbor]:
                distances[neighbor] = new_dist
                heapq.heappush(pq, (new_dist, neighbor))

    return distances

# Example usage:
garden_map = {
    'A': [('B', 4), ('C', 2)],
    'B': [('A', 4), ('D', 5), ('C', 1)],
    'C': [('A', 2), ('B', 1), ('D', 6), ('E', 8)],
    'D': [('B', 5), ('C', 6), ('F', 3)],
    'E': [('C', 8), ('F', 2)],
    'F': [('D', 3), ('E', 2)]
}
print(dijkstra(garden_map, 'A'))
# Output: {'A': 0, 'B': 3, 'C': 2, 'D': 8, 'E': 10, 'F': 11}`,

    javascript: `function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();

  for (const node of Object.keys(graph)) {
    distances[node] = Infinity;
  }
  distances[start] = 0;

  while (visited.size < Object.keys(graph).length) {
    // Find unvisited node with lowest tentative distance
    let minNode = null;
    let minDist = Infinity;

    for (const [node, dist] of Object.entries(distances)) {
      if (!visited.has(node) && dist < minDist) {
        minDist = dist;
        minNode = node;
      }
    }

    if (!minNode || minDist === Infinity) break;
    visited.add(minNode);

    // Relax neighbors
    const edges = graph[minNode] || [];
    for (const { to, weight } of edges) {
      if (!visited.has(to)) {
        const alt = distances[minNode] + weight;
        if (alt < distances[to]) {
          distances[to] = alt;
        }
      }
    }
  }

  return distances;
}

// Example usage:
const map = {
  A: [{ to: 'B', weight: 4 }, { to: 'C', weight: 2 }],
  B: [{ to: 'D', weight: 5 }],
  C: [{ to: 'B', weight: 1 }, { to: 'E', weight: 8 }],
  D: [{ to: 'F', weight: 3 }],
  E: [{ to: 'F', weight: 2 }],
  F: []
};
console.log(dijkstra(map, 'A'));`,

    cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>

using Pair = std::pair<int, std::string>; // (dist, node)

std::unordered_map<std::string, int> dijkstra(
    const std::unordered_map<std::string, std::vector<std::pair<std::string, int>>>& graph,
    const std::string& start) {

    std::unordered_map<std::string, int> dist;
    for (const auto& kv : graph) dist[kv.first] = 1e9;
    dist[start] = 0;

    std::priority_queue<Pair, std::vector<Pair>, std::greater<Pair>> pq;
    pq.push({0, start});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();

        if (d > dist[u]) continue;

        if (graph.find(u) != graph.end()) {
            for (const auto& [v, w] : graph.at(u)) {
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.push({dist[v], v});
                }
            }
        }
    }
    return dist;
}

int main() {
    // Usage example
    return 0;
}`,

    java: `import java.util.*;

public class Dijkstra {
    static class Edge {
        String to;
        int weight;
        Edge(String t, int w) { to = t; weight = w; }
    }

    static class NodeDist implements Comparable<NodeDist> {
        String node;
        int dist;
        NodeDist(String n, int d) { node = n; dist = d; }
        public int compareTo(NodeDist o) { return Integer.compare(this.dist, o.dist); }
    }

    public static Map<String, Integer> shortestPaths(Map<String, List<Edge>> graph, String start) {
        Map<String, Integer> dist = new HashMap<>();
        for (String k : graph.keySet()) dist.put(k, Integer.MAX_VALUE);
        dist.put(start, 0);

        PriorityQueue<NodeDist> pq = new PriorityQueue<>();
        pq.add(new NodeDist(start, 0));

        while (!pq.isEmpty()) {
            NodeDist top = pq.poll();
            if (top.dist > dist.get(top.node)) continue;

            for (Edge e : graph.getOrDefault(top.node, Collections.emptyList())) {
                if (dist.get(top.node) + e.weight < dist.get(e.to)) {
                    dist.put(e.to, dist.get(top.node) + e.weight);
                    pq.add(new NodeDist(e.to, dist.get(e.to)));
                }
            }
        }
        return dist;
    }
}`,
  },

  complexity: {
    bestTime: 'O((V + E) log V)',
    bestReason: 'Using a binary min-heap, each vertex extraction takes O(log V) and each edge relaxation takes O(log V).',
    averageTime: 'O((V + E) log V)',
    averageReason: 'Fibonacci heap theoretical bound achieves O(E + V log V).',
    worstTime: 'O((V + E) log V)',
    worstReason: 'Guaranteed runtime on all valid non-negative weighted graphs.',
    space: 'O(V + E)',
    spaceReason: 'Distance map stores V nodes, and priority queue can hold up to E edges.',
    auxiliarySpace: 'O(V)',
  },

  whenToUsePractical: [
    {
      scenario: 'Google Maps calculating quickest driving route between cities',
      reason: 'Road travel times are always positive numbers, making Dijkstra or A* ideal.',
      recommendation: 'Use Dijkstra (or A* with geographic Euclidean distance heuristic).',
    },
    {
      scenario: 'Currency arbitrage detection with negative logarithms of exchange rates',
      reason: 'Negative weights can produce negative cycles, breaking Dijkstra.',
      recommendation: 'Do NOT use Dijkstra. Use Bellman-Ford algorithm.',
    },
    {
      scenario: 'Social network degrees of separation (unweighted)',
      reason: 'Standard BFS is faster at O(V + E) without heap overhead.',
      recommendation: 'Use BFS instead of Dijkstra.',
    },
  ],

  commonMistakes: [
    {
      mistake: 'Using Dijkstra on graphs with negative edge weights',
      whyItHappens: 'Dijkstra permanently marks a node as finalized when popped. If a negative edge appears later, it could shorten an already finalized path, yielding incorrect answers.',
      howToFix: 'If negative weights can exist, use Bellman-Ford or SPFA.',
    },
    {
      mistake: 'Not skipping stale distance entries in the priority queue',
      whyItHappens: 'Because standard heaps do not support decrease-key in O(1), new entries are pushed. Failing to check `if (d > dist[u]) continue;` wastes CPU time processing obsolete entries.',
      howToFix: 'Always include the stale distance guard check.',
    },
    {
      mistake: 'Using an adjacency matrix on sparse graphs',
      whyItHappens: 'Matrix implementation runs in O(V²), which is sluggish on sparse graphs with millions of vertices.',
      howToFix: 'Use adjacency lists with a binary min-heap.',
    },
  ],

  quiz: [
    {
      id: 'dijk-q1',
      type: 'definition',
      question: 'What fundamental assumption MUST hold true for Dijkstra’s algorithm to guarantee correct output?',
      options: [
        'All edge weights must be non-negative (weight >= 0)',
        'The graph must be a directed acyclic tree',
        'Every node must have an even degree',
        'Edge weights must strictly be integers',
      ],
      correctIndex: 0,
      explanation:
        'Dijkstra’s greedy proof assumes that once a node is finalized, no future path can reach it with a smaller distance. Negative weights violate this property.',
      whyWrong: [
        'Dijkstra works on cyclical graphs and directed/undirected graphs.',
        'Degree parity is completely irrelevant.',
        'Floating-point edge weights work fine as long as they are non-negative.',
      ],
      miniExample: 'A -(-5)-> B breaks Dijkstra’s greedy finalization.',
    },
    {
      id: 'dijk-q2',
      type: 'conceptual',
      question: 'What is the term for updating a neighbor’s tentative distance when a shorter path is found via an intermediate node?',
      options: ['Edge Relaxation', 'Topological Sort', 'Path Compression', 'Vertex Elimination'],
      correctIndex: 0,
      explanation:
        'Relaxing edge (u, v) checks whether dist[u] + weight(u, v) < dist[v] and lowers dist[v] if true.',
      whyWrong: [
        'Topological sort orders tasks in a DAG.',
        'Path compression is used in Disjoint Set Union (DSU).',
        'Vertex elimination is used in Gaussian elimination or graph chordality.',
      ],
    },
    {
      id: 'dijk-q3',
      type: 'step-by-step',
      question: 'Start at A (dist=0). Edges: A->B (weight 4), A->C (weight 2), C->B (weight 1). What is the shortest distance from A to B?',
      options: ['3 (via A -> C -> B)', '4 (via direct A -> B)', '2', '5'],
      correctIndex: 0,
      explanation:
        'Direct A->B is 4. But path A->C (2) plus C->B (1) costs only 2 + 1 = 3! Relaxation updates dist[B] to 3.',
      whyWrong: [
        '4 is the direct edge, but not the shortest path.',
        '2 is the distance to C, not B.',
        '5 is 4 + 1.',
      ],
      miniExample: 'dist[C]=2, dist[B] relaxed from 4 to 2+1=3.',
    },
    {
      id: 'dijk-q4',
      type: 'complexity',
      question: 'What is the time complexity of Dijkstra’s algorithm using an adjacency list and binary Min-Heap?',
      options: ['O((V + E) log V)', 'O(V²)', 'O(V * E)', 'O(V + E)'],
      correctIndex: 0,
      explanation:
        'Each vertex is extracted from the min-heap in O(log V), and each edge relaxation pushes an update in O(log V), giving O((V + E) log V).',
      whyWrong: [
        'O(V²) is the complexity using a simple array without a heap.',
        'O(V * E) is Bellman-Ford complexity.',
        'O(V + E) is unweighted BFS complexity.',
      ],
    },
    {
      id: 'dijk-q5',
      type: 'practical',
      question: 'If you need to find the shortest path in a graph where some edges have negative weights, which algorithm should you use?',
      options: [
        'Bellman-Ford Algorithm',
        'Dijkstra’s Algorithm',
        'Breadth-First Search',
        'Prim’s Algorithm',
      ],
      correctIndex: 0,
      explanation:
        'Bellman-Ford relaxes all edges V - 1 times, correctly handling negative weights and detecting negative cycles.',
      whyWrong: [
        'Dijkstra fails or loops endlessly on negative weights.',
        'BFS ignores weights completely.',
        'Prim’s algorithm finds Minimum Spanning Trees, not shortest paths.',
      ],
    },
  ],

  recap: {
    takeaways: [
      'Dijkstra solves single-source shortest paths on non-negative weighted graphs.',
      'Operates greedily by repeatedly extracting the smallest tentative distance node.',
      'Uses edge relaxation: dist[v] = min(dist[v], dist[u] + weight).',
      'Time complexity is O((V + E) log V) with a Min-Heap.',
      'Requires non-negative weights; use Bellman-Ford for negative weights.',
    ],
    keyTerms: [
      { term: 'Edge Relaxation', definition: 'Lowering the tentative distance of a neighbor node via an discovered shortcut.' },
      { term: 'Min-Heap', definition: 'Priority queue extracting smallest distance element in O(log V) time.' },
      { term: 'Tentative Distance', definition: 'The currently known shortest path length to a vertex, subject to improvement.' },
    ],
    finalChallengePrompt: 'Can you implement a parent pointer array to reconstruct the full path sequence of vertices from start to destination?',
  },

  relearn: {
    conceptKey: 'dijkstra-basics',
    simplifiedTitle: 'The Mountain Trail with Mile Markers',
    differentAnalogy:
      'Imagine hiking through botanical hills. Every path has a toll price in gold coins: Path 1 costs 4 coins, Path 2 costs 2 coins. You want to visit every tea cottage spending the fewest coins possible. You keep a ledger. You always travel next to the closest cottage you haven’t visited yet. Once you arrive at a cottage through the cheapest route, that price is locked in forever!',
    babySteps: [
      '1. Write down: Distance to Start Cottage = 0 coins. All other cottages = ∞ coins.',
      '2. Look at your ledger: pick the unvisited cottage with the cheapest coin count.',
      '3. Lock it in: this cottage is officially finalized!',
      '4. Look at trails leading out from this cottage to its neighbors.',
      '5. Can we reach a neighbor cheaper through here? If yes, update the ledger!',
      '6. Repeat until all cottages are finalized.',
    ],
    workedExample:
      'Start at A. Trail A→B costs 5. Trail A→C costs 2. Trail C→B costs 1.\n- Start: dist[A]=0, others=∞.\n- Visit A (0). Update: B=5, C=2.\n- Next cheapest is C (2)! Visit C.\n- Look from C to B: cost is 2 + 1 = 3.\n- Is 3 cheaper than 5? YES! Update B to 3.\n- Final shortest to B is 3 coins!',
    miniPractice: [
      {
        id: 'dijk-mini-1',
        type: 'step-by-step',
        question: 'If trail A→B is 10 miles, but A→C is 3 miles and C→B is 2 miles, what is the shortest route from A to B?',
        options: ['5 miles (via C)', '10 miles (direct)', '15 miles', '3 miles'],
        correctIndex: 0,
        explanation: '3 + 2 = 5 miles, which is much shorter than 10 miles!',
      },
      {
        id: 'dijk-mini-2',
        type: 'conceptual',
        question: 'Can Dijkstra handle paths where you EARN coins (negative weight)?',
        options: [
          'No! Negative weights break Dijkstra’s greedy guarantee',
          'Yes, it loves negative weights',
          'Only if the graph is round',
          'Yes, negative numbers are treated as zero',
        ],
        correctIndex: 0,
        explanation: 'Negative weights violate Dijkstra’s assumption that finalized paths cannot become shorter later.',
      },
      {
        id: 'dijk-mini-3',
        type: 'definition',
        question: 'What special queue helps Dijkstra quickly find the cheapest node?',
        options: [
          'A Min-Heap (Priority Queue)',
          'A stack of playing cards',
          'A random number generator',
          'A circular array of size 1',
        ],
        correctIndex: 0,
        explanation: 'A Min-Heap provides the minimum distance item in O(log V) time!',
      },
    ],
    buddyEncouragement:
      "Pathfinding is how pollinators find the sweetest flowers in the garden! You're navigating complex weighted graphs with ease now. Let's bloom on the quiz! 🌸",
  },
};
