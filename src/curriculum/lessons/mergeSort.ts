import { AlgorithmLesson } from '../../types';

export const mergeSortLesson: AlgorithmLesson = {
  id: 'merge-sort',
  title: 'Merge Sort',
  tagline: 'The guaranteed divide-and-conquer master',
  difficulty: 'Intermediate',
  category: 'Sorting',
  level: 3,
  estimatedMinutes: 20,
  flowerType: 'sunflower',
  prerequisites: ['Recursion', 'Arrays', 'Two Pointers'],
  objectives: [
    'Master the Divide, Conquer, and Combine paradigm',
    'Understand why merge sort guarantees O(n log n) even in worst case',
    'Implement the two-finger merge routine with auxiliary buffers',
    'Analyze why Merge Sort is preferred for external sorting and linked lists',
  ],

  simpleExplanation:
    'Merge Sort is the quintessential divide-and-conquer algorithm. If a list of 1,000 items is hard to sort, split it into two lists of 500. Still too hard? Split them into 250, then 125, until you reach lists with just 1 item! A list with 1 item is already sorted! Then, you pair them up and merge them back together in order. Because merging two already-sorted lists is lightning fast, the whole array comes together beautifully in guaranteed O(n log n) time.',
  eli5:
    'Imagine you and your friend have two decks of playing cards that are already sorted from low to high. To combine them into one big sorted deck, you both look at your top card. Whoever has the smaller card places it down onto the table first! Repeat until both decks are empty. That simple card game is how Merge Sort works!',

  whyNeeded: {
    problemSolved:
      'Sorting arbitrary collections with a strictly guaranteed worst-case time bound of O(n log n) while preserving stability.',
    historicalContext:
      'Invented by John von Neumann in 1945 for the EDVAC, Merge Sort was one of the earliest algorithmic demonstrations of the power of mathematical recursion on automated computers.',
    alternatives: ['Quick Sort (faster in RAM, but O(n²) worst case)', 'Heap Sort (O(n log n) and in-place, but unstable)', 'TimSort (hybrid merge/insertion sort)'],
    whenToUse: [
      'Guaranteed worst-case O(n log n) runtime is required (predictable SLA)',
      'Sorting linked lists (where extra array allocation is unnecessary and pointers can be re-linked in O(1) space)',
      'External sorting: datasets too large to fit in RAM, read sequentially from SSD/disk',
      'Stability is required (equal elements must preserve original order)',
    ],
    whenToAvoid: [
      'System RAM is severely constrained (standard array merge sort requires O(n) extra space)',
      'Small arrays (< 30 items) where insertion sort overhead is much lower',
    ],
  },

  realLifeAnalogy: {
    title: 'The Botanical Seed Tournament',
    story:
      'In a botanical breeding tournament, 16 different flower varieties are paired up in a bracket. In Round 1, pairs of 2 are compared. In Round 2, groups of 4 are combined. In Round 3, groups of 8. In the grand finale, two perfectly sorted halves of 8 flowers merge into one master ranking of 16. The tournament depth is only 4 rounds (log₂ 16 = 4)!',
    moral:
      'Halving down to singletons and merging up in pairs takes only log₂(n) levels of work.',
  },

  steps: [
    {
      phase: 'Step 1: Divide',
      description: 'Find midpoint `mid = floor((start + end) / 2)`.',
      details: 'Divide array into left subarray [start .. mid] and right subarray [mid + 1 .. end].',
    },
    {
      phase: 'Step 2: Conquer (Recurse)',
      description: 'Recursively call `mergeSort(left)` and `mergeSort(right)`.',
      details: 'Base case: when subarray length is 1 or 0, it is already sorted.',
    },
    {
      phase: 'Step 3: Combine (Merge)',
      description: 'Merge the two sorted halves into a single sorted range.',
      details: 'Use two pointers `i` and `j` to pick the smaller current element and copy to output.',
    },
    {
      phase: 'Step 4: Copy Back',
      description: 'Copy the merged elements back into the original array range.',
      details: 'Ensures the parent recursive level receives a sorted segment.',
    },
  ],

  defaultInput: [38, 27, 43, 3, 9, 82, 10],

  pseudocode: [
    { line: 1, code: 'function mergeSort(arr, low, high):', explanation: 'Sorts subarray arr[low..high]' },
    { line: 2, code: '  if low >= high: return', explanation: 'Base case: 1 or 0 elements are already sorted' },
    { line: 3, code: '  mid = low + floor((high - low) / 2)', explanation: 'Find midpoint index' },
    { line: 4, code: '  mergeSort(arr, low, mid)', explanation: 'Recursively sort left half' },
    { line: 5, code: '  mergeSort(arr, mid + 1, high)', explanation: 'Recursively sort right half' },
    { line: 6, code: '  merge(arr, low, mid, high)', explanation: 'Merge two sorted halves together' },
  ],

  code: {
    python: `def merge_sort(arr):
    """
    Sort array using Divide-and-Conquer Merge Sort.
    Time: O(n log n) guaranteed, Space: O(n)
    """
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0

    # Two-pointer merge
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    # Append remaining elements
    result.extend(left[i:])
    result.extend(right[j:])
    return result

# Example:
garden = [38, 27, 43, 3, 9, 82, 10]
print(merge_sort(garden)) # [3, 9, 10, 27, 38, 43, 82]`,

    javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

// Example:
const garden = [38, 27, 43, 3, 9, 82, 10];
console.log(mergeSort(garden)); // [3, 9, 10, 27, 38, 43, 82]`,

    cpp: `#include <iostream>
#include <vector>

void merge(std::vector<int>& arr, int l, int m, int r) {
    std::vector<int> left(arr.begin() + l, arr.begin() + m + 1);
    std::vector<int> right(arr.begin() + m + 1, arr.begin() + r + 1);

    size_t i = 0, j = 0;
    int k = l;

    while (i < left.size() && j < right.size()) {
        if (left[i] <= right[j]) {
            arr[k++] = left[i++];
        } else {
            arr[k++] = right[j++];
        }
    }
    while (i < left.size()) arr[k++] = left[i++];
    while (j < right.size()) arr[k++] = right[j++];
}

void mergeSort(std::vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}

int main() {
    std::vector<int> garden = {38, 27, 43, 3, 9, 82, 10};
    mergeSort(garden, 0, static_cast<int>(garden.size()) - 1);
    for (int v : garden) std::cout << v << " ";
    return 0;
}`,

    java: `import java.util.Arrays;

public class MergeSort {
    public static void sort(int[] arr, int l, int r) {
        if (l < r) {
            int m = l + (r - l) / 2;
            sort(arr, l, m);
            sort(arr, m + 1, r);
            merge(arr, l, m, r);
        }
    }

    private static void merge(int[] arr, int l, int m, int r) {
        int[] left = Arrays.copyOfRange(arr, l, m + 1);
        int[] right = Arrays.copyOfRange(arr, m + 1, r + 1);

        int i = 0, j = 0, k = l;
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                arr[k++] = left[i++];
            } else {
                arr[k++] = right[j++];
            }
        }
        while (i < left.length) arr[k++] = left[i++];
        while (j < right.length) arr[k++] = right[j++];
    }

    public static void main(String[] args) {
        int[] garden = {38, 27, 43, 3, 9, 82, 10};
        sort(garden, 0, garden.length - 1);
        System.out.println(Arrays.toString(garden));
    }
}`,
  },

  complexity: {
    bestTime: 'O(n log n)',
    bestReason: 'Even if the array is already sorted, merge sort divides log₂(n) times and performs n comparisons to merge.',
    averageTime: 'O(n log n)',
    averageReason: 'The recursion tree always has height log₂(n), and work across each level sums to exactly O(n).',
    worstTime: 'O(n log n)',
    worstReason: 'Unlike QuickSort, Merge Sort has NO quadratic worst case. It is mathematically guaranteed O(n log n) for all inputs.',
    space: 'O(n)',
    spaceReason: 'Requires auxiliary buffers to hold elements during the merging phase.',
    auxiliarySpace: 'O(n)',
  },

  whenToUsePractical: [
    {
      scenario: 'Sorting e-commerce transactions where stability is required (e.g. sort by price, then by date)',
      reason: 'Merge Sort is stable: items with identical keys maintain their original relative order.',
      recommendation: 'Use Merge Sort or TimSort.',
    },
    {
      scenario: 'Sorting a singly linked list with 1,000,000 nodes',
      reason: 'Linked lists do not support random access needed by QuickSort, but merge sort can split and merge lists with O(1) extra space!',
      recommendation: 'Merge Sort is the gold standard for linked lists.',
    },
    {
      scenario: 'Embedded microcontroller with 2KB total RAM',
      reason: 'Merge Sort requires an extra O(n) array buffer, which might exhaust memory.',
      recommendation: 'Use Heap Sort or Insertion Sort instead for O(1) space.',
    },
  ],

  commonMistakes: [
    {
      mistake: 'Allocating new arrays on every recursive merge call',
      whyItHappens: 'Creating lots of temporary small array objects causes severe garbage collection pressure in JS/Java.',
      howToFix: 'Allocate a single auxiliary buffer of size n once at the start and pass it through recursive calls.',
    },
    {
      mistake: 'Using `<` instead of `<=` in the merge step',
      whyItHappens: 'Writing `if (left[i] < right[j])` breaks algorithmic stability by picking the right element when keys are equal.',
      howToFix: 'Write `if (left[i] <= right[j])` to preserve the original order of equal items.',
    },
    {
      mistake: 'Base case recursion condition omission',
      whyItHappens: 'Forgetting `if (low >= high) return;` causes infinite recursion and StackOverflowError.',
      howToFix: 'Always verify base cases before computing midpoints.',
    },
  ],

  quiz: [
    {
      id: 'ms-q1',
      type: 'definition',
      question: 'Which algorithmic paradigm does Merge Sort exemplify?',
      options: [
        'Divide and Conquer',
        'Greedy Choice Heuristic',
        'Dynamic Programming Tabulation',
        'Backtracking with Pruning',
      ],
      correctIndex: 0,
      explanation:
        'Merge Sort divides the array into halves, conquers each half recursively, and combines the results via merging.',
      whyWrong: [
        'Greedy makes immediate local choices without recursive decomposition.',
        'Dynamic programming reuses memoized overlapping subproblems.',
        'Backtracking explores state trees and undoes moves.',
      ],
      miniExample: 'Divide → Halve, Conquer → Sort, Combine → Merge.',
    },
    {
      id: 'ms-q2',
      type: 'complexity',
      question: 'What is the worst-case time complexity of Merge Sort on an array of size n?',
      options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
      correctIndex: 0,
      explanation:
        'Merge Sort is guaranteed O(n log n) in all cases (best, average, and worst). The tree depth is log₂(n), and each level performs O(n) work.',
      whyWrong: [
        'O(n²) is QuickSort’s worst case, but Merge Sort never degrades to quadratic.',
        'O(n) is not achievable for comparison-based sorting.',
        'O(log n) is the time for a binary search, not sorting.',
      ],
    },
    {
      id: 'ms-q3',
      type: 'step-by-step',
      question: 'When merging two sorted arrays [2, 7, 9] and [1, 5, 8], what is the first element added to the merged output?',
      options: ['1', '2', '7', '8'],
      correctIndex: 0,
      explanation:
        'The two pointers compare the first elements: 2 and 1. Since 1 < 2, 1 is appended first.',
      whyWrong: [
        '2 is compared against 1 and loses.',
        '7 is later in the left array.',
        '8 is later in the right array.',
      ],
      miniExample: 'min(left[0]=2, right[0]=1) → 1.',
    },
    {
      id: 'ms-q4',
      type: 'conceptual',
      question: 'Why does standard array-based Merge Sort require O(n) auxiliary space?',
      options: [
        'Because elements must be temporarily copied into separate buffers while merging the two halves',
        'Because the call stack requires n frames',
        'Because it creates a 2D matrix',
        'Because it duplicates the array 10 times',
      ],
      correctIndex: 0,
      explanation:
        'To merge two contiguous sorted regions in-place without overwriting unread elements, an auxiliary buffer of up to size n is needed.',
      whyWrong: [
        'The call stack takes O(log n) frames, not O(n).',
        'No 2D matrices are created.',
        'It does not duplicate the array 10 times.',
      ],
    },
    {
      id: 'ms-q5',
      type: 'practical',
      question: 'Why is Merge Sort often chosen over QuickSort for sorting Linked Lists?',
      options: [
        'Because linked list nodes can be split and re-linked with pointer updates in O(1) auxiliary space without random access',
        'Because linked lists only hold prime numbers',
        'Because QuickSort cannot run on computers with more than 4 cores',
        'Because Merge Sort turns linked lists into hash tables',
      ],
      correctIndex: 0,
      explanation:
        'Linked lists do not have O(1) random indexing (which QuickSort needs for partitioning), but list nodes can easily be spliced in O(1) auxiliary space during merge sort!',
      whyWrong: [
        'Data content is irrelevant.',
        'Core count does not restrict QuickSort.',
        'Merge Sort does not create hash tables.',
      ],
    },
  ],

  recap: {
    takeaways: [
      'Merge Sort is a Divide-and-Conquer algorithm.',
      'Guarantees O(n log n) runtime across best, average, and worst cases.',
      'Requires O(n) auxiliary space for array implementations.',
      'Stable sort: preserves relative ordering of equal elements.',
      'Superb for external sorting and linked lists.',
    ],
    keyTerms: [
      { term: 'Divide and Conquer', definition: 'Splitting into subproblems, solving recursively, and recombining.' },
      { term: 'Merge Step', definition: 'Zipping two sorted lists into one sorted list in linear O(n) time.' },
      { term: 'Recursion Tree', definition: 'The visual tree showing call divisions of depth log₂(n).' },
    ],
    finalChallengePrompt: 'Can you implement bottom-up iterative Merge Sort without using any recursive function calls?',
  },

  relearn: {
    conceptKey: 'merge-sort-basics',
    simplifiedTitle: 'Combining Two Organized Files',
    differentAnalogy:
      'Imagine you have two neat stacks of business cards, both arranged alphabetically from A to Z. How do you combine them into one single A-Z stack? You look at the top card of both piles. Take the alphabetically earlier card and put it in your new box. Keep doing that! Merging two already-ordered stacks is effortless. Merge Sort just chops everything down until it gets to 1-card stacks, then uses this trick all the way up!',
    babySteps: [
      '1. Chop your messy list into two halves.',
      '2. Chop those halves in half again!',
      '3. Keep chopping until each pile has only 1 single card.',
      '4. A 1-card pile is already sorted!',
      '5. Now zip pairs of piles back together by comparing top cards.',
      '6. When the last two big halves zip together, the whole array is sorted.',
    ],
    workedExample:
      'Merge [2, 5] and [1, 9]:\n- Look at 2 and 1: 1 is smaller → Put 1 first. [1]\n- Look at 2 and 9: 2 is smaller → Put 2 next. [1, 2]\n- Look at 5 and 9: 5 is smaller → Put 5 next. [1, 2, 5]\n- Only 9 is left → Append 9. [1, 2, 5, 9]! Easy!',
    miniPractice: [
      {
        id: 'ms-mini-1',
        type: 'step-by-step',
        question: 'When merging [3] and [2], which number goes first?',
        options: ['2', '3', 'Neither', 'Both simultaneously'],
        correctIndex: 0,
        explanation: '2 is smaller than 3, so it goes into the sorted output first: [2, 3].',
      },
      {
        id: 'ms-mini-2',
        type: 'conceptual',
        question: 'Is a list containing only 1 number sorted?',
        options: [
          'Yes, a single element is always sorted by definition!',
          'No, you need at least 10 numbers',
          'Only if it is zero',
          'Only if it is even',
        ],
        correctIndex: 0,
        explanation: 'A single element has nothing to be out of order with, so it is trivially sorted!',
      },
      {
        id: 'ms-mini-3',
        type: 'complexity',
        question: 'Does Merge Sort slow down to quadratic O(n²) if the input is reversed?',
        options: [
          'No, it still runs in rock-solid O(n log n) time!',
          'Yes, it becomes as slow as bubble sort',
          'It crashes the computer',
          'It takes infinite time',
        ],
        correctIndex: 0,
        explanation: 'Merge Sort always cuts in half regardless of input arrangement, guaranteeing O(n log n)!',
      },
    ],
    buddyEncouragement:
      "Divide and conquer is how flowers grow branches from a single stalk! Once you see the merge step, Merge Sort feels like second nature. Let's bloom! 🌸",
  },
};
