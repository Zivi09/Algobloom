# AlgoBloom 🌸
> **Learn algorithms. Bloom with confidence.**

AlgoBloom is a comprehensive, interactive computer science and algorithms learning platform designed with a sunset garden botanical aesthetic. It guides learners from complete computer science foundations (Level 0) to advanced algorithmic thinking (Level 14) through a structured curriculum, deterministic step-by-step visualizations, 5-question quizzes, personalized Relearn Mode, an interactive Playground, a Comparison Lab, and a flourishing gamified Learning Garden.

---

## 🎨 Official Sunset Garden Design System

- **Buttercream (`#FFE0AF`)**: Featured learning cards, comparing states, warm highlights
- **Dusty Rose (`#F1B4B1`)**: Primary action buttons, active pointers, swap animations
- **Soft Mauve (`#C6A8CE`)**: Secondary buttons, selected items, depth accents
- **Misty Lavender (`#C1BECE`)**: Desktop sidebar tint, unvisited vertices, neutral borders
- **Warm Taupe (`#C6BEA7`)**: Neutral cards, edge weight badges
- **Sage Green (`#939F7F`)**: Progress indicators, completed/sorted items, success states
- **Main Background (`#FFFAF7`)**: Warm off-white background with subtle botanical dot patterns
- **Twilight Garden (Dark Mode)**: Preserves the brand identity with deep plum `#18141F` and `#231D2C` cards

### Typography
- **Headings**: `Poppins`, sans-serif
- **Body**: `Inter`, sans-serif
- **Pseudocode & Code**: `Fira Code`, monospace

---

## 🧭 Platform Structure & Features

1. **Dashboard / Home**:
   - Personalized welcome & AlgoBuddy mascot greeting
   - Streak counter (`🔥`) & Total Garden XP (`✨`)
   - Continue Learning hero card with one-click **START LEARNING**
   - Core curriculum levels preview & Daily Challenge spotlight
2. **Learning Path**:
   - Structured 15-level roadmap from **Level 0 (Foundations)** to **Level 14 (Advanced CS)**
   - Expandable topic accordions with descriptions, badges, and direct lesson links
3. **Explore All Algorithms**:
   - Real-time search across titles, categories, and tags
   - Difficulty filters (*Beginner*, *Intermediate*, *Advanced*) and category tabs
4. **Data Structures**:
   - Interactive visualizers for **Stacks (LIFO)**, **Queues (FIFO)**, **Singly Linked Lists**, and **Hash Tables (Separate Chaining)**
   - Live push, pop, enqueue, dequeue, insert at head/tail, and hash bucket calculations
5. **Algorithm Playground**:
   - **Sorting Sandbox**: Generate random, nearly-sorted, or reverse arrays; step through Bubble, Selection, Insertion, Merge, and Quick Sort
   - **Graph Lab**: Run BFS, DFS, and Dijkstra on weighted networks with live queue/stack and distance tables
   - **Tree Lab**: Explore Binary Search Trees with search operations and Inorder/Preorder/Postorder traversals
   - **Search Lab**: Compare Linear vs Binary Search with target values
   - **DP Lab**: Watch Fibonacci and Coin Change 2D/1D DP tables fill in real-time
6. **Compare Algorithms Lab**:
   - Side-by-side synchronized races (Linear vs Binary, Bubble vs Merge, Merge vs Quick, BFS vs DFS, Memoization vs Tabulation)
   - Comparative metrics for time complexity, auxiliary memory, and trade-offs
7. **Daily Challenges**:
   - Rotating daily puzzles with scenarios, 4 options, hints from AlgoBuddy, and +50 XP rewards
8. **My Learning Garden 🌷**:
   - Gamified progress where starting a lesson plants a seed (`🌱`), completing a lesson grows a sprout (`🌿`), and scoring 5/5 blooms a flower (`🌸`, `🌹`, `🪷`, `🌻`, `🌷`, `🌼`)
   - Streaks attract butterflies (`🦋`) and honeybees (`🐝`)
9. **Revision Center**:
   - Automatically tracks incorrect quiz questions and concepts with scores < 4/5
   - One-click practice and bookmark manager
10. **Achievements**:
    - Distinctive botanical honors with XP rewards and flower unlocks
11. **Settings & Data**:
    - Sunset / Twilight theme toggle, visualizer playback speed, export/import JSON progress backup, and reset progress

---

## 📖 Universal 14-Section Algorithm Lesson Template

Every algorithm features a dedicated, comprehensive lesson page containing:
1. **Introduction**: Level, difficulty, category, estimated time, prerequisites, objectives
2. **Explain It Simply**: Plain English explanation + **"Explain Like I'm Five" (ELI5)** toggle
3. **Why Do We Need This?**: Problem solved, historical context, alternatives, when to use / avoid
4. **Real-Life Analogy**: Engaging everyday story and moral
5. **Step-by-Step Breakdown**: Numbered chronological phases
6. **Interactive Visualization**: Deterministic trace engine with Play, Pause, Prev, Next, Restart, and Speed controls
7. **Try It Yourself**: Modify input arrays or targets and run customized traces
8. **Pseudocode**: Active line highlighted in real-time sync with animation steps
9. **Multi-Language Code Implementations**: Production-grade, commented implementations in **Python**, **JavaScript**, **C++**, and **Java** with copy button
10. **Time & Space Complexity**: Best, average, worst, and auxiliary space with thorough mathematical derivations
11. **When to Use It**: Practical software engineering scenarios and recommendations
12. **Common Mistakes**: At least 3 beginner pitfalls, why they happen, and how to fix them
13. **5-Question Quiz Engine**: Definition, conceptual, step-by-step trace, practical, and complexity questions with immediate right/wrong feedback and full explanations
14. **Recap & Relearn Mode**: 5 key takeaways, terminology glossary, final challenge prompt, and **Relearn Mode** modal (alternative analogy, baby steps, worked micro-example, 3 mini practice questions, and AlgoBuddy encouragement)

---

## 🤖 AlgoBuddy Mascot & Botanical Tutor

AlgoBuddy is an original botanical companion with responsive emotional expressions (*Happy*, *Thinking*, *Confused*, *Excited*, *Celebrating*, *Encouraging*). The floating mascot opens the **"Ask AlgoBuddy"** tutor modal, capable of answering context-aware algorithmic questions, explaining Big O, providing everyday analogies, and cheering on the learner.

---

## 🚀 Running AlgoBloom

### Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```
Visit `http://localhost:5173` in your browser.
