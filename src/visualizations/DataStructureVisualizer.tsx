import React, { useState } from 'react';
import { Plus, Trash2, Search, ArrowRight, CornerDownRight } from 'lucide-react';

export const DataStructureVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stack' | 'queue' | 'linkedlist' | 'hashtable'>('stack');

  // Stack state
  const [stackItems, setStackItems] = useState<(number | string)[]>([12, 35, 68]);
  const [stackInput, setStackInput] = useState('');
  const [stackMessage, setStackMessage] = useState('Stack initialized (LIFO)');

  // Queue state
  const [queueItems, setQueueItems] = useState<(number | string)[]>([42, 19, 87]);
  const [queueInput, setQueueInput] = useState('');
  const [queueMessage, setQueueMessage] = useState('Queue initialized (FIFO)');

  // Linked list state
  const [listNodes, setListNodes] = useState<(number | string)[]>([10, 25, 40, 75]);
  const [listInput, setListInput] = useState('');
  const [highlightedNode, setHighlightedNode] = useState<number | null>(null);
  const [listMessage, setListMessage] = useState('Singly Linked List with forward pointers');

  // Hash table state
  const TABLE_SIZE = 5;
  const [buckets, setBuckets] = useState<Record<number, { key: string; value: number }[]>>({
    0: [{ key: 'Rose', value: 100 }],
    1: [{ key: 'Lily', value: 250 }],
    2: [{ key: 'Tulip', value: 80 }, { key: 'Lotus', value: 310 }], // collision demonstration
    3: [],
    4: [{ key: 'Daisy', value: 45 }],
  });
  const [hashKey, setHashKey] = useState('');
  const [hashVal, setHashVal] = useState('');
  const [hashMessage, setHashMessage] = useState('Hash Table with Separate Chaining for collision resolution');

  // Handlers
  const handlePushStack = () => {
    if (!stackInput.trim()) return;
    const val = isNaN(Number(stackInput)) ? stackInput : Number(stackInput);
    setStackItems([...stackItems, val]);
    setStackMessage(`Pushed ${val} onto top of stack.`);
    setStackInput('');
  };

  const handlePopStack = () => {
    if (stackItems.length === 0) {
      setStackMessage('Stack underflow! Cannot pop from empty stack.');
      return;
    }
    const popped = stackItems[stackItems.length - 1];
    setStackItems(stackItems.slice(0, -1));
    setStackMessage(`Popped ${popped} from top of stack.`);
  };

  const handleEnqueue = () => {
    if (!queueInput.trim()) return;
    const val = isNaN(Number(queueInput)) ? queueInput : Number(queueInput);
    setQueueItems([...queueItems, val]);
    setQueueMessage(`Enqueued ${val} at rear of queue.`);
    setQueueInput('');
  };

  const handleDequeue = () => {
    if (queueItems.length === 0) {
      setQueueMessage('Queue underflow! Cannot dequeue from empty queue.');
      return;
    }
    const dequeued = queueItems[0];
    setQueueItems(queueItems.slice(1));
    setQueueMessage(`Dequeued ${dequeued} from front of queue.`);
  };

  const handleInsertHead = () => {
    if (!listInput.trim()) return;
    const val = isNaN(Number(listInput)) ? listInput : Number(listInput);
    setListNodes([val, ...listNodes]);
    setListMessage(`Inserted ${val} at HEAD of list in O(1) time.`);
    setListInput('');
  };

  const handleInsertTail = () => {
    if (!listInput.trim()) return;
    const val = isNaN(Number(listInput)) ? listInput : Number(listInput);
    setListNodes([...listNodes, val]);
    setListMessage(`Inserted ${val} at TAIL of list.`);
    setListInput('');
  };

  const handleDeleteNode = (idx: number) => {
    const val = listNodes[idx];
    setListNodes(listNodes.filter((_, i) => i !== idx));
    setListMessage(`Deleted node with value ${val} from list.`);
  };

  const handleSearchNode = () => {
    if (!listInput.trim()) return;
    const val = isNaN(Number(listInput)) ? listInput : Number(listInput);
    const idx = listNodes.indexOf(val);
    if (idx !== -1) {
      setHighlightedNode(idx);
      setListMessage(`Found ${val} at position ${idx} after ${idx + 1} pointer hops.`);
      setTimeout(() => setHighlightedNode(null), 3000);
    } else {
      setListMessage(`${val} not found in linked list.`);
    }
  };

  const handleInsertHash = () => {
    if (!hashKey.trim() || !hashVal.trim()) return;
    // Simple hash: sum of char codes modulo table size
    let sum = 0;
    for (let i = 0; i < hashKey.length; i++) sum += hashKey.charCodeAt(i);
    const bucketIdx = sum % TABLE_SIZE;

    const currentBucket = buckets[bucketIdx] || [];
    const existingIdx = currentBucket.findIndex((pair) => pair.key === hashKey);

    let updatedBucket;
    if (existingIdx >= 0) {
      updatedBucket = [...currentBucket];
      updatedBucket[existingIdx].value = Number(hashVal);
      setHashMessage(`Updated key '${hashKey}' in bucket ${bucketIdx}.`);
    } else {
      updatedBucket = [...currentBucket, { key: hashKey, value: Number(hashVal) }];
      setHashMessage(`Hashed '${hashKey}' -> sum(${sum}) % ${TABLE_SIZE} = bucket ${bucketIdx}. ${currentBucket.length > 0 ? 'Collision resolved with chaining!' : ''}`);
    }

    setBuckets({ ...buckets, [bucketIdx]: updatedBucket });
    setHashKey('');
    setHashVal('');
  };

  return (
    <div className="w-full bg-white dark:bg-garden-darkcard rounded-2xl p-6 border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden flex flex-col gap-6">
      {/* Category selector tabs */}
      <div className="flex flex-wrap gap-2 border-b border-garden-cardborder dark:border-garden-darkcardborder pb-4">
        {[
          { id: 'stack', label: 'Stack (LIFO)', icon: '📚' },
          { id: 'queue', label: 'Queue (FIFO)', icon: '🚶' },
          { id: 'linkedlist', label: 'Singly Linked List', icon: '🔗' },
          { id: 'hashtable', label: 'Hash Table (Chaining)', icon: '🗄️' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-dustyrose text-garden-text shadow-sm'
                : 'bg-garden-bg dark:bg-garden-darkbg text-garden-secondary hover:text-garden-text hover:bg-garden-hover'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 1. STACK TAB */}
      {activeTab === 'stack' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Value..."
                value={stackInput}
                onChange={(e) => setStackInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handlePushStack()}
                className="px-3 py-2 rounded-xl border border-garden-cardborder dark:border-garden-darkcardborder bg-garden-bg dark:bg-garden-darkbg text-sm w-28 focus:outline-none focus:ring-2 focus:ring-dustyrose"
              />
              <button
                onClick={handlePushStack}
                className="px-3 py-2 rounded-xl bg-dustyrose text-garden-text font-semibold text-xs sm:text-sm hover:bg-dustyrose-400 transition-colors flex items-center gap-1"
              >
                <Plus size={16} /> Push (O(1))
              </button>
              <button
                onClick={handlePopStack}
                className="px-3 py-2 rounded-xl bg-buttercream text-amber-950 font-semibold text-xs sm:text-sm hover:bg-buttercream-400 transition-colors flex items-center gap-1"
              >
                <Trash2 size={16} /> Pop (O(1))
              </button>
            </div>
            <span className="text-xs sm:text-sm text-garden-secondary dark:text-garden-darksecondary">
              Status: <strong>{stackMessage}</strong>
            </span>
          </div>

          {/* Visual Container */}
          <div className="h-64 sm:h-72 w-full bg-garden-bg/40 dark:bg-garden-darkbg/40 rounded-xl border border-garden-cardborder dark:border-garden-darkcardborder flex items-end justify-center p-6">
            <div className="w-48 sm:w-56 border-x-4 border-b-4 border-mistylavender-400 dark:border-mistylavender-600 rounded-b-2xl p-2 flex flex-col-reverse gap-2 min-h-[160px] bg-white/60 dark:bg-garden-darkcard/60">
              {stackItems.length === 0 ? (
                <div className="m-auto text-xs text-garden-secondary italic">Stack is Empty</div>
              ) : (
                stackItems.map((val, idx) => {
                  const isTop = idx === stackItems.length - 1;
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border text-center font-mono font-bold text-sm transition-all duration-300 relative ${
                        isTop
                          ? 'bg-dustyrose text-garden-text border-dustyrose-500 shadow-md animate-pulse'
                          : 'bg-mistylavender/40 text-garden-text border-mistylavender'
                      }`}
                    >
                      {val}
                      {isTop && (
                        <span className="absolute -left-12 top-2 text-[10px] uppercase font-bold text-dustyrose-600">
                          Top ➔
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. QUEUE TAB */}
      {activeTab === 'queue' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Value..."
                value={queueInput}
                onChange={(e) => setQueueInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleEnqueue()}
                className="px-3 py-2 rounded-xl border border-garden-cardborder dark:border-garden-darkcardborder bg-garden-bg dark:bg-garden-darkbg text-sm w-28 focus:outline-none focus:ring-2 focus:ring-dustyrose"
              />
              <button
                onClick={handleEnqueue}
                className="px-3 py-2 rounded-xl bg-dustyrose text-garden-text font-semibold text-xs sm:text-sm hover:bg-dustyrose-400 transition-colors flex items-center gap-1"
              >
                <Plus size={16} /> Enqueue (Rear)
              </button>
              <button
                onClick={handleDequeue}
                className="px-3 py-2 rounded-xl bg-buttercream text-amber-950 font-semibold text-xs sm:text-sm hover:bg-buttercream-400 transition-colors flex items-center gap-1"
              >
                <Trash2 size={16} /> Dequeue (Front)
              </button>
            </div>
            <span className="text-xs sm:text-sm text-garden-secondary dark:text-garden-darksecondary">
              Status: <strong>{queueMessage}</strong>
            </span>
          </div>

          {/* Conveyor Visualizer */}
          <div className="h-64 sm:h-72 w-full bg-garden-bg/40 dark:bg-garden-darkbg/40 rounded-xl border border-garden-cardborder dark:border-garden-darkcardborder flex items-center justify-center p-6 overflow-x-auto">
            <div className="flex items-center gap-3 py-8 px-6 border-y-4 border-mistylavender-400 dark:border-mistylavender-600 bg-white/60 dark:bg-garden-darkcard/60 rounded-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-sagegreen">Front (Exit) ➔</span>
              {queueItems.length === 0 ? (
                <div className="px-8 text-xs text-garden-secondary italic">Queue is Empty</div>
              ) : (
                queueItems.map((val, idx) => (
                  <div
                    key={idx}
                    className={`px-5 py-4 rounded-xl border font-mono font-bold text-sm shadow-sm transition-all duration-300 flex flex-col items-center ${
                      idx === 0
                        ? 'bg-sagegreen text-white border-sagegreen-500'
                        : idx === queueItems.length - 1
                        ? 'bg-dustyrose text-garden-text border-dustyrose-500'
                        : 'bg-mistylavender/40 text-garden-text border-mistylavender'
                    }`}
                  >
                    <span>{val}</span>
                    <span className="text-[10px] font-sans opacity-80">
                      {idx === 0 ? 'Head' : idx === queueItems.length - 1 ? 'Tail' : `pos ${idx}`}
                    </span>
                  </div>
                ))
              )}
              <span className="text-xs font-bold uppercase tracking-wider text-dustyrose">➔ Rear (Entry)</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. LINKED LIST TAB */}
      {activeTab === 'linkedlist' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                placeholder="Value..."
                value={listInput}
                onChange={(e) => setListInput(e.target.value)}
                className="px-3 py-2 rounded-xl border border-garden-cardborder dark:border-garden-darkcardborder bg-garden-bg dark:bg-garden-darkbg text-sm w-28 focus:outline-none focus:ring-2 focus:ring-dustyrose"
              />
              <button
                onClick={handleInsertHead}
                className="px-3 py-2 rounded-xl bg-dustyrose text-garden-text font-semibold text-xs sm:text-sm hover:bg-dustyrose-400 transition-colors"
              >
                + Head
              </button>
              <button
                onClick={handleInsertTail}
                className="px-3 py-2 rounded-xl bg-softmauve text-white font-semibold text-xs sm:text-sm hover:bg-softmauve-400 transition-colors"
              >
                + Tail
              </button>
              <button
                onClick={handleSearchNode}
                className="px-3 py-2 rounded-xl bg-buttercream text-amber-950 font-semibold text-xs sm:text-sm hover:bg-buttercream-400 transition-colors flex items-center gap-1"
              >
                <Search size={14} /> Search
              </button>
            </div>
            <span className="text-xs sm:text-sm text-garden-secondary dark:text-garden-darksecondary">
              Status: <strong>{listMessage}</strong>
            </span>
          </div>

          {/* Linked nodes chain */}
          <div className="h-64 sm:h-72 w-full bg-garden-bg/40 dark:bg-garden-darkbg/40 rounded-xl border border-garden-cardborder dark:border-garden-darkcardborder flex items-center p-6 overflow-x-auto">
            <div className="flex items-center gap-3 min-w-max m-auto">
              <div className="px-2 py-1 rounded bg-dustyrose text-garden-text font-bold text-xs uppercase">HEAD</div>
              <ArrowRight size={18} className="text-garden-secondary" />

              {listNodes.map((val, idx) => (
                <React.Fragment key={idx}>
                  <div
                    className={`p-3 rounded-2xl border flex items-center gap-2 transition-all duration-300 relative group ${
                      highlightedNode === idx
                        ? 'bg-buttercream border-amber-400 shadow-md ring-2 ring-amber-300 scale-105'
                        : 'bg-white dark:bg-garden-darkcard border-garden-cardborder dark:border-garden-darkcardborder shadow-sm'
                    }`}
                  >
                    {/* Value cell */}
                    <div className="px-3 py-1 font-mono font-bold text-sm text-garden-text dark:text-garden-darktext">
                      {val}
                    </div>
                    {/* Next pointer badge */}
                    <div className="px-2 py-0.5 rounded-lg bg-mistylavender/40 text-[10px] font-mono text-garden-secondary">
                      next
                    </div>
                    {/* Delete button */}
                    <button
                      onClick={() => handleDeleteNode(idx)}
                      title="Delete Node"
                      className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-700 transition-opacity"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <ArrowRight size={20} className="text-mistylavender-500 dark:text-mistylavender-400" />
                </React.Fragment>
              ))}

              <div className="px-3 py-1.5 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-500 font-mono text-xs font-bold">
                NULL
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. HASH TABLE TAB */}
      {activeTab === 'hashtable' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Key (e.g. Lotus)..."
                value={hashKey}
                onChange={(e) => setHashKey(e.target.value)}
                className="px-3 py-2 rounded-xl border border-garden-cardborder dark:border-garden-darkcardborder bg-garden-bg dark:bg-garden-darkbg text-sm w-36 focus:outline-none focus:ring-2 focus:ring-dustyrose"
              />
              <input
                type="number"
                placeholder="Value..."
                value={hashVal}
                onChange={(e) => setHashVal(e.target.value)}
                className="px-3 py-2 rounded-xl border border-garden-cardborder dark:border-garden-darkcardborder bg-garden-bg dark:bg-garden-darkbg text-sm w-24 focus:outline-none focus:ring-2 focus:ring-dustyrose"
              />
              <button
                onClick={handleInsertHash}
                className="px-3 py-2 rounded-xl bg-dustyrose text-garden-text font-semibold text-xs sm:text-sm hover:bg-dustyrose-400 transition-colors"
              >
                Insert / Update (O(1))
              </button>
            </div>
            <span className="text-xs sm:text-sm text-garden-secondary dark:text-garden-darksecondary">
              Status: <strong>{hashMessage}</strong>
            </span>
          </div>

          {/* Buckets Grid */}
          <div className="w-full bg-garden-bg/40 dark:bg-garden-darkbg/40 rounded-xl border border-garden-cardborder dark:border-garden-darkcardborder p-6 flex flex-col gap-3">
            {Array.from({ length: TABLE_SIZE }).map((_, bucketIdx) => {
              const chain = buckets[bucketIdx] || [];
              return (
                <div key={bucketIdx} className="flex items-center gap-3 text-xs sm:text-sm">
                  {/* Bucket Index */}
                  <div className="w-24 px-3 py-2 rounded-xl bg-mistylavender text-garden-text font-mono font-bold text-center border border-mistylavender-400 shrink-0">
                    Bucket [{bucketIdx}]
                  </div>

                  <ArrowRight size={16} className="text-garden-secondary shrink-0" />

                  {/* Chained Linked Nodes */}
                  <div className="flex flex-wrap items-center gap-2">
                    {chain.length === 0 ? (
                      <span className="text-xs text-garden-secondary italic font-mono">empty</span>
                    ) : (
                      chain.map((pair, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-1.5">
                          <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-sm font-mono text-xs flex items-center gap-1.5">
                            <span className="font-bold text-dustyrose-600">{pair.key}:</span>
                            <span className="text-garden-text dark:text-garden-darktext">{pair.value}</span>
                          </div>
                          {pIdx < chain.length - 1 && (
                            <CornerDownRight size={14} className="text-mistylavender" />
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
