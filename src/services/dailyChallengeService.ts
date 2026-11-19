import { DailyChallenge } from '../types';

export const DAILY_CHALLENGES: DailyChallenge[] = [
  {
    id: 'dc-binary-search-midpoint',
    dateStr: '2026-11-19',
    title: 'Midpoint Seeker in Sorted Flora',
    category: 'Searching',
    difficulty: 'Beginner',
    xpReward: 50,
    scenario:
      'You are performing Binary Search on a sorted array of 9 flower heights: [12, 18, 24, 31, 45, 52, 67, 80, 94] searching for target 80. Currently, `low = 0` and `high = 8`.',
    question:
      'What is the calculated midpoint index `mid` and the value located at `arr[mid]` on this first iteration?',
    options: [
      'mid = 4, arr[4] = 45',
      'mid = 3, arr[3] = 31',
      'mid = 5, arr[5] = 52',
      'mid = 6, arr[6] = 67',
    ],
    correctIndex: 0,
    hint: 'Use the standard formula: mid = low + floor((high - low) / 2) with low = 0 and high = 8.',
    explanation:
      'mid = 0 + Math.floor((8 - 0) / 2) = 4. Looking up index 4 in [12, 18, 24, 31, 45, 52, 67, 80, 94] gives 45. Since 45 < 80, the search will continue into the right half [5 .. 8]!',
  },
  {
    id: 'dc-bfs-next-frontier',
    dateStr: '2026-11-20',
    title: 'Next Bloom on the BFS Wave',
    category: 'Graphs',
    difficulty: 'Intermediate',
    xpReward: 50,
    scenario:
      'You are running Breadth-First Search on a graph starting at Node A. Node A connects to [B, C]. Node B connects to [D]. Node C connects to [E]. The FIFO queue initially had [A]. After processing A, the queue holds [B, C].',
    question:
      'Which node is dequeued and explored immediately after Node B?',
    options: [
      'Node C (the other Level-1 neighbor)',
      'Node D (the child of B)',
      'Node E (the child of C)',
      'Node A (the root)',
    ],
    correctIndex: 0,
    hint: 'Remember that a FIFO queue preserves First-In, First-Out order. Who entered the queue right behind B?',
    explanation:
      'Because Node C was enqueued at the same level as Node B, C is already waiting right behind B at the front of the queue. DFS would dive to D, but BFS processes all Level-1 nodes (B then C) before moving to Level-2 nodes (D and E)!',
  },
  {
    id: 'dc-dp-coin-change-cell',
    dateStr: '2026-11-21',
    title: 'Filling the DP Coin Vault',
    category: 'Dynamic Programming',
    difficulty: 'Intermediate',
    xpReward: 60,
    scenario:
      'You are solving the Coin Change problem for denominations [1, 3, 4] to make amount 6. You know dp[5] = 2 (coins 4 + 1 or 1 + 4), dp[3] = 1 (coin 3), and dp[2] = 2 (coins 1 + 1).',
    question:
      'What is the minimum number of coins needed to make amount 6: dp[6]?',
    options: [
      '2 coins (3 + 3)',
      '3 coins (4 + 1 + 1)',
      '4 coins (1 + 1 + 1 + 1 + 1 + 1)',
      '1 coin',
    ],
    correctIndex: 0,
    hint: 'Check all 3 transitions: dp[6 - 1] + 1, dp[6 - 3] + 1, and dp[6 - 4] + 1.',
    explanation:
      'Transitions: using 1 gives dp[5] + 1 = 2 + 1 = 3. Using 3 gives dp[3] + 1 = 1 + 1 = 2! Using 4 gives dp[2] + 1 = 2 + 1 = 3. Minimum is min(3, 2, 3) = 2 coins (two 3-cent coins)!',
  },
  {
    id: 'dc-algorithm-selection',
    dateStr: '2026-11-22',
    title: 'The Architect’s Dilemma',
    category: 'Foundations',
    difficulty: 'Beginner',
    xpReward: 40,
    scenario:
      'You are designing a photo gallery with 200,000 pictures. Users frequently sort by date, then sort by file size. Equal dates must keep their original file-size ordering intact.',
    question:
      'Which sorting algorithm MUST you choose to ensure stability while guaranteeing O(n log n) runtime?',
    options: [
      'Merge Sort (or TimSort)',
      'Quick Sort',
      'Heap Sort',
      'Selection Sort',
    ],
    correctIndex: 0,
    hint: 'Which sorting algorithm is guaranteed O(n log n) AND guarantees stability (never swaps equal elements out of order)?',
    explanation:
      'Merge Sort preserves the relative ordering of equal elements (stability) and guarantees O(n log n) worst-case time. QuickSort and HeapSort are unstable; Selection Sort is O(n²) quadratic.',
  },
];

export function getTodayChallenge(): DailyChallenge {
  const today = new Date().toISOString().split('T')[0];
  const found = DAILY_CHALLENGES.find((c) => c.dateStr === today);
  if (found) return found;
  // Fallback to cycling modulo day of year
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  return DAILY_CHALLENGES[dayOfYear % DAILY_CHALLENGES.length];
}
