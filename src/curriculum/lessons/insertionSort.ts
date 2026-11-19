import { AlgorithmLesson } from '../../types';

export const insertionSortLesson: AlgorithmLesson = {
  id: 'insertion-sort',
  title: 'Insertion Sort',
  tagline: 'The bridge player’s card sorter',
  difficulty: 'Beginner',
  category: 'Sorting',
  level: 3,
  estimatedMinutes: 16,
  flowerType: 'tulip',
  prerequisites: ['Arrays', 'Loops & Conditions', 'Element Shifting'],
  objectives: [
    'Understand how building a sorted prefix element-by-element mimics card sorting',
    'Demonstrate why Insertion Sort achieves blazingly fast O(n) on nearly-sorted data',
    'Analyze why high-performance hybrid sorts (TimSort, Introsort) use Insertion Sort for small partitions',
    'Implement Insertion Sort in Python, JavaScript, C++, and Java',
  ],

  simpleExplanation:
    'Insertion Sort works the same way most people sort playing cards in their hands. You hold the sorted cards in your left hand. You pick up the next card from the deck, look through your sorted hand from right to left, and slide the new card into its exact correct spot. With each new card, your hand remains perfectly sorted.',
  eli5:
    'Imagine you have 3 books on a shelf arranged by size: Small, Medium, Large. You find a new book that is "Medium-Small". You slide the Large book to the right, slide the Medium book to the right, and slip your new book right into the empty slot! Repeat this for every new book until all books are on the shelf.',

  whyNeeded: {
    problemSolved:
      'Sorting small arrays (n < 30) or datasets that are already nearly sorted with minimal overhead.',
    historicalContext:
      'Analyzed by John Mauchly as early as 1946, Insertion Sort is ubiquitous because of its simplicity and unmatched efficiency on small or almost-sorted inputs.',
    alternatives: ['Bubble Sort (more comparisons and swaps)', 'Selection Sort (always O(n²), non-adaptive)', 'TimSort (which uses Insertion Sort as its core engine)'],
    whenToUse: [
      'The dataset is nearly sorted (e.g. only a few items are out of order) — runs in O(n) time!',
      'Small arrays (n <= 32 elements) where low overhead beats O(n log n) divide-and-conquer routines',
      'Online sorting: incoming streaming numbers inserted as they arrive',
      'Stability is required',
    ],
    whenToAvoid: [
      'Large reverse-sorted arrays (O(n²) time due to quadratic shifting)',
    ],
  },

  realLifeAnalogy: {
    title: 'Arranging Playing Cards in Your Hand',
    story:
      'You are dealt 7 playing cards. You look at Card 2 and slide it before Card 1 if smaller. You pick Card 3, compare it with Card 2, and slide it into place. At every moment, the cards in your hand are 100% sorted, and each new card simply slides into its rightful position.',
    moral:
      'Shifting only what is necessary makes adaptive sorting exceptionally fast.',
  },

  steps: [
    {
      phase: 'Step 1: Start with Index 1',
      description: 'Index 0 is trivially a sorted prefix of length 1.',
      details: 'Loop `i` from 1 to `n - 1`. Pick `key = arr[i]`.',
    },
    {
      phase: 'Step 2: Shift Larger Elements Right',
      description: 'Compare `key` with elements in the sorted prefix `[0 .. i - 1]`, moving backwards.',
      details: 'While `j >= 0` and `arr[j] > key`: shift `arr[j]` to `arr[j + 1]` and decrement `j`.',
    },
    {
      phase: 'Step 3: Insert Key',
      description: 'Place `key` into the vacated slot at `arr[j + 1]`.',
      details: 'The sorted prefix has now expanded to include index `i`.',
    },
    {
      phase: 'Step 4: Repeat for All Elements',
      description: 'Continue until the entire array is included in the sorted prefix.',
      details: 'Fully sorted in-place with O(1) auxiliary memory.',
    },
  ],

  defaultInput: [12, 11, 13, 5, 6],

  pseudocode: [
    { line: 1, code: 'function insertionSort(arr):', explanation: 'Sorts array in place' },
    { line: 2, code: '  for i from 1 to length(arr) - 1:', explanation: 'Pick each element as key' },
    { line: 3, code: '    key = arr[i]', explanation: 'Store current element' },
    { line: 4, code: '    j = i - 1', explanation: 'Start comparison from end of sorted prefix' },
    { line: 5, code: '    while j >= 0 and arr[j] > key:', explanation: 'Shift larger elements to the right' },
    { line: 6, code: '      arr[j + 1] = arr[j]', explanation: 'Shift element one position right' },
    { line: 7, code: '      j = j - 1', explanation: 'Move pointer left' },
    { line: 8, code: '    arr[j + 1] = key', explanation: 'Insert key into correct position' },
    { line: 9, code: '  return arr', explanation: 'Return sorted array' },
  ],

  code: {
    python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        # Shift elements greater than key to one position ahead
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

# Example:
garden = [12, 11, 13, 5, 6]
print(insertion_sort(garden)) # [5, 6, 11, 12, 13]`,

    javascript: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

const garden = [12, 11, 13, 5, 6];
console.log(insertionSort(garden)); // [5, 6, 11, 12, 13]`,

    cpp: `#include <iostream>
#include <vector>

void insertionSort(std::vector<int>& arr) {
    int n = static_cast<int>(arr.size());
    for (int i = 1; i < n; ++i) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            --j;
        }
        arr[j + 1] = key;
    }
}`,

    java: `public class InsertionSort {
    public static void sort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
}`,
  },

  complexity: {
    bestTime: 'O(n)',
    bestReason: 'When array is already sorted, the while loop condition `arr[j] > key` fails immediately on every pass (only 1 check per element).',
    averageTime: 'O(n²)',
    averageReason: 'On average, each element shifts through half of the sorted prefix (n²/4 shifts).',
    worstTime: 'O(n²)',
    worstReason: 'When array is in reverse sorted order, every element must shift across the entire prefix (n(n - 1)/2 shifts).',
    space: 'O(1)',
    spaceReason: 'In-place sort needing only two integer variables.',
    auxiliarySpace: 'O(1)',
  },

  whenToUsePractical: [
    {
      scenario: 'The array is already 95% sorted (nearly sorted)',
      reason: 'Insertion Sort runs in near linear O(n) time, beating even QuickSort!',
      recommendation: 'Use Insertion Sort.',
    },
    {
      scenario: 'Base cases of QuickSort, MergeSort, or TimSort where sub-arrays have <= 16 elements',
      reason: 'Low constant factors make insertion sort faster than recursive function overhead on tiny slices.',
      recommendation: 'Used universally in standard libraries (Python, Java, V8 JS).',
    },
    {
      scenario: 'Sorting 500,000 completely random numbers',
      reason: 'O(n²) time makes it far too slow.',
      recommendation: 'Use QuickSort, MergeSort, or TimSort.',
    },
  ],

  commonMistakes: [
    {
      mistake: 'Using swap operations instead of shifting',
      whyItHappens: 'Repeatedly swapping requires 3 memory writes per step. Shifting (`arr[j+1] = arr[j]`) requires only 1 write per shift!',
      howToFix: 'Store `key` once, shift elements right, and write `key` once at the end.',
    },
    {
      mistake: 'Off-by-one error inserting into `arr[j]` instead of `arr[j + 1]`',
      whyItHappens: 'Because the while loop decrements `j` before exiting, the correct insertion slot is `j + 1`.',
      howToFix: 'Always write `arr[j + 1] = key`.',
    },
    {
      mistake: 'Starting the outer loop at index 0',
      whyItHappens: 'A single element at index 0 is already sorted by definition; doing index 0 causes index -1 checks.',
      howToFix: 'Start outer loop at index 1.',
    },
  ],

  quiz: [
    {
      id: 'is-q1',
      type: 'definition',
      question: 'How does Insertion Sort maintain its sorted region during execution?',
      options: [
        'It maintains a sorted prefix on the left and inserts each new element into its proper position',
        'It bubbles the largest element to the far right',
        'It finds the minimum element and swaps it to index 0',
        'It divides the array into halves using a pivot',
      ],
      correctIndex: 0,
      explanation:
        'Insertion Sort takes elements one by one and inserts them into the growing sorted prefix at the beginning of the array.',
      whyWrong: [
        'Bubbling describes Bubble Sort.',
        'Swapping minimum describes Selection Sort.',
        'Dividing with pivot describes QuickSort.',
      ],
      miniExample: '[11, 12, 13] is sorted prefix. Insert 5 → [5, 11, 12, 13].',
    },
    {
      id: 'is-q2',
      type: 'complexity',
      question: 'What is the best-case time complexity of Insertion Sort on an array that is already sorted?',
      options: ['O(n)', 'O(n²)', 'O(1)', 'O(n log n)'],
      correctIndex: 0,
      explanation:
        'When the array is already sorted, the condition `arr[j] > key` is false on the very first comparison for every element, resulting in exactly n - 1 comparisons.',
      whyWrong: [
        'O(n²) is the worst case (reverse order).',
        'O(1) is impossible for checking n elements.',
        'O(n log n) belongs to divide and conquer.',
      ],
    },
    {
      id: 'is-q3',
      type: 'practical',
      question: 'Why do high-performance sorting engines like Python’s TimSort switch to Insertion Sort for small slices (<= 32 items)?',
      options: [
        'Because Insertion Sort has minimal overhead and outperforms O(n log n) algorithms on small datasets',
        'Because Python does not support recursion',
        'Because Insertion Sort uses less electricity',
        'Because Insertion Sort can run backwards',
      ],
      correctIndex: 0,
      explanation:
        'For tiny n, constant factors dominate. Insertion Sort has virtually zero setup overhead, excellent cache locality, and runs faster on small blocks than recursive tree setup.',
      whyWrong: [
        'Python supports recursion.',
        'Electricity usage is not an algorithmic benchmark factor here.',
        'Running backwards is not the reason.',
      ],
    },
    {
      id: 'is-q4',
      type: 'step-by-step',
      question: 'In array [10, 20, 30, 15], when inserting key 15, which elements shift to the right?',
      options: ['Only 30 shifts right', 'Both 20 and 30 shift right', '10, 20, and 30 all shift right', 'No elements shift'],
      correctIndex: 0,
      explanation:
        'Prefix is [10, 20, 30]. Since 30 > 15, 30 shifts right. Then 20 is compared: 20 > 15, so 20 also shifts right! Wait! Both 30 and 20 are greater than 15! 30 shifts right, then 20 shifts right, and 15 is placed after 10. So BOTH 20 and 30 shift right!',
      whyWrong: [
        'Only 30 shifting would leave 15 after 20, but 15 < 20.',
        '10 is smaller than 15, so 10 does NOT shift.',
        'Shifting is required.',
      ],
    },
    {
      id: 'is-q5',
      type: 'conceptual',
      question: 'Is Insertion Sort an online algorithm (can sort a stream of data as it arrives)?',
      options: [
        'Yes, each newly arriving item can be inserted immediately into the existing sorted prefix in O(k) time',
        'No, it requires all data upfront before it can start',
        'Only if the stream is limited to 10 items',
        'Only for floating-point numbers',
      ],
      correctIndex: 0,
      explanation:
        'Because Insertion Sort maintains a sorted prefix at all times, a new incoming element can simply be inserted into the existing array on the fly.',
      whyWrong: [
        'Selection Sort requires knowing all elements upfront to find the true minimum, but Insertion Sort does not!',
        'No size limit exists.',
        'Data type is irrelevant.',
      ],
    },
  ],

  recap: {
    takeaways: [
      'Insertion Sort builds a sorted prefix one card at a time.',
      'Achieves lightning fast O(n) best-case time on nearly-sorted data.',
      'Stable in-place sort with O(1) auxiliary space.',
      'Core component of modern hybrid sorting engines (TimSort).',
      'Naturally handles streaming online data.',
    ],
    keyTerms: [
      { term: 'Sorted Prefix', definition: 'The already-ordered left subarray awaiting the next element.' },
      { term: 'Element Shifting', definition: 'Moving items one slot to the right instead of performing expensive 3-write swaps.' },
      { term: 'Online Algorithm', definition: 'An algorithm that processes its input piece-by-piece in serial fashion.' },
    ],
    finalChallengePrompt: 'Can you implement Binary Insertion Sort, using binary search to find the insertion position in O(log n) comparisons?',
  },

  relearn: {
    conceptKey: 'insertion-sort-basics',
    simplifiedTitle: 'Sorting Cards in Your Hand',
    differentAnalogy:
      'Imagine you are playing cards. You are holding 3 cards neatly sorted in your hand: 2, 6, 9. The dealer hands you a 5. What do you do? You slide 9 over. You slide 6 over. You slip the 5 right between 2 and 6. Your hand is now: 2, 5, 6, 9! Perfectly sorted! You do this every time you play card games. That is Insertion Sort!',
    babySteps: [
      '1. Card 1 in your hand is already sorted all by itself.',
      '2. Pick up the next card (the Key).',
      '3. Slide any cards in your hand that are bigger than Key one spot to the right.',
      '4. Drop the Key into the empty slot.',
      '5. Repeat for every card dealt to you.',
    ],
    workedExample:
      'Hand: [10, 30]. New card: 20.\n- Is 30 > 20? Yes! Slide 30 right: [10, __, 30].\n- Is 10 > 20? No! Stop sliding.\n- Put 20 into the empty slot: [10, 20, 30]!',
    miniPractice: [
      {
        id: 'is-mini-1',
        type: 'step-by-step',
        question: 'If hand is [2, 8] and new card is 4, where does 4 go?',
        options: ['Between 2 and 8', 'Before 2', 'After 8', 'It is thrown away'],
        correctIndex: 0,
        explanation: '4 is bigger than 2 and smaller than 8, so it slides right between them: [2, 4, 8].',
      },
      {
        id: 'is-mini-2',
        type: 'conceptual',
        question: 'If all cards are ALREADY sorted, how fast is Insertion Sort?',
        options: [
          'Super fast O(n)! It just checks each card once and doesn’t need to shift anything',
          'It takes 100 hours',
          'It breaks down',
          'It reverses everything',
        ],
        correctIndex: 0,
        explanation: 'If it is already sorted, zero cards need to be shifted, so it glides through in lightning O(n) time!',
      },
      {
        id: 'is-mini-3',
        type: 'definition',
        question: 'What is the "Key"?',
        options: [
          'The new card you are currently holding and trying to insert into your hand',
          'A password to the computer',
          'The biggest number in the universe',
          'The delete button',
        ],
        correctIndex: 0,
        explanation: 'The "Key" is the current item being placed into the sorted prefix.',
      },
    ],
    buddyEncouragement:
      "Sorting cards in your hand is one of the most natural human instincts. You are already an algorithmic thinker! Let's bloom on the quiz! 🌸",
  },
};
