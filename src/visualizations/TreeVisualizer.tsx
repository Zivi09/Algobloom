import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { TraceStep } from '../types';
import { TreeData, DEFAULT_BST } from '../algorithms/traces/treeTraces';

interface TreeVisualizerProps {
  currentStep: TraceStep;
  tree?: TreeData;
  target?: number;
}

const CANVAS_WIDTH = 560;
const CANVAS_HEIGHT = 280;
const BOUNDS = {
  minX: 30,
  maxX: 530,
  minY: 30,
  maxY: 245,
};
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2.5;

interface DragState {
  type: 'node' | 'pan';
  id?: string;
  pointerId: number;
  startClientX: number;
  startClientY: number;
  startLocalPos?: { x: number; y: number };
  startNodePos?: { x: number; y: number };
  startPan?: { x: number; y: number };
  hasMoved: boolean;
}

export const TreeVisualizer: React.FC<TreeVisualizerProps> = ({
  currentStep,
  tree = DEFAULT_BST,
  target,
}) => {
  // Persisted node positions across step playback
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>(() => {
    const initial: Record<string, { x: number; y: number }> = {};
    Object.values(tree.nodes).forEach((n) => {
      initial[n.id] = { x: n.x, y: n.y };
    });
    return initial;
  });

  // Canvas pan & zoom state
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const sceneRef = useRef<SVGGElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const animRef = useRef<number | null>(null);

  // Sync positions when tree structure changes
  const treeKey = Object.keys(tree.nodes).sort().join('-');
  const prevTreeKeyRef = useRef(treeKey);

  useEffect(() => {
    if (prevTreeKeyRef.current !== treeKey) {
      prevTreeKeyRef.current = treeKey;
      const initial: Record<string, { x: number; y: number }> = {};
      Object.values(tree.nodes).forEach((n) => {
        initial[n.id] = { x: n.x, y: n.y };
      });
      setNodePositions(initial);
      setPan({ x: 0, y: 0 });
      setZoom(1);
    }
  }, [treeKey, tree]);

  // Clean up running spring animations on unmount
  useEffect(() => {
    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
      }
    };
  }, []);

  // Convert client coordinates to scene group coordinates
  const getLocalCoordinates = useCallback(
    (clientX: number, clientY: number): { x: number; y: number } | null => {
      if (!sceneRef.current || !svgRef.current) return null;
      const pt = svgRef.current.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const ctm = sceneRef.current.getScreenCTM();
      if (!ctm) return null;
      const transformed = pt.matrixTransform(ctm.inverse());
      return { x: transformed.x, y: transformed.y };
    },
    []
  );

  // Smooth spring back animation if released outside bounds
  const triggerSpringBack = useCallback((nodeId: string, currentPos: { x: number; y: number }) => {
    const targetX = Math.max(BOUNDS.minX, Math.min(BOUNDS.maxX, currentPos.x));
    const targetY = Math.max(BOUNDS.minY, Math.min(BOUNDS.maxY, currentPos.y));

    if (targetX === currentPos.x && targetY === currentPos.y) {
      return;
    }

    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }

    const startX = currentPos.x;
    const startY = currentPos.y;
    const startTime = performance.now();
    const duration = 260; // ms

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3);
      const nextX = startX + (targetX - startX) * ease;
      const nextY = startY + (targetY - startY) * ease;

      setNodePositions((prev) => ({
        ...prev,
        [nodeId]: { x: nextX, y: nextY },
      }));

      if (progress < 1) {
        animRef.current = requestAnimationFrame(step);
      } else {
        animRef.current = null;
      }
    };

    animRef.current = requestAnimationFrame(step);
  }, []);

  // Wheel zoom with focal point tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const local = getLocalCoordinates(e.clientX, e.clientY);
      const zoomDelta = e.deltaY < 0 ? 0.12 : -0.12;

      setZoom((prevZoom) => {
        const nextZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number((prevZoom + zoomDelta).toFixed(2))));
        if (nextZoom !== prevZoom && local) {
          const factor = prevZoom - nextZoom;
          setPan((prevPan) => ({
            x: prevPan.x + factor * (local.x - CANVAS_WIDTH / 2),
            y: prevPan.y + factor * (local.y - CANVAS_HEIGHT / 2),
          }));
        }
        return nextZoom;
      });
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [getLocalCoordinates]);

  // Pointer interactions
  const handleNodePointerDown = (e: React.PointerEvent<SVGGElement>, nodeId: string) => {
    e.stopPropagation();

    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }

    if (svgRef.current) {
      try {
        svgRef.current.setPointerCapture(e.pointerId);
      } catch {
        // ignore fallback
      }
    }

    const local = getLocalCoordinates(e.clientX, e.clientY);
    const curPos = nodePositions[nodeId] || { x: 0, y: 0 };

    dragRef.current = {
      type: 'node',
      id: nodeId,
      pointerId: e.pointerId,
      startClientX: e.clientX,
      startClientY: e.clientY,
      startLocalPos: local || { x: curPos.x, y: curPos.y },
      startNodePos: { ...curPos },
      hasMoved: false,
    };
    setDraggingNodeId(nodeId);
  };

  const handleCanvasPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (svgRef.current) {
      try {
        svgRef.current.setPointerCapture(e.pointerId);
      } catch {
        // ignore fallback
      }
    }

    dragRef.current = {
      type: 'pan',
      pointerId: e.pointerId,
      startClientX: e.clientX,
      startClientY: e.clientY,
      startPan: { ...pan },
      hasMoved: false,
    };
    setIsPanning(true);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const drag = dragRef.current;
    if (!drag) return;

    if (drag.type === 'node' && drag.id) {
      const dist = Math.hypot(e.clientX - drag.startClientX, e.clientY - drag.startClientY);
      if (dist > 4) {
        drag.hasMoved = true;
      }
      const local = getLocalCoordinates(e.clientX, e.clientY);
      if (local && drag.startLocalPos && drag.startNodePos) {
        const deltaX = local.x - drag.startLocalPos.x;
        const deltaY = local.y - drag.startLocalPos.y;
        setNodePositions((prev) => ({
          ...prev,
          [drag.id!]: {
            x: drag.startNodePos!.x + deltaX,
            y: drag.startNodePos!.y + deltaY,
          },
        }));
      }
    } else if (drag.type === 'pan') {
      const dx = e.clientX - drag.startClientX;
      const dy = e.clientY - drag.startClientY;
      if (Math.hypot(dx, dy) > 2) {
        drag.hasMoved = true;
      }
      const svgRect = svgRef.current?.getBoundingClientRect();
      if (svgRect && drag.startPan) {
        const scaleX = CANVAS_WIDTH / svgRect.width;
        const scaleY = CANVAS_HEIGHT / svgRect.height;
        setPan({
          x: drag.startPan.x + dx * scaleX,
          y: drag.startPan.y + dy * scaleY,
        });
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    const drag = dragRef.current;
    if (!drag) return;

    if (svgRef.current) {
      try {
        svgRef.current.releasePointerCapture(drag.pointerId);
      } catch {
        // ignore fallback
      }
    }

    if (drag.type === 'node' && drag.id) {
      const nodeId = drag.id;
      setDraggingNodeId(null);
      dragRef.current = null;

      const curPos = nodePositions[nodeId];
      if (curPos) {
        triggerSpringBack(nodeId, curPos);
      }
    } else if (drag.type === 'pan') {
      setIsPanning(false);
      dragRef.current = null;
    }
  };

  // Zoom button controls
  const handleZoomIn = () => {
    setZoom((z) => Math.min(MAX_ZOOM, Number((z + 0.2).toFixed(2))));
  };

  const handleZoomOut = () => {
    setZoom((z) => Math.max(MIN_ZOOM, Number((z - 0.2).toFixed(2))));
  };

  const handleResetLayout = () => {
    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }
    setPan({ x: 0, y: 0 });
    setZoom(1);
    const initial: Record<string, { x: number; y: number }> = {};
    Object.values(tree.nodes).forEach((n) => {
      initial[n.id] = { x: n.x, y: n.y };
    });
    setNodePositions(initial);
  };

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

      {/* SVG Tree Canvas Sandbox */}
      <div
        ref={containerRef}
        style={{ touchAction: 'none' }}
        className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden bg-garden-bg/40 dark:bg-garden-darkbg/40 border border-garden-cardborder/60 dark:border-garden-darkcardborder/60 flex items-center justify-center select-none"
      >
        {/* Interaction Hint Pill */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/85 dark:bg-garden-darkcard/85 backdrop-blur-sm border border-garden-cardborder/70 dark:border-garden-darkcardborder/70 text-[11px] font-medium text-garden-secondary dark:text-garden-darksecondary shadow-xs pointer-events-none select-none z-10">
          <span className="text-xs">🌳</span>
          <span className="hidden sm:inline">Drag nodes • Pan canvas • Scroll to zoom</span>
          <span className="sm:hidden">Drag & Pan Canvas</span>
        </div>

        {/* Floating Zoom & Layout Controls */}
        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 p-1 rounded-xl bg-white/90 dark:bg-garden-darkcard/90 backdrop-blur-md border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden z-10 select-none">
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={zoom <= MIN_ZOOM}
            className="p-1.5 text-garden-secondary hover:text-garden-text dark:text-garden-darksecondary dark:hover:text-garden-darktext rounded-lg hover:bg-garden-cardborder/40 disabled:opacity-35 disabled:hover:bg-transparent transition-colors"
            title="Zoom Out (-)"
            aria-label="Zoom out"
          >
            <ZoomOut size={15} />
          </button>

          <span className="px-1.5 text-[11px] font-mono font-semibold text-garden-secondary dark:text-garden-darksecondary min-w-[38px] text-center">
            {Math.round(zoom * 100)}%
          </span>

          <button
            type="button"
            onClick={handleZoomIn}
            disabled={zoom >= MAX_ZOOM}
            className="p-1.5 text-garden-secondary hover:text-garden-text dark:text-garden-darksecondary dark:hover:text-garden-darktext rounded-lg hover:bg-garden-cardborder/40 disabled:opacity-35 disabled:hover:bg-transparent transition-colors"
            title="Zoom In (+)"
            aria-label="Zoom in"
          >
            <ZoomIn size={15} />
          </button>

          <div className="h-4 w-px bg-garden-cardborder dark:bg-garden-darkcardborder my-auto mx-0.5" />

          <button
            type="button"
            onClick={handleResetLayout}
            className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-garden-secondary hover:text-garden-text dark:text-garden-darksecondary dark:hover:text-garden-darktext rounded-lg hover:bg-garden-cardborder/40 transition-colors"
            title="Reset canonical node layout, pan, and zoom"
            aria-label="Reset Layout"
          >
            <RotateCcw size={13} />
            <span className="hidden sm:inline">Reset Layout</span>
          </button>
        </div>

        <svg
          ref={svgRef}
          viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
          className={`w-full h-full select-none ${
            isPanning ? 'cursor-grabbing' : draggingNodeId ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          onPointerDown={handleCanvasPointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Defs for drop shadows */}
          <defs>
            <filter id="glow-tree" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="botanical-shadow-tree" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="2.5" stdDeviation="3" floodColor="#3B322C" floodOpacity="0.20" />
            </filter>
            <filter id="botanical-shadow-tree-dragged" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#3B322C" floodOpacity="0.32" />
            </filter>
          </defs>

          {/* Invisible background catching pan clicks across full coordinate space */}
          <rect
            id="canvas-bg-tree"
            x="-2000"
            y="-2000"
            width="5000"
            height="5000"
            fill="transparent"
            className={isPanning ? 'cursor-grabbing' : 'cursor-grab'}
          />

          {/* Interactive Scene Group with Pan and Center-Scaled Zoom */}
          <g
            ref={sceneRef}
            transform={`translate(${pan.x}, ${pan.y}) translate(${CANVAS_WIDTH / 2}, ${CANVAS_HEIGHT / 2}) scale(${zoom}) translate(${-CANVAS_WIDTH / 2}, ${-CANVAS_HEIGHT / 2})`}
          >
            {/* Branch lines */}
            {Object.values(tree.nodes).map((node) => {
              const nodePos = nodePositions[node.id] || { x: node.x, y: node.y };
              const leftNode = node.left ? tree.nodes[node.left] : undefined;
              const leftPos = leftNode
                ? nodePositions[leftNode.id] || { x: leftNode.x, y: leftNode.y }
                : undefined;
              const rightNode = node.right ? tree.nodes[node.right] : undefined;
              const rightPos = rightNode
                ? nodePositions[rightNode.id] || { x: rightNode.x, y: rightNode.y }
                : undefined;

              return (
                <g key={`branch-${node.id}`} className="pointer-events-none">
                  {leftPos && (
                    <line
                      x1={nodePos.x}
                      y1={nodePos.y}
                      x2={leftPos.x}
                      y2={leftPos.y}
                      stroke="#C1BECE"
                      strokeWidth="2.5"
                      className="transition-colors duration-300"
                    />
                  )}
                  {rightPos && (
                    <line
                      x1={nodePos.x}
                      y1={nodePos.y}
                      x2={rightPos.x}
                      y2={rightPos.y}
                      stroke="#C1BECE"
                      strokeWidth="2.5"
                      className="transition-colors duration-300"
                    />
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {Object.values(tree.nodes).map((node) => {
              const pos = nodePositions[node.id] || { x: node.x, y: node.y };
              const colors = getNodeColor(node.id);
              const isActive = currentStep.activeNodes?.includes(node.id);
              const isDragging = draggingNodeId === node.id;

              return (
                <g
                  key={node.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onPointerDown={(e) => handleNodePointerDown(e, node.id)}
                  className={`select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                >
                  {/* Outer halo if active */}
                  {isActive && (
                    <circle
                      cx={0}
                      cy={0}
                      r={26}
                      fill="none"
                      stroke="#F1B4B1"
                      strokeWidth={3}
                      className="animate-ping opacity-60 pointer-events-none"
                    />
                  )}
                  {/* Main node circle with soft botanical shadow and lift on drag */}
                  <circle
                    cx={0}
                    cy={0}
                    r={20}
                    fill={colors.fill}
                    stroke={colors.stroke}
                    strokeWidth={2.5}
                    filter={isDragging ? 'url(#botanical-shadow-tree-dragged)' : 'url(#botanical-shadow-tree)'}
                    className="transition-colors duration-300"
                    style={{
                      transform: isDragging ? 'scale(1.08)' : 'scale(1)',
                      transition: 'transform 0.15s ease-out',
                    }}
                  />
                  {/* Node label value */}
                  <text
                    x={0}
                    y={5}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="bold"
                    fill={colors.text}
                    className="pointer-events-none select-none"
                  >
                    {node.value}
                  </text>
                </g>
              );
            })}
          </g>
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
