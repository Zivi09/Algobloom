import React from 'react';
import { DataStructureVisualizer } from '../visualizations/DataStructureVisualizer';
import { Boxes, Zap, HardDrive, Compass } from 'lucide-react';

export const DataStructuresPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto pb-20 flex flex-col gap-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dustyrose/30 border border-dustyrose text-xs font-semibold text-garden-text">
          <span>📦</span>
          <span>Level 1 • Fundamental Architectures</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-garden-text dark:text-garden-darktext tracking-tight">
          Interactive Data Structures
        </h1>
        <p className="text-sm sm:text-base text-garden-secondary max-w-xl">
          Understand how computers store and organize memory. Experiment interactively with Stacks, Queues, Linked Lists, and Hash Tables.
        </p>
      </div>

      {/* Main Interactive Visualizer */}
      <DataStructureVisualizer />

      {/* Deep-Dive Architectural Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contiguous Arrays vs Linked Nodes */}
        <div className="p-6 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <h3 className="font-heading font-bold text-lg text-garden-text dark:text-garden-darktext">
              Contiguous Arrays vs Linked Nodes
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-garden-secondary leading-relaxed">
            Arrays sit side-by-side in continuous memory slots, giving you instant O(1) index access: <code>address = base + index * size</code>. However, inserting or deleting in the middle requires shifting all subsequent elements in O(n) time. Linked lists store nodes in scattered memory connected by pointers, permitting O(1) insertions at the head, but requiring O(n) linear traversal to search.
          </p>
        </div>

        {/* The Magic of Hash Tables */}
        <div className="p-6 rounded-3xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🗄️</span>
            <h3 className="font-heading font-bold text-lg text-garden-text dark:text-garden-darktext">
              The Magic of Hash Tables
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-garden-secondary leading-relaxed">
            Hash tables achieve average O(1) search, insert, and delete by passing arbitrary keys through a mathematical hash function to calculate an exact array bucket index. When two distinct keys hash to the same bucket (a collision), separate chaining links them into a list, or open addressing finds the next available open slot.
          </p>
        </div>
      </div>
    </div>
  );
};
