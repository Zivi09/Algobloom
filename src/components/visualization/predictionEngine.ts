import { AlgorithmLesson, TraceStep } from '../../types';

export interface PredictionOption {
  id: string;
  label: string;
  sublabel?: string;
}

export interface PredictionChallenge {
  id: string;
  stepIndex: number;
  question: string;
  category: 'sorting' | 'searching' | 'graph' | 'tree' | 'dp' | 'general';
  options: PredictionOption[];
  correctOptionId: string;
  explanation: string;
  gentleExplanation?: string;
  hint?: string;
}

/**
 * Evaluates whether a given trace step represents a critical algorithmic decision point
 * suitable for the "Predict the Next Step" Active Challenge Mode.
 */
export function getPredictionForStep(
  step: TraceStep,
  nextStep: TraceStep | undefined,
  lesson: AlgorithmLesson,
  stepIndex: number,
  allSteps: TraceStep[],
  customTarget?: number
): PredictionChallenge | null {
  if (!step || step.isComplete) return null;

  const lessonId = lesson.id;
  const targetVal = customTarget !== undefined ? customTarget : 42;

  // --------------------------------------------------------------------------
  // 1. SORTING ALGORITHMS
  // --------------------------------------------------------------------------
  if (
    lessonId === 'bubble-sort' ||
    lessonId === 'selection-sort' ||
    lessonId === 'insertion-sort' ||
    lessonId === 'quick-sort' ||
    lessonId === 'merge-sort' ||
    lesson.category === 'Sorting'
  ) {
    // A) BUBBLE SORT: Comparison between adjacent elements
    if (lessonId === 'bubble-sort') {
      if (step.comparingIndices && step.comparingIndices.length === 2 && step.array) {
        const [i, j] = step.comparingIndices;
        const valA = step.array[i];
        const valB = step.array[j];

        if (valA !== undefined && valB !== undefined) {
          const willSwap = valA > valB;
          return {
            id: `${lessonId}-step-${stepIndex}`,
            stepIndex,
            category: 'sorting',
            question: `Comparing index ${i} (${valA}) and index ${j} (${valB}): Will these elements swap?`,
            options: [
              {
                id: 'swap',
                label: 'Yes, swap them! 🔄',
                sublabel: `${valA} > ${valB} (out of ascending order)`,
              },
              {
                id: 'no-swap',
                label: 'No swap needed 🌿',
                sublabel: `${valA} ≤ ${valB} (already in correct order)`,
              },
            ],
            correctOptionId: willSwap ? 'swap' : 'no-swap',
            explanation: willSwap
              ? `Spot on! Since ${valA} is strictly greater than ${valB}, Bubble Sort swaps them to bubble the larger value toward the end.`
              : `Spot on! Since ${valA} is already less than or equal to ${valB}, they are already in non-decreasing order. No swap is needed!`,
            gentleExplanation: willSwap
              ? `Notice that ${valA} > ${valB}. In an ascending sort, larger elements must float rightward, so a swap is required!`
              : `Notice that ${valA} ≤ ${valB}. Because they are already ordered correctly, swapping them would undo the sort!`,
            hint: `Remember: In standard ascending sort, if left > right, they must swap.`,
          };
        }
      }
    }

    // B) SELECTION SORT: Comparing candidate with current min
    if (lessonId === 'selection-sort') {
      if (
        step.comparingIndices &&
        step.comparingIndices.length === 2 &&
        step.array
      ) {
        const [candIdx, minIdx] = step.comparingIndices;
        const candVal = step.array[candIdx];
        const minVal = step.array[minIdx];

        if (candVal !== undefined && minVal !== undefined) {
          const isSmaller = candVal < minVal;
          return {
            id: `${lessonId}-step-${stepIndex}`,
            stepIndex,
            category: 'sorting',
            question: `Comparing candidate index ${candIdx} (${candVal}) with current minimum index ${minIdx} (${minVal}): Will the minimum update?`,
            options: [
              {
                id: 'smaller',
                label: `Yes — ${candVal} is the new minimum 🌟`,
                sublabel: `Update min index to ${candIdx}`,
              },
              {
                id: 'keep',
                label: `No — keep minimum at ${minIdx} (${minVal}) 🛡️`,
                sublabel: `${candVal} is not smaller than ${minVal}`,
              },
            ],
            correctOptionId: isSmaller ? 'smaller' : 'keep',
            explanation: isSmaller
              ? `Brilliant! ${candVal} < ${minVal}, so Selection Sort updates its min pointer to index ${candIdx}.`
              : `Spot on! ${candVal} ≥ ${minVal}, so the current minimum index remains safely at ${minIdx}.`,
            gentleExplanation: isSmaller
              ? `Since ${candVal} is lower than ${minVal}, the algorithm found a new smallest item in this pass!`
              : `Since ${candVal} is not less than ${minVal}, the current minimum pointer stays at index ${minIdx}.`,
            hint: `Selection sort looks for the smallest element remaining in the unsorted suffix.`,
          };
        }
      }
    }

    // C) INSERTION SORT: Key shifting check
    if (lessonId === 'insertion-sort') {
      if (step.comparingIndices && step.comparingIndices.length >= 1 && step.array) {
        const j = step.comparingIndices[0];
        const elemVal = step.array[j];
        const keyIdx = step.pointers?.keyIndex;
        const keyVal = keyIdx !== undefined && step.array[keyIdx] !== undefined ? step.array[keyIdx] : undefined;

        if (elemVal !== undefined && keyVal !== undefined) {
          const willShift = elemVal > keyVal;
          return {
            id: `${lessonId}-step-${stepIndex}`,
            stepIndex,
            category: 'sorting',
            question: `Comparing sorted element at index ${j} (${elemVal}) with key (${keyVal}): Will ${elemVal} shift right?`,
            options: [
              {
                id: 'shift',
                label: `Yes — shift ${elemVal} right to index ${j + 1} ➡️`,
                sublabel: `${elemVal} > key (${keyVal})`,
              },
              {
                id: 'stop',
                label: `No — stop shifting and place key here 🛑`,
                sublabel: `${elemVal} ≤ key (${keyVal})`,
              },
            ],
            correctOptionId: willShift ? 'shift' : 'stop',
            explanation: willShift
              ? `Correct! Since ${elemVal} > ${keyVal}, elements shift right to open a spot for the key.`
              : `Spot on! ${elemVal} ≤ ${keyVal}, which means the correct insertion point for key ${keyVal} has been found!`,
            gentleExplanation: willShift
              ? `Because ${elemVal} is larger than the key, it must move over to make space for the key to its left.`
              : `Because ${elemVal} is smaller or equal, the key does not need to slide past it.`,
            hint: `Insertion Sort shifts elements that are strictly larger than the key.`,
          };
        }
      }
    }

    // D) QUICK SORT / MERGE SORT fallback
    if (step.comparingIndices && step.comparingIndices.length === 2 && step.array) {
      const [i, j] = step.comparingIndices;
      const valA = step.array[i];
      const valB = step.array[j];
      if (valA !== undefined && valB !== undefined) {
        const isSmaller = valA <= valB;
        return {
          id: `${lessonId}-step-${stepIndex}`,
          stepIndex,
          category: 'sorting',
          question: `Which element is smaller: index ${i} (${valA}) or index ${j} (${valB})?`,
          options: [
            {
              id: 'a',
              label: `Index ${i} (${valA}) is smaller or equal`,
            },
            {
              id: 'b',
              label: `Index ${j} (${valB}) is smaller`,
            },
          ],
          correctOptionId: isSmaller ? 'a' : 'b',
          explanation: `Correct! ${isSmaller ? valA : valB} is smaller, so it takes precedence during the sorting phase.`,
          gentleExplanation: `Look closely at the numeric values: ${valA} vs ${valB}.`,
        };
      }
    }
  }

  // --------------------------------------------------------------------------
  // 2. SEARCHING ALGORITHMS
  // --------------------------------------------------------------------------
  if (lessonId === 'binary-search') {
    // Trigger at midpoint inspection step
    if (
      step.pointers &&
      step.pointers.mid !== undefined &&
      step.array
    ) {
      const mid = step.pointers.mid;
      const low = step.pointers.low ?? 0;
      const high = step.pointers.high ?? step.array.length - 1;
      const midVal = step.array[mid];

      // Only trigger challenge on the midpoint check step (not duplicated on repeat)
      if (midVal !== undefined && (step.description.includes('Calculated midpoint') || step.description.includes('mid ='))) {
        let correctId: 'left' | 'right' | 'target';
        if (midVal === targetVal) {
          correctId = 'target';
        } else if (midVal < targetVal) {
          // midVal < targetVal means target is in right half; left half [low..mid] is eliminated!
          correctId = 'left';
        } else {
          // midVal > targetVal means target is in left half; right half [mid..high] is eliminated!
          correctId = 'right';
        }

        return {
          id: `${lessonId}-step-${stepIndex}`,
          stepIndex,
          category: 'searching',
          question: `Midpoint array[${mid}] = ${midVal} vs Target ${targetVal}: Which half will be eliminated next?`,
          options: [
            {
              id: 'left',
              label: `Left half [${low} .. ${mid}] eliminated 🚫`,
              sublabel: `Target (${targetVal}) > midVal (${midVal}), search moves right`,
            },
            {
              id: 'right',
              label: `Right half [${mid} .. ${high}] eliminated 🚫`,
              sublabel: `Target (${targetVal}) < midVal (${midVal}), search moves left`,
            },
            {
              id: 'target',
              label: `Target is at mid! (Found at index ${mid}) 🎯`,
              sublabel: `array[${mid}] === ${targetVal}`,
            },
          ],
          correctOptionId: correctId,
          explanation:
            correctId === 'target'
              ? `Bullseye! array[${mid}] equals target ${targetVal}! The search has found its prize.`
              : correctId === 'left'
              ? `Spot on! Because target ${targetVal} > array[${mid}] (${midVal}), all elements at or before index ${mid} are too small and eliminated.`
              : `Spot on! Because target ${targetVal} < array[${mid}] (${midVal}), all elements at or after index ${mid} are too large and eliminated.`,
          gentleExplanation:
            correctId === 'target'
              ? `array[${mid}] (${midVal}) matches target ${targetVal} exactly!`
              : correctId === 'left'
              ? `Since the array is sorted and ${targetVal} > ${midVal}, the target can only be located in the right subarray.`
              : `Since the array is sorted and ${targetVal} < ${midVal}, the target can only be located in the left subarray.`,
          hint: `Compare the target (${targetVal}) with the value at mid (${midVal}).`,
        };
      }
    }
  }

  if (lessonId === 'linear-search') {
    if (step.comparingIndices && step.comparingIndices.length >= 1 && step.array) {
      const idx = step.comparingIndices[0];
      const val = step.array[idx];
      if (val !== undefined) {
        const isMatch = val === targetVal;
        // Only ask on certain indices to keep pacing lively
        if (isMatch || idx % 2 === 0) {
          return {
            id: `${lessonId}-step-${stepIndex}`,
            stepIndex,
            category: 'searching',
            question: `Inspecting index ${idx} (value ${val}): Does this match target ${targetVal}?`,
            options: [
              {
                id: 'match',
                label: `Match found! 🎉`,
                sublabel: `${val} === ${targetVal}`,
              },
              {
                id: 'nomatch',
                label: `Not a match 🔍`,
                sublabel: `Advance to index ${idx + 1}`,
              },
            ],
            correctOptionId: isMatch ? 'match' : 'nomatch',
            explanation: isMatch
              ? `Bingo! Target ${targetVal} is found at index ${idx}. Linear search halts here!`
              : `Correct! ${val} !== ${targetVal}. Linear search systematically continues to the next item.`,
            gentleExplanation: `Compare current element (${val}) directly with target (${targetVal}).`,
          };
        }
      }
    }
  }

  // --------------------------------------------------------------------------
  // 3. GRAPH ALGORITHMS (BFS, DFS, DIJKSTRA)
  // --------------------------------------------------------------------------
  if (lessonId === 'breadth-first-search') {
    // When queue is not empty and next step is dequeuing
    if (
      step.queue &&
      step.queue.length > 0 &&
      nextStep &&
      (nextStep.description.includes('Dequeued vertex') || nextStep.activeNodes?.length)
    ) {
      const frontNode = String(step.queue[0]);
      const nextDequeued = nextStep.activeNodes?.[0] || frontNode;

      // Unique options from queue and other candidate nodes
      const candidateList = Array.from(new Set([frontNode, ...step.queue.map(String), 'C', 'D'])).slice(0, 3);

      return {
        id: `${lessonId}-step-${stepIndex}`,
        stepIndex,
        category: 'graph',
        question: `Queue state: [${step.queue.join(', ')}]. Which vertex will be dequeued next?`,
        options: candidateList.map((node) => ({
          id: node,
          label: `Vertex ${node} 🌿`,
          sublabel: node === frontNode ? `Front of FIFO queue (enqueued earliest)` : `Later in queue / unvisited`,
        })),
        correctOptionId: String(nextDequeued),
        explanation: `Spot on! BFS uses a First-In, First-Out (FIFO) queue. Vertex ${nextDequeued} was enqueued before others, so it leaves the queue first!`,
        gentleExplanation: `Remember that BFS uses a FIFO queue: the element at the front of the queue is always dequeued first.`,
        hint: `Look at the head (first position) of the queue.`,
      };
    }
  }

  if (lessonId === 'depth-first-search') {
    if (
      step.stack &&
      step.stack.length > 0 &&
      nextStep &&
      (nextStep.description.includes('Backtracking') || nextStep.description.includes('popping'))
    ) {
      const topNode = String(step.stack[step.stack.length - 1]);
      const candidateList = Array.from(new Set([topNode, ...step.stack.map(String), 'A'])).slice(0, 3);

      return {
        id: `${lessonId}-step-${stepIndex}`,
        stepIndex,
        category: 'graph',
        question: `Call stack: [${step.stack.join(' → ')}]. Which vertex will be popped from the stack next?`,
        options: candidateList.map((node) => ({
          id: node,
          label: `Vertex ${node} 🪷`,
          sublabel: node === topNode ? `Top of LIFO call stack (most recent)` : `Lower in stack frame`,
        })),
        correctOptionId: topNode,
        explanation: `Brilliant! DFS operates on a Last-In, First-Out (LIFO) call stack. Vertex ${topNode} is the topmost frame, so backtracking pops it first!`,
        gentleExplanation: `Stacks follow LIFO: the last vertex pushed on top of the stack is always the first one popped off.`,
        hint: `Examine the rightmost/top element currently on the stack.`,
      };
    }
  }

  if (lessonId === 'dijkstra') {
    if (
      step.distances &&
      nextStep &&
      nextStep.description.includes('Select unvisited vertex with minimum') &&
      nextStep.activeNodes &&
      nextStep.activeNodes.length > 0
    ) {
      const targetMinNode = nextStep.activeNodes[0];
      const dists = step.distances;
      const unvisitedCandidates = Object.keys(dists)
        .filter((k) => !step.visitedNodes?.includes(k))
        .slice(0, 3);

      if (unvisitedCandidates.length > 1) {
        return {
          id: `${lessonId}-step-${stepIndex}`,
          stepIndex,
          category: 'graph',
          question: `Tentative distances: ${unvisitedCandidates.map((c) => `${c}: ${dists[c]}`).join(', ')}. Which vertex will Dijkstra select next?`,
          options: unvisitedCandidates.map((node) => ({
            id: node,
            label: `Vertex ${node} (dist = ${dists[node]}) 🌻`,
            sublabel: node === targetMinNode ? `Lowest tentative distance among unvisited` : `Higher tentative cost`,
          })),
          correctOptionId: targetMinNode,
          explanation: `Golden intuition! Dijkstra greedily selects the unvisited vertex with the minimum tentative distance (${targetMinNode} with dist ${dists[targetMinNode]}).`,
          gentleExplanation: `Dijkstra always picks the unvisited node with the smallest tentative path distance.`,
          hint: `Find the smallest number among the unvisited vertex distances.`,
        };
      }
    }
  }

  // --------------------------------------------------------------------------
  // 4. TREE ALGORITHMS (BST SEARCH)
  // --------------------------------------------------------------------------
  if (lessonId === 'binary-search-tree' || lesson.category === 'Trees') {
    if (step.activeNodes && step.activeNodes.length === 1 && nextStep) {
      const currNodeId = step.activeNodes[0];
      let correctId: 'left' | 'right' | 'match' | null = null;

      if (nextStep.description.includes('LEFT subtree')) correctId = 'left';
      else if (nextStep.description.includes('RIGHT subtree')) correctId = 'right';
      else if (nextStep.description.includes('matches node') || nextStep.isComplete) correctId = 'match';

      if (correctId) {
        return {
          id: `${lessonId}-step-${stepIndex}`,
          stepIndex,
          category: 'tree',
          question: `At node ${currNodeId} comparing with target key ${targetVal}: Which branch will the BST search next?`,
          options: [
            {
              id: 'left',
              label: `Left Subtree (keys < ${currNodeId}) 🌿`,
              sublabel: `Target ${targetVal} is smaller`,
            },
            {
              id: 'right',
              label: `Right Subtree (keys > ${currNodeId}) 🌸`,
              sublabel: `Target ${targetVal} is larger`,
            },
            {
              id: 'match',
              label: `Target matches node ${currNodeId}! 🎯`,
              sublabel: `Found in BST!`,
            },
          ],
          correctOptionId: correctId,
          explanation:
            correctId === 'match'
              ? `Spot on! Target matches current node ${currNodeId}. BST search halts in triumph!`
              : correctId === 'left'
              ? `Spot on! By BST ordering property, all values smaller than ${currNodeId} reside in its left subtree.`
              : `Spot on! By BST ordering property, all values greater than ${currNodeId} reside in its right subtree.`,
          gentleExplanation: `Compare target ${targetVal} with current node ${currNodeId} using BST invariant (Left < Root < Right).`,
          hint: `In a Binary Search Tree, left child < parent < right child.`,
        };
      }
    }
  }

  // --------------------------------------------------------------------------
  // 5. DYNAMIC PROGRAMMING (FIBONACCI)
  // --------------------------------------------------------------------------
  if (lessonId === 'dp-fibonacci') {
    if (step.calculatingCells && step.calculatingCells.length > 0 && nextStep) {
      return {
        id: `${lessonId}-step-${stepIndex}`,
        stepIndex,
        category: 'dp',
        question: `How does Dynamic Programming calculate the value for this Fibonacci cell?`,
        options: [
          {
            id: 'sum',
            label: `F(n) = F(n-1) + F(n-2) 🌺`,
            sublabel: `Sum of the two immediate previous cached subproblems`,
          },
          {
            id: 'product',
            label: `F(n) = F(n-1) × 2 ✖️`,
            sublabel: `Double previous cell`,
          },
          {
            id: 'independent',
            label: `Recalculate entire tree recursively 🌀`,
            sublabel: `Without using cached table entries`,
          },
        ],
        correctOptionId: 'sum',
        explanation: `Pure genius! Dynamic Programming memoizes past solutions, computing F(n) by adding F(n-1) and F(n-2) in O(1) time without redundant work!`,
        gentleExplanation: `Fibonacci numbers are formed by summing the two preceding numbers: F(n) = F(n-1) + F(n-2).`,
      };
    }
  }

  return null;
}
