export interface CanonicalQuizQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface LessonQuizInfo {
  lessonId: string;
  title: string;
  flowerType: string;
  questions: CanonicalQuizQuestion[];
}

export const CANONICAL_LESSON_QUIZZES: Record<string, LessonQuizInfo> = {
  'what-is-an-algorithm': {
    lessonId: 'what-is-an-algorithm',
    title: 'What is an Algorithm?',
    flowerType: 'daisy',
    questions: [
      {
        id: 'wa-q1',
        question: 'What is the most accurate definition of an algorithm in computer science?',
        options: [
          'A precise, step-by-step sequence of unambiguous instructions that terminates in finite steps to solve a specific problem',
          'A physical machine made of silicon chips and electric circuits',
          'Any piece of code written in Python or JavaScript',
          'A random guessing strategy used to approximate math formulas'
        ],
        correctIndex: 0,
        explanation: 'An algorithm is defined by its precision, definiteness, finiteness, input handling, and output delivery.'
      },
      {
        id: 'wa-q2',
        question: 'Can the same algorithm be written in multiple different programming languages?',
        options: [
          'Yes! An algorithm is a conceptual idea independent of syntax; Python, C++, and JS are merely mediums of implementation',
          'No, each algorithm can only ever be expressed in the language it was originally discovered in',
          'Only if the languages were created in the same decade',
          'No, because different languages have different alphabet characters'
        ],
        correctIndex: 0,
        explanation: 'Just like a story can be translated into English, Spanish, or Japanese without changing the plot, an algorithm can be implemented in Python, C++, or JavaScript.'
      },
      {
        id: 'wa-q3',
        question: 'Which of the following instructions violates the requirement of "definiteness"?',
        options: [
          'Add a little bit of salt until it feels right',
          'Set variable counter to 0',
          'Divide the number by 2',
          'If x is greater than 10, jump to step 4'
        ],
        correctIndex: 0,
        explanation: 'Computers cannot interpret vague intuitions like "a little bit" or "until it feels right". Steps must be unambiguous.'
      },
      {
        id: 'wa-q4',
        question: 'What is pseudocode?',
        options: [
          'An informal, human-readable outline that describes algorithm logic without strict programming syntax rules',
          'Broken code that produces a compiler error',
          'A secret hacker encryption language',
          'Computer assembly code executed directly by the CPU'
        ],
        correctIndex: 0,
        explanation: 'Pseudocode bridges human thought and computer syntax: it lets developers design algorithms clearly before implementing them.'
      },
      {
        id: 'wa-q5',
        question: 'Why must every algorithm guarantee "finiteness"?',
        options: [
          'Because an instruction set that runs forever without stopping can never return an answer to the user',
          'Because computers only have 1 hour of battery',
          'Because algorithms must fit on one sheet of paper',
          'Because programming languages only allow 50 lines of code'
        ],
        correctIndex: 0,
        explanation: 'If a process never terminates, it can never produce a final answer or complete its mission.'
      }
    ]
  },

  'linear-search': {
    lessonId: 'linear-search',
    title: 'Linear Search',
    flowerType: 'daisy',
    questions: [
      {
        id: 'ls-q1',
        question: 'In the worst case, how many comparisons does Linear Search make on an array of length N?',
        options: [
          'N comparisons (checking every single element until the very last or discovering it is absent)',
          'N / 2 comparisons',
          'Log2(N) comparisons',
          'Only 1 comparison'
        ],
        correctIndex: 0,
        explanation: 'If the target element is at the very last index or not present at all, Linear Search must inspect all N items.'
      },
      {
        id: 'ls-q2',
        question: 'What is the primary advantage of Linear Search over Binary Search?',
        options: [
          'Linear Search does not require the input collection to be sorted or preprocessed',
          'Linear Search runs faster than Binary Search on large datasets',
          'Linear Search uses less CPU electricity',
          'Linear Search works only on numbers, never strings'
        ],
        correctIndex: 0,
        explanation: 'Linear search can operate on completely unordered, arbitrary data streams without costly sorting.'
      },
      {
        id: 'ls-q3',
        question: 'What is the best-case time complexity of Linear Search?',
        options: [
          'O(1) constant time, when the target happens to be at the very first index inspected',
          'O(N)',
          'O(log N)',
          'O(N²)'
        ],
        correctIndex: 0,
        explanation: 'If the target is located at arr[0], the search terminates immediately on step 1.'
      },
      {
        id: 'ls-q4',
        question: 'What is the auxiliary space complexity of standard iterative Linear Search?',
        options: [
          'O(1) constant space because it only uses a single index pointer variable',
          'O(N) space because it copies the entire array into memory',
          'O(log N) space for call stack frames',
          'O(N²) space'
        ],
        correctIndex: 0,
        explanation: 'Linear search requires no additional dynamic memory allocations beyond a few scalar index variables.'
      },
      {
        id: 'ls-q5',
        question: 'When searching a linked list for an element, why must we use Linear Search instead of Binary Search?',
        options: [
          'Linked lists lack O(1) random access by index; reaching the middle node requires sequential traversal anyway',
          'Linked lists cannot store comparable numbers',
          'Binary search crashes when run on pointers',
          'Linked lists are always reversed in memory'
        ],
        correctIndex: 0,
        explanation: 'Without random array indexing (arr[mid]), accessing the midpoint node in a linked list takes O(N) traversal time.'
      }
    ]
  },

  'binary-search': {
    lessonId: 'binary-search',
    title: 'Binary Search',
    flowerType: 'cherry-blossom',
    questions: [
      {
        id: 'bs-q1',
        question: 'What is the absolute prerequisite for standard Binary Search to function correctly?',
        options: [
          'The elements in the collection must be sorted in monotonic order with O(1) random access',
          'The array must contain only positive odd numbers',
          'The array size must be an exact power of two',
          'The array must be reversed before searching'
        ],
        correctIndex: 0,
        explanation: 'Binary search relies on the ordering invariant to discard half the search space based on whether target is smaller or greater than mid.'
      },
      {
        id: 'bs-q2',
        question: 'For array [2, 5, 8, 12, 16, 23, 38] and target 23, what is the first element compared?',
        options: [
          '12 at index 3 (mid = (0 + 6) / 2 = 3)',
          '8 at index 2',
          '16 at index 4',
          '2 at index 0'
        ],
        correctIndex: 0,
        explanation: 'Length is 7. Initial low = 0, high = 6. mid = 0 + (6 - 0) / 2 = 3. arr[3] is 12.'
      },
      {
        id: 'bs-q3',
        question: 'In the worst case, how many comparisons does Binary Search take on an array of 1,024 elements?',
        options: [
          '11 comparisons (floor(log2(1024)) + 1 = 10 + 1 = 11)',
          '512 comparisons',
          '1,024 comparisons',
          '100 comparisons'
        ],
        correctIndex: 0,
        explanation: 'Each step halves the search space: 1024 -> 512 -> 256 -> 128 -> 64 -> 32 -> 16 -> 8 -> 4 -> 2 -> 1 (11 probes max).'
      },
      {
        id: 'bs-q4',
        question: 'Why is `mid = low + (high - low) / 2` preferred over `(low + high) / 2` in typed languages like Java or C++?',
        options: [
          'It prevents integer overflow when low + high exceeds the maximum 32-bit signed integer value (2,147,483,647)',
          'It makes the division round up instead of down',
          'It runs 10 times faster on modern CPUs',
          'It allows searching floating-point numbers'
        ],
        correctIndex: 0,
        explanation: 'In languages with fixed-width integers, adding two large positive indices can wrap around into negative numbers, causing array index out of bounds exceptions.'
      },
      {
        id: 'bs-q5',
        question: 'What is the time complexity of Binary Search?',
        options: [
          'O(log n) logarithmic time',
          'O(n) linear time',
          'O(n log n) linearithmic time',
          'O(1) constant time'
        ],
        correctIndex: 0,
        explanation: 'Dividing the problem size by 2 at each step gives the classic O(log n) recurrence relation.'
      }
    ]
  },

  'bubble-sort': {
    lessonId: 'bubble-sort',
    title: 'Bubble Sort',
    flowerType: 'daisy',
    questions: [
      {
        id: 'bub-q1',
        question: 'How does Bubble Sort move the largest unsorted element to the end of the array during each pass?',
        options: [
          'By comparing adjacent pairs (i, i+1) and swapping them if the left element is greater than the right',
          'By finding the global maximum and jumping it straight to index N-1',
          'By partitioning around a randomly selected pivot',
          'By inserting elements into a binary heap'
        ],
        correctIndex: 0,
        explanation: 'Bubble sort bubbles values up by comparing adjacent neighbors and swapping out-of-order pairs.'
      },
      {
        id: 'bub-q2',
        question: 'With an early-exit optimization flag (swapped = false), what is the best-case time complexity of Bubble Sort on an already-sorted array?',
        options: [
          'O(n) linear time, because it terminates after one single pass with zero swaps',
          'O(n²)',
          'O(log n)',
          'O(1)'
        ],
        correctIndex: 0,
        explanation: 'If a pass completes without making any swaps, the algorithm knows the array is completely sorted.'
      },
      {
        id: 'bub-q3',
        question: 'What is the worst-case and average-case time complexity of Bubble Sort?',
        options: [
          'O(n²) quadratic time due to nested loops comparing roughly n(n-1)/2 pairs',
          'O(n log n)',
          'O(n)',
          'O(2ⁿ)'
        ],
        correctIndex: 0,
        explanation: 'In reverse-sorted inputs, Bubble Sort performs (n - 1) + (n - 2) + ... + 1 = n(n - 1) / 2 comparisons and swaps.'
      },
      {
        id: 'bub-q4',
        question: 'Is Bubble Sort a stable sorting algorithm?',
        options: [
          'Yes, because it only swaps adjacent elements when arr[i] > arr[i+1], preserving relative order of equal items',
          'No, duplicate keys always flip order',
          'Only if the array contains even numbers',
          'Stability depends on operating system RAM'
        ],
        correctIndex: 0,
        explanation: 'Because equal elements are never swapped past one another, their initial relative order is strictly maintained.'
      },
      {
        id: 'bub-q5',
        question: 'What is the auxiliary space complexity of Bubble Sort?',
        options: [
          'O(1) in-place sorting requiring only a temporary variable for swapping',
          'O(n) auxiliary memory',
          'O(log n) call stack',
          'O(n²)'
        ],
        correctIndex: 0,
        explanation: 'Bubble Sort modifies the original array directly in-place with zero external allocations.'
      }
    ]
  },

  'selection-sort': {
    lessonId: 'selection-sort',
    title: 'Selection Sort',
    flowerType: 'daisy',
    questions: [
      {
        id: 'ss-q1',
        question: 'What is the maximum number of swaps Selection Sort performs on an array of n elements?',
        options: [
          'At most n - 1 swaps (exactly one swap per pass of the outer loop)',
          'n² swaps',
          'n log n swaps',
          'Zero swaps'
        ],
        correctIndex: 0,
        explanation: 'Selection Sort performs at most one swap per outer loop pass, resulting in at most n - 1 swaps across the entire sort.'
      },
      {
        id: 'ss-q2',
        question: 'What is the best-case time complexity of Selection Sort on an already-sorted array?',
        options: [
          'O(n²) quadratic time, because it must scan the entire unsorted subarray to confirm the minimum',
          'O(n) linear time',
          'O(log n)',
          'O(1)'
        ],
        correctIndex: 0,
        explanation: 'Because Selection Sort cannot verify that the current element is the minimum without checking every other element, it still executes n(n - 1)/2 comparisons.'
      },
      {
        id: 'ss-q3',
        question: 'Given [29, 10, 14, 37, 13], what is the array state after the very first pass of Selection Sort?',
        options: [
          '[10, 29, 14, 37, 13] (10 was swapped into index 0)',
          '[10, 14, 29, 37, 13]',
          '[13, 10, 14, 37, 29]',
          '[29, 10, 14, 13, 37]'
        ],
        correctIndex: 0,
        explanation: 'The minimum of the array is 10 (at index 1). It is swapped with index 0 (29). Result: [10, 29, 14, 37, 13].'
      },
      {
        id: 'ss-q4',
        question: 'Why is Selection Sort unstable in its standard implementation?',
        options: [
          'Swapping the minimum element across long distances can jump over and invert equal items',
          'Because it uses nested loops',
          'Because it does not use recursion',
          'Selection Sort is always stable'
        ],
        correctIndex: 0,
        explanation: 'In array [4a, 4b, 2], finding min 2 and swapping with index 0 produces [2, 4b, 4a]. The relative order of 4a and 4b was inverted!'
      },
      {
        id: 'ss-q5',
        question: 'In which scenario is Selection Sort technically superior to Bubble Sort?',
        options: [
          'When memory write operations are extremely costly (e.g. writing to EEPROM/Flash storage)',
          'When the array is already sorted',
          'When sorting millions of strings',
          'When searching for the median'
        ],
        correctIndex: 0,
        explanation: 'Selection Sort performs at most O(n) memory writes (swaps), whereas Bubble Sort can perform up to O(n²) memory writes.'
      }
    ]
  },

  'insertion-sort': {
    lessonId: 'insertion-sort',
    title: 'Insertion Sort',
    flowerType: 'tulip',
    questions: [
      {
        id: 'is-q1',
        question: 'How does Insertion Sort organize elements as it progresses through the array?',
        options: [
          'It maintains a sorted prefix on the left and inserts each new unsorted element into its proper position',
          'It finds the maximum and appends it to the right',
          'It splits the array in halves recursively',
          'It counts occurrences of every integer'
        ],
        correctIndex: 0,
        explanation: 'Just like organizing playing cards in your hand, Insertion Sort takes the next card and shifts larger cards right to make room.'
      },
      {
        id: 'is-q2',
        question: 'What is the best-case time complexity of Insertion Sort and when does it occur?',
        options: [
          'O(n) linear time, when the input array is already sorted',
          'O(n log n)',
          'O(n²)',
          'O(1)'
        ],
        correctIndex: 0,
        explanation: 'If each element is already greater than or equal to the previous element, the inner while-loop condition fails in O(1) time.'
      },
      {
        id: 'is-q3',
        question: 'Given array [3, 7, 9, 5, 2], what does the array look like after inserting key 5 into the sorted prefix [3, 7, 9]?',
        options: [
          '[3, 5, 7, 9, 2]',
          '[3, 7, 5, 9, 2]',
          '[5, 3, 7, 9, 2]',
          '[2, 3, 5, 7, 9]'
        ],
        correctIndex: 0,
        explanation: '9 and 7 are shifted right one position each to make room, and 5 is placed at index 1.'
      },
      {
        id: 'is-q4',
        question: 'Why is Insertion Sort widely used inside production hybrid algorithms like Timsort (Python/Java)?',
        options: [
          'It has virtually zero overhead and runs faster than Merge/Quick Sort on small subarrays (size <= 32)',
          'Because it uses O(n log n) comparisons',
          'Because it works in parallel across 16 CPU cores',
          'Because it eliminates recursion entirely'
        ],
        correctIndex: 0,
        explanation: 'For small segments, cache friendliness and minimal loop overhead make Insertion Sort unbeatable in practice.'
      },
      {
        id: 'is-q5',
        question: 'Is Insertion Sort stable and in-place?',
        options: [
          'Yes, it is both strictly stable and operates in-place with O(1) auxiliary memory',
          'It is in-place but not stable',
          'It is stable but requires O(n) extra memory',
          'It is neither stable nor in-place'
        ],
        correctIndex: 0,
        explanation: 'Elements only shift right when strictly greater than the key, preserving duplicate order without extra memory allocations.'
      }
    ]
  },

  'merge-sort': {
    lessonId: 'merge-sort',
    title: 'Merge Sort',
    flowerType: 'tulip',
    questions: [
      {
        id: 'ms-q1',
        question: 'Which core algorithmic design paradigm does Merge Sort implement?',
        options: [
          'Divide and Conquer: divide array into halves, conquer recursively, and combine sorted halves',
          'Greedy Choice Property',
          'Dynamic Programming with Memoization',
          'Backtracking with Branch and Bound'
        ],
        correctIndex: 0,
        explanation: 'Merge Sort divides the array into subproblems of size n/2 until base case size 1, then merges them in sorted order.'
      },
      {
        id: 'ms-q2',
        question: 'What is the time complexity of Merge Sort in the worst, average, and best cases?',
        options: [
          'O(n log n) guaranteed across all cases',
          'O(n²) worst, O(n log n) average',
          'O(n) best, O(n²) worst',
          'O(log n) best, O(n) average'
        ],
        correctIndex: 0,
        explanation: 'The recursion tree has log2(n) levels, and merging across any level takes exactly O(n) work, guaranteeing O(n log n).'
      },
      {
        id: 'ms-q3',
        question: 'What is the primary drawback of standard Merge Sort on array data structures?',
        options: [
          'It requires O(n) auxiliary memory space for temporary buffers during the merge step',
          'It is unstable and swaps duplicate elements',
          'It runs in O(n²) time on reverse sorted lists',
          'It cannot sort floating point numbers'
        ],
        correctIndex: 0,
        explanation: 'Unlike Quick Sort or Heap Sort, standard array Merge Sort requires allocating temporary arrays of size n to combine sorted slices.'
      },
      {
        id: 'ms-q4',
        question: 'Given two sorted arrays [2, 5, 9] and [1, 6, 8], which element is picked first during the merge phase?',
        options: [
          '1 from the second array (1 < 2)',
          '2 from the first array',
          '9 from the first array',
          '8 from the second array'
        ],
        correctIndex: 0,
        explanation: 'The merge pointers compare the heads: 2 vs 1. Since 1 <= 2, 1 is copied to output first.'
      },
      {
        id: 'ms-q5',
        question: 'Why is Merge Sort the preferred sorting algorithm for singly Linked Lists?',
        options: [
          'Linked list nodes can be merged by re-pointing next pointers with O(1) auxiliary space and no extra buffer copies',
          'Linked lists do not have pointers',
          'Quick Sort cannot operate on linked lists',
          'Merge sort turns linked lists into arrays'
        ],
        correctIndex: 0,
        explanation: 'Merging linked lists only requires pointer rewiring (head.next = nextNode), overcoming the O(n) memory handicap of arrays!'
      }
    ]
  },

  'quick-sort': {
    lessonId: 'quick-sort',
    title: 'Quick Sort',
    flowerType: 'tulip',
    questions: [
      {
        id: 'qs-q1',
        question: 'What is the primary objective of the partition step in Quick Sort around a chosen pivot?',
        options: [
          'Place the pivot at its exact final sorted index such that all smaller elements are to the left and larger elements to the right',
          'Divide the array into two exactly equal halves by count',
          'Sort the entire array in a single pass',
          'Find the minimum element and move it to index 0'
        ],
        correctIndex: 0,
        explanation: 'After partitioning, the pivot element sits in its permanent final position: all elements smaller sit left, all larger sit right.'
      },
      {
        id: 'qs-q2',
        question: 'Under what condition does naive QuickSort (picking last element as pivot) degrade to its worst-case O(n²) time?',
        options: [
          'When the array is already sorted or reverse-sorted, producing completely unbalanced partitions of size 0 and n-1',
          'When all elements are random floating point numbers',
          'When the array size is an exact power of 2',
          'When memory is greater than 16GB'
        ],
        correctIndex: 0,
        explanation: 'If the array is sorted, the last element is always the maximum, resulting in unbalanced partitions of size (n - 1) and 0 at every level.'
      },
      {
        id: 'qs-q3',
        question: 'Given array [3, 8, 2, 5, 1, 4] with pivot 4, where will 4 end up after partitioning?',
        options: [
          'Index 3 (because [3, 2, 1] are smaller than 4, leaving 4 at index 3)',
          'Index 0',
          'Index 5',
          'Index 2'
        ],
        correctIndex: 0,
        explanation: 'Elements smaller than 4 are: [3, 2, 1] (3 items). Elements larger than 4 are: [8, 5] (2 items). So 4 must end up at index 3!'
      },
      {
        id: 'qs-q4',
        question: 'Why does Quick Sort typically run faster than Merge Sort in practice, despite both having O(n log n) average time?',
        options: [
          'Quick Sort partitions in-place with excellent CPU cache locality and zero dynamic memory allocations during merge',
          'Quick Sort uses fewer total comparisons than theoretical sorting minimum',
          'Quick Sort uses quantum computing acceleration',
          'Merge Sort has a bug that slows down computers'
        ],
        correctIndex: 0,
        explanation: 'QuickSort partitions in-place, which preserves sequential RAM access in CPU caches. Merge Sort must allocate and copy elements to and from temporary buffers.'
      },
      {
        id: 'qs-q5',
        question: 'How do modern standard libraries (like Introsort in C++ std::sort) prevent QuickSort’s O(n²) worst case?',
        options: [
          'It monitors recursion depth; if depth exceeds 2*log(n), it switches automatically to HeapSort',
          'It bans arrays larger than 1,000 items',
          'It runs QuickSort three times and takes the average',
          'It converts all numbers to strings first'
        ],
        correctIndex: 0,
        explanation: 'Introsort begins with QuickSort for speed, but if recursion depth goes too deep, it switches to HeapSort to guarantee O(n log n).'
      }
    ]
  },

  'big-o-notation': {
    lessonId: 'big-o-notation',
    title: 'Big O Notation & Complexity Analysis',
    flowerType: 'sunflower',
    questions: [
      {
        id: 'bo-q1',
        question: 'What does Big O notation fundamentally describe?',
        options: [
          'The asymptotic upper bound on the growth rate of algorithm running time or memory usage as input size approaches infinity',
          'The exact number of milliseconds an algorithm runs on an Intel Core i7 processor',
          'The number of lines of source code in the function file',
          'The monetary cost of hosting servers in the cloud'
        ],
        correctIndex: 0,
        explanation: 'Big O is an asymptotic upper bound describing how operation count or memory scales as input size n grows indefinitely.'
      },
      {
        id: 'bo-q2',
        question: 'Simplify the expression: f(n) = 4n³ + 150n² + 10,000 into standard Big O notation:',
        options: [
          'O(n³)',
          'O(4n³)',
          'O(n²)',
          'O(10,000)'
        ],
        correctIndex: 0,
        explanation: 'Drop smaller non-dominant terms (150n² and 10,000) and drop the multiplicative coefficient 4. The result is O(n³).'
      },
      {
        id: 'bo-q3',
        question: 'What is the difference between Big O, Big Omega (Ω), and Big Theta (Θ)?',
        options: [
          'Big O is the upper bound (worst case / ceiling), Big Omega is the lower bound (floor), and Big Theta is the tight bound (matching both)',
          'Big O is for time, Big Omega is for memory, Big Theta is for electricity',
          'Big O is for Python, Big Omega is for C++, Big Theta is for Java',
          'There is no difference; they are identical mathematical synonyms'
        ],
        correctIndex: 0,
        explanation: 'Big O specifies f(n) <= c*g(n) (ceiling). Big Omega specifies f(n) >= c*g(n) (floor). Big Theta specifies c1*g(n) <= f(n) <= c2*g(n) (tight bracket).'
      },
      {
        id: 'bo-q4',
        question: 'Which of the following growth orders is ranked from FASTEST to SLOWEST (most efficient to least efficient)?',
        options: [
          'O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)',
          'O(n²) < O(n) < O(log n) < O(1) < O(2ⁿ)',
          'O(2ⁿ) < O(n²) < O(n log n) < O(n) < O(1)',
          'O(1) < O(n) < O(log n) < O(n²) < O(n log n)'
        ],
        correctIndex: 0,
        explanation: 'Constant time O(1) is fastest, followed by logarithmic, linear, linearithmic, polynomial (quadratic), and exponential.'
      },
      {
        id: 'bo-q5',
        question: 'A function contains two consecutive, non-nested loops: the first loops n times, the second loops n times. What is its Big O complexity?',
        options: [
          'O(n) because n + n = 2n, and constant factors are dropped in asymptotic analysis',
          'O(n²)',
          'O(2n)',
          'O(log n)'
        ],
        correctIndex: 0,
        explanation: 'Consecutive loops add their operations: n + n = 2n. Dropping the multiplicative constant 2 yields O(n).'
      }
    ]
  },

  'binary-search-tree': {
    lessonId: 'binary-search-tree',
    title: 'Binary Search Tree (BST)',
    flowerType: 'orchid',
    questions: [
      {
        id: 'bst-q1',
        question: 'What is the fundamental structural invariant of a Binary Search Tree (BST)?',
        options: [
          'For every node, all keys in its left subtree are strictly smaller, and all keys in its right subtree are strictly greater',
          'Every node must have exactly two children at all times',
          'The tree must always be completely filled from left to right on the bottom level',
          'All leaf nodes must contain even numbers'
        ],
        correctIndex: 0,
        explanation: 'The BST invariant states that left descendants are less than root, and right descendants are greater than root.'
      },
      {
        id: 'bst-q2',
        question: 'Which tree traversal order visits the nodes of a BST in strictly sorted ascending order?',
        options: [
          'In-order traversal (Left -> Node -> Right)',
          'Pre-order traversal (Node -> Left -> Right)',
          'Post-order traversal (Left -> Right -> Node)',
          'Level-order traversal (Breadth-First)'
        ],
        correctIndex: 0,
        explanation: 'In-order traversal processes the left subtree (smaller), then current node (middle), then right subtree (greater).'
      },
      {
        id: 'bst-q3',
        question: 'Under what condition does an unbalanced BST degrade to O(n) linear search time?',
        options: [
          'When elements are inserted in already-sorted ascending or descending order, forming a skewed linked list',
          'When the tree has an odd number of nodes',
          'When the tree stores floating point numbers',
          'When in-order traversal is executed twice'
        ],
        correctIndex: 0,
        explanation: 'Inserting sorted numbers (e.g. 1, 2, 3, 4, 5) creates a tree where each node only has a right child, mimicking a linked list of height n.'
      },
      {
        id: 'bst-q4',
        question: 'When deleting a node that has TWO children from a BST, which node replaces it?',
        options: [
          'Either its in-order successor (smallest key in right subtree) or in-order predecessor (largest key in left subtree)',
          'Any random leaf node in the tree',
          'The root node of the entire tree',
          'Its parent node'
        ],
        correctIndex: 0,
        explanation: 'Replacing with the in-order successor guarantees that all remaining nodes in the right subtree are still greater and left subtree smaller.'
      },
      {
        id: 'bst-q5',
        question: 'What is the average-case time complexity for search, insertion, and deletion in a balanced BST?',
        options: [
          'O(log n) proportional to the tree height',
          'O(n)',
          'O(1)',
          'O(n log n)'
        ],
        correctIndex: 0,
        explanation: 'In a balanced tree with height h = log2(n), each comparison discards half of the remaining subtrees.'
      }
    ]
  },

  'breadth-first-search': {
    lessonId: 'breadth-first-search',
    title: 'Breadth-First Search (BFS)',
    flowerType: 'lotus',
    questions: [
      {
        id: 'bfs-q1',
        question: 'Which fundamental data structure powers Breadth-First Search?',
        options: [
          'A FIFO (First-In, First-Out) Queue',
          'A LIFO (Last-In, First-Out) Stack',
          'A Max-Heap Priority Queue',
          'A Hash Map with collision chaining'
        ],
        correctIndex: 0,
        explanation: 'A FIFO queue ensures that nodes discovered earlier (closer levels) are processed before nodes discovered later (deeper levels).'
      },
      {
        id: 'bfs-q2',
        question: 'Why does BFS guarantee the shortest path in an UNWEIGHTED graph?',
        options: [
          'It explores nodes in increasing order of their distance (edge count) from the start node level by level',
          'It evaluates edge weights using a greedy heuristic',
          'It visits the node with the highest degree first',
          'It backtracks whenever a cycle is detected'
        ],
        correctIndex: 0,
        explanation: 'Since BFS explores radially in concentric rings of distance 1, 2, 3..., the first time the destination node is encountered is mathematically guaranteed to be the shortest edge path.'
      },
      {
        id: 'bfs-q3',
        question: 'Starting from A in graph A->[B, C], B->[D], C->[E], which node is visited third in BFS?',
        options: [
          'Node C (level 1 neighbor of A, after B)',
          'Node D (child of B)',
          'Node E (child of C)',
          'Node A'
        ],
        correctIndex: 0,
        explanation: 'Order: 1st is A (level 0). 2nd is B (level 1). 3rd is C (level 1). Only after level 1 completes do D and E (level 2) get visited.'
      },
      {
        id: 'bfs-q4',
        question: 'When must you mark a neighbor node as `visited` in BFS to prevent queue memory blowout?',
        options: [
          'Immediately upon pushing it into the queue',
          'Only after popping it from the queue',
          'After all its children have been explored',
          'Never mark visited in unweighted graphs'
        ],
        correctIndex: 0,
        explanation: 'If you mark visited only when popping, multiple earlier neighbors can add duplicate copies of the same node into the queue, causing catastrophic memory waste.'
      },
      {
        id: 'bfs-q5',
        question: 'What is the time complexity of BFS on a graph with V vertices and E edges represented as an adjacency list?',
        options: [
          'O(V + E) linear in the size of the graph',
          'O(V * E)',
          'O(V²)',
          'O(log(V + E))'
        ],
        correctIndex: 0,
        explanation: 'Each vertex is pushed and popped from the queue at most once (O(V)), and each edge is inspected at most once per direction (O(E)). Total time is O(V + E).'
      }
    ]
  },

  'depth-first-search': {
    lessonId: 'depth-first-search',
    title: 'Depth-First Search (DFS)',
    flowerType: 'lotus',
    questions: [
      {
        id: 'dfs-q1',
        question: 'Which data structure or execution mechanism underlies Depth-First Search?',
        options: [
          'A LIFO Stack (or the runtime call stack via recursion)',
          'A FIFO Queue',
          'A Min-Heap',
          'A Red-Black Tree'
        ],
        correctIndex: 0,
        explanation: 'DFS dives along a single branch as deeply as possible, unwinding via stack backtracking when reaching dead ends.'
      },
      {
        id: 'dfs-q2',
        question: 'For which of the following graph problems is DFS uniquely suited compared to BFS?',
        options: [
          'Topological sorting in a DAG, detecting cycles via back-edges, and finding strongly connected components',
          'Finding shortest path in unweighted graphs',
          'Finding minimum spanning trees in O(V) time',
          'Level-order tree printing'
        ],
        correctIndex: 0,
        explanation: 'DFS finish times naturally produce reverse topological ordering and back-edges reveal cycles.'
      },
      {
        id: 'dfs-q3',
        question: 'What happens if you run recursive DFS on a cyclic graph without maintaining a `visited` set?',
        options: [
          'The program falls into an infinite recursive loop and crashes with a Stack Overflow error',
          'The program successfully returns null',
          'The graph automatically removes the cycle',
          'It runs in O(1) time'
        ],
        correctIndex: 0,
        explanation: 'Without tracking visited nodes, DFS will re-traverse the cycle infinitely until call stack memory is exhausted.'
      },
      {
        id: 'dfs-q4',
        question: 'What is the worst-case space complexity of DFS on a graph of V vertices?',
        options: [
          'O(V) for the recursion call stack (e.g. In a long linear path of V nodes)',
          'O(1)',
          'O(V * E)',
          'O(E²)'
        ],
        correctIndex: 0,
        explanation: 'If the graph is a single straight line, the call stack will hold V active activation records.'
      },
      {
        id: 'dfs-q5',
        question: 'What is a "back-edge" in the context of DFS on a directed graph?',
        options: [
          'An edge pointing from a current node to one of its ancestors currently active on the DFS recursion stack',
          'An edge pointing to a node with no children',
          'An edge with a negative weight',
          'The edge that connects back to the start node'
        ],
        correctIndex: 0,
        explanation: 'An edge targeting an active ancestor on the call stack proves the existence of a directed cycle.'
      }
    ]
  },

  'dijkstra': {
    lessonId: 'dijkstra',
    title: "Dijkstra's Algorithm",
    flowerType: 'sunflower',
    questions: [
      {
        id: 'dijk-q1',
        question: "What is the critical constraint on edge weights for Dijkstra's Algorithm to work correctly?",
        options: [
          'All edge weights must be strictly non-negative (>= 0)',
          'All edge weights must be prime integers',
          'Edge weights must be between 0 and 100',
          'Graphs must be unweighted'
        ],
        correctIndex: 0,
        explanation: 'Dijkstra assumes that once a node is finalized from the priority queue, no shorter path to it can ever be found. Negative edges violate this greedy invariant.'
      },
      {
        id: 'dijk-q2',
        question: 'Which efficient data structure is used to retrieve the unvisited vertex with the minimum tentative distance?',
        options: [
          'A Min-Heap (Priority Queue)',
          'A FIFO Queue',
          'A Circular Doubly-Linked List',
          'A B-Tree'
        ],
        correctIndex: 0,
        explanation: 'A min-heap extracts the minimum distance node in O(log V) time, speeding up the algorithm to O((V + E) log V).'
      },
      {
        id: 'dijk-q3',
        question: 'What is the mathematical condition checked during the "edge relaxation" step for edge (u, v) with weight w?',
        options: [
          'if (dist[u] + w < dist[v]) { dist[v] = dist[u] + w; }',
          'if (dist[u] - w > dist[v]) { dist[v] = dist[u]; }',
          'if (dist[u] == dist[v]) { dist[v] = w; }',
          'if (w < 0) { dist[v] = 0; }'
        ],
        correctIndex: 0,
        explanation: 'Relaxation tests whether traveling to v via u offers a shorter path than any route previously recorded for v.'
      },
      {
        id: 'dijk-q4',
        question: "What is the time complexity of Dijkstra's Algorithm implemented with an adjacency list and binary min-heap?",
        options: [
          'O((V + E) log V)',
          'O(V²)',
          'O(V * E)',
          'O(V³)'
        ],
        correctIndex: 0,
        explanation: 'Extracting min takes O(V log V) and updating neighbor priorities over all edges takes O(E log V).'
      },
      {
        id: 'dijk-q5',
        question: 'If a graph contains negative edge weights, which algorithm should be used instead of Dijkstra?',
        options: [
          'The Bellman-Ford algorithm (or Floyd-Warshall for all-pairs)',
          'Standard BFS',
          'Selection Sort',
          'Prim’s Algorithm'
        ],
        correctIndex: 0,
        explanation: 'Bellman-Ford handles negative weights and can detect negative-weight cycles in O(V * E) time.'
      }
    ]
  },

  'dp-fibonacci': {
    lessonId: 'dp-fibonacci',
    title: 'Dynamic Programming: Fibonacci & Memoization',
    flowerType: 'orchid',
    questions: [
      {
        id: 'dp-q1',
        question: 'What are the two foundational properties that a problem must exhibit to be solved with Dynamic Programming?',
        options: [
          'Overlapping Subproblems and Optimal Substructure',
          'Unsorted Inputs and Hash Collisions',
          'Binary Invariants and Greedy Choices',
          'Parallel Processors and Infinite Memory'
        ],
        correctIndex: 0,
        explanation: 'Overlapping subproblems mean the same calculations recur repeatedly; optimal substructure means the global optimum is composed of subproblem optima.'
      },
      {
        id: 'dp-q2',
        question: 'What is the time complexity difference between naive recursive Fibonacci and memoized DP Fibonacci?',
        options: [
          'Naive recursion is O(2ⁿ) exponential, while memoized DP reduces it to O(n) linear time',
          'Naive is O(n), DP is O(1)',
          'Naive is O(n²), DP is O(n log n)',
          'Both have identical O(n) running time'
        ],
        correctIndex: 0,
        explanation: 'Naive recursive fibonacci branches twice at each level: 2^n operations. DP computes each fib(k) exactly once.'
      },
      {
        id: 'dp-q3',
        question: 'What is the fundamental difference between "Memoization" (Top-Down) and "Tabulation" (Bottom-Up)?',
        options: [
          'Memoization is recursive and stores results on demand; Tabulation is iterative and fills a table systematically from base cases up',
          'Memoization uses disk storage; Tabulation uses CPU registers',
          'Memoization only works for arrays; Tabulation only works for trees',
          'Memoization is O(n²); Tabulation is O(1)'
        ],
        correctIndex: 0,
        explanation: 'Top-down memoization begins at n and recurses downward saving results. Bottom-up tabulation starts at base cases (0, 1) and loops upward to n.'
      },
      {
        id: 'dp-q4',
        question: 'How can the space complexity of iterative bottom-up Fibonacci be optimized to O(1) constant auxiliary space?',
        options: [
          'By maintaining only two scalar variables (prev1 and prev2) for the last two Fibonacci numbers, discarding older history',
          'By using binary bitwise shifts instead of addition',
          'By storing values in browser cookies',
          'By calculating in reverse order'
        ],
        correctIndex: 0,
        explanation: 'Since calculating fib(n) only depends on fib(n-1) and fib(n-2), we only need to keep 2 numbers in memory.'
      },
      {
        id: 'dp-q5',
        question: 'In the classic "Climbing Stairs" problem (taking 1 or 2 steps to reach step n), why is the recurrence relation identical to Fibonacci?',
        options: [
          'To reach step n, you can only arrive from either step n-1 (via a 1-step hop) or step n-2 (via a 2-step hop): ways(n) = ways(n-1) + ways(n-2)',
          'Because stairs are always shaped like flowers',
          'Because gravity halves the distance at each landing',
          'It is a coincidence with no mathematical connection'
        ],
        correctIndex: 0,
        explanation: 'Partitioning choices at the final move reveals that ways(n) is the exact sum of ways(n-1) and ways(n-2).'
      }
    ]
  }
};

export function getLessonQuiz(lessonId: string): LessonQuizInfo | undefined {
  return CANONICAL_LESSON_QUIZZES[lessonId];
}

export function getAllLessonIds(): string[] {
  return Object.keys(CANONICAL_LESSON_QUIZZES);
}
