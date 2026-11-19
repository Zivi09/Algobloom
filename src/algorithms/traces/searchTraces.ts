import { TraceStep } from '../../types';

export function generateLinearSearchTrace(array: number[], target: number): TraceStep[] {
  const steps: TraceStep[] = [];
  let comparisons = 0;

  steps.push({
    step: 0,
    description: `Start Linear Search for target ${target} across the array of ${array.length} elements.`,
    array: [...array],
    highlightedIndices: [],
    pointers: { i: 0 },
    activeLine: 1,
    comparisonsCount: 0,
  });

  let found = false;
  for (let i = 0; i < array.length; i++) {
    comparisons++;
    const isMatch = array[i] === target;

    steps.push({
      step: steps.length,
      description: `Inspecting index ${i} (value ${array[i]}). Compare with target ${target}. ${
        isMatch ? 'Match found! 🎉' : 'Not a match, advance to next element.'
      }`,
      array: [...array],
      highlightedIndices: [i],
      comparingIndices: [i],
      pointers: { i },
      activeLine: isMatch ? 4 : 3,
      comparisonsCount: comparisons,
      sortedIndices: isMatch ? [i] : [],
    });

    if (isMatch) {
      found = true;
      steps.push({
        step: steps.length,
        description: `Target ${target} successfully found at index ${i} after ${comparisons} comparison(s)!`,
        array: [...array],
        highlightedIndices: [i],
        pointers: { i },
        activeLine: 4,
        comparisonsCount: comparisons,
        sortedIndices: [i],
        isComplete: true,
      });
      break;
    }
  }

  if (!found) {
    steps.push({
      step: steps.length,
      description: `Reached end of array. Target ${target} does not exist in the collection after ${comparisons} comparisons.`,
      array: [...array],
      highlightedIndices: [],
      activeLine: 5,
      comparisonsCount: comparisons,
      isComplete: true,
    });
  }

  return steps;
}

export function generateBinarySearchTrace(rawArray: number[], target: number): TraceStep[] {
  // Ensure array is sorted for binary search
  const array = [...rawArray].sort((a, b) => a - b);
  const steps: TraceStep[] = [];
  let comparisons = 0;

  let low = 0;
  let high = array.length - 1;

  steps.push({
    step: 0,
    description: `Begin Binary Search for target ${target}. Array must be sorted! Initial search window [${low} .. ${high}].`,
    array: [...array],
    highlightedIndices: Array.from({ length: array.length }, (_, idx) => idx),
    pointers: { low, high, mid: Math.floor((low + high) / 2) },
    activeLine: 1,
    comparisonsCount: 0,
  });

  let foundIndex = -1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    comparisons++;

    // Calculate active window indices
    const activeWindow: number[] = [];
    for (let i = low; i <= high; i++) activeWindow.push(i);

    steps.push({
      step: steps.length,
      description: `Calculated midpoint mid = floor((${low} + ${high}) / 2) = ${mid}. Element array[${mid}] = ${array[mid]}.`,
      array: [...array],
      highlightedIndices: activeWindow,
      comparingIndices: [mid],
      pointers: { low, high, mid },
      activeLine: 3,
      comparisonsCount: comparisons,
    });

    if (array[mid] === target) {
      foundIndex = mid;
      steps.push({
        step: steps.length,
        description: `array[${mid}] (${array[mid]}) === target (${target})! Match found at index ${mid}!`,
        array: [...array],
        highlightedIndices: [mid],
        sortedIndices: [mid],
        pointers: { mid },
        activeLine: 4,
        comparisonsCount: comparisons,
        isComplete: true,
      });
      break;
    } else if (array[mid] < target) {
      steps.push({
        step: steps.length,
        description: `array[${mid}] (${array[mid]}) < target (${target}). Target must lie in the RIGHT half. Set low = mid + 1 (${mid + 1}).`,
        array: [...array],
        highlightedIndices: activeWindow,
        comparingIndices: [mid],
        pointers: { low, high, mid },
        activeLine: 6,
        comparisonsCount: comparisons,
      });
      low = mid + 1;
    } else {
      steps.push({
        step: steps.length,
        description: `array[${mid}] (${array[mid]}) > target (${target}). Target must lie in the LEFT half. Set high = mid - 1 (${mid - 1}).`,
        array: [...array],
        highlightedIndices: activeWindow,
        comparingIndices: [mid],
        pointers: { low, high, mid },
        activeLine: 8,
        comparisonsCount: comparisons,
      });
      high = mid - 1;
    }
  }

  if (foundIndex === -1) {
    steps.push({
      step: steps.length,
      description: `Search window exhausted (low > high). Target ${target} was not found in the array.`,
      array: [...array],
      highlightedIndices: [],
      activeLine: 10,
      comparisonsCount: comparisons,
      isComplete: true,
    });
  }

  return steps;
}
