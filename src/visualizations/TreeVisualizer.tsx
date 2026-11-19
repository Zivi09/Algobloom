import React from 'react';
import { TraceStep } from '../types';
import { TreeData, DEFAULT_BST } from '../algorithms/traces/treeTraces';

interface TreeVisualizerProps {
  currentStep: TraceStep;
  tree?: TreeData;
  target?: number;
}

export const TreeVisualizer: React.FC<TreeVisualizerProps> = ({
  currentStep,
  tree = DEFAULT_BST,
  target,
}) => {
  const getNodeColor = (nodeId: string) => {
    if (currentStep.activeNodes?.includes(nodeId)) {
      return { fill: '#F1B4B1', stroke: '#DC6C66', text: '#403746' }; // Dusty Rose
    }
    if (currentStep.visitedNodes?.includes(nodeId)) {
      return { fill: '#939F7F', stroke: '#64714F', text: '#FFFFFF' }; // Sage Green
    }
    return { fill: '#C1BECE', stroke: '#87819C', text: '#403746' }; // Misty Lavender
  };

  return (
    <div className="w-full bg-white dark:bg-garden-darkcard rounded-2xl p-6 border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-4">
      {/* Top Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-garden-cardborder dark:border-garden-darkcardborder text-xs sm:text-sm">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-garden-text dark:text-garden-darktext">
            Tree Root: {tree.nodes[tree.rootId]?.value}
          </span>
          {target !== undefined && (
            <span className="px-2.5 py-1 rounded-full bg-dustyrose/40 font-semibold border border-dustyrose-400">
              Searching for: {target}
            </span>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-garden-secondary dark:text-garden-darksecondary">
            <span className="w-3 h-3 rounded-full bg-mistylavender inline-block"></span> Unvisited
          </span>
          <span className="flex items-center gap-1.5 text-garden-secondary dark:text-garden-darksecondary">
            <span className="w-3 h-3 rounded-full bg-dustyrose inline-block"></span> Active Node
          </span>
          <span className="flex items-center gap-1.5 text-garden-secondary dark:text-garden-darksecondary">
            <span className="w-3 h-3 rounded-full bg-sagegreen inline-block"></span> Processed
          </span>
        </div>
      </div>

      {/* SVG Tree Canvas */}
      <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden bg-garden-bg/40 dark:bg-garden-darkbg/40 border border-garden-cardborder/60 dark:border-garden-darkcardborder/60 flex items-center justify-center">
        <svg viewBox="0 0 560 260" className="w-full h-full select-none">
          {/* Branch lines */}
          {Object.values(tree.nodes).map((node) => {
            return (
              <g key={`branch-${node.id}`}>
                {node.left && tree.nodes[node.left] && (
                  <line
                    x1={node.x}
                    y1={node.y}
                    x2={tree.nodes[node.left].x}
                    y2={tree.nodes[node.left].y}
                    stroke="#C1BECE"
                    strokeWidth="2.5"
                    className="transition-all duration-300"
                  />
                )}
                {node.right && tree.nodes[node.right] && (
                  <line
                    x1={node.x}
                    y1={node.y}
                    x2={tree.nodes[node.right].x}
                    y2={tree.nodes[node.right].y}
                    stroke="#C1BECE"
                    strokeWidth="2.5"
                    className="transition-all duration-300"
                  />
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {Object.values(tree.nodes).map((node) => {
            const colors = getNodeColor(node.id);
            const isActive = currentStep.activeNodes?.includes(node.id);

            return (
              <g key={node.id} className="transition-transform duration-300">
                {isActive && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={26}
                    fill="none"
                    stroke="#F1B4B1"
                    strokeWidth={3}
                    className="animate-ping opacity-60"
                  />
                )}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={20}
                  fill={colors.fill}
                  stroke={colors.stroke}
                  strokeWidth={2.5}
                  className="transition-colors duration-300 shadow-md"
                />
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                  fill={colors.text}
                >
                  {node.value}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Traversal output sequence bar */}
      {currentStep.queue && currentStep.queue.length > 0 && (
        <div className="p-3 bg-garden-bg dark:bg-garden-darkbg rounded-xl border border-garden-cardborder dark:border-garden-darkcardborder">
          <div className="text-xs font-semibold uppercase tracking-wider text-garden-secondary dark:text-garden-darksecondary mb-1">
            Traversal Output Sequence
          </div>
          <div className="font-mono text-sm font-semibold text-garden-text dark:text-garden-darktext flex flex-wrap gap-2">
            {currentStep.queue.map((val, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded bg-sagegreen/20 border border-sagegreen text-sagegreen-500">
                {val}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
