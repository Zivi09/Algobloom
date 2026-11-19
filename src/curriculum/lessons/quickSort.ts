import { AlgorithmLesson } from '../../types';

export const quickSortLesson: AlgorithmLesson = {
  id: 'quick-sort',
  title: 'Quick Sort',
  tagline: 'The lightning in-place partitioner',
  difficulty: 'Intermediate',
  category: 'Sorting',
  level: 3,
  estimatedMinutes: 22,
  flowerType: 'rose',
  prerequisites: ['Recursion', 'Arrays', 'Two Pointers'],
  objectives: [
    'Understand the partitioning routine (Lomuto & Hoare)',
    'Master pivot selection strategies and their impact on runtime',
    'Explain why quicksort outperforms merge sort in practical memory cache architectures',
    'Implement Quick Sort in Python, JavaScript, C++, and Java',
  ],

  simpleExplanation:
    'Quick Sort is the fastest general-purpose in-memory sorting algorithm in the world. It works by picking one element from the array to act as the "pivot". Then, it partitions the entire array so that all numbers smaller than the pivot move to the left, and all numbers larger move to the right. The pivot is now sitting in its exact final sorted position! Then, you repeat the same quick process on the left and right halves.',
  eli5:
    'Imagine a group of children lining up for lunch. The teacher picks one child named Sam as the "middle referee". Every child shorter than Sam is told to stand on the left. Every child taller than Sam stands on the right. Sam is now in the exact right spot! Then the kids on the left do the same thing, and the kids on the right do the same. Very quickly, everyone is sorted!',

  whyNeeded: {
    problemSolved:
      'In-place, highly cache-efficient O(n log n) average-time sorting for large datasets.',
    historicalContext:
      'Developed by Tony Hoare in 1959 while working on machine translation of Russian texts at the National Physical Laboratory in England. It remains the foundation of standard library sorts worldwide.',
    alternatives: ['Merge Sort (guaranteed O(n log n), but uses O(n) memory)', 'Heap Sort (in-place O(n log n), but slower constant factors)'],
    whenToUse: [
      'General-purpose in-memory array sorting (standard library `sort()`)',
      'Memory is limited and allocating an extra O(n) array is undesirable',
      'Modern CPU architectures where cache locality gives massive speedups',
    ],
    whenToAvoid: [
      'Strict worst-case SLA is required without randomized pivots (could hit O(n²))',
      'Stability is strictly required (QuickSort is unstable)',
      'Sorting singly linked lists (where Merge Sort is superior)',
    ],
  },

  realLifeAnalogy: {
    title: 'Sorting Books on a Shelf by Height',
    story:
      'You pull a medium-height book off the shelf and hold it in your hand as the benchmark. You quickly slide every book shorter than it to the left, and every book taller to the right. You slide your benchmark book right into the gap between them. It is now permanently in place. You then repeat the benchmark trick for the two remaining piles.',
    moral:
      'Partitioning around a reference element isolates subproblems without needing extra storage shelves.',
  },

  steps: [
    {
      phase: 'Step 1: Choose a Pivot',
      description: 'Select an element from the range [low .. high] to serve as the pivot.',
      details: 'Common strategies: last element (Lomuto), first element, median-of-three, or random.',
    },
    {
      phase: 'Step 2: Partition the Array',
      description: 'Rearrange elements so everything < pivot is on the left, and everything >= pivot is on the right.',
      details: 'Lomuto uses pointer `i` tracking the boundary of smaller elements.',
    },
    {
      phase: 'Step 3: Place Pivot in Final Position',
      description: 'Swap the pivot element into the boundary slot `i + 1`.',
      details: 'The pivot will never need to move again for the rest of the sorting run.',
    },
    {
      phase: 'Step 4: Recurse on Subarrays',
      description: 'Call `quickSort(low, pivotIndex - 1)` and `quickSort(pivotIndex + 1, high)`.',
      details: 'Base case: when low >= high, the segment has 0 or 1 element and is sorted.',
    },
  ],

  defaultInput: [35, 10, 45, 20, 50, 15, 40, 25],

  pseudocode: [
    { line: 1, code: 'function quickSort(arr, low, high):', explanation: 'Sorts subarray from index low to high' },
    { line: 2, code: '  if low < high:', explanation: 'Proceed if subarray contains at least two items' },
    { line: 3, code: '    p = partition(arr, low, high)', explanation: 'Partition array and get final pivot index' },
    { line: 4, code: '    quickSort(arr, low, p - 1)', explanation: 'Recursively sort left partition' },
    { line: 5, code: '    quickSort(arr, p + 1, high)', explanation: 'Recursively sort right partition' },
  ],

  code: {
    python: `def quick_sort(arr, low=0, high=None):
    """
    Sort array using in-place QuickSort (Lomuto partition).
    Average Time: O(n log n), Worst: O(n^2), Space: O(log n) stack.
    """
    if high is None:
        high = len(arr) - 1

    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1 # boundary of smaller elements

    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    # Place pivot in its correct sorted position
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# Example:
flowers = [35, 10, 45, 20, 50, 15, 40, 25]
print(quick_sort(flowers)) # [10, 15, 20, 25, 35, 40, 45, 50]`,

    javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

// Example:
const flowers = [35, 10, 45, 20, 50, 15, 40, 25];
console.log(quickSort(flowers)); // [10, 15, 20, 25, 35, 40, 45, 50]`,

    cpp: `#include <iostream>
#include <vector>
#include <utility>

int partition(std::vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; ++j) {
        if (arr[j] <= pivot) {
            ++i;
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    std::vector<int> flowers = {35, 10, 45, 20, 50, 15, 40, 25};
    quickSort(flowers, 0, static_cast<int>(flowers.size()) - 1);
    for (int v : flowers) std::cout << v << " ";
    return 0;
}`,

    java: `import java.util.Arrays;

public class QuickSort {
    public static void sort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            sort(arr, low, pi - 1);
            sort(arr, pi + 1, high);
        }
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;

        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }

    public static void main(String[] args) {
        int[] flowers = {35, 10, 45, 20, 50, 15, 40, 25};
        sort(flowers, 0, flowers.length - 1);
        System.out.println(Arrays.toString(flowers));
    }
}`,
  },

  complexity: {
    bestTime: 'O(n log n)',
    bestReason: 'Pivots split partitions into equal halves, yielding recursion tree depth log₂(n).',
    averageTime: 'O(n log n)',
    averageReason: 'Random or typical pivot choices produce balanced enough partitions to yield 1.386 n log₂ n comparisons.',
    worstTime: 'O(n²)',
    worstReason: 'Occurs when the pivot is always the smallest or largest element (e.g., choosing last element on an already sorted array).',
    space: 'O(log n)',
    spaceReason: 'Stack space required for recursive function frames (O(n) worst case without tail call optimization).',
    auxiliarySpace: 'O(1)',
  },

  whenToUsePractical: [
    {
      scenario: 'High-performance general-purpose array sorting in RAM',
      reason: 'QuickSort has small hidden constant factors and excellent CPU cache temporal locality.',
      recommendation: 'Use QuickSort (or Dual-Pivot QuickSort as in Java / C++ std::sort).',
    },
    {
      scenario: 'Finding the k-th smallest element without fully sorting (QuickSelect)',
      reason: 'By recursing only into the partition containing index k, average time drops to O(n)!',
      recommendation: 'Use QuickSelect.',
    },
    {
      scenario: 'Adversarial network input where attackers can craft worst-case reverse lists',
      reason: 'Naive QuickSort degrades to O(n²) under deliberate malicious inputs.',
      recommendation: 'Use randomized pivots or Introsort (which falls back to HeapSort).',
    },
  ],

  commonMistakes: [
    {
      mistake: 'Picking the first or last element as pivot on pre-sorted arrays',
      whyItHappens: 'If array is already sorted, picking arr[high] creates partitions of size 0 and n - 1, producing worst-case O(n²) time!',
      howToFix: 'Use median-of-three (low, mid, high) or pick a randomized pivot index.',
    },
    {
      mistake: 'Including the pivot in subsequent recursive calls',
      whyItHappens: 'Writing `quickSort(arr, low, pi)` instead of `pi - 1` includes the already-placed pivot and can cause infinite recursion.',
      howToFix: 'The pivot is already at its final sorted index `pi`. Recurse on `[low .. pi - 1]` and `[pi + 1 .. high]`.',
    },
    {
      mistake: 'Assuming QuickSort is stable',
      whyItHappens: 'During partitioning, distant swaps can transpose identical elements across the pivot.',
      howToFix: 'If stability is required, use MergeSort or TimSort.',
    },
  ],

  quiz: [
    {
      id: 'qs-q1',
      type: 'definition',
      question: 'What is the role of the "pivot" element in Quick Sort?',
      options: [
        'It serves as a benchmark value around which all other elements are partitioned into smaller and larger subsets',
        'It is the smallest element in the entire array',
        'It is a temporary variable used to count swaps',
        'It stores the total number of recursive calls',
      ],
      correctIndex: 0,
      explanation:
        'The pivot is the reference point: after partitioning, all elements smaller than the pivot sit to its left, and all larger sit to its right.',
      whyWrong: [
        'The pivot is chosen arbitrarily or via heuristic; it is rarely the absolute minimum.',
        'Swaps are counted separately.',
        'Recursive call tracking is done by the runtime stack.',
      ],
      miniExample: 'Pivot = 25 → Left: [<25], Middle: [25], Right: [>25].',
    },
    {
      id: 'qs-q2',
      type: 'complexity',
      question: 'Under what condition does naive QuickSort (picking last element as pivot) degrade to its worst-case O(n²) time?',
      options: [
        'When the array is already sorted in ascending or descending order',
        'When all elements are negative integers',
        'When the array size is a prime number',
        'When memory is greater than 16 gigabytes',
      ],
      correctIndex: 0,
      explanation:
        'If the array is sorted, the last element is always the maximum, resulting in unbalanced partitions of size (n - 1) and 0 at every level.',
      whyWrong: [
        'Signs of numbers do not affect partitioning balance.',
        'Prime lengths have no bearing on algorithmic complexity.',
        'Memory capacity does not alter time complexity bounds.',
      ],
    },
    {
      id: 'qs-q3',
      type: 'step-by-step',
      question: 'Given array [3, 8, 2, 5, 1, 4] with pivot 4, where will 4 end up after partitioning?',
      options: [
        'Index 3 (value 4)',
        'Index 0 (value 4)',
        'Index 5 (value 4)',
        'Index 1 (value 4)',
      ],
      correctIndex: 0,
      explanation:
        'Elements smaller than 4 are: [3, 2, 1] (3 items). Elements larger than 4 are: [8, 5] (2 items). So 4 must end up at index 3!',
      whyWrong: [
        'Index 0 would mean 0 elements smaller than 4.',
        'Index 5 would mean all elements are smaller than 4.',
        'Index 1 would mean only 1 element smaller than 4.',
      ],
      miniExample: '[3, 2, 1] < 4 < [8, 5] → 4 is at index 3.',
    },
    {
      id: 'qs-q4',
      type: 'conceptual',
      question: 'Why does Quick Sort typically run faster than Merge Sort in practice, despite both having O(n log n) average time?',
      options: [
        'Better CPU cache locality and zero auxiliary array allocation overhead',
        'QuickSort uses quantum multithreading automatically',
        'Merge Sort has quadratic space complexity',
        'QuickSort does not compare elements',
      ],
      correctIndex: 0,
      explanation:
        'QuickSort partitions in-place, which preserves sequential RAM access in CPU caches. Merge Sort must allocate and copy elements to and from temporary buffers.',
      whyWrong: [
        'No quantum multithreading exists in standard QuickSort.',
        'Merge Sort space complexity is linear O(n), not quadratic.',
        'QuickSort is comparison-based.',
      ],
    },
    {
      id: 'qs-q5',
      type: 'practical',
      question: 'How do modern standard libraries (like Introsort in C++ std::sort) prevent QuickSort’s O(n²) worst case?',
      options: [
        'They monitor recursion depth and switch to HeapSort if depth exceeds 2 * log₂(n)',
        'They force the user to sort the array first',
        'They randomly delete elements',
        'They only sort arrays smaller than 10 items',
      ],
      correctIndex: 0,
      explanation:
        'Introsort (introspective sort) begins with QuickSort for speed, but if recursion depth goes too deep (indicating a bad pivot pattern), it switches to HeapSort to guarantee O(n log n).',
      whyWrong: [
        'Pre-sorting defeating the purpose of sorting.',
        'Deleting elements would lose data.',
        'Standard libraries sort arrays of millions of elements.',
      ],
    },
  ],

  recap: {
    takeaways: [
      'QuickSort is an in-place divide-and-conquer algorithm.',
      'Partitions array around a pivot into smaller and larger halves.',
      'Average time is O(n log n); worst case is O(n²) with poor pivot choice.',
      'Extremely cache-efficient with small hidden constant factors.',
      'Unstable sort; auxiliary space is O(log n) stack memory.',
    ],
    keyTerms: [
      { term: 'Pivot', definition: 'The reference element chosen to partition the array.' },
      { term: 'Partitioning', definition: 'Reordering elements around the pivot in a single linear scan.' },
      { term: 'Introsort', definition: 'Hybrid sort combining QuickSort, HeapSort, and Insertion Sort.' },
    ],
    finalChallengePrompt: 'Can you implement 3-way QuickSort (Dutch National Flag partitioning) to efficiently handle arrays with many duplicate elements?',
  },

  relearn: {
    conceptKey: 'quick-sort-basics',
    simplifiedTitle: 'The Playground See-Saw Referee',
    differentAnalogy:
      'Imagine a playground see-saw. You pick one kid to sit right on the fulcrum in the center (the Pivot). Now, every kid lighter than the referee sits on the left side. Every kid heavier sits on the right side. The referee kid never has to move again—they are already in their permanent spot! Now repeat that for the left group and right group. That is Quick Sort!',
    babySteps: [
      '1. Pick one number from the list. We call this the Pivot.',
      '2. Make two teams: numbers smaller than the Pivot, and numbers bigger than the Pivot.',
      '3. Put the smaller numbers on the left, the Pivot in the middle, and the bigger numbers on the right.',
      '4. The Pivot is now done and locked into its forever home!',
      '5. Do the exact same thing to the left team and the right team.',
    ],
    workedExample:
      'Sort [15, 3, 20, 8] with pivot 8:\n- Smaller than 8: [3]\n- Bigger than 8: [15, 20]\n- Put together: [3] + [8] + [15, 20]\n- 8 is permanently locked at index 1!\n- Now sort [15, 20] → done! Array: [3, 8, 15, 20].',
    miniPractice: [
      {
        id: 'qs-mini-1',
        type: 'step-by-step',
        question: 'If numbers smaller than pivot go left and larger go right, where does the pivot go?',
        options: ['Right in the middle between them!', 'At the very front', 'At the very back', 'It is thrown away'],
        correctIndex: 0,
        explanation: 'The pivot sits right in between the smaller elements and larger elements.',
      },
      {
        id: 'qs-mini-2',
        type: 'conceptual',
        question: 'Does the pivot ever need to move again once its partition step is done?',
        options: [
          'No! It is already sitting in its permanent, final sorted position',
          'Yes, it moves around on every single step',
          'Only if it feels like it',
          'Yes, it moves to the end',
        ],
        correctIndex: 0,
        explanation: 'Once partitioned, every element before it is smaller, and every element after it is larger, so its position is locked!',
      },
      {
        id: 'qs-mini-3',
        type: 'definition',
        question: 'Why is Quick Sort so popular in programming languages?',
        options: [
          'Because it is super fast in real computer memory without needing extra memory buffers',
          'Because it was made in 1820',
          'Because it only works on Fridays',
          'Because it makes computers glow in the dark',
        ],
        correctIndex: 0,
        explanation: 'It sorts in-place and takes incredible advantage of modern CPU memory caches.',
      },
    ],
    buddyEncouragement:
      "Quick Sort is like picking a flower bud and letting the smaller petals arrange on one side and bigger ones on the other! You are mastering algorithms at lighting speed! 🌸",
  },
};
