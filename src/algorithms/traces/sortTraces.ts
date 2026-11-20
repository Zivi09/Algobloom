import { TraceStep } from '../../types';

export function generateBubbleSortTrace(input: number[]): TraceStep[] {
  const arr = [...input];
  const steps: TraceStep[] = [];
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices: number[] = [];

  steps.push({
    step: 0,
    description: `Begin Bubble Sort on unsorted array of ${arr.length} elements.`,
    array: [...arr],
    highlightedIndices: [],
    comparisonsCount: 0,
    swapsCount: 0,
    activeLine: 1,
  });

  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swappedThisPass = false;

    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      const willSwap = arr[j] > arr[j + 1];

      steps.push({
        step: steps.length,
        description: `Comparing adjacent elements at index ${j} (${arr[j]}) and ${j + 1} (${arr[j + 1]}). ${
          willSwap ? `${arr[j]} > ${arr[j + 1]}, swap needed!` : `${arr[j]} <= ${arr[j + 1]}, in correct order.`
        }`,
        array: [...arr],
        highlightedIndices: [j, j + 1],
        comparingIndices: [j, j + 1],
        sortedIndices: [...sortedIndices],
        comparisonsCount: comparisons,
        swapsCount: swaps,
        activeLine: 3,
      });

      if (willSwap) {
        swaps++;
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swappedThisPass = true;

        steps.push({
          step: steps.length,
          description: `Swapped index ${j} and ${j + 1}. Array is now [${arr.join(', ')}].`,
          array: [...arr],
          highlightedIndices: [j, j + 1],
          swappedIndices: [j, j + 1],
          sortedIndices: [...sortedIndices],
          comparisonsCount: comparisons,
          swapsCount: swaps,
          activeLine: 4,
        });
      }
    }

    // Element at n - 1 - i is now in its final sorted position
    sortedIndices.push(n - 1 - i);

    steps.push({
      step: steps.length,
      description: `Pass ${i + 1} complete. Element ${arr[n - 1 - i]} bubbled to its final position at index ${n - 1 - i}.`,
      array: [...arr],
      highlightedIndices: [n - 1 - i],
      sortedIndices: [...sortedIndices],
      comparisonsCount: comparisons,
      swapsCount: swaps,
      activeLine: 5,
    });

    if (!swappedThisPass) {
      steps.push({
        step: steps.length,
        description: `No swaps occurred during pass ${i + 1}. The array is fully sorted! Early termination optimization.`,
        array: [...arr],
        highlightedIndices: [],
        sortedIndices: Array.from({ length: n }, (_, k) => k),
        comparisonsCount: comparisons,
        swapsCount: swaps,
        activeLine: 6,
        isComplete: true,
      });
      return steps;
    }
  }

  sortedIndices.push(0);
  steps.push({
    step: steps.length,
    description: `Bubble Sort complete! Array sorted in ascending order with ${comparisons} comparisons and ${swaps} swaps.`,
    array: [...arr],
    highlightedIndices: [],
    sortedIndices: Array.from({ length: n }, (_, k) => k),
    comparisonsCount: comparisons,
    swapsCount: swaps,
    activeLine: 7,
    isComplete: true,
  });

  return steps;
}

export function generateSelectionSortTrace(input: number[]): TraceStep[] {
  const arr = [...input];
  const steps: TraceStep[] = [];
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices: number[] = [];
  const n = arr.length;

  steps.push({
    step: 0,
    description: `Begin Selection Sort on array of ${n} elements.`,
    array: [...arr],
    highlightedIndices: [],
    comparisonsCount: 0,
    swapsCount: 0,
    activeLine: 1,
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    steps.push({
      step: steps.length,
      description: `Starting pass for position ${i}. Assume initial minimum is at index ${minIdx} (value ${arr[minIdx]}).`,
      array: [...arr],
      highlightedIndices: [i],
      sortedIndices: [...sortedIndices],
      pointers: { current: i, min: minIdx },
      comparisonsCount: comparisons,
      swapsCount: swaps,
      activeLine: 2,
    });

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      const isSmaller = arr[j] < arr[minIdx];

      steps.push({
        step: steps.length,
        description: `Comparing candidate at index ${j} (${arr[j]}) with current min at index ${minIdx} (${arr[minIdx]}). ${
          isSmaller ? `Found smaller element! Update min index to ${j}.` : `Not smaller, keep min index ${minIdx}.`
        }`,
        array: [...arr],
        highlightedIndices: [j],
        comparingIndices: [j, minIdx],
        sortedIndices: [...sortedIndices],
        pointers: { current: i, min: isSmaller ? j : minIdx, scan: j },
        comparisonsCount: comparisons,
        swapsCount: swaps,
        activeLine: 3,
      });

      if (isSmaller) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      swaps++;
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;

      steps.push({
        step: steps.length,
        description: `Swap minimum value ${arr[i]} at index ${minIdx} into sorted position ${i}.`,
        array: [...arr],
        highlightedIndices: [i, minIdx],
        swappedIndices: [i, minIdx],
        sortedIndices: [...sortedIndices, i],
        comparisonsCount: comparisons,
        swapsCount: swaps,
        activeLine: 5,
      });
    }

    sortedIndices.push(i);
  }

  sortedIndices.push(n - 1);
  steps.push({
    step: steps.length,
    description: `Selection Sort complete! Array is sorted with ${comparisons} comparisons and ${swaps} swaps.`,
    array: [...arr],
    sortedIndices: Array.from({ length: n }, (_, k) => k),
    comparisonsCount: comparisons,
    swapsCount: swaps,
    activeLine: 6,
    isComplete: true,
  });

  return steps;
}

export function generateInsertionSortTrace(input: number[]): TraceStep[] {
  const arr = [...input];
  const steps: TraceStep[] = [];
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;

  steps.push({
    step: 0,
    description: `Begin Insertion Sort. Index 0 (${arr[0]}) is trivially sorted by itself.`,
    array: [...arr],
    sortedIndices: [0],
    comparisonsCount: 0,
    swapsCount: 0,
    activeLine: 1,
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      step: steps.length,
      description: `Selecting key = ${key} at index ${i} to insert into the sorted prefix [0 .. ${i - 1}].`,
      array: [...arr],
      highlightedIndices: [i],
      sortedIndices: Array.from({ length: i }, (_, k) => k),
      pointers: { keyIndex: i },
      comparisonsCount: comparisons,
      swapsCount: swaps,
      activeLine: 2,
    });

    while (j >= 0) {
      comparisons++;
      if (arr[j] > key) {
        swaps++;
        arr[j + 1] = arr[j];

        steps.push({
          step: steps.length,
          description: `Element ${arr[j]} at index ${j} > key (${key}). Shift ${arr[j]} right to index ${j + 1}.`,
          array: [...arr],
          highlightedIndices: [j, j + 1],
          comparingIndices: [j],
          comparisonsCount: comparisons,
          swapsCount: swaps,
          activeLine: 4,
        });

        j--;
      } else {
        steps.push({
          step: steps.length,
          description: `Element ${arr[j]} at index ${j} <= key (${key}). Insertion spot found at index ${j + 1}.`,
          array: [...arr],
          highlightedIndices: [j],
          comparingIndices: [j],
          comparisonsCount: comparisons,
          swapsCount: swaps,
          activeLine: 5,
        });
        break;
      }
    }

    arr[j + 1] = key;
    steps.push({
      step: steps.length,
      description: `Inserted key ${key} into position ${j + 1}. Sorted prefix is now [0 .. ${i}].`,
      array: [...arr],
      highlightedIndices: [j + 1],
      sortedIndices: Array.from({ length: i + 1 }, (_, k) => k),
      comparisonsCount: comparisons,
      swapsCount: swaps,
      activeLine: 6,
    });
  }

  steps.push({
    step: steps.length,
    description: `Insertion Sort complete! Array is sorted.`,
    array: [...arr],
    sortedIndices: Array.from({ length: n }, (_, k) => k),
    comparisonsCount: comparisons,
    swapsCount: swaps,
    activeLine: 7,
    isComplete: true,
  });

  return steps;
}

export function generateMergeSortTrace(input: number[]): TraceStep[] {
  const steps: TraceStep[] = [];
  const arr = [...input];
  let comparisons = 0;

  steps.push({
    step: 0,
    description: `Begin Merge Sort on [${arr.join(', ')}]. Divide-and-conquer strategy will halve recursively.`,
    array: [...arr],
    highlightedIndices: Array.from({ length: arr.length }, (_, k) => k),
    comparisonsCount: 0,
    activeLine: 1,
  });

  function merge(start: number, mid: number, end: number) {
    const left = arr.slice(start, mid + 1);
    const right = arr.slice(mid + 1, end + 1);

    steps.push({
      step: steps.length,
      description: `Merging sorted left [${left.join(', ')}] and right [${right.join(', ')}] into [${start} .. ${end}].`,
      array: [...arr],
      highlightedIndices: Array.from({ length: end - start + 1 }, (_, k) => start + k),
      comparingIndices: [mid, mid + 1],
      comparisonsCount: comparisons,
      activeLine: 5,
    });

    let i = 0;
    let j = 0;
    let k = start;

    while (i < left.length && j < right.length) {
      comparisons++;
      if (left[i] <= right[j]) {
        arr[k] = left[i];
        steps.push({
          step: steps.length,
          description: `left[${i}] (${left[i]}) <= right[${j}] (${right[j]}). Place ${left[i]} at index ${k}.`,
          array: [...arr],
          highlightedIndices: [k],
          comparisonsCount: comparisons,
          activeLine: 6,
        });
        i++;
      } else {
        arr[k] = right[j];
        steps.push({
          step: steps.length,
          description: `right[${j}] (${right[j]}) < left[${i}] (${left[i]}). Place ${right[j]} at index ${k}.`,
          array: [...arr],
          highlightedIndices: [k],
          comparisonsCount: comparisons,
          activeLine: 7,
        });
        j++;
      }
      k++;
    }

    while (i < left.length) {
      arr[k] = left[i];
      steps.push({
        step: steps.length,
        description: `Copying remaining left element ${left[i]} to index ${k}.`,
        array: [...arr],
        highlightedIndices: [k],
        comparisonsCount: comparisons,
        activeLine: 8,
      });
      i++;
      k++;
    }

    while (j < right.length) {
      arr[k] = right[j];
      steps.push({
        step: steps.length,
        description: `Copying remaining right element ${right[j]} to index ${k}.`,
        array: [...arr],
        highlightedIndices: [k],
        comparisonsCount: comparisons,
        activeLine: 9,
      });
      j++;
      k++;
    }
  }

  function sort(start: number, end: number) {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);

    steps.push({
      step: steps.length,
      description: `Dividing range [${start} .. ${end}] at midpoint ${mid}. Left: [${start} .. ${mid}], Right: [${mid + 1} .. ${end}].`,
      array: [...arr],
      highlightedIndices: [mid],
      pointers: { start, mid, end },
      comparisonsCount: comparisons,
      activeLine: 2,
    });

    sort(start, mid);
    sort(mid + 1, end);
    merge(start, mid, end);
  }

  sort(0, arr.length - 1);

  steps.push({
    step: steps.length,
    description: `Merge Sort complete! Array is sorted in O(n log n) time.`,
    array: [...arr],
    sortedIndices: Array.from({ length: arr.length }, (_, k) => k),
    comparisonsCount: comparisons,
    activeLine: 10,
    isComplete: true,
  });

  return steps;
}

export function generateQuickSortTrace(input: number[]): TraceStep[] {
  const steps: TraceStep[] = [];
  const arr = [...input];
  let comparisons = 0;
  let swaps = 0;

  steps.push({
    step: 0,
    description: `Begin Quick Sort on [${arr.join(', ')}]. Selecting pivots to partition elements into smaller and larger halves.`,
    array: [...arr],
    comparisonsCount: 0,
    swapsCount: 0,
    activeLine: 1,
  });

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    steps.push({
      step: steps.length,
      description: `Partition range [${low} .. ${high}]. Chosen pivot: ${pivot} at index ${high}.`,
      array: [...arr],
      highlightedIndices: [high],
      pointers: { pivot: high, low, high },
      comparisonsCount: comparisons,
      swapsCount: swaps,
      activeLine: 3,
    });

    let i = low - 1;

    for (let j = low; j < high; j++) {
      comparisons++;
      if (arr[j] < pivot) {
        i++;
        swaps++;
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        steps.push({
          step: steps.length,
          description: `arr[${j}] (${arr[i]}) < pivot (${pivot}). Swap into smaller region at index ${i}.`,
          array: [...arr],
          highlightedIndices: [i, j],
          swappedIndices: [i, j],
          pointers: { i, j, pivot: high },
          comparisonsCount: comparisons,
          swapsCount: swaps,
          activeLine: 5,
        });
      } else {
        steps.push({
          step: steps.length,
          description: `arr[${j}] (${arr[j]}) >= pivot (${pivot}). Keep on right side.`,
          array: [...arr],
          highlightedIndices: [j],
          pointers: { i, j, pivot: high },
          comparisonsCount: comparisons,
          swapsCount: swaps,
          activeLine: 6,
        });
      }
    }

    swaps++;
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    const pivotIndex = i + 1;

    steps.push({
      step: steps.length,
      description: `Placed pivot ${pivot} into its exact sorted position at index ${pivotIndex}.`,
      array: [...arr],
      highlightedIndices: [pivotIndex],
      swappedIndices: pivotIndex !== high ? [pivotIndex, high] : undefined,
      sortedIndices: [pivotIndex],
      pointers: { pivotFinal: pivotIndex },
      comparisonsCount: comparisons,
      swapsCount: swaps,
      activeLine: 7,
    });

    return pivotIndex;
  }

  function sort(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    }
  }

  sort(0, arr.length - 1);

  steps.push({
    step: steps.length,
    description: `Quick Sort complete! Array sorted in place.`,
    array: [...arr],
    sortedIndices: Array.from({ length: arr.length }, (_, k) => k),
    comparisonsCount: comparisons,
    swapsCount: swaps,
    activeLine: 8,
    isComplete: true,
  });

  return steps;
}
