import { AlgorithmLesson } from '../../types';

export const binarySearchLesson: AlgorithmLesson = {
  id: 'binary-search',
  title: 'Binary Search',
  tagline: 'The logarithmic divider',
  difficulty: 'Beginner',
  category: 'Searching',
  level: 2,
  estimatedMinutes: 18,
  flowerType: 'cherry-blossom',
  prerequisites: ['Sorted Arrays', 'Two Pointers', 'Linear Search'],
  objectives: [
    'Master the divide-and-conquer strategy on sorted arrays',
    'Calculate midpoints safely avoiding integer overflow',
    'Understand why binary search scales logarithmically in O(log n)',
    'Implement iterative and recursive binary search across multiple languages',
  ],

  simpleExplanation:
    'Binary Search is the legendary strategy of repeatedly dividing your search space in half. Instead of checking every element from left to right, you look at the exact middle element. If your target is smaller than the middle, you discard the entire right half! If it is larger, you discard the entire left half. In just a few steps, you can search billions of items.',
  eli5:
    'Think of playing a number guessing game between 1 and 100. If your friend guesses 50, and you say "Too high!", they immediately know the secret number is NOT 50 through 100. With just one question, half of all possibilities are eliminated! That is Binary Search.',

  whyNeeded: {
    problemSolved:
      'Finding elements in massive sorted datasets in logarithmic time instead of linear scan.',
    historicalContext:
      'First published by John Mauchly in 1946, binary search is one of the most fundamental algorithms in computer science. Yet Donald Knuth noted that while the idea is simple, writing a completely bug-free binary search took decades for the computer science community to standardize!',
    alternatives: ['Linear Search (for unsorted data)', 'Interpolation Search (for uniformly distributed numbers)', 'Hash Table (O(1) average, but uses extra memory)'],
    whenToUse: [
      'The array is already sorted (or can be sorted once and queried many times)',
      'Direct random access by index is available (e.g. contiguous arrays)',
      'Dataset size is large (e.g., millions or billions of rows)',
      'Searching over monotonic answer ranges (binary search on answer)',
    ],
    whenToAvoid: [
      'The data changes constantly and re-sorting costs exceed search savings',
      'The data structure is a linked list (cannot jump to middle in O(1))',
      'The dataset is very small (< 20 elements, where linear search cache locality is faster)',
    ],
  },

  realLifeAnalogy: {
    title: 'The Thick Botanical Dictionary',
    story:
      'You are looking for the definition of "Rose" in a 1,200-page botanical encyclopedia. You do not start on Page 1 and read every word. You flip straight to the middle (Page 600) and see words starting with "M". Since "R" comes after "M", you ignore pages 1–600 and open the midpoint of pages 601–1200. Within about 10 flips, your fingers land directly on "Rose".',
    moral:
      'When items are sorted in alphabetical or numerical order, every comparison gives you directional information that eliminates 50% of the remaining search space.',
  },

  steps: [
    {
      phase: 'Step 1: Set Search Boundaries',
      description: 'Initialize two pointers: `low = 0` and `high = length - 1`.',
      details: 'The valid search space is currently the entire array range [low .. high].',
    },
    {
      phase: 'Step 2: Calculate Midpoint',
      description: 'Compute `mid = low + Math.floor((high - low) / 2)`.',
      details: 'Using `low + (high - low) / 2` avoids integer overflow that occurs with `(low + high) / 2`.',
    },
    {
      phase: 'Step 3: Compare Middle Element',
      description: 'Check `arr[mid]` against `target`.',
      details:
        'If `arr[mid] == target`, target found! Return `mid`.\nIf `arr[mid] < target`, target is in right half; set `low = mid + 1`.\nIf `arr[mid] > target`, target is in left half; set `high = mid - 1`.',
    },
    {
      phase: 'Step 4: Loop or Terminate',
      description: 'Repeat Steps 2–3 while `low <= high`.',
      details: 'If `low > high`, the search window has collapsed and the target is not present.',
    },
  ],

  defaultInput: [3, 8, 14, 19, 23, 29, 31, 42, 55, 68],

  pseudocode: [
    { line: 1, code: 'function binarySearch(arr, target):', explanation: 'Assume arr is sorted in ascending order' },
    { line: 2, code: '  low = 0, high = length(arr) - 1', explanation: 'Initialize two boundary pointers' },
    { line: 3, code: '  while low <= high:', explanation: 'Continue while valid search range exists' },
    { line: 4, code: '    mid = low + floor((high - low) / 2)', explanation: 'Find middle index without overflow' },
    { line: 5, code: '    if arr[mid] == target: return mid', explanation: 'Target found at middle!' },
    { line: 6, code: '    else if arr[mid] < target: low = mid + 1', explanation: 'Discard left half, search right' },
    { line: 7, code: '    else: high = mid - 1', explanation: 'Discard right half, search left' },
    { line: 8, code: '  return -1', explanation: 'Target does not exist in array' },
  ],

  code: {
    python: `def binary_search(arr, target):
    """
    Search for target in sorted arr using Binary Search.
    Returns index of target if found, else -1.
    Time: O(log n), Space: O(1)
    """
    low = 0
    high = len(arr) - 1

    while low <= high:
        # Avoid integer overflow
        mid = low + (high - low) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1

# Example usage:
sorted_garden = [3, 8, 14, 19, 23, 29, 31, 42, 55, 68]
print(binary_search(sorted_garden, 31)) # Output: 6`,

    javascript: `function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);

    if (arr[mid] === target) {
      return mid; // Target found
    } else if (arr[mid] < target) {
      low = mid + 1; // Search right half
    } else {
      high = mid - 1; // Search left half
    }
  }

  return -1; // Target not found
}

// Example usage:
const sortedGarden = [3, 8, 14, 19, 23, 29, 31, 42, 55, 68];
console.log(binarySearch(sortedGarden, 31)); // Output: 6`,

    cpp: `#include <iostream>
#include <vector>

int binarySearch(const std::vector<int>& arr, int target) {
    int low = 0;
    int high = static_cast<int>(arr.size()) - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return -1;
}

int main() {
    std::vector<int> garden = {3, 8, 14, 19, 23, 29, 31, 42, 55, 68};
    std::cout << "Index: " << binarySearch(garden, 31) << std::endl; // 6
    return 0;
}`,

    java: `public class BinarySearch {
    public static int search(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return -1;
    }

    public static void main(String[] args) {
        int[] garden = {3, 8, 14, 19, 23, 29, 31, 42, 55, 68};
        System.out.println("Index: " + search(garden, 31)); // 6
    }
}`,
  },

  complexity: {
    bestTime: 'O(1)',
    bestReason: 'The target element happens to be situated at the exact initial midpoint.',
    averageTime: 'O(log n)',
    averageReason: 'Every comparison halves the search interval: n → n/2 → n/4 ... 1.',
    worstTime: 'O(log n)',
    worstReason: 'Maximum comparisons needed until interval size collapses to 1 is ⌊log₂ n⌋ + 1. For 1,000,000 items, at most 20 comparisons!',
    space: 'O(1)',
    spaceReason: 'Iterative implementation maintains only low, mid, and high pointers.',
    auxiliarySpace: 'O(1)',
  },

  whenToUsePractical: [
    {
      scenario: 'Searching a phone directory or database index with 1,000,000,000 records',
      reason: 'Linear search could take 1,000,000,000 operations. Binary search takes fewer than 30 operations.',
      recommendation: 'Always use Binary Search or B-Trees on sorted data.',
    },
    {
      scenario: 'Finding the square root of a number or minimum feasible capacity',
      reason: 'The search space is continuous or monotonic (if x is too small, anything < x is also too small).',
      recommendation: 'Apply Binary Search on the answer space.',
    },
    {
      scenario: 'Searching a raw, unsorted stream of sensor events',
      reason: 'Binary Search assumes sorted data; running it on unsorted input produces invalid output.',
      recommendation: 'Do NOT use Binary Search unless you sort the data first.',
    },
  ],

  commonMistakes: [
    {
      mistake: 'Integer overflow in midpoint calculation: `(low + high) / 2`',
      whyItHappens: 'In languages with 32-bit signed integers (Java, C, C++), if `low + high` exceeds 2,147,483,647, it wraps into a negative number and causes out-of-bounds errors.',
      howToFix: 'Always write `mid = low + (high - low) / 2`.',
    },
    {
      mistake: 'Using `while (low < high)` instead of `while (low <= high)`',
      whyItHappens: 'Excluding equality causes the search to prematurely exit when the target is in the single remaining element where `low == high`.',
      howToFix: 'Use `while (low <= high)` for standard equality binary search.',
    },
    {
      mistake: 'Setting `low = mid` or `high = mid` instead of `mid ± 1`',
      whyItHappens: 'Forgetting to exclude `mid` can cause an infinite loop when the interval size is 2.',
      howToFix: 'Since `arr[mid]` was already checked and did not match, advance beyond it: `low = mid + 1` or `high = mid - 1`.',
    },
  ],

  quiz: [
    {
      id: 'bs-q1',
      type: 'definition',
      question: 'What is the absolute prerequisite for standard Binary Search to function correctly?',
      options: [
        'The array must be sorted in ascending or descending order',
        'All elements must be positive integers',
        'The array length must be an exact power of two',
        'The array must not contain any duplicate values',
      ],
      correctIndex: 0,
      explanation:
        'Binary search relies on the ordering invariant to discard half the search space based on whether target is smaller or greater than mid.',
      whyWrong: [
        'Binary search works with negative numbers, strings, or floats as long as they are comparable.',
        'Array lengths can be any arbitrary number (odd, even, prime).',
        'Duplicates do not break binary search; it still finds a matching instance.',
      ],
      miniExample: '[3, 8, 14, 23] is valid; [14, 3, 23, 8] is not.',
    },
    {
      id: 'bs-q2',
      type: 'step-by-step',
      question: 'For array [2, 5, 8, 12, 16, 23, 38] and target 23, what is the first element compared?',
      options: ['12 (index 3)', '8 (index 2)', '16 (index 4)', '2 (index 0)'],
      correctIndex: 0,
      explanation:
        'Length is 7. Initial low = 0, high = 6. mid = 0 + (6 - 0) / 2 = 3. arr[3] is 12.',
      whyWrong: [
        '8 is at index 2.',
        '16 is at index 4.',
        '2 is at index 0 (linear search start).',
      ],
      miniExample: 'low = 0, high = 6 → mid = 3 → arr[3] = 12.',
    },
    {
      id: 'bs-q3',
      type: 'complexity',
      question: 'In the worst case, how many comparisons does Binary Search take on an array of 1,024 elements?',
      options: ['11 comparisons', '1,024 comparisons', '512 comparisons', '100 comparisons'],
      correctIndex: 0,
      explanation:
        '1,024 = 2¹⁰. At each step the array halves: 1024 → 512 → 256 → 128 → 64 → 32 → 16 → 8 → 4 → 2 → 1. That is ⌊log₂ 1024⌋ + 1 = 11 comparisons!',
      whyWrong: [
        '1,024 comparisons is linear search worst case.',
        '512 comparisons is linear search average case.',
        '100 is far higher than logarithmic growth.',
      ],
      miniExample: 'log₂(1024) = 10, plus one final check = 11.',
    },
    {
      id: 'bs-q4',
      type: 'practical',
      question: 'Why is `low + (high - low) / 2` preferred over `(low + high) / 2` in languages like Java or C++?',
      options: [
        'It prevents integer overflow when low and high are very large positive numbers',
        'It makes the code run 10 times faster on modern CPUs',
        'It automatically rounds down to negative numbers',
        'It allows binary search to work on unsorted arrays',
      ],
      correctIndex: 0,
      explanation:
        'If low + high exceeds 2³¹ - 1, it overflows to a negative integer in 32-bit signed arithmetic, producing an ArrayIndexOutOfBoundsException.',
      whyWrong: [
        'The CPU instruction count is practically identical.',
        'Rounding rules are governed by integer division, not formula rearrangement.',
        'No formula allows binary search to work on unsorted arrays.',
      ],
    },
    {
      id: 'bs-q5',
      type: 'conceptual',
      question: 'What happens to the search pointers when `arr[mid] < target` in ascending order?',
      options: [
        '`low` is set to `mid + 1` to search the right half',
        '`high` is set to `mid - 1` to search the left half',
        '`mid` is multiplied by 2',
        '`low` is reset to 0',
      ],
      correctIndex: 0,
      explanation:
        'Because `arr[mid] < target` and the array is sorted, every element at and to the left of `mid` is also < target. So we safely set `low = mid + 1`.',
      whyWrong: [
        'Setting high = mid - 1 happens when arr[mid] > target.',
        'Mid is never multiplied by 2 in standard binary search.',
        'Low is never reset to 0.',
      ],
    },
  ],

  recap: {
    takeaways: [
      'Binary Search requires a sorted array with random access.',
      'Divides the search space in half after every single comparison.',
      'Achieves lightning fast O(log n) time complexity (at most ~30 steps for 1 billion items!).',
      'Uses `low + (high - low) / 2` to safely avoid integer overflow.',
      'Space complexity is O(1) for the iterative implementation.',
    ],
    keyTerms: [
      { term: 'Divide and Conquer', definition: 'Breaking a problem into smaller independent subproblems.' },
      { term: 'Logarithmic Time O(log n)', definition: 'Work increases by a constant amount each time input size doubles.' },
      { term: 'Midpoint Invariant', definition: 'The calculated center index partitioning the active search window.' },
    ],
    finalChallengePrompt: 'Can you modify binary search to find the FIRST occurrence of a target value when duplicates exist?',
  },

  relearn: {
    conceptKey: 'binary-search-basics',
    simplifiedTitle: 'The Secret Number Game',
    differentAnalogy:
      'Imagine I am thinking of a number between 1 and 100. You guess 50. I say "HIGHER!" Do you need to guess 20 or 30? Of course not! You throw away numbers 1 through 50 entirely. Your next guess is 75. That is Binary Search: with every single question, you cut the world in half!',
    babySteps: [
      '1. Put your left finger on the start (low) and right finger on the end (high).',
      '2. Look right in the middle between your fingers (mid).',
      '3. Is the middle item your target? Yes → WIN!',
      '4. Is the middle item smaller than target? Move left finger past middle to the right.',
      '5. Is the middle item bigger than target? Move right finger before middle to the left.',
      '6. Repeat until fingers cross.',
    ],
    workedExample:
      'Search for 19 in [5, 10, 15, 19, 25]:\n- low=0 (5), high=4 (25) → mid=2 (15).\n- 15 < 19! Discard left.\n- low=3 (19), high=4 (25) → mid=3 (19).\n- 19 == 19! FOUND in just 2 steps!',
    miniPractice: [
      {
        id: 'bs-mini-1',
        type: 'step-by-step',
        question: 'In range [10, 20, 30, 40, 50], what is the middle element?',
        options: ['30 (index 2)', '20 (index 1)', '40 (index 3)', '50 (index 4)'],
        correctIndex: 0,
        explanation: 'The middle index between 0 and 4 is (0+4)/2 = 2, which holds value 30.',
      },
      {
        id: 'bs-mini-2',
        type: 'conceptual',
        question: 'If you want to search a telephone book, should it be alphabetized?',
        options: [
          'Yes, alphabetical order allows binary search to cut pages in half',
          'No, random order is faster',
          'It does not matter at all',
          'Only if names are written in green ink',
        ],
        correctIndex: 0,
        explanation: 'Alphabetical order is the real-world equivalent of a sorted array!',
      },
      {
        id: 'bs-mini-3',
        type: 'complexity',
        question: 'Does Binary Search check every single box?',
        options: [
          'No! It skips millions of elements by cutting them in half',
          'Yes, it checks every single one',
          'It only checks odd numbers',
          'It checks numbers backwards',
        ],
        correctIndex: 0,
        explanation: 'That is the superpower of binary search: it eliminates huge chunks of items without ever looking at them!',
      },
    ],
    buddyEncouragement:
      "Halving things is nature's favorite trick! Think of a blooming petal unfurling in half. You've got this now. Ready to bloom? 🌸",
  },
};
