import { AlgorithmLesson } from '../../types';

export const bubbleSortLesson: AlgorithmLesson = {
  id: 'bubble-sort',
  title: 'Bubble Sort',
  tagline: 'The gentle bubbling river',
  difficulty: 'Beginner',
  category: 'Sorting',
  level: 3,
  estimatedMinutes: 15,
  flowerType: 'tulip',
  prerequisites: ['Arrays', 'Swapping Elements', 'Nested Loops'],
  objectives: [
    'Understand how pairwise adjacent comparisons propagate maximum values',
    'Learn how early termination optimizes nearly-sorted data to O(n)',
    'Trace swap operations through passes',
    'Implement bubble sort in Python, JavaScript, C++, and Java',
  ],

  simpleExplanation:
    'Bubble Sort is one of the simplest sorting algorithms. It works by stepping through the list, comparing adjacent pairs of items, and swapping them if they are in the wrong order. With each pass through the array, the largest unsorted element "bubbles up" to its correct position at the far right end, just like air bubbles rising to the surface of a pond.',
  eli5:
    'Imagine a line of students of different heights. The teacher walks down the line from left to right. Every time the teacher sees a taller student standing in front of a shorter student, she tells them to switch places! By the time she reaches the end, the tallest student in the entire class has ended up at the back of the line. Repeat this for everyone, and the whole class is sorted!',

  whyNeeded: {
    problemSolved:
      'Arranging an unordered collection of elements into monotonically increasing (or decreasing) order.',
    historicalContext:
      'Coined by Kenneth Iverson in 1962 in his work on APL, Bubble Sort has long been a staple pedagogical tool for introducing sorting mechanics, loop invariants, and quadratic time complexity.',
    alternatives: ['Insertion Sort (more efficient on small/nearly sorted data)', 'Merge Sort (O(n log n) guaranteed)', 'Quick Sort (fastest in practice)'],
    whenToUse: [
      'Educational purposes to learn loops, swapping, and algorithm analysis',
      'Extremely small collections (e.g. 5–10 items) where simplicity is paramount',
      'Detecting whether a list is already sorted in a single O(n) pass with an early-exit flag',
    ],
    whenToAvoid: [
      'Production systems with any meaningful volume of data (n > 50)',
      'Performance-critical systems (use QuickSort, MergeSort, or TimSort instead)',
    ],
  },

  realLifeAnalogy: {
    title: 'Bubbles Rising in a Glass of Sparkling Cider',
    story:
      'Picture carbonation bubbles in a glass flute of botanical sparkling elderflower cider. Bigger bubbles rise rapidly past smaller ones until reaching the surface. Similarly, in each pass of Bubble Sort, the heaviest unsorted value bubbles through adjacent swaps until it rests at the top of the sorted stack.',
    moral:
      'Local pairwise swaps gradually build global order.',
  },

  steps: [
    {
      phase: 'Step 1: Outer Pass Loop',
      description: 'Loop `i` from 0 to `n - 2`. Set `swapped = false`.',
      details: 'Each outer pass guarantees that the `i`-th largest element reaches its final spot.',
    },
    {
      phase: 'Step 2: Inner Pairwise Comparison',
      description: 'Loop `j` from 0 to `n - i - 2`. Compare `arr[j]` with `arr[j + 1]`.',
      details: 'Notice that we stop at `n - i - 2` because elements beyond that are already sorted!',
    },
    {
      phase: 'Step 3: Swap if Out of Order',
      description: 'If `arr[j] > arr[j + 1]`, swap their values and set `swapped = true`.',
      details: 'This pushes larger values towards the right end of the array.',
    },
    {
      phase: 'Step 4: Early Termination Check',
      description: 'If `swapped` is still `false` after an entire inner loop, stop immediately.',
      details: 'No swaps means the array is already completely sorted! Best case O(n).',
    },
  ],

  defaultInput: [45, 12, 85, 32, 89, 39, 69, 22],

  pseudocode: [
    { line: 1, code: 'function bubbleSort(arr):', explanation: 'Takes an array of comparable elements' },
    { line: 2, code: '  n = length(arr)', explanation: 'Store total number of elements' },
    { line: 3, code: '  for i from 0 to n - 2:', explanation: 'Perform at most n - 1 passes' },
    { line: 4, code: '    swapped = false', explanation: 'Flag to detect early sorted condition' },
    { line: 5, code: '    for j from 0 to n - i - 2:', explanation: 'Compare unsorted adjacent pairs' },
    { line: 6, code: '      if arr[j] > arr[j + 1]:', explanation: 'Check if pair is out of order' },
    { line: 7, code: '        swap(arr[j], arr[j + 1])', explanation: 'Swap values in place' },
    { line: 8, code: '        swapped = true', explanation: 'Record that a swap took place' },
    { line: 9, code: '    if not swapped: break', explanation: 'If no swaps occurred, array is sorted!' },
    { line: 10, code: '  return arr', explanation: 'Return the sorted array' },
  ],

  code: {
    python: `def bubble_sort(arr):
    """
    Sort array in ascending order using Bubble Sort.
    Time: O(n^2) worst/avg, O(n) best with swap flag.
    Space: O(1) in-place.
    """
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        # Early termination optimization
        if not swapped:
            break
    return arr

# Example usage:
flower_heights = [45, 12, 85, 32, 89, 39, 69, 22]
print(bubble_sort(flower_heights))
# Output: [12, 22, 32, 39, 45, 69, 85, 89]`,

    javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap adjacent elements
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }
    // If no swaps occurred in this pass, array is sorted
    if (!swapped) break;
  }
  return arr;
}

// Example usage:
const heights = [45, 12, 85, 32, 89, 39, 69, 22];
console.log(bubbleSort(heights));
// Output: [12, 22, 32, 39, 45, 69, 85, 89]`,

    cpp: `#include <iostream>
#include <vector>
#include <utility>

void bubbleSort(std::vector<int>& arr) {
    int n = static_cast<int>(arr.size());
    for (int i = 0; i < n - 1; ++i) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; ++j) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}

int main() {
    std::vector<int> heights = {45, 12, 85, 32, 89, 39, 69, 22};
    bubbleSort(heights);
    for (int val : heights) std::cout << val << " ";
    return 0;
}`,

    java: `public class BubbleSort {
    public static void sort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }

    public static void main(String[] args) {
        int[] heights = {45, 12, 85, 32, 89, 39, 69, 22};
        sort(heights);
        for (int val : heights) System.out.print(val + " ");
    }
}`,
  },

  complexity: {
    bestTime: 'O(n)',
    bestReason: 'When the array is already sorted, the inner loop makes n - 1 comparisons, finds zero swaps, and exits early.',
    averageTime: 'O(n²)',
    averageReason: 'On average, ~n²/4 swaps and ~n²/2 comparisons are made across random input permutations.',
    worstTime: 'O(n²)',
    worstReason: 'When the array is in reverse sorted order, every single comparison requires a swap: n(n - 1)/2 total comparisons.',
    space: 'O(1)',
    spaceReason: 'Operates directly in place on the input array, needing only a temporary variable for swapping.',
    auxiliarySpace: 'O(1)',
  },

  whenToUsePractical: [
    {
      scenario: 'Detecting if an array is already sorted with minimal code',
      reason: 'A single pass of Bubble Sort checks every adjacent pair in O(n) time.',
      recommendation: 'Use a single pass check or early-exit bubble sort.',
    },
    {
      scenario: 'Embedded microcontroller with 1KB RAM and 10 sensor values',
      reason: 'Bubble Sort has zero auxiliary memory overhead and tiny code footprint.',
      recommendation: 'Acceptable given n is tiny and simplicity is paramount.',
    },
    {
      scenario: 'Sorting 100,000 user records',
      reason: 'O(n²) on 100,000 items requires ~10 billion operations, taking tens of seconds.',
      recommendation: 'Never use Bubble Sort. Use QuickSort, MergeSort, or TimSort.',
    },
  ],

  commonMistakes: [
    {
      mistake: 'Looping up to `n - 1` in the inner loop instead of `n - i - 1`',
      whyItHappens: 'Forgetting that the last `i` elements are already in their final sorted positions causes redundant comparisons on already-sorted items.',
      howToFix: 'Set inner loop bound to `n - i - 1`.',
    },
    {
      mistake: 'Omitting the `swapped` boolean flag',
      whyItHappens: 'Without the flag, even a fully sorted array takes O(n²) operations instead of the optimal O(n) best case.',
      howToFix: 'Always include a boolean `swapped` flag to break early when no swaps occur.',
    },
    {
      mistake: 'Off-by-one error accessing `arr[j + 1]`',
      whyItHappens: 'If `j` loops up to `n - 1`, evaluating `arr[j + 1]` attempts to access `arr[n]`, which is out of bounds.',
      howToFix: 'Ensure `j` strictly stays `< n - i - 1`.',
    },
  ],

  quiz: [
    {
      id: 'bbs-q1',
      type: 'definition',
      question: 'After the very first pass of Bubble Sort on an array of n elements, what is guaranteed?',
      options: [
        'The largest element has bubbled to the final index (n - 1)',
        'The smallest element has moved to index 0',
        'The entire array is 50% sorted',
        'All negative numbers are moved to the left',
      ],
      correctIndex: 0,
      explanation:
        'Because each comparison pushes the larger element rightward, the maximum value in the array will continually swap until reaching the far right index.',
      whyWrong: [
        'Moving the smallest element to index 0 happens in Selection Sort or inverted Bubble Sort, not standard Bubble Sort.',
        'There is no mathematical guarantee that 50% of elements are sorted after one pass.',
        'Negative numbers are not handled separately from positive numbers.',
      ],
      miniExample: '[5, 1, 4, 2, 8] → after pass 1: [1, 4, 2, 5, 8]. The largest (8) is at the end.',
    },
    {
      id: 'bbs-q2',
      type: 'step-by-step',
      question: 'Given array [4, 3, 2, 1], how many swaps are required in total to sort it?',
      options: ['6 swaps', '4 swaps', '3 swaps', '10 swaps'],
      correctIndex: 0,
      explanation:
        'Pass 1: 3 swaps ([3, 2, 1, 4]). Pass 2: 2 swaps ([2, 1, 3, 4]). Pass 3: 1 swap ([1, 2, 3, 4]). Total = 3 + 2 + 1 = 6 swaps.',
      whyWrong: [
        '4 swaps is insufficient for reverse sorted array.',
        '3 swaps only completes pass 1.',
        '10 swaps would be for n = 5.',
      ],
      miniExample: 'Formula for reverse array: n*(n-1)/2 = 4*3/2 = 6 swaps.',
    },
    {
      id: 'bbs-q3',
      type: 'conceptual',
      question: 'Is standard Bubble Sort a stable sorting algorithm?',
      options: [
        'Yes, because it only swaps when arr[j] > arr[j + 1] (strict inequality preserves original relative order)',
        'No, it always swaps equal elements randomly',
        'Only when sorting floating-point numbers',
        'Stability does not apply to comparison sorts',
      ],
      correctIndex: 0,
      explanation:
        'A sort is stable if equal elements maintain their original relative order. Since bubble sort only swaps when strictly greater (`>`), identical elements never pass each other.',
      whyWrong: [
        'Equal elements are not swapped when using `>` condition.',
        'Data type has no bearing on stability.',
        'Stability is a fundamental property of comparison sorts.',
      ],
    },
    {
      id: 'bbs-q4',
      type: 'complexity',
      question: 'What is the best-case time complexity of an optimized Bubble Sort with an early-termination flag?',
      options: ['O(n)', 'O(1)', 'O(n log n)', 'O(n²)'],
      correctIndex: 0,
      explanation:
        'If the array is already sorted, pass 1 performs n - 1 comparisons, records zero swaps, sees `swapped == false`, and exits in O(n) time.',
      whyWrong: [
        'O(1) is impossible because at least n - 1 comparisons must verify that all items are in order.',
        'O(n log n) belongs to divide-and-conquer sorts.',
        'O(n²) is the worst/average case, or unoptimized best case.',
      ],
    },
    {
      id: 'bbs-q5',
      type: 'practical',
      question: 'Why is Bubble Sort rarely used in production software libraries?',
      options: [
        'Because O(n²) quadratic performance degrades catastrophically compared to O(n log n) algorithms like QuickSort or MergeSort',
        'Because it requires too much extra memory',
        'Because it cannot sort strings or objects',
        'Because it only works on arrays of even lengths',
      ],
      correctIndex: 0,
      explanation:
        'For 100,000 items, Bubble Sort takes ~10,000,000,000 operations whereas QuickSort takes ~1,600,000 operations (thousands of times faster).',
      whyWrong: [
        'Bubble sort uses O(1) space, so memory is actually its strength, not weakness.',
        'It works on any comparable data type (strings, objects, numbers).',
        'It works on any array length.',
      ],
    },
  ],

  recap: {
    takeaways: [
      'Bubble Sort compares adjacent pairs and swaps them if out of order.',
      'With each pass, the largest remaining value floats to its final spot.',
      'Time complexity is O(n²) worst/average, and O(n) best case with a swap flag.',
      'Space complexity is O(1) auxiliary space (in-place sort).',
      'It is a stable sorting algorithm.',
    ],
    keyTerms: [
      { term: 'In-Place Sort', definition: 'An algorithm that sorts elements using only O(1) auxiliary memory.' },
      { term: 'Stable Sort', definition: 'Preserves the relative order of items with identical keys.' },
      { term: 'Pass', definition: 'One complete scan through the unsorted portion of the collection.' },
    ],
    finalChallengePrompt: 'Can you implement Cocktail Shaker Sort, which bubbles in both directions (left-to-right then right-to-left)?',
  },

  relearn: {
    conceptKey: 'bubble-sort-basics',
    simplifiedTitle: 'Lining Up by Height with Your Neighbor',
    differentAnalogy:
      'Imagine 5 friends standing in a line. You only know one rule: look at the friend immediately to your right. If you are taller than them, switch places! Walk down the line doing this. By the time you get to the end, the tallest friend in the group is guaranteed to be at the very end. Repeat this a few times, and everyone is sorted!',
    babySteps: [
      '1. Start at the very first two people (Index 0 and 1).',
      '2. Are they in the wrong order? If yes, swap them!',
      '3. Slide your eyes to the next pair (Index 1 and 2).',
      '4. Wrong order? Swap them!',
      '5. Keep going until you hit the end. The biggest number is now locked in place.',
      '6. Do it again for the remaining numbers until nobody has to swap.',
    ],
    workedExample:
      'Sort [3, 1, 2]:\n- Compare 3 and 1: 3 > 1 → Swap! Array: [1, 3, 2]\n- Compare 3 and 2: 3 > 2 → Swap! Array: [1, 2, 3]\n- Pass 1 ends. 3 is in its final spot!\n- Next pass compares 1 and 2: in order! Done!',
    miniPractice: [
      {
        id: 'bbs-mini-1',
        type: 'step-by-step',
        question: 'If you have [5, 2], what does one swap produce?',
        options: ['[2, 5]', '[5, 2]', '[2, 2]', '[5, 5]'],
        correctIndex: 0,
        explanation: '5 > 2, so swapping places them in ascending order [2, 5].',
      },
      {
        id: 'bbs-mini-2',
        type: 'conceptual',
        question: 'Where does the biggest number end up after the first pass?',
        options: [
          'At the very end of the array (far right)',
          'At the very beginning (far left)',
          'Right in the middle',
          'It disappears',
        ],
        correctIndex: 0,
        explanation: 'Because it keeps winning every pairwise comparison, it gets pushed all the way to the right!',
      },
      {
        id: 'bbs-mini-3',
        type: 'definition',
        question: 'If no numbers need to be swapped during an entire pass, what does that tell us?',
        options: [
          'The array is already completely sorted!',
          'The computer ran out of battery',
          'We must start all over again from scratch',
          'All numbers are negative',
        ],
        correctIndex: 0,
        explanation: 'If every adjacent pair is already in order, the whole list is sorted and we can stop immediately.',
      },
    ],
    buddyEncouragement:
      "Bubbles just follow the laws of physics, floating up one step at a time! Don't worry if it takes a couple of passes to click. Let's conquer the quiz together! 🌷",
  },
};
