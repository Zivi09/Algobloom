import { AlgorithmLesson } from '../../types';

export const dpFibonacciLesson: AlgorithmLesson = {
  id: 'dp-fibonacci',
  title: 'Dynamic Programming: Fibonacci & Memoization',
  tagline: 'Never repeat what you have already solved',
  difficulty: 'Beginner',
  category: 'Dynamic Programming',
  level: 10,
  estimatedMinutes: 18,
  flowerType: 'sunflower',
  prerequisites: ['Recursion', 'Call Stack', 'Arrays & Tables'],
  objectives: [
    'Identify overlapping subproblems and optimal substructure',
    'Transform naive O(2ⁿ) tree recursion into O(n) memoization',
    'Build bottom-up tabulation tables with O(1) space optimization',
    'Implement Dynamic Programming in Python, JavaScript, C++, and Java',
  ],

  simpleExplanation:
    'Dynamic Programming (DP) is essentially remembering your past work so you never have to solve the exact same problem twice. In naive recursion, calculating Fibonacci(5) forces the computer to re-calculate Fibonacci(3) and Fibonacci(2) over and over again—wasting millions of operations! With Dynamic Programming, the very first time you compute an answer, you write it down in a notebook (memoization or tabulation). The next time you need it, you just look it up instantly in O(1) time!',
  eli5:
    'Imagine I write "1 + 1 + 1 + 1 + 1 = ?" on a chalkboard. You count: "Five!" Now, I write another "+ 1" at the end. What is the answer? You say "Six!" right away! How did you know so fast? You didn\'t recount all the ones from the beginning—you remembered that the previous part was 5 and just added 1. That is Dynamic Programming!',

  whyNeeded: {
    problemSolved:
      'Eliminating exponential work duplication caused by overlapping subproblems in recursive calculations.',
    historicalContext:
      'Coined by Richard Bellman in the 1950s while working at the RAND Corporation. He chose the phrase "Dynamic Programming" to describe multistage decision processes using a mathematically impressive name.',
    alternatives: ['Naive Recursion (exponential O(2ⁿ))', 'Divide and Conquer (works when subproblems do NOT overlap)', 'Greedy (works only when local optimum equals global optimum)'],
    whenToUse: [
      'The problem exhibits Overlapping Subproblems (same sub-equations called repeatedly)',
      'The problem exhibits Optimal Substructure (optimal solution is constructed from optimal sub-solutions)',
      'Optimization problems: minimizing cost, maximizing value, or counting distinct ways',
    ],
    whenToAvoid: [
      'Subproblems do not overlap (e.g. Merge Sort halves are distinct; DP gives zero benefit)',
      'Simple greedy choice property is mathematically proven (greedy is faster with O(1) memory)',
    ],
  },

  realLifeAnalogy: {
    title: 'The Master Gardener’s Growth Ledger',
    story:
      'A botanist is calculating how many blossoms a sunflower will produce in month N based on the sum of blossoms from month N-1 and N-2. Instead of re-measuring the entire garden history every day, she writes each month’s total in a leather ledger. When Month 7 arrives, she opens page 6 and page 5, adds two numbers, and closes the book in 3 seconds.',
    moral:
      'Storing answers to subproblems in a ledger turns exponential agony into instantaneous lookup.',
  },

  steps: [
    {
      phase: 'Step 1: Identify Base Cases',
      description: 'Define the smallest solvable subproblems.',
      details: 'For Fibonacci: `dp[0] = 0` and `dp[1] = 1`.',
    },
    {
      phase: 'Step 2: Define State & Recurrence Relation',
      description: 'Express the answer to state `i` in terms of smaller states.',
      details: '`dp[i] = dp[i - 1] + dp[i - 2]` for all `i >= 2`.',
    },
    {
      phase: 'Step 3: Choose Top-Down or Bottom-Up',
      description: 'Top-down uses recursion with a cache dictionary. Bottom-up iterates iteratively from base cases.',
      details: 'Bottom-up tabulation avoids call stack overflow on large inputs.',
    },
    {
      phase: 'Step 4: Space Optimization',
      description: 'Since `dp[i]` only depends on the previous two values, maintain just two variables (`prev1`, `prev2`).',
      details: 'Reduces auxiliary space from O(n) to constant O(1)!',
    },
  ],

  defaultInput: { n: 7 },

  pseudocode: [
    { line: 1, code: 'function fibonacciDP(n):', explanation: 'Compute n-th Fibonacci number' },
    { line: 2, code: '  if n <= 1: return n', explanation: 'Handle base cases directly' },
    { line: 3, code: '  dp = array of size n + 1', explanation: 'Allocate DP table' },
    { line: 4, code: '  dp[0] = 0, dp[1] = 1', explanation: 'Initialize base values' },
    { line: 5, code: '  for i from 2 to n:', explanation: 'Iterate bottom-up from smallest to target' },
    { line: 6, code: '    dp[i] = dp[i - 1] + dp[i - 2]', explanation: 'Apply recurrence transition' },
    { line: 7, code: '  return dp[n]', explanation: 'Return computed answer' },
  ],

  code: {
    python: `def fib_memo(n, memo=None):
    """Top-Down Memoization: O(n) time, O(n) space"""
    if memo is None: memo = {}
    if n in memo: return memo[n]
    if n <= 1: return n

    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]

def fib_tabulation(n):
    """Bottom-Up Tabulation with O(1) Space Optimization"""
    if n <= 1: return n
    prev2, prev1 = 0, 1

    for _ in range(2, n + 1):
        curr = prev1 + prev2
        prev2, prev1 = prev1, curr

    return prev1

# Example:
print(f"Fib(7) = {fib_tabulation(7)}") # 13
print(f"Fib(50) = {fib_tabulation(50)}") # 12586269025 (Computes in 0.0001s!)`,

    javascript: `function fibTabulation(n) {
  if (n <= 1) return n;

  // Space-optimized DP: O(n) time, O(1) space
  let prev2 = 0;
  let prev1 = 1;

  for (let i = 2; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}

// Example:
console.log(fibTabulation(7));  // 13
console.log(fibTabulation(50)); // 12586269025`,

    cpp: `#include <iostream>
#include <vector>

long long fibDP(int n) {
    if (n <= 1) return n;
    long long prev2 = 0, prev1 = 1;

    for (int i = 2; i <= n; ++i) {
        long long curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

int main() {
    std::cout << "Fib(50) = " << fibDP(50) << std::endl;
    return 0;
}`,

    java: `public class FibonacciDP {
    public static long compute(int n) {
        if (n <= 1) return n;
        long prev2 = 0, prev1 = 1;

        for (int i = 2; i <= n; i++) {
            long curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }

    public static void main(String[] args) {
        System.out.println("Fib(50) = " + compute(50));
    }
}`,
  },

  complexity: {
    bestTime: 'O(n)',
    bestReason: 'Calculates each intermediate subproblem state F(2) through F(n) exactly once in a single linear loop.',
    averageTime: 'O(n)',
    averageReason: 'Linear transition lookups across n states.',
    worstTime: 'O(n)',
    worstReason: 'Guaranteed linear performance, unlike naive recursion which takes O(2ⁿ) (more than 1 quintillion steps for n=60!).',
    space: 'O(1)',
    spaceReason: 'With space optimization, only the two most recent values are tracked in memory.',
    auxiliarySpace: 'O(1)',
  },

  whenToUsePractical: [
    {
      scenario: 'Solving problems with overlapping subproblems (e.g. Climbing Stairs, Coin Change, Edit Distance)',
      reason: 'Recomputing subtrees wastes CPU time exponentially.',
      recommendation: 'Use Dynamic Programming with memoization or tabulation.',
    },
    {
      scenario: 'Input is n = 1,000,000 and stack depth limit is 1,000 in Python',
      reason: 'Recursive top-down memoization triggers RecursionError / stack overflow.',
      recommendation: 'Use iterative bottom-up tabulation.',
    },
    {
      scenario: 'Merge Sort or Binary Search',
      reason: 'The divided halves never overlap, so memoization tables would see zero cache hits.',
      recommendation: 'Use standard Divide and Conquer, not DP.',
    },
  ],

  commonMistakes: [
    {
      mistake: 'Forgetting to check the memo table before making recursive calls',
      whyItHappens: 'If you store results in `memo[n] = ...` but don’t check `if n in memo: return memo[n]` at the top, the function still executes exponentially!',
      howToFix: 'Always place cache inspection at the very beginning of the recursive function.',
    },
    {
      mistake: 'Allocating a 2D table when only the previous row/state is needed',
      whyItHappens: 'Allocating large matrices consumes unnecessary memory when only `dp[i-1]` is referenced.',
      howToFix: 'Optimize space by keeping rolling arrays or single variables.',
    },
    {
      mistake: 'Incorrect loop boundaries or base cases',
      whyItHappens: 'Starting bottom-up loops at `i = 1` when `dp[i-2]` is accessed causes array index -1 out-of-bounds.',
      howToFix: 'Explicitly seed base cases (0 and 1) and begin loop at `i = 2`.',
    },
  ],

  quiz: [
    {
      id: 'dp-q1',
      type: 'definition',
      question: 'What are the two core prerequisites that must be present for Dynamic Programming to apply?',
      options: [
        'Overlapping Subproblems and Optimal Substructure',
        'Sorted Arrays and Two Pointers',
        'Directed Graphs and Negative Edge Weights',
        'Binary Trees and Random Numbers',
      ],
      correctIndex: 0,
      explanation:
        'Overlapping subproblems means identical states are calculated multiple times; optimal substructure means the optimal global solution is constructed from optimal sub-solutions.',
      whyWrong: [
        'Two pointers is a specific array technique, not DP requirement.',
        'Negative edges pertain to Bellman-Ford graph algorithms.',
        'Random numbers are not required for DP.',
      ],
      miniExample: 'F(n) = F(n-1) + F(n-2) has overlapping subproblems.',
    },
    {
      id: 'dp-q2',
      type: 'complexity',
      question: 'What is the time complexity difference between naive recursive Fibonacci and Dynamic Programming Fibonacci?',
      options: [
        'Naive is O(2ⁿ) exponential; DP is O(n) linear',
        'Naive is O(n); DP is O(1)',
        'Naive is O(n log n); DP is O(n²)',
        'Both have identical performance',
      ],
      correctIndex: 0,
      explanation:
        'Naive recursion branches into a tree of size ~2ⁿ. DP calculates each state F(0) through F(n) exactly once, taking only O(n) time.',
      whyWrong: [
        'Naive is not O(n); it explodes exponentially.',
        'DP does not make standard loop Fibonacci O(1) (unless using matrix exponentiation or Binet’s formula).',
        'DP reduces complexity; it does not increase it.',
      ],
      miniExample: 'For n=50: 2⁵⁰ ≈ 1.12 × 10¹⁵ operations vs 50 operations in DP!',
    },
    {
      id: 'dp-q3',
      type: 'conceptual',
      question: 'What is the difference between Top-Down Memoization and Bottom-Up Tabulation?',
      options: [
        'Top-Down starts from target and caches recursive calls; Bottom-Up starts from base cases and fills an iterative table',
        'Top-Down is only for numbers; Bottom-Up is only for strings',
        'Bottom-Up is always slower than Top-Down',
        'There is no difference; they are exact synonyms',
      ],
      correctIndex: 0,
      explanation:
        'Top-down breaks down from n to 0 using recursion + cache. Bottom-up builds up from 0 to n using a loop, avoiding call stack overhead.',
      whyWrong: [
        'Both techniques work on all types of problems (strings, grids, numbers).',
        'Bottom-up is usually faster because it has zero function call stack overhead.',
        'They are complementary approaches with different execution styles.',
      ],
    },
    {
      id: 'dp-q4',
      type: 'step-by-step',
      question: 'Given base cases F(0)=0 and F(1)=1, what are the values of F(2), F(3), and F(4)?',
      options: [
        'F(2)=1, F(3)=2, F(4)=3',
        'F(2)=2, F(3)=3, F(4)=5',
        'F(2)=0, F(3)=1, F(4)=1',
        'F(2)=3, F(3)=5, F(4)=8',
      ],
      correctIndex: 0,
      explanation:
        'F(2) = 0 + 1 = 1. F(3) = 1 + 1 = 2. F(4) = 1 + 2 = 3.',
      whyWrong: [
        'F(2) is not 2.',
        'F(2) is not 0.',
        'F(2) is not 3.',
      ],
      miniExample: '0, 1, 1, 2, 3, 5, 8, 13...',
    },
    {
      id: 'dp-q5',
      type: 'practical',
      question: 'How much memory is needed to compute the n-th Fibonacci number with optimal space?',
      options: [
        'O(1) constant space (storing only the last two values)',
        'O(n²) matrix space',
        'O(2ⁿ) memory',
        'O(n log n) space',
      ],
      correctIndex: 0,
      explanation:
        'Since calculating F(n) only requires F(n-1) and F(n-2), we only need two variables in memory at any point in time!',
      whyWrong: [
        'No matrices are needed.',
        '2ⁿ memory is unnecessary.',
        'O(n log n) space is not relevant here.',
      ],
    },
  ],

  recap: {
    takeaways: [
      'Dynamic Programming stores answers to subproblems to avoid redundant recalculation.',
      'Requires Overlapping Subproblems and Optimal Substructure.',
      'Top-Down = Recursion + Memoization; Bottom-Up = Loops + Tabulation.',
      'Reduces Fibonacci from O(2ⁿ) exponential to O(n) linear time.',
      'Can be space-optimized to O(1) constant memory by keeping only the two most recent values.',
    ],
    keyTerms: [
      { term: 'Memoization', definition: 'Caching recursive function return values keyed by parameter arguments.' },
      { term: 'Tabulation', definition: 'Filling an iterative table bottom-up starting from base cases.' },
      { term: 'State Transition', definition: 'The mathematical equation relating a state to smaller sub-states.' },
    ],
    finalChallengePrompt: 'Can you use DP to solve Climbing Stairs: count how many distinct ways you can climb n stairs taking 1 or 2 steps at a time?',
  },

  relearn: {
    conceptKey: 'dp-basics',
    simplifiedTitle: 'Writing Answers on a Chalkboard',
    differentAnalogy:
      'Imagine your teacher asks: "What is 5 + 5?" You say "10!" Now she asks: "What is 10 + 5?" You say "15!" Did you restart counting from zero? No! You remembered the 10 and just added 5. If you restarted from zero every single time, you would be naive recursion! But because you have a brain that remembers, you are Dynamic Programming!',
    babySteps: [
      '1. Start with the easiest tiny problems you already know (F(0)=0, F(1)=1).',
      '2. Write them down in your notebook.',
      '3. To find the next number, just add the last two numbers in your notebook.',
      '4. Write the new answer in the notebook.',
      '5. Walk forward step-by-step until you reach your goal.',
    ],
    workedExample:
      'Compute F(4):\n- F(0) = 0\n- F(1) = 1\n- F(2) = 0 + 1 = 1\n- F(3) = 1 + 1 = 2\n- F(4) = 1 + 2 = 3. Done in 3 simple additions!',
    miniPractice: [
      {
        id: 'dp-mini-1',
        type: 'step-by-step',
        question: 'If F(3) = 2 and F(4) = 3, what is F(5)?',
        options: ['5', '6', '1', '10'],
        correctIndex: 0,
        explanation: 'F(5) = F(4) + F(3) = 3 + 2 = 5!',
      },
      {
        id: 'dp-mini-2',
        type: 'conceptual',
        question: 'Why is remembering answers in a notebook faster than recalculating from scratch?',
        options: [
          'Because looking up an answer in a notebook is instant O(1) work!',
          'Because notebooks are made of magic',
          'It is actually slower',
          'Only if the notebook is green',
        ],
        correctIndex: 0,
        explanation: 'Looking up a stored value takes instant O(1) time instead of millions of repeat calculations.',
      },
      {
        id: 'dp-mini-3',
        type: 'definition',
        question: 'What is "Memoization"?',
        options: [
          'Saving the result of a function in a memory cache so you never recalculate it',
          'Writing a memo to your boss',
          'Memorizing the dictionary',
          'Deleting old files',
        ],
        correctIndex: 0,
        explanation: '"Memoization" comes from "memo" (a reminder): saving answers so you can reuse them instantly.',
      },
    ],
    buddyEncouragement:
      "Your brain uses dynamic programming every single day when you remember your phone number instead of figuring it out from scratch! You are doing amazing! 🌸",
  },
};
