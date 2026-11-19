import { AlgorithmLesson } from '../../types';

export const selectionSortLesson: AlgorithmLesson = {
  id: 'selection-sort',
  title: 'Selection Sort',
  tagline: 'The patient minimum selector',
  difficulty: 'Beginner',
  category: 'Sorting',
  level: 3,
  estimatedMinutes: 14,
  flowerType: 'daisy',
  prerequisites: ['Arrays', 'Swapping Elements', 'Linear Search'],
  objectives: [
    'Understand how finding the minimum element progressively builds a sorted prefix',
    'Recognize that Selection Sort performs strictly O(n) swaps (minimal memory writes)',
    'Trace comparisons and identify why it is quadratic O(n²) in all cases',
    'Implement Selection Sort in Python, JavaScript, C++, and Java',
  ],

  simpleExplanation:
    'Selection Sort works by repeatedly finding the absolute smallest element in the unsorted portion of an array and swapping it into its proper place at the front. You scan the whole array to find the minimum, put it at index 0. Then you scan the rest of the array to find the next minimum, and put it at index 1. You repeat this until every position is filled with its rightful value.',
  eli5:
    'Imagine a messy tray of toy cars of different lengths. You look through all the cars and pick out the very shortest one, setting it at the front of your shelf. Then you look through the remaining cars, find the next shortest, and put it right beside the first one. By the time you pick the last car, your entire shelf is lined up from shortest to longest!',

  whyNeeded: {
    problemSolved:
      'Sorting when writing to memory is drastically more expensive than reading from memory (e.g. flash memory / EEPROM wear leveling).',
    historicalContext:
      'One of the foundational intuitive sorting algorithms studied since the inception of computer memory architectures in the 1950s.',
    alternatives: ['Bubble Sort (more swaps)', 'Insertion Sort (faster on nearly sorted data)', 'Heap Sort (O(n log n) in-place selection)'],
    whenToUse: [
      'Flash memory where write cycles degrade silicon lifespan (Selection Sort makes at most n - 1 swaps total)',
      'Educational settings to teach nested loops and finding minimums',
      'Very small arrays (n < 20)',
    ],
    whenToAvoid: [
      'Large datasets (quadratic O(n²) comparisons even if input is already sorted)',
      'When stability is required (swapping can transpose equal elements)',
    ],
  },

  realLifeAnalogy: {
    title: 'Arranging Flower Vases by Height',
    story:
      'A florist has 10 flower vases scattered on a worktable. She sweeps her eyes across all 10 vases, spots the shortest 5cm vase, picks it up, and places it at position #1. She sweeps her eyes across the remaining 9 vases, spots the 8cm vase, and places it at position #2. She makes only 9 total movements of physical vases.',
    moral:
      'Selection Sort minimizes physical movements (swaps) by performing thorough inspections (comparisons).',
  },

  steps: [
    {
      phase: 'Step 1: Set Sorted Boundary',
      description: 'Loop `i` from 0 to `n - 2`. The subarray `[0 .. i - 1]` is already sorted.',
      details: 'Assume initial minimum is at index `minIdx = i`.',
    },
    {
      phase: 'Step 2: Find Minimum in Unsorted Region',
      description: 'Loop `j` from `i + 1` to `n - 1`. If `arr[j] < arr[minIdx]`, set `minIdx = j`.',
      details: 'Inspects all remaining unsorted candidates.',
    },
    {
      phase: 'Step 3: Swap into Position',
      description: 'If `minIdx != i`, swap `arr[i]` and `arr[minIdx]`.',
      details: 'Now index `i` holds the correct sorted value.',
    },
    {
      phase: 'Step 4: Repeat',
      description: 'Advance `i` and repeat until the array is fully sorted.',
      details: 'Total swaps made across the entire sort is at most `n - 1`.',
    },
  ],

  defaultInput: [64, 25, 12, 22, 11],

  pseudocode: [
    { line: 1, code: 'function selectionSort(arr):', explanation: 'Sorts array in-place' },
    { line: 2, code: '  n = length(arr)', explanation: 'Number of elements' },
    { line: 3, code: '  for i from 0 to n - 2:', explanation: 'Advance sorted boundary' },
    { line: 4, code: '    minIdx = i', explanation: 'Assume current position is smallest' },
    { line: 5, code: '    for j from i + 1 to n - 1:', explanation: 'Scan unsorted elements' },
    { line: 6, code: '      if arr[j] < arr[minIdx]: minIdx = j', explanation: 'Found smaller candidate' },
    { line: 7, code: '    if minIdx != i: swap(arr[i], arr[minIdx])', explanation: 'Swap minimum into place' },
    { line: 8, code: '  return arr', explanation: 'Return sorted array' },
  ],

  code: {
    python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

# Example:
flowers = [64, 25, 12, 22, 11]
print(selection_sort(flowers)) # [11, 12, 22, 25, 64]`,

    javascript: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}

const flowers = [64, 25, 12, 22, 11];
console.log(selectionSort(flowers)); // [11, 12, 22, 25, 64]`,

    cpp: `#include <iostream>
#include <vector>
#include <utility>

void selectionSort(std::vector<int>& arr) {
    int n = static_cast<int>(arr.size());
    for (int i = 0; i < n - 1; ++i) {
        int minIdx = i;
        for (int j = i + 1; j < n; ++j) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        if (minIdx != i) std::swap(arr[i], arr[minIdx]);
    }
}`,

    java: `public class SelectionSort {
    public static void sort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) minIdx = j;
            }
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }
}`,
  },

  complexity: {
    bestTime: 'O(n²)',
    bestReason: 'Even if the array is already sorted, the inner loop still scans all remaining elements to verify the minimum.',
    averageTime: 'O(n²)',
    averageReason: 'Always performs n(n - 1)/2 comparisons regardless of initial input order.',
    worstTime: 'O(n²)',
    worstReason: 'Identical comparison count in all cases.',
    space: 'O(1)',
    spaceReason: 'Operates in-place using only temporary indices.',
    auxiliarySpace: 'O(1)',
  },

  whenToUsePractical: [
    {
      scenario: 'Writing to flash memory where write operations degrade hardware',
      reason: 'Selection Sort makes at most n - 1 memory writes (swaps), fewer than Bubble or Insertion Sort.',
      recommendation: 'Use Selection Sort or Cycle Sort.',
    },
    {
      scenario: 'Large array where speed matters',
      reason: 'Always takes O(n²) comparisons with no early exit.',
      recommendation: 'Do NOT use Selection Sort. Use QuickSort or MergeSort.',
    },
  ],

  commonMistakes: [
    {
      mistake: 'Assuming Selection Sort runs faster on sorted data',
      whyItHappens: 'Unlike Bubble Sort, Selection Sort has no early termination mechanism. It always makes O(n²) comparisons.',
      howToFix: 'Recognize that best, average, and worst time are all O(n²).',
    },
    {
      mistake: 'Assuming Selection Sort is stable',
      whyItHappens: 'Swapping over long distances can easily transpose equal keys.',
      howToFix: 'If stability is needed, use Insertion Sort or Merge Sort.',
    },
    {
      mistake: 'Starting inner loop at `j = 0` instead of `j = i + 1`',
      whyItHappens: 'Checking already-sorted elements again will overwrite the minimum.',
      howToFix: 'Always start the inner scan at `i + 1`.',
    },
  ],

  quiz: [
    {
      id: 'ss-q1',
      type: 'definition',
      question: 'What is the maximum number of swaps Selection Sort performs on an array of n elements?',
      options: ['At most n - 1 swaps', 'At most n² swaps', 'At most n log n swaps', 'Exactly 0 swaps'],
      correctIndex: 0,
      explanation:
        'Selection Sort performs at most one swap per outer loop pass, resulting in at most n - 1 swaps across the entire sort.',
      whyWrong: [
        'n² swaps describes worst-case Bubble Sort.',
        'n log n is not the swap bound for selection sort.',
        '0 swaps only occurs if n <= 1.',
      ],
      miniExample: 'For 5 items, at most 4 swaps ever occur.',
    },
    {
      id: 'ss-q2',
      type: 'complexity',
      question: 'What is the best-case time complexity of Selection Sort on an already-sorted array?',
      options: ['O(n²)', 'O(n)', 'O(1)', 'O(n log n)'],
      correctIndex: 0,
      explanation:
        'Because Selection Sort cannot verify that the current element is the minimum without checking every other element, it still executes n(n - 1)/2 comparisons.',
      whyWrong: [
        'O(n) is Bubble Sort or Insertion Sort best case, not Selection Sort.',
        'O(1) is impossible for sorting.',
        'O(n log n) belongs to divide-and-conquer sorts.',
      ],
    },
    {
      id: 'ss-q3',
      type: 'step-by-step',
      question: 'Given [29, 10, 14, 37, 13], what is the array state after the very first pass of Selection Sort?',
      options: ['[10, 29, 14, 37, 13]', '[10, 13, 14, 29, 37]', '[14, 10, 29, 37, 13]', '[29, 10, 14, 13, 37]'],
      correctIndex: 0,
      explanation:
        'The minimum of the array is 10 (at index 1). It is swapped with index 0 (29). Result: [10, 29, 14, 37, 13].',
      whyWrong: [
        'That is the fully sorted array.',
        '14 is not the minimum.',
        '37 is the maximum, not minimum.',
      ],
      miniExample: 'Swap min 10 with element 29 at index 0.',
    },
    {
      id: 'ss-q4',
      type: 'conceptual',
      question: 'Why is Selection Sort unstable in its standard implementation?',
      options: [
        'Long-range swaps can jump an equal element across another identical element',
        'Because it uses random numbers',
        'Because it only works on odd numbers',
        'Because it uses too much stack memory',
      ],
      correctIndex: 0,
      explanation:
        'In array [4a, 4b, 2], finding min 2 and swapping with index 0 produces [2, 4b, 4a]. The relative order of 4a and 4b was inverted!',
      whyWrong: [
        'Selection sort is completely deterministic.',
        'It works on any number.',
        'It uses O(1) auxiliary space, not stack memory.',
      ],
    },
    {
      id: 'ss-q5',
      type: 'practical',
      question: 'In which scenario is Selection Sort technically superior to Bubble Sort?',
      options: [
        'When write operations to storage media are costly and should be strictly minimized',
        'When sorting 1,000,000 records',
        'When searching for strings',
        'When memory is infinite',
      ],
      correctIndex: 0,
      explanation:
        'Selection Sort performs at most O(n) memory writes (swaps), whereas Bubble Sort can perform up to O(n²) memory writes.',
      whyWrong: [
        'Neither algorithm should be used for 1,000,000 records.',
        'String search is not sorting.',
        'Infinite memory does not affect swap counts.',
      ],
    },
  ],

  recap: {
    takeaways: [
      'Selection Sort repeatedly finds the smallest unsorted item and swaps it to the front.',
      'Performs O(n²) comparisons in best, average, and worst cases.',
      'Performs at most O(n) memory writes / swaps (minimal memory writes).',
      'In-place sort with O(1) auxiliary space.',
      'Unstable in its standard implementation.',
    ],
    keyTerms: [
      { term: 'Minimum Element', definition: 'The smallest value discovered in the unsorted suffix.' },
      { term: 'Memory Write Minimization', definition: 'Limiting swap count to protect hardware lifespan.' },
      { term: 'Unsorted Suffix', definition: 'The remaining portion of the array awaiting selection.' },
    ],
    finalChallengePrompt: 'Can you implement Double Selection Sort, which finds both the minimum and maximum in each pass and places them at both ends?',
  },

  relearn: {
    conceptKey: 'selection-sort-basics',
    simplifiedTitle: 'Picking the Shortest Flower First',
    differentAnalogy:
      'Imagine you have a bunch of wild roses on a table. You want them lined up from shortest to tallest. You scan the whole table with your eyes, grab the single shortest rose, and place it at Spot 1. Then you scan what’s left, grab the shortest remaining rose, and place it at Spot 2. You keep doing this until all spots are filled. That is Selection Sort!',
    babySteps: [
      '1. Look across all unsorted flowers.',
      '2. Find the smallest one.',
      '3. Swap it into the current spot.',
      '4. Move to the next spot.',
      '5. Repeat until you reach the end.',
    ],
    workedExample:
      'Sort [5, 1, 3]:\n- Look at all: smallest is 1! Swap with 5 → [1, 5, 3].\n- Look at remaining [5, 3]: smallest is 3! Swap with 5 → [1, 3, 5].\n- Sorted!',
    miniPractice: [
      {
        id: 'ss-mini-1',
        type: 'step-by-step',
        question: 'In [9, 4, 7], which number is selected on the first pass?',
        options: ['4', '9', '7', 'None'],
        correctIndex: 0,
        explanation: '4 is the smallest number in the entire array, so it is selected first!',
      },
      {
        id: 'ss-mini-2',
        type: 'conceptual',
        question: 'Does Selection Sort make a lot of swaps?',
        options: [
          'No! It only makes at most 1 swap per pass',
          'Yes, millions of swaps',
          'It never swaps anything',
          'Only if the array is purple',
        ],
        correctIndex: 0,
        explanation: 'It is very patient: it checks everything first, then makes just 1 swap per pass.',
      },
      {
        id: 'ss-mini-3',
        type: 'complexity',
        question: 'Is Selection Sort faster if the array is already sorted?',
        options: [
          'No, it still checks every item to be sure!',
          'Yes, it finishes in 0 seconds',
          'It deletes the array',
          'It reverses the array',
        ],
        correctIndex: 0,
        explanation: 'It always checks all pairs to find the minimum, taking O(n²) comparisons even if already sorted.',
      },
    ],
    buddyEncouragement:
      "Selection sort is like carefully hand-picking the prettiest blossom for a bouquet! One flower at a time, you build perfection. Let's bloom! 🌸",
  },
};
