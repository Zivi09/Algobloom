import { TraceStep } from '../../types';

export function generateFibonacciDpTrace(n: number = 7): TraceStep[] {
  const steps: TraceStep[] = [];
  const dp: (number | string)[] = new Array(n + 1).fill('-');
  const headers = Array.from({ length: n + 1 }, (_, i) => `F(${i})`);

  steps.push({
    step: 0,
    description: `Initialize bottom-up DP table of size ${n + 1} to calculate Fibonacci(${n}).`,
    dpTable: [[...dp]],
    dpHeadersX: headers,
    dpHeadersY: ['Value'],
    activeLine: 1,
  });

  dp[0] = 0;
  steps.push({
    step: steps.length,
    description: `Base case F(0) = 0.`,
    dpTable: [[...dp]],
    dpHeadersX: headers,
    dpHeadersY: ['Value'],
    activeCell: [0, 0],
    activeLine: 2,
  });

  if (n >= 1) {
    dp[1] = 1;
    steps.push({
      step: steps.length,
      description: `Base case F(1) = 1.`,
      dpTable: [[...dp]],
      dpHeadersX: headers,
      dpHeadersY: ['Value'],
      activeCell: [0, 1],
      activeLine: 3,
    });
  }

  for (let i = 2; i <= n; i++) {
    const val = (dp[i - 1] as number) + (dp[i - 2] as number);
    steps.push({
      step: steps.length,
      description: `Calculating F(${i}) = F(${i - 1}) [${dp[i - 1]}] + F(${i - 2}) [${dp[i - 2]}].`,
      dpTable: [[...dp]],
      dpHeadersX: headers,
      dpHeadersY: ['Value'],
      activeCell: [0, i],
      calculatingCells: [
        [0, i - 1],
        [0, i - 2],
      ],
      activeLine: 4,
    });

    dp[i] = val;

    steps.push({
      step: steps.length,
      description: `Stored F(${i}) = ${val} in table in O(1) time without redundant recursion!`,
      dpTable: [[...dp]],
      dpHeadersX: headers,
      dpHeadersY: ['Value'],
      activeCell: [0, i],
      activeLine: 5,
    });
  }

  steps.push({
    step: steps.length,
    description: `Completed Fibonacci DP! F(${n}) = ${dp[n]}. Time Complexity: O(n), Space Complexity: O(n) (or O(1) optimized).`,
    dpTable: [[...dp]],
    dpHeadersX: headers,
    dpHeadersY: ['Value'],
    activeCell: [0, n],
    activeLine: 6,
    isComplete: true,
  });

  return steps;
}

export function generateCoinChangeTrace(coins: number[] = [1, 2, 5], amount: number = 7): TraceStep[] {
  const steps: TraceStep[] = [];
  const dp: (number | string)[] = new Array(amount + 1).fill('∞');
  dp[0] = 0;
  const headers = Array.from({ length: amount + 1 }, (_, i) => `$${i}`);

  steps.push({
    step: 0,
    description: `Compute minimum coins for amount $${amount} using coins [${coins.join(', ')}]. Base case: dp[0] = 0 coins.`,
    dpTable: [[...dp]],
    dpHeadersX: headers,
    dpHeadersY: ['Min Coins'],
    activeCell: [0, 0],
    activeLine: 1,
  });

  for (let i = 1; i <= amount; i++) {
    for (const c of coins) {
      if (i - c >= 0 && dp[i - c] !== '∞') {
        const candidate = (dp[i - c] as number) + 1;
        const current = dp[i] === '∞' ? Infinity : (dp[i] as number);

        steps.push({
          step: steps.length,
          description: `Evaluating target $${i} using coin $${c}. Candidate = dp[${i - c}] + 1 = ${dp[i - c]} + 1 = ${candidate}.`,
          dpTable: [[...dp]],
          dpHeadersX: headers,
          dpHeadersY: ['Min Coins'],
          activeCell: [0, i],
          calculatingCells: [[0, i - c]],
          activeLine: 4,
        });

        if (candidate < current) {
          dp[i] = candidate;
          steps.push({
            step: steps.length,
            description: `Updated dp[${i}] = ${candidate} (new minimum using coin $${c}).`,
            dpTable: [[...dp]],
            dpHeadersX: headers,
            dpHeadersY: ['Min Coins'],
            activeCell: [0, i],
            activeLine: 5,
          });
        }
      }
    }
  }

  steps.push({
    step: steps.length,
    description: `Coin change DP complete! Minimum coins for $${amount} is ${dp[amount]}.`,
    dpTable: [[...dp]],
    dpHeadersX: headers,
    dpHeadersY: ['Min Coins'],
    activeCell: [0, amount],
    activeLine: 6,
    isComplete: true,
  });

  return steps;
}
