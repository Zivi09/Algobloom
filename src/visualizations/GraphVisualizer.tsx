import React from 'react';
import { TraceStep } from '../types';
import { GraphData, DEFAULT_GRAPH } from '../algorithms/traces/graphTraces';

interface GraphVisualizerProps {
  currentStep: TraceStep;
  graph?: GraphData;
  onNodeClick?: (nodeId: string) => void;
}

export const GraphVisualizer: React.FC<GraphVisualizerProps> = ({
  currentStep,
  graph = DEFAULT_GRAPH,
  onNodeClick,
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

  const isEdgeActive = (from: string, to: string) => {
    if (!currentStep.currentEdge) return false;
    const [e1, e2] = currentStep.currentEdge;
    return (e1 === from && e2 === to) || (e1 === to && e2 === from);
  };

  return (
    <div className="w-full bg-white dark:bg-garden-darkcard rounded-2xl p-6 border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-4">
      {/* Top Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-garden-cardborder dark:border-garden-darkcardborder text-xs sm:text-sm">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-garden-text dark:text-garden-darktext">
            Vertices: {graph.nodes.length} | Edges: {graph.edges.length}
          </span>
          {currentStep.queue && currentStep.queue.length > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-mistylavender/40 border border-mistylavender">
              <span className="font-semibold text-garden-text dark:text-garden-darktext">Queue (FIFO):</span>
              <span className="font-mono text-dustyrose-500 font-bold">[{currentStep.queue.join(', ')}]</span>
            </div>
          )}
          {currentStep.stack && currentStep.stack.length > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-buttercream/50 border border-buttercream-400">
              <span className="font-semibold text-garden-text dark:text-garden-darktext">Stack (LIFO):</span>
              <span className="font-mono text-amber-900 font-bold">[{currentStep.stack.join(', ')}]</span>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-garden-secondary dark:text-garden-darksecondary">
            <span className="w-3 h-3 rounded-full bg-mistylavender inline-block"></span> Unvisited
          </span>
          <span className="flex items-center gap-1.5 text-garden-secondary dark:text-garden-darksecondary">
            <span className="w-3 h-3 rounded-full bg-dustyrose inline-block"></span> Exploring
          </span>
          <span className="flex items-center gap-1.5 text-garden-secondary dark:text-garden-darksecondary">
            <span className="w-3 h-3 rounded-full bg-sagegreen inline-block"></span> Visited / Settled
          </span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden bg-garden-bg/40 dark:bg-garden-darkbg/40 border border-garden-cardborder/60 dark:border-garden-darkcardborder/60 flex items-center justify-center">
        <svg viewBox="0 0 600 300" className="w-full h-full select-none">
          {/* Defs for arrowheads and filters */}
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Edges */}
          {graph.edges.map((edge, idx) => {
            const fromNode = graph.nodes.find((n) => n.id === edge.from);
            const toNode = graph.nodes.find((n) => n.id === edge.to);
            if (!fromNode || !toNode) return null;

            const active = isEdgeActive(edge.from, edge.to);
            const midX = (fromNode.x + toNode.x) / 2;
            const midY = (fromNode.y + toNode.y) / 2;

            return (
              <g key={`edge-${idx}`}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={active ? '#F1B4B1' : '#C1BECE'}
                  strokeWidth={active ? 3.5 : 2}
                  strokeDasharray={active ? '5,5' : 'none'}
                  className="transition-all duration-300"
                />
                {/* Edge weight badge */}
                <rect
                  x={midX - 11}
                  y={midY - 10}
                  width={22}
                  height={20}
                  rx={6}
                  fill="#FFFDF9"
                  stroke="#C6BEA7"
                  strokeWidth={1}
                />
                <text
                  x={midX}
                  y={midY + 4}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="bold"
                  fill="#403746"
                >
                  {edge.weight}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {graph.nodes.map((node) => {
            const colors = getNodeColor(node.id);
            const isActive = currentStep.activeNodes?.includes(node.id);

            return (
              <g
                key={node.id}
                className="cursor-pointer transition-transform duration-300 hover:scale-110"
                onClick={() => onNodeClick && onNodeClick(node.id)}
              >
                {/* Outer halo if active */}
                {isActive && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={28}
                    fill="none"
                    stroke="#F1B4B1"
                    strokeWidth={3}
                    className="animate-ping opacity-60"
                  />
                )}
                {/* Main node circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={22}
                  fill={colors.fill}
                  stroke={colors.stroke}
                  strokeWidth={2.5}
                  className="transition-colors duration-300"
                />
                {/* Node ID label */}
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="bold"
                  fill={colors.text}
                >
                  {node.id}
                </text>
                {/* Flower subtitle below node */}
                <text
                  x={node.x}
                  y={node.y + 36}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#827589"
                  className="font-medium"
                >
                  {node.label.split(' ')[1] || ''}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Distance table if running Dijkstra */}
      {currentStep.distances && (
        <div className="mt-2 p-3 bg-garden-bg dark:bg-garden-darkbg rounded-xl border border-garden-cardborder dark:border-garden-darkcardborder">
          <div className="text-xs font-semibold uppercase tracking-wider text-garden-secondary dark:text-garden-darksecondary mb-2">
            Tentative Distance Table (from Start)
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(currentStep.distances).map(([nodeId, dist]) => (
              <div
                key={nodeId}
                className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 ${
                  currentStep.visitedNodes?.includes(nodeId)
                    ? 'bg-sagegreen/20 border-sagegreen text-sagegreen-500 font-bold'
                    : 'bg-white dark:bg-garden-darkcard border-garden-cardborder dark:border-garden-darkcardborder text-garden-text dark:text-garden-darktext'
                }`}
              >
                <span>Vertex {nodeId}:</span>
                <span className="font-bold">{dist}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
