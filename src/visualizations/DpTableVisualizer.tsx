import React from 'react';
import { TraceStep } from '../types';

interface DpTableVisualizerProps {
  currentStep: TraceStep;
}

export const DpTableVisualizer: React.FC<DpTableVisualizerProps> = ({ currentStep }) => {
  const table = currentStep.dpTable || [['-']];
  const headersX = currentStep.dpHeadersX || [];
  const headersY = currentStep.dpHeadersY || [];

  const isCellActive = (row: number, col: number) => {
    if (!currentStep.activeCell) return false;
    return currentStep.activeCell[0] === row && currentStep.activeCell[1] === col;
  };

  const isCellPredecessor = (row: number, col: number) => {
    if (!currentStep.calculatingCells) return false;
    return currentStep.calculatingCells.some(([r, c]) => r === row && c === col);
  };

  return (
    <div className="w-full bg-white dark:bg-garden-darkcard rounded-2xl p-6 border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-4">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-garden-cardborder dark:border-garden-darkcardborder text-xs sm:text-sm">
        <span className="font-semibold text-garden-text dark:text-garden-darktext">
          Dynamic Programming Memoization / Tabulation Table
        </span>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-garden-secondary dark:text-garden-darksecondary">
            <span className="w-3 h-3 rounded bg-buttercream border border-amber-300 inline-block"></span> Predecessor Subproblem
          </span>
          <span className="flex items-center gap-1.5 text-garden-secondary dark:text-garden-darksecondary">
            <span className="w-3 h-3 rounded bg-dustyrose border border-red-300 inline-block"></span> Active State Cell
          </span>
        </div>
      </div>

      {/* Table grid */}
      <div className="overflow-x-auto py-2">
        <table className="w-full border-collapse text-center">
          {headersX.length > 0 && (
            <thead>
              <tr>
                {headersY.length > 0 && <th className="p-2 border-b border-garden-cardborder text-xs text-garden-secondary"></th>}
                {headersX.map((hx, idx) => (
                  <th
                    key={idx}
                    className="p-2 text-xs font-mono font-semibold text-garden-secondary dark:text-garden-darksecondary border-b border-garden-cardborder dark:border-garden-darkcardborder min-w-[52px]"
                  >
                    {hx}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {table.map((row, rIdx) => (
              <tr key={rIdx}>
                {headersY[rIdx] && (
                  <td className="p-2 text-xs font-mono font-semibold text-garden-secondary dark:text-garden-darksecondary text-left pr-4 whitespace-nowrap">
                    {headersY[rIdx]}
                  </td>
                )}
                {row.map((cellVal, cIdx) => {
                  const active = isCellActive(rIdx, cIdx);
                  const pred = isCellPredecessor(rIdx, cIdx);

                  let cellClass = 'bg-garden-bg/60 dark:bg-garden-darkbg/60 text-garden-text dark:text-garden-darktext border-garden-cardborder dark:border-garden-darkcardborder';
                  if (active) {
                    cellClass = 'bg-dustyrose text-garden-text font-bold border-red-400 ring-2 ring-dustyrose-400 animate-pulse';
                  } else if (pred) {
                    cellClass = 'bg-buttercream text-amber-950 font-bold border-amber-400 ring-2 ring-buttercream-400';
                  } else if (cellVal !== '-' && cellVal !== '∞') {
                    cellClass = 'bg-sagegreen/20 text-sagegreen-500 font-semibold border-sagegreen/40';
                  }

                  return (
                    <td
                      key={cIdx}
                      className={`p-3 border text-sm font-mono transition-all duration-300 rounded-lg ${cellClass}`}
                    >
                      {cellVal}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
