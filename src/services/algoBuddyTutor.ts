export interface TutorResponse {
  answer: string;
  expression: 'happy' | 'thinking' | 'confused' | 'excited' | 'celebrating' | 'encouraging';
  suggestedFollowUps?: string[];
  codeSnippet?: string;
}

export function getAlgoBuddyResponse(
  question: string,
  lessonId?: string,
  lessonTitle?: string
): TutorResponse {
  const q = question.toLowerCase().trim();

  // 1. General Greetings & Buddy Questions
  if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('who are you')) {
    return {
      answer:
        "Hello petal! 🌸 I am AlgoBuddy, your friendly botanical learning companion! I'm here to guide you through algorithms, plant seeds of curiosity, and help your understanding bloom. What can I help you understand today?",
      expression: 'happy',
      suggestedFollowUps: [
        'How does this algorithm work?',
        'What is the Big O complexity?',
        'Can you give me an everyday analogy?',
      ],
    };
  }

  // 2. Big O / Complexity questions
  if (q.includes('big o') || q.includes('complexity') || q.includes('time complexity') || q.includes('space')) {
    if (lessonId === 'binary-search') {
      return {
        answer:
          "For Binary Search, the Time Complexity is O(log n) because we cut the remaining array in half on every single check! For 1,000 items, it only takes ~10 comparisons! Auxiliary Space is O(1) in the iterative version because we only keep track of `low`, `high`, and `mid`.",
        expression: 'excited',
        codeSnippet: '// Best: O(1)\n// Average: O(log n)\n// Worst: O(log n)\n// Space: O(1)',
        suggestedFollowUps: ['Why does halving take O(log n)?', 'Why does it require sorted data?'],
      };
    }
    if (lessonId === 'merge-sort') {
      return {
        answer:
          "Merge Sort is famous because its time complexity is GUARANTEED O(n log n) in all cases (best, average, and worst)! There is no bad input that can slow it down. However, it requires O(n) auxiliary space to hold elements during the merging phase.",
        expression: 'thinking',
        codeSnippet: '// Best: O(n log n)\n// Worst: O(n log n)\n// Space: O(n)',
        suggestedFollowUps: ['Why does it need O(n) space?', 'How does it compare to QuickSort?'],
      };
    }
    if (lessonId === 'quick-sort') {
      return {
        answer:
          "QuickSort averages O(n log n) time and is super fast in real computer memory because of CPU cache locality. But watch out: if you pick a bad pivot (like the last element of an already-sorted array), it can degrade to O(n²) worst case!",
        expression: 'thinking',
        codeSnippet: '// Best: O(n log n)\n// Average: O(n log n)\n// Worst: O(n^2)\n// Space: O(log n)',
        suggestedFollowUps: ['How do we prevent O(n²) worst case?', 'What is Lomuto partitioning?'],
      };
    }
    if (lessonId === 'breadth-first-search' || lessonId === 'depth-first-search') {
      return {
        answer:
          "Graph traversals like BFS and DFS take O(V + E) time, where V is the number of vertices (nodes) and E is the number of edges (connections). Every node is enqueued/stacked once, and every edge is explored once!",
        expression: 'happy',
        suggestedFollowUps: ['When is BFS better than DFS?', 'Does BFS find shortest path?'],
      };
    }
    if (lessonId === 'dijkstra') {
      return {
        answer:
          "Using a Binary Min-Heap, Dijkstra runs in O((V + E) log V) time. Each vertex is popped from the heap in O(log V), and each edge relaxation updates distances in O(log V).",
        expression: 'excited',
        suggestedFollowUps: ['Can Dijkstra handle negative weights?', 'How does edge relaxation work?'],
      };
    }
    return {
      answer:
        "Big O measures how the number of operations grows as input size (n) gets bigger! Think of it like a plant's growth curve: O(1) is instant, O(log n) is super fast, O(n) grows steadily, and O(n²) gets tall very quickly!",
      expression: 'happy',
      suggestedFollowUps: ['What is O(log n)?', 'What is O(n²)?', 'Why do we drop constants?'],
    };
  }

  // 3. Analogy requests
  if (q.includes('analogy') || q.includes('eli5') || q.includes('simple terms') || q.includes('like i am 5')) {
    if (lessonId === 'binary-search') {
      return {
        answer:
          "Think of looking up a word in a 1,000-page dictionary! You flip directly to page 500. If your word starts with 'S' and page 500 is 'M', you throw away the first 500 pages completely! You repeat by flipping to page 750. You never read all 1,000 pages!",
        expression: 'excited',
      };
    }
    if (lessonId === 'dijkstra') {
      return {
        answer:
          "Imagine watering a garden with water hoses of different lengths. Whichever flowerpot gets wet first has officially found its shortest water time! Then water keeps flowing from that pot to the next closest pots.",
        expression: 'happy',
      };
    }
    if (lessonId === 'dp-fibonacci') {
      return {
        answer:
          "If I ask you '1 + 1 + 1 + 1 + 1 = ?', you count to 5. Now if I add another '+ 1', you immediately say '6!' because you remembered the 5 from earlier! You didn't recount from zero. That is Dynamic Programming!",
        expression: 'excited',
      };
    }
    return {
      answer:
        `Think of ${lessonTitle || 'algorithms'} as an everyday garden task. When you have a recipe with clear steps to water, prune, and nourish your flowers, you get a beautiful bloom every time!`,
      expression: 'encouraging',
    };
  }

  // 4. Why does it work / How does it work
  if (q.includes('why') || q.includes('how') || q.includes('explain')) {
    if (lessonId === 'breadth-first-search') {
      return {
        answer:
          "BFS explores in concentric circles (like ripples in water)! It visits all distance-1 neighbors first, then all distance-2 neighbors. Because it visits layer-by-layer, the first time you reach your target is GUARANTEED to be the shortest path in unweighted graphs!",
        expression: 'excited',
        suggestedFollowUps: ['What data structure does BFS use?', 'Why mark visited upon enqueue?'],
      };
    }
    if (lessonId === 'binary-search-tree') {
      return {
        answer:
          "A BST maintains the Golden Rule: everything to the left is SMALLER than the root, and everything to the right is BIGGER! When you search, you compare with the current node: smaller goes left, bigger goes right. It turns searching into a 2D binary search!",
        expression: 'happy',
        suggestedFollowUps: ['What does inorder traversal do?', 'What happens if a BST is unbalanced?'],
      };
    }
  }

  // 5. Help / Stuck
  if (q.includes('help') || q.includes('stuck') || q.includes('confused') || q.includes('dont understand') || q.includes("don't understand")) {
    return {
      answer:
        "Don't worry, little sprout! 🌱 Algorithms can feel a bit tangled at first. Why not try our 'Relearn Mode' button at the bottom of the page? It explains things with a completely different everyday analogy and smaller baby steps!",
      expression: 'encouraging',
      suggestedFollowUps: [
        'Can you show me a worked example?',
        'Give me a simpler analogy',
        'Break it into baby steps',
      ],
    };
  }

  // Default contextual response
  return {
    answer:
      `I'm delighted you asked about that! Regarding ${lessonTitle || 'this topic'}: always focus on the core invariant first. What stays true after every single step? Watch the interactive visualization above to see the pointers move in real-time! 🌸`,
    expression: 'happy',
    suggestedFollowUps: [
      'What is the time complexity?',
      'Can you give me an everyday analogy?',
      'What are common beginner mistakes?',
    ],
  };
}
