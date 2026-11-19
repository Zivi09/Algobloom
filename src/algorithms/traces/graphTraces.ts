import { TraceStep } from '../../types';

export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  weight: number;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export const DEFAULT_GRAPH: GraphData = {
  nodes: [
    { id: 'A', label: 'A (Rose)', x: 80, y: 150 },
    { id: 'B', label: 'B (Lily)', x: 220, y: 70 },
    { id: 'C', label: 'C (Tulip)', x: 220, y: 230 },
    { id: 'D', label: 'D (Orchid)', x: 380, y: 70 },
    { id: 'E', label: 'E (Daisy)', x: 380, y: 230 },
    { id: 'F', label: 'F (Lotus)', x: 520, y: 150 },
  ],
  edges: [
    { from: 'A', to: 'B', weight: 4 },
    { from: 'A', to: 'C', weight: 2 },
    { from: 'B', to: 'D', weight: 5 },
    { from: 'C', to: 'B', weight: 1 },
    { from: 'C', to: 'E', weight: 8 },
    { from: 'C', to: 'D', weight: 6 },
    { from: 'D', to: 'F', weight: 3 },
    { from: 'E', to: 'F', weight: 2 },
  ],
};

export function generateBfsTrace(graph: GraphData = DEFAULT_GRAPH, startId: string = 'A'): TraceStep[] {
  const steps: TraceStep[] = [];
  const visited = new Set<string>();
  const queue: string[] = [startId];
  visited.add(startId);

  // Build adjacency
  const adj: Record<string, string[]> = {};
  graph.nodes.forEach((n) => (adj[n.id] = []));
  graph.edges.forEach((e) => {
    adj[e.from].push(e.to);
    // For undirected traversal
    adj[e.to].push(e.from);
  });

  steps.push({
    step: 0,
    description: `Start Breadth-First Search at root vertex ${startId}. Mark ${startId} visited and push into FIFO queue.`,
    activeNodes: [startId],
    visitedNodes: [startId],
    queue: [...queue],
    activeLine: 1,
  });

  while (queue.length > 0) {
    const current = queue.shift()!;

    steps.push({
      step: steps.length,
      description: `Dequeued vertex ${current}. Exploring all unvisited adjacent neighbors.`,
      activeNodes: [current],
      visitedNodes: Array.from(visited),
      queue: [...queue],
      activeLine: 3,
    });

    const neighbors = adj[current] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);

        steps.push({
          step: steps.length,
          description: `Discovered unvisited neighbor ${neighbor} via edge (${current} -> ${neighbor}). Mark visited and enqueue.`,
          activeNodes: [neighbor],
          visitedNodes: Array.from(visited),
          currentEdge: [current, neighbor],
          queue: [...queue],
          activeLine: 5,
        });
      }
    }
  }

  steps.push({
    step: steps.length,
    description: `Queue is empty. BFS traversal complete! Visited vertices in level order: ${Array.from(visited).join(' → ')}.`,
    activeNodes: [],
    visitedNodes: Array.from(visited),
    queue: [],
    activeLine: 7,
    isComplete: true,
  });

  return steps;
}

export function generateDfsTrace(graph: GraphData = DEFAULT_GRAPH, startId: string = 'A'): TraceStep[] {
  const steps: TraceStep[] = [];
  const visited = new Set<string>();
  const stack: string[] = [];

  const adj: Record<string, string[]> = {};
  graph.nodes.forEach((n) => (adj[n.id] = []));
  graph.edges.forEach((e) => {
    adj[e.from].push(e.to);
    adj[e.to].push(e.from);
  });

  steps.push({
    step: 0,
    description: `Start Depth-First Search at vertex ${startId}. Call DFS(${startId}).`,
    activeNodes: [startId],
    visitedNodes: [],
    stack: [startId],
    activeLine: 1,
  });

  function dfs(u: string) {
    visited.add(u);
    stack.push(u);

    steps.push({
      step: steps.length,
      description: `Visiting vertex ${u}. Added to stack. Mark ${u} as visited.`,
      activeNodes: [u],
      visitedNodes: Array.from(visited),
      stack: [...stack],
      activeLine: 2,
    });

    const neighbors = adj[u] || [];
    for (const v of neighbors) {
      if (!visited.has(v)) {
        steps.push({
          step: steps.length,
          description: `Edge (${u} -> ${v}): Neighbor ${v} not visited. Recurse into DFS(${v}).`,
          activeNodes: [v],
          visitedNodes: Array.from(visited),
          currentEdge: [u, v],
          stack: [...stack],
          activeLine: 4,
        });
        dfs(v);
      }
    }

    stack.pop();
    steps.push({
      step: steps.length,
      description: `All neighbors of ${u} fully explored. Backtracking and popping ${u} from call stack.`,
      activeNodes: stack.length > 0 ? [stack[stack.length - 1]] : [],
      visitedNodes: Array.from(visited),
      stack: [...stack],
      activeLine: 6,
    });
  }

  dfs(startId);

  steps.push({
    step: steps.length,
    description: `DFS traversal complete! Explored connected component depth-first.`,
    activeNodes: [],
    visitedNodes: Array.from(visited),
    stack: [],
    activeLine: 7,
    isComplete: true,
  });

  return steps;
}

export function generateDijkstraTrace(graph: GraphData = DEFAULT_GRAPH, startId: string = 'A'): TraceStep[] {
  const steps: TraceStep[] = [];
  const distances: Record<string, number> = {};
  const visited = new Set<string>();
  const previous: Record<string, string | null> = {};

  graph.nodes.forEach((n) => {
    distances[n.id] = Infinity;
    previous[n.id] = null;
  });
  distances[startId] = 0;

  const formatDistances = () => {
    const res: Record<string, string | number> = {};
    for (const k of Object.keys(distances)) {
      res[k] = distances[k] === Infinity ? '∞' : distances[k];
    }
    return res;
  };

  steps.push({
    step: 0,
    description: `Begin Dijkstra's Shortest Path from origin ${startId}. Set dist[${startId}] = 0, and all other distances to ∞.`,
    activeNodes: [startId],
    visitedNodes: [],
    distances: formatDistances(),
    activeLine: 1,
  });

  // Directed adjacency with weights
  const adj: Record<string, { to: string; weight: number }[]> = {};
  graph.nodes.forEach((n) => (adj[n.id] = []));
  graph.edges.forEach((e) => {
    adj[e.from].push({ to: e.to, weight: e.weight });
    adj[e.to].push({ to: e.from, weight: e.weight }); // undirected
  });

  while (visited.size < graph.nodes.length) {
    // Find unvisited vertex with smallest distance
    let minNode: string | null = null;
    let minDist = Infinity;

    for (const node of graph.nodes) {
      if (!visited.has(node.id) && distances[node.id] < minDist) {
        minDist = distances[node.id];
        minNode = node.id;
      }
    }

    if (!minNode || minDist === Infinity) break;

    visited.add(minNode);

    steps.push({
      step: steps.length,
      description: `Select unvisited vertex with minimum tentative distance: ${minNode} (dist = ${minDist}). Mark as finalized.`,
      activeNodes: [minNode],
      visitedNodes: Array.from(visited),
      distances: formatDistances(),
      activeLine: 3,
    });

    const neighbors = adj[minNode] || [];
    for (const edge of neighbors) {
      if (!visited.has(edge.to)) {
        const alt = distances[minNode] + edge.weight;
        const currentDist = distances[edge.to];
        const improved = alt < currentDist;

        steps.push({
          step: steps.length,
          description: `Examining edge (${minNode} -> ${edge.to}, weight ${edge.weight}). Tentative distance = ${distances[minNode]} + ${edge.weight} = ${alt}. ${
            improved ? `Improvement found! Update dist[${edge.to}] from ${currentDist === Infinity ? '∞' : currentDist} to ${alt}.` : `No improvement (${alt} >= ${currentDist}).`
          }`,
          activeNodes: [edge.to],
          visitedNodes: Array.from(visited),
          currentEdge: [minNode, edge.to],
          distances: formatDistances(),
          activeLine: improved ? 5 : 4,
        });

        if (improved) {
          distances[edge.to] = alt;
          previous[edge.to] = minNode;
        }
      }
    }
  }

  steps.push({
    step: steps.length,
    description: `Dijkstra algorithm finished! Shortest path distances from ${startId} to all vertices have been finalized.`,
    activeNodes: [],
    visitedNodes: Array.from(visited),
    distances: formatDistances(),
    activeLine: 7,
    isComplete: true,
  });

  return steps;
}
