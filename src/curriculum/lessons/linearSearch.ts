import { AlgorithmLesson } from '../../types';

export const linearSearchLesson: AlgorithmLesson = {
  id: 'linear-search',
  title: 'Linear Search',
  tagline: 'The straightforward seeker',
  difficulty: 'Beginner',
  category: 'Searching',
  level: 2,
  estimatedMinutes: 12,
  flowerType: 'daisy',
  prerequisites: ['Arrays', 'Loops & Conditions'],
  objectives: [
    'Understand how sequential searching scans unsorted memory',
    'Calculate best, average, and worst-case time complexities',
    'Implement linear search in Python, JavaScript, C++, and Java',
    'Recognize when linear search is preferable to sorting first',
  ],

  simpleExplanation:
    'Linear Search is the most natural way humans look for things. Imagine you dropped your keys in a garden pathway. You start at one end and check each flower bed one by one until you find them or reach the very end. You do not skip any spots, and you do not make any assumptions about the order of items.',
  eli5:
    'Imagine a row of 8 gift boxes on your birthday. You are looking for a toy dinosaur, but you do not know which box has it. You simply open Box 1. Not there? Open Box 2. Not there? Open Box 3. As soon as you see the dinosaur, you shout "Found it!" and stop.',

  whyNeeded: {
    problemSolved:
      'Finding the location of an element in an unsorted or streaming collection without preprocessing.',
    historicalContext:
      'Linear search is the baseline retrieval mechanism dating back to the earliest magnetic tape computers in the 1950s, where sequential physical access was the only operation available.',
    alternatives: ['Binary Search (requires sorted data)', 'Hash Table lookup (requires extra memory)', 'Trie (for strings)'],
    whenToUse: [
      'The array is small (e.g. fewer than 50 elements)',
      'The data is completely unsorted and you only need to search once',
      'The collection is a singly linked list where random access is impossible',
      'Memory is extremely constrained and no index structures can be maintained',
    ],
    whenToAvoid: [
      'The dataset has thousands or millions of elements',
      'You are performing repeated queries on the same static dataset',
      'The array is already sorted (use Binary Search instead!)',
    ],
  },

  realLifeAnalogy: {
    title: 'The Coat Check Rack',
    story:
      'You arrive at a crowded botanical tea house and hand the coat check attendant your claim ticket #47. The attendant walks down the rack, reading tag #1, tag #2, tag #3... all the way until finding #47. If your coat happens to be the very first one, they find it instantly. If your coat is at the far back, they must check every single jacket.',
    moral:
      'Without an organized arrangement (like sorting or a direct locker number), sequentially inspecting every single candidate is the only way to be 100% certain.',
  },

  steps: [
    {
      phase: 'Step 1: Start at Index 0',
      description: 'Initialize pointer `i = 0` at the very beginning of the array.',
      details: 'Check if the array is empty. If empty, terminate immediately with -1.',
    },
    {
      phase: 'Step 2: Compare with Target',
      description: 'Inspect element `array[i]` and compare with `target`.',
      details: 'If `array[i] == target`, return `i` as the successful index.',
    },
    {
      phase: 'Step 3: Increment Pointer',
      description: 'If no match, advance `i` by 1 to inspect the next element.',
      details: 'Repeat Step 2 as long as `i < array.length`.',
    },
    {
      phase: 'Step 4: Exhaustion Check',
      description: 'If `i` reaches the end without a match, report -1 (not found).',
      details: 'This proves target does not exist anywhere in the array.',
    },
  ],

  defaultInput: [14, 29, 8, 42, 19, 31, 5, 23],

  pseudocode: [
    { line: 1, code: 'function linearSearch(arr, target):', explanation: 'Define function accepting array and target value' },
    { line: 2, code: '  for i from 0 to length(arr) - 1:', explanation: 'Loop through each index sequentially' },
    { line: 3, code: '    if arr[i] == target:', explanation: 'Check equality between current item and target' },
    { line: 4, code: '      return i', explanation: 'Return matching index immediately upon discovery' },
    { line: 5, code: '  return -1', explanation: 'Return -1 if loop ends without finding target' },
  ],

  code: {
    python: `def linear_search(arr, target):
    """
    Search for target in arr sequentially.
    Returns index if found, else -1.
    Time: O(n), Space: O(1)
    """
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

# Example usage:
flowers = [14, 29, 8, 42, 19, 31, 5, 23]
result = linear_search(flowers, 42)
print(f"Target found at index: {result}") # Output: 3`,

    javascript: `function linearSearch(arr, target) {
  // Inspect every element one by one
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Found target at index i
    }
  }
  return -1; // Target not found
}

// Example usage:
const flowers = [14, 29, 8, 42, 19, 31, 5, 23];
console.log(linearSearch(flowers, 42)); // Output: 3`,

    cpp: `#include <iostream>
#include <vector>

int linearSearch(const std::vector<int>& arr, int target) {
    for (size_t i = 0; i < arr.size(); ++i) {
        if (arr[i] == target) {
            return static_cast<int>(i);
        }
    }
    return -1;
}

int main() {
    std::vector<int> flowers = {14, 29, 8, 42, 19, 31, 5, 23};
    std::cout << "Index: " << linearSearch(flowers, 42) << std::endl;
    return 0;
}`,

    java: `public class LinearSearch {
    public static int search(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] flowers = {14, 29, 8, 42, 19, 31, 5, 23};
        System.out.println("Index: " + search(flowers, 42)); // 3
    }
}`,
  },

  complexity: {
    bestTime: 'O(1)',
    bestReason: 'The target element is situated at index 0 (the very first comparison).',
    averageTime: 'O(n)',
    averageReason: 'On average, the target appears near the middle (n/2 comparisons), scaling linearly with n.',
    worstTime: 'O(n)',
    worstReason: 'The target is either at the very last index (index n - 1) or completely absent from the array.',
    space: 'O(1)',
    spaceReason: 'Only requires a single loop counter variable i. No auxiliary arrays are allocated.',
    auxiliarySpace: 'O(1)',
  },

  whenToUsePractical: [
    {
      scenario: 'Searching an unsorted array of 20 items once',
      reason: 'Sorting the array first takes O(n log n) operations. A single linear search takes only O(n) operations.',
      recommendation: 'Use Linear Search directly. Pre-sorting would waste CPU cycles.',
    },
    {
      scenario: 'Searching a singly linked list',
      reason: 'Linked lists do not permit direct pointer indexing (cannot jump to mid in O(1)).',
      recommendation: 'Linear search is mandatory for linked list node traversals.',
    },
    {
      scenario: 'Searching 1,000,000 sorted product IDs',
      reason: 'Linear search would take up to 1,000,000 operations. Binary search takes at most 20 operations.',
      recommendation: 'Do NOT use Linear Search. Use Binary Search.',
    },
  ],

  commonMistakes: [
    {
      mistake: 'Returning -1 inside the loop instead of after it',
      whyItHappens: 'Beginners often place `else return -1` inside the `for` loop body, causing the search to give up after checking only index 0.',
      howToFix: 'Ensure `return -1` is strictly outside the loop, reachable only after all elements have failed.',
    },
    {
      mistake: 'Using `<=` instead of `<` on zero-indexed bounds',
      whyItHappens: 'Writing `for (int i = 0; i <= arr.length; i++)` triggers an ArrayIndexOutOfBounds exception.',
      howToFix: 'In 0-indexed languages, the last valid index is `arr.length - 1`, so use `i < arr.length`.',
    },
    {
      mistake: 'Sorting the array before doing a single search',
      whyItHappens: 'Thinking binary search is always better, learners sort an array first, which takes O(n log n) time when O(n) linear search was already faster for a single query.',
      howToFix: 'Only sort if you plan to search multiple times.',
    },
  ],

  quiz: [
    {
      id: 'ls-q1',
      type: 'definition',
      question: 'What is the core working principle of Linear Search?',
      options: [
        'Sequentially inspecting each element from start to finish until a match or end is reached',
        'Repeatedly dividing the array into halves using midpoint calculations',
        'Converting keys into indices using a mathematical hashing function',
        'Sorting the elements into a balanced binary tree before traversal',
      ],
      correctIndex: 0,
      explanation:
        'Linear Search scans an array item-by-item in order without requiring any sorted structure or hash function.',
      whyWrong: [
        'Halving the search space describes Binary Search, not Linear Search.',
        'Hashing functions describe Hash Tables.',
        'Binary tree structures describe Tree Search.',
      ],
      miniExample: 'Checking index 0, then 1, then 2...',
    },
    {
      id: 'ls-q2',
      type: 'conceptual',
      question: 'Does Linear Search require the array to be sorted beforehand?',
      options: [
        'No, it works equally well on unsorted, sorted, and randomly ordered arrays',
        'Yes, it produces undefined behavior on unsorted arrays',
        'Yes, but only if numbers are positive',
        'No, but it requires that all elements be unique',
      ],
      correctIndex: 0,
      explanation:
        'Because Linear Search checks every single element without skipping, it does not rely on any order or uniqueness.',
      whyWrong: [
        'Binary search requires sorted arrays, but Linear Search does not.',
        'Signs of numbers have no impact on comparison equality.',
        'Duplicate elements are handled naturally; linear search simply stops at the first occurrence.',
      ],
    },
    {
      id: 'ls-q3',
      type: 'step-by-step',
      question: 'Given array [15, 32, 8, 47, 9] and target 8, how many comparisons occur?',
      options: ['3 comparisons', '1 comparison', '5 comparisons', '4 comparisons'],
      correctIndex: 0,
      explanation:
        'Comparison 1 checks index 0 (15 != 8). Comparison 2 checks index 1 (32 != 8). Comparison 3 checks index 2 (8 == 8). Found!',
      whyWrong: [
        '1 comparison would only check index 0.',
        '5 comparisons would happen if 8 were absent or at the very end.',
        '4 comparisons would check up to index 3.',
      ],
      miniExample: 'Index 0 (15), Index 1 (32), Index 2 (8) → 3 checks.',
    },
    {
      id: 'ls-q4',
      type: 'practical',
      question: 'When is performing a Linear Search strictly faster than Binary Search?',
      options: [
        'When searching an unsorted array just one single time',
        'When the array is already sorted and has 1,000,000 elements',
        'When memory is virtually unlimited',
        'Never, Binary Search is always faster in every possible metric',
      ],
      correctIndex: 0,
      explanation:
        'Sorting an unsorted array takes O(n log n). Linear search takes O(n). Since O(n) < O(n log n), sorting just to do one search is slower!',
      whyWrong: [
        'On an already sorted 1,000,000 element array, binary search takes ~20 steps while linear takes ~500,000 steps.',
        'Memory size does not change algorithmic time complexity here.',
        'Binary search requires sorted input; if unsorted, the pre-sorting overhead makes it slower for single queries.',
      ],
    },
    {
      id: 'ls-q5',
      type: 'complexity',
      question: 'What is the worst-case time complexity and auxiliary space of Linear Search on an array of size n?',
      options: [
        'Time: O(n), Auxiliary Space: O(1)',
        'Time: O(1), Auxiliary Space: O(n)',
        'Time: O(log n), Auxiliary Space: O(1)',
        'Time: O(n²), Auxiliary Space: O(n)',
      ],
      correctIndex: 0,
      explanation:
        'In the worst case, the target is at the end or missing, taking n comparisons. Space is O(1) because only loop pointers are stored.',
      whyWrong: [
        'O(1) time is only the best case, not worst case.',
        'O(log n) time belongs to binary search.',
        'O(n²) time belongs to nested loops like bubble sort.',
      ],
    },
  ],

  recap: {
    takeaways: [
      'Linear Search checks elements sequentially from left to right.',
      'Works on any array, whether sorted, reversed, or completely random.',
      'Best-case time is O(1); Average and Worst-case time is O(n).',
      'Auxiliary space is O(1) because no extra memory structures are required.',
      'Ideal for small arrays, linked lists, and one-off searches on unsorted data.',
    ],
    keyTerms: [
      { term: 'Sequential Search', definition: 'Accessing and checking items one after another in order.' },
      { term: 'Early Termination', definition: 'Stopping execution as soon as the sought element is found.' },
      { term: 'Worst Case', definition: 'The scenario requiring maximum possible operations (element at end or absent).' },
    ],
    finalChallengePrompt: 'Can you implement a function that finds the LAST occurrence of a target using a reverse linear search?',
  },

  relearn: {
    conceptKey: 'linear-search-basics',
    simplifiedTitle: 'Looking for a Book on an Unsorted Shelf',
    differentAnalogy:
      'Think of searching for your favorite notebook on a messy desk. The books are not arranged by title or color. You have no choice but to lift the first book. Is it yours? No. Lift the second. Is it yours? Yes! You stop. That is all Linear Search is.',
    babySteps: [
      '1. Point your finger at the very first item (Index 0).',
      '2. Ask: "Is this what I am looking for?"',
      '3. If yes, you are done! Shout out the position.',
      '4. If no, slide your finger one spot to the right.',
      '5. Repeat until you find it or your finger slides off the table.',
    ],
    workedExample:
      'Looking for target 42 in [10, 20, 30, 42]:\n- Finger on 10? No.\n- Finger on 20? No.\n- Finger on 30? No.\n- Finger on 42? YES! Finished at step 4.',
    miniPractice: [
      {
        id: 'ls-mini-1',
        type: 'step-by-step',
        question: 'If target is 7 in array [7, 2, 9], how many items are checked?',
        options: ['1 item', '3 items', '2 items', '0 items'],
        correctIndex: 0,
        explanation: 'The very first item checked at index 0 is 7, so it succeeds on item 1!',
      },
      {
        id: 'ls-mini-2',
        type: 'definition',
        question: 'What happens if the target is NOT in the array?',
        options: [
          'Linear search checks every single element and returns -1',
          'The computer crashes with an error',
          'It guesses a random number',
          'It creates a new element automatically',
        ],
        correctIndex: 0,
        explanation: 'Linear search inspects all elements to be sure it is absent, then returns -1.',
      },
      {
        id: 'ls-mini-3',
        type: 'conceptual',
        question: 'Is Linear Search easy for computers to do?',
        options: [
          'Yes, it is very simple and requires virtually no setup or extra memory',
          'No, it requires quantum computers',
          'Only on Tuesdays',
          'No, it requires 100 gigabytes of RAM',
        ],
        correctIndex: 0,
        explanation: 'Linear search is the simplest possible search algorithm, needing just a single loop.',
      },
    ],
    buddyEncouragement:
      "See? Algorithms aren't scary at all! Linear search is just looking through items one by one. You do it every day when picking out a pair of socks. Let's try the quiz again! 🌸",
  },
};
