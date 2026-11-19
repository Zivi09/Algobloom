import { AlgorithmLesson } from '../../types';

export const bigOLesson: AlgorithmLesson = {
  id: 'big-o-notation',
  title: 'Big O Notation & Complexity Analysis',
  tagline: 'The universal language of algorithm growth',
  difficulty: 'Beginner',
  category: 'Complexity',
  level: 4,
  estimatedMinutes: 20,
  flowerType: 'sunflower',
  prerequisites: ['Basic Algebra', 'Loops & Functions'],
  objectives: [
    'Understand why computer scientists measure operation scaling instead of stopwatch time',
    'Differentiate between O(1), O(log n), O(n), O(n log n), O(n²), and O(2ⁿ)',
    'Master the rules: drop constants and drop non-dominant terms',
    'Compare Big O (upper bound), Big Omega (lower bound), and Big Theta (tight bound)',
  ],

  simpleExplanation:
    'Big O notation is not about how many seconds an algorithm takes on your specific laptop. It tells you how an algorithm behaves as your data grows from 10 items to 10 million items! If you double the input size, does the workload double? Does it quadruple? Or does it barely change at all? Big O describes the rate of growth.',
  eli5:
    'Imagine delivering letters. If you have 1 letter, you walk to the mailbox. What if you have 100 letters? You still walk to the mailbox once! That is O(1) constant time—more letters don’t take more trips! But what if you have to personally hand-deliver each letter to 100 different houses? Now 100 letters takes 100 trips! That is O(n) linear time. Big O is just describing how your work grows when the pile gets bigger.',

  whyNeeded: {
    problemSolved:
      'Providing an objective, hardware-independent metric to compare algorithm efficiency.',
    historicalContext:
      'Introduced by German number theorist Paul Bachmann in 1894 and popularized in computer science by Donald Knuth in the 1970s to standardize performance evaluation across varying machine architectures.',
    alternatives: ['Stopwatch timing (flawed: depends on CPU, background tasks, RAM, language overhead)'],
    whenToUse: [
      'Evaluating algorithm tradeoffs during software design and system architecture',
      'Technical interview coding analysis and code optimization',
      'Determining scalability limits for distributed and cloud services',
    ],
    whenToAvoid: [
      'Micro-benchmarking when n is very small (< 10 elements, where CPU cache constants dominate)',
    ],
  },

  realLifeAnalogy: {
    title: 'The Plant Watering Systems',
    story:
      'Method A: You have a single master sprinkler that waters the entire garden bed at once. 10 flowers = 1 turn of the valve. 10,000 flowers = 1 turn of the valve. That is O(1) constant time! Method B: You carry a watering can and water each plant one-by-one. 10 flowers = 10 pours; 1,000 flowers = 1,000 pours. That is O(n) linear time! Method C: You compare every plant with every other plant to make sure they get equal sunlight. 1,000 plants = 1,000,000 comparisons! That is O(n²) quadratic time.',
    moral:
      'Input growth determines whether your program finishes in a blink or takes until the end of the universe.',
  },

  steps: [
    {
      phase: 'Step 1: Count Fundamental Operations',
      description: 'Identify operations that scale with input size `n` (comparisons, loops, allocations).',
      details: 'Ignore constant time overhead like variable declarations.',
    },
    {
      phase: 'Step 2: Express Operations as a Function f(n)',
      description: 'Sum the operations: e.g., `f(n) = 3n² + 5n + 100`.',
      details: 'Nested loops multiply; sequential loops add.',
    },
    {
      phase: 'Step 3: Drop Non-Dominant Terms',
      description: 'As `n` approaches infinity, smaller terms become negligible.',
      details: 'In `3n² + 5n + 100`, the `n²` term completely dwarfs `5n` and `100`. Keep only `3n²`.',
    },
    {
      phase: 'Step 4: Drop Multiplicative Constants',
      description: 'Remove coefficients because Big O measures growth shape, not specific machine speeds.',
      details: '`3n²` becomes `O(n²)`.',
    },
  ],

  defaultInput: { n: 100 },

  pseudocode: [
    { line: 1, code: '// Example 1: O(1) Constant Time', explanation: 'Instant operation' },
    { line: 2, code: 'function getFirst(arr): return arr[0]', explanation: 'Always 1 step regardless of array size' },
    { line: 3, code: '// Example 2: O(n) Linear Time', explanation: 'One loop over n items' },
    { line: 4, code: 'function printAll(arr): for x in arr: print(x)', explanation: 'Takes n operations' },
    { line: 5, code: '// Example 3: O(n²) Quadratic Time', explanation: 'Nested loops over n items' },
    { line: 6, code: 'function printPairs(arr): for x in arr: for y in arr: print(x, y)', explanation: 'Takes n * n operations' },
  ],

  code: {
    python: `# Complexity Demonstrations:

def constant_time(arr):
    # O(1) - Always 1 step
    return arr[0] if arr else None

def linear_time(arr):
    # O(n) - Scales directly with length of arr
    total = 0
    for num in arr:
        total += num
    return total

def quadratic_time(arr):
    # O(n^2) - Nested loop over n elements
    pairs = 0
    for i in range(len(arr)):
        for j in range(len(arr)):
            pairs += 1
    return pairs

def logarithmic_time(n):
    # O(log n) - Halves each iteration
    count = 0
    while n > 1:
        n = n // 2
        count += 1
    return count`,

    javascript: `// Complexity Demonstrations:
function constantTime(arr) {
  return arr[0]; // O(1)
}

function linearTime(arr) {
  let sum = 0;
  for (let x of arr) sum += x; // O(n)
  return sum;
}

function quadraticTime(arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      count++; // O(n^2)
    }
  }
  return count;
}`,

    cpp: `#include <vector>

int constantTime(const std::vector<int>& arr) {
    return arr.empty() ? -1 : arr[0]; // O(1)
}

int linearTime(const std::vector<int>& arr) {
    int sum = 0;
    for (int v : arr) sum += v; // O(n)
    return sum;
}

int quadraticTime(const std::vector<int>& arr) {
    int count = 0;
    for (size_t i = 0; i < arr.size(); ++i) {
        for (size_t j = 0; j < arr.size(); ++j) {
            count++; // O(n^2)
        }
    }
    return count;
}`,

    java: `import java.util.List;

public class Complexity {
    public static int constantTime(int[] arr) {
        return arr[0]; // O(1)
    }

    public static int linearTime(int[] arr) {
        int sum = 0;
        for (int v : arr) sum += v; // O(n)
        return sum;
    }
}`,
  },

  complexity: {
    bestTime: 'O(1)',
    bestReason: 'Constant time: execution steps do not depend on input size.',
    averageTime: 'Varies',
    averageReason: 'Different algorithms have different growth curves.',
    worstTime: 'O(n!)',
    worstReason: 'Factorial time (generating all permutations), practically infeasible for n > 20.',
    space: 'O(1)',
    spaceReason: 'Theoretical analysis framework requires no auxiliary storage.',
    auxiliarySpace: 'O(1)',
  },

  whenToUsePractical: [
    {
      scenario: 'Choosing between two sorting algorithms for 10,000,000 records',
      reason: 'O(n log n) takes ~230 million operations. O(n²) takes 100 trillion operations (thousands of hours).',
      recommendation: 'Always select O(n log n) algorithms for large n.',
    },
    {
      scenario: 'Writing nested loops inside a web request handler',
      reason: 'An O(n²) loop processing 5,000 items makes 25,000,000 operations, freezing the user interface.',
      recommendation: 'Refactor using a Hash Map or Set to reduce complexity to O(n).',
    },
    {
      scenario: 'Array size is fixed at n = 5 elements forever',
      reason: 'When n is tiny and bounded, any algorithm runs in microseconds.',
      recommendation: 'Prioritize code readability over asymptotic complexity.',
    },
  ],

  commonMistakes: [
    {
      mistake: 'Thinking Big O measures wall-clock execution seconds',
      whyItHappens: 'Learners assume O(n) means "n seconds". In reality, an O(n) algorithm on a 4GHz CPU can run 1,000,000 steps in 0.0002 seconds.',
      howToFix: 'Remember: Big O measures operation scaling relative to input size, not stopwatch duration.',
    },
    {
      mistake: 'Keeping constants or smaller terms (e.g. writing O(2n + 5))',
      whyItHappens: 'Forgetting that asymptotic analysis focuses strictly on the growth curve as n approaches infinity.',
      howToFix: 'Drop the 2 and drop the 5: simplify to O(n).',
    },
    {
      mistake: 'Assuming two separate loops mean O(n²)',
      whyItHappens: 'Confusing sequential loops with nested loops. Two sequential loops take O(n + n) = O(2n) = O(n), NOT O(n²)!',
      howToFix: 'Sequential loops ADD: O(n + m). Nested loops MULTIPLY: O(n * m).',
    },
  ],

  quiz: [
    {
      id: 'bo-q1',
      type: 'definition',
      question: 'What does Big O notation fundamentally describe?',
      options: [
        'The upper bound on how an algorithm’s resource requirements grow as input size approaches infinity',
        'The exact number of milliseconds a program runs on an Intel Core i7',
        'The number of lines of source code in a file',
        'The price of hosting a server in the cloud',
      ],
      correctIndex: 0,
      explanation:
        'Big O is an asymptotic upper bound describing how operation count or memory scales as input size n grows indefinitely.',
      whyWrong: [
        'Milliseconds depend on CPU frequency, background programs, and compiler optimizations.',
        'Code line count is unrelated to execution complexity.',
        'Server pricing is commercial, not algorithmic.',
      ],
      miniExample: 'If f(n) <= c * g(n) for all n >= n0, f(n) is O(g(n)).',
    },
    {
      id: 'bo-q2',
      type: 'step-by-step',
      question: 'Simplify the expression: f(n) = 4n³ + 150n² + 10,000 into standard Big O notation:',
      options: ['O(n³)', 'O(4n³)', 'O(n²)', 'O(10,000)'],
      correctIndex: 0,
      explanation:
        'Drop smaller non-dominant terms (150n² and 10,000) and drop the multiplicative coefficient 4. The result is O(n³).',
      whyWrong: [
        'Coefficients like 4 must be dropped in Big O.',
        'n³ dominates n², so n² cannot be the leading complexity.',
        'Constants like 10,000 are negligible as n grows toward infinity.',
      ],
      miniExample: 'For n = 1,000: 4n³ = 4 billion; 150n² = 150 million. n³ dominates completely.',
    },
    {
      id: 'bo-q3',
      type: 'conceptual',
      question: 'What is the difference between Big O, Big Omega (Ω), and Big Theta (Θ)?',
      options: [
        'Big O is the upper bound (worst case); Big Omega is the lower bound (best case); Big Theta is the tight bound (both match)',
        'Big O is for loops; Big Omega is for recursion; Big Theta is for arrays',
        'They are different programming languages',
        'Big Theta is only used for quantum algorithms',
      ],
      correctIndex: 0,
      explanation:
        'Big O specifies f(n) <= c*g(n) (ceiling). Big Omega specifies f(n) >= c*g(n) (floor). Big Theta specifies c1*g(n) <= f(n) <= c2*g(n) (tight bracket).',
      whyWrong: [
        'Asymptotic notation applies equally to all programming constructs.',
        'They are mathematical notations, not languages.',
        'Theta is standard in classical computer science analysis.',
      ],
    },
    {
      id: 'bo-q4',
      type: 'complexity',
      question: 'Which of the following growth orders is ranked from FASTEST to SLOWEST (most efficient to least efficient)?',
      options: [
        'O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)',
        'O(2ⁿ) < O(n²) < O(n log n) < O(n) < O(log n) < O(1)',
        'O(n) < O(1) < O(log n) < O(n²)',
        'O(n²) < O(n log n) < O(n) < O(log n)',
      ],
      correctIndex: 0,
      explanation:
        'Constant time O(1) is fastest, followed by logarithmic, linear, linearithmic, polynomial (quadratic), and exponential.',
      whyWrong: [
        'Reversed order (slowest to fastest).',
        'O(1) is faster than O(n).',
        'O(n²) is slower than O(n).',
      ],
    },
    {
      id: 'bo-q5',
      type: 'practical',
      question: 'A function contains two consecutive, non-nested loops: the first loops n times, the second loops n times. What is its Big O complexity?',
      options: ['O(n)', 'O(n²)', 'O(2n)', 'O(log n)'],
      correctIndex: 0,
      explanation:
        'Consecutive loops add their operations: n + n = 2n. Dropping the multiplicative constant 2 yields O(n).',
      whyWrong: [
        'O(n²) occurs when loops are nested inside one another (loop within a loop).',
        'O(2n) violates the rule of dropping constant factors in Big O.',
        'Two linear loops cannot magically become logarithmic.',
      ],
    },
  ],

  recap: {
    takeaways: [
      'Big O measures how algorithm operation counts scale as input size n grows.',
      'Always drop constants and non-dominant terms: 5n² + 20n + 10 → O(n²).',
      'Growth hierarchy: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!).',
      'Big O is upper bound; Big Omega (Ω) is lower bound; Big Theta (Θ) is tight bound.',
      'Sequential loops add O(n + m); nested loops multiply O(n * m).',
    ],
    keyTerms: [
      { term: 'Asymptotic Analysis', definition: 'Studying function behavior as variables tend toward infinity.' },
      { term: 'Dominant Term', definition: 'The highest-order component of an algebraic polynomial that determines long-term growth.' },
      { term: 'Big Theta (Θ)', definition: 'Tight asymptotic bound where upper and lower bounds asymptotically match.' },
    ],
    finalChallengePrompt: 'Can you analyze the time and auxiliary space complexity of calculating powers using fast binary exponentiation?',
  },

  relearn: {
    conceptKey: 'big-o-basics',
    simplifiedTitle: 'The Postman’s Route',
    differentAnalogy:
      'Imagine you are a postman. If someone asks you to send an email to 1 person, it takes 1 click. If you send the email to 1,000,000 people with a mailing list, it still takes 1 click! That is O(1) Constant Time. Now imagine you have to hand-deliver 1 paper letter to 1 house. 1 letter = 1 walk. 100 letters = 100 walks. 1,000 letters = 1,000 walks. That is O(n) Linear Time. Big O is just saying: when the pile of work gets 1,000 times bigger, does your walking time stay the same (O(1)), get 1,000 times longer (O(n)), or get 1,000,000 times longer (O(n²))?',
    babySteps: [
      '1. Ask: "What happens when my array gets 10 times bigger?"',
      '2. If you only look at the very first item: Work never changes! That is O(1).',
      '3. If you look at every item once in a loop: Work gets 10 times bigger. That is O(n).',
      '4. If you have a loop inside another loop: Work gets 10 × 10 = 100 times bigger! That is O(n²).',
      '5. Throw away numbers like 2 or 5: we only care about the big shape of the curve!',
    ],
    workedExample:
      'Code: `for x in list: for y in list: print(x, y)`\nIf list has 5 items: 5 × 5 = 25 prints.\nIf list has 50 items: 50 × 50 = 2,500 prints!\nThe work grows by the square (n²). So it is O(n²)!',
    miniPractice: [
      {
        id: 'bo-mini-1',
        type: 'step-by-step',
        question: 'If you check `arr[0]` to see if it is empty, how many operations does that take?',
        options: ['1 operation (O(1))', '100 operations', 'n operations', 'Infinite operations'],
        correctIndex: 0,
        explanation: 'Looking up index 0 is instant O(1) no matter how big the array is!',
      },
      {
        id: 'bo-mini-2',
        type: 'conceptual',
        question: 'Which is faster when processing 1,000,000 items: O(n) or O(n²)?',
        options: [
          'O(n) is millions of times faster!',
          'O(n²) is faster',
          'They take the exact same time',
          'Neither will ever finish',
        ],
        correctIndex: 0,
        explanation: 'O(n) takes 1,000,000 steps; O(n²) takes 1,000,000,000,000 steps (1 trillion)! O(n) wins by a landslide.',
      },
      {
        id: 'bo-mini-3',
        type: 'definition',
        question: 'Why do we drop the "2" in O(2n)?',
        options: [
          'Because Big O only cares about how the curve scales, not tiny multipliers',
          'Because 2 is an unlucky number',
          'Because the computer deletes numbers',
          'It is a typing mistake',
        ],
        correctIndex: 0,
        explanation: 'Whether an algorithm takes 1n or 2n steps, it still grows in a straight line (linear growth)!',
      },
    ],
    buddyEncouragement:
      "Understanding Big O is like understanding how seeds sprout into grand redwood trees! You now speak the true language of computer scientists worldwide. Let's bloom! 🌸",
  },
};
