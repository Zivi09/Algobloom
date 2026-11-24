import { TraceStep } from '../../types';

export function generateWhatIsAlgorithmTrace(
  items: number[] = [14, 29, 8, 42, 19, 31],
  operation: 'max' | 'sum' | 'count_even' = 'max'
): TraceStep[] {
  const steps: TraceStep[] = [];
  const arr = items.length > 0 ? [...items] : [14, 29, 8, 42, 19, 31];

  // Property 1: Input Specification
  steps.push({
    step: 0,
    description: `[Property 1: Input Specification] Validating input collection: [${arr.join(', ')}] with size N = ${arr.length}. Preconditions verified.`,
    array: [...arr],
    highlightedIndices: [],
    activeLine: 1,
    comparisonsCount: 0,
  });

  if (operation === 'max') {
    let currentMax = arr[0];
    let comparisons = 0;

    // Property 2: Definiteness & Initialization
    steps.push({
      step: 1,
      description: `[Property 2: Definiteness] Initialize candidate max = ${currentMax} at index 0.`,
      array: [...arr],
      highlightedIndices: [0],
      activeLine: 2,
      comparisonsCount: 0,
      sortedIndices: [0],
    });

    for (let i = 1; i < arr.length; i++) {
      comparisons++;
      const isGreater = arr[i] > currentMax;
      steps.push({
        step: steps.length,
        description: `Inspecting index ${i} (value ${arr[i]}). Compare with current max (${currentMax}): ${
          isGreater ? `New maximum found: ${arr[i]} > ${currentMax}!` : `${arr[i]} <= ${currentMax}, keep current max.`
        }`,
        array: [...arr],
        highlightedIndices: [i],
        comparingIndices: [i],
        activeLine: 3,
        comparisonsCount: comparisons,
      });

      if (isGreater) {
        currentMax = arr[i];
        steps.push({
          step: steps.length,
          description: `Updated current max = ${currentMax}.`,
          array: [...arr],
          highlightedIndices: [i],
          sortedIndices: [i],
          activeLine: 4,
          comparisonsCount: comparisons,
        });
      }
    }

    // Property 3: Finiteness
    steps.push({
      step: steps.length,
      description: `[Property 3: Finiteness] Reached array boundary after ${comparisons} comparison steps. Guaranteed loop termination.`,
      array: [...arr],
      highlightedIndices: [],
      activeLine: 5,
      comparisonsCount: comparisons,
    });

    // Property 4: Output Delivery
    steps.push({
      step: steps.length,
      description: `[Property 4: Output Delivery] Algorithm finished! Maximum value is ${currentMax}. Deterministic result delivered.`,
      array: [...arr],
      highlightedIndices: [arr.indexOf(currentMax)],
      sortedIndices: [arr.indexOf(currentMax)],
      activeLine: 6,
      comparisonsCount: comparisons,
      isComplete: true,
    });
  } else if (operation === 'sum') {
    let total = 0;
    steps.push({
      step: 1,
      description: `[Property 2: Definiteness] Initialize accumulator total = 0.`,
      array: [...arr],
      highlightedIndices: [],
      activeLine: 2,
      comparisonsCount: 0,
    });

    for (let i = 0; i < arr.length; i++) {
      total += arr[i];
      steps.push({
        step: steps.length,
        description: `Adding element at index ${i} (${arr[i]}). Cumulative total = ${total}.`,
        array: [...arr],
        highlightedIndices: [i],
        sortedIndices: Array.from({ length: i + 1 }, (_, k) => k),
        activeLine: 3,
        comparisonsCount: i + 1,
      });
    }

    steps.push({
      step: steps.length,
      description: `[Property 4: Output Delivery] Summation complete! Total sum = ${total}.`,
      array: [...arr],
      activeLine: 5,
      comparisonsCount: arr.length,
      isComplete: true,
    });
  } else {
    // count_even
    let evens = 0;
    steps.push({
      step: 1,
      description: `[Property 2: Definiteness] Count even numbers in list. Initialize counter = 0.`,
      array: [...arr],
      highlightedIndices: [],
      activeLine: 2,
      comparisonsCount: 0,
    });

    for (let i = 0; i < arr.length; i++) {
      const isEven = arr[i] % 2 === 0;
      if (isEven) evens++;
      steps.push({
        step: steps.length,
        description: `Inspecting index ${i} (${arr[i]}): ${
          isEven ? `${arr[i]} is even! Increment counter to ${evens}.` : `${arr[i]} is odd, skip.`
        }`,
        array: [...arr],
        highlightedIndices: [i],
        comparingIndices: [i],
        sortedIndices: isEven ? [i] : [],
        activeLine: 3,
        comparisonsCount: i + 1,
      });
    }

    steps.push({
      step: steps.length,
      description: `[Property 4: Output Delivery] Filter complete! Found ${evens} even number(s) in list.`,
      array: [...arr],
      activeLine: 5,
      comparisonsCount: arr.length,
      isComplete: true,
    });
  }

  return steps;
}

export function generateBigOTrace(
  inputSize: number = 8,
  complexity: 'O(1)' | 'O(log n)' | 'O(n)' | 'O(n^2)' = 'O(n)',
  customArr?: number[]
): TraceStep[] {
  const steps: TraceStep[] = [];
  const n = Math.max(2, Math.min(16, inputSize));
  const arr =
    customArr && customArr.length > 0
      ? [...customArr].slice(0, 16)
      : Array.from({ length: n }, (_, i) => (i + 1) * 10);

  steps.push({
    step: 0,
    description: `Analyzing ${complexity} time complexity on input size N = ${arr.length}. Array: [${arr.join(', ')}].`,
    array: [...arr],
    highlightedIndices: [],
    activeLine: 1,
    comparisonsCount: 0,
  });

  if (complexity === 'O(1)') {
    steps.push({
      step: 1,
      description: `[O(1) Constant Time] Direct access to index 0 (element ${arr[0]}). Executes in 1 single CPU operation regardless of input size N!`,
      array: [...arr],
      highlightedIndices: [0],
      activeLine: 2,
      comparisonsCount: 1,
      isComplete: true,
    });
  } else if (complexity === 'O(log n)') {
    let left = 0;
    let right = arr.length - 1;
    let ops = 0;
    while (left <= right) {
      ops++;
      const mid = Math.floor((left + right) / 2);
      steps.push({
        step: steps.length,
        description: `[O(log n) Halving Step ${ops}] Search window [${left} .. ${right}], mid index ${mid} (${arr[mid]}). Search space cut in half!`,
        array: [...arr],
        highlightedIndices: [mid],
        activeLine: 3,
        comparisonsCount: ops,
      });
      left = mid + 1;
    }
    steps.push({
      step: steps.length,
      description: `[O(log n) Complete] Finished in ${ops} halving steps for N = ${arr.length} (≈ ⌈log₂(${arr.length})⌉ = ${Math.ceil(
        Math.log2(arr.length)
      )}). Superb scalability!`,
      array: [...arr],
      activeLine: 4,
      comparisonsCount: ops,
      isComplete: true,
    });
  } else if (complexity === 'O(n)') {
    let ops = 0;
    for (let i = 0; i < arr.length; i++) {
      ops++;
      steps.push({
        step: steps.length,
        description: `[O(n) Linear Step ${ops}/${arr.length}] Processing index ${i} (${arr[i]}). Work scales directly with input size N.`,
        array: [...arr],
        highlightedIndices: [i],
        activeLine: 3,
        comparisonsCount: ops,
      });
    }
    steps.push({
      step: steps.length,
      description: `[O(n) Complete] Processed all ${arr.length} elements in ${ops} operations. Linear growth curve.`,
      array: [...arr],
      activeLine: 5,
      comparisonsCount: ops,
      isComplete: true,
    });
  } else {
    // O(n^2) Quadratic
    const subN = Math.min(arr.length, 6);
    let ops = 0;
    for (let i = 0; i < subN; i++) {
      for (let j = 0; j < subN; j++) {
        ops++;
        steps.push({
          step: steps.length,
          description: `[O(n²) Quadratic Step ${ops}] Nested loop comparison between index ${i} [${arr[i]}] and index ${j} [${arr[j]}].`,
          array: [...arr],
          highlightedIndices: [i, j],
          comparingIndices: [i, j],
          activeLine: 3,
          comparisonsCount: ops,
        });
      }
    }
    steps.push({
      step: steps.length,
      description: `[O(n²) Complete] Completed ${ops} operations for ${subN} elements (${subN} × ${subN} = ${
        subN * subN
      }). Quadratic growth multiplies rapidly as N increases.`,
      array: [...arr],
      activeLine: 5,
      comparisonsCount: ops,
      isComplete: true,
    });
  }

  return steps;
}
