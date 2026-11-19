import { AlgorithmLesson } from '../../types';

export const whatIsAlgorithmLesson: AlgorithmLesson = {
  id: 'what-is-an-algorithm',
  title: 'What is an Algorithm?',
  tagline: 'The recipe for digital thought',
  difficulty: 'Beginner',
  category: 'Foundations',
  level: 0,
  estimatedMinutes: 10,
  flowerType: 'daisy',
  prerequisites: ['Curiosity', 'Basic reading ability'],
  objectives: [
    'Demystify what an algorithm is in plain English',
    'Understand the four essential properties of any algorithm: inputs, definiteness, finiteness, and outputs',
    'Differentiate between an algorithm, pseudocode, and an executable program',
    'Recognize algorithms you perform every single day in real life',
  ],

  simpleExplanation:
    'An algorithm is simply an unambiguous, step-by-step set of instructions designed to accomplish a specific goal or solve a problem. It takes some input, performs a sequence of clear operations, and produces an output. A cooking recipe for baking lavender shortbread, the instructions to fold an origami crane, or the steps to tie your shoelaces are all real-world algorithms!',
  eli5:
    'Think of baking cookies with your grandmother. The recipe says: 1. Put flour in a bowl. 2. Add sugar. 3. Stir. 4. Bake for 10 minutes. If you follow those steps in order, you get delicious cookies every single time! A computer is just like a baker who follows recipes super fast without making mistakes. That recipe is called an algorithm.',

  whyNeeded: {
    problemSolved:
      'Transforming chaotic, human real-world goals into deterministic, repeatable steps that machines can execute.',
    historicalContext:
      'The word "algorithm" honors the 9th-century Persian polymath and mathematician Muhammad ibn Musa al-Khwarizmi, whose pioneering texts introduced systematic methods for solving linear and quadratic equations.',
    alternatives: ['Brute-force guessing', 'Manual ad-hoc trial and error', 'Randomized trial'],
    whenToUse: [
      'Whenever a task needs to be performed reliably, repeatedly, and accurately by a computer',
      'Automating complex processes (sorting, pathfinding, compressing files, encrypting messages)',
    ],
    whenToAvoid: [
      'Ambiguous, ill-defined aesthetic questions where there is no objective definition of success',
    ],
  },

  realLifeAnalogy: {
    title: 'The Morning Tea Ritual',
    story:
      'Every morning, the garden master brews rosehip tea: 1. Fill kettle with 500ml cold water. 2. Heat until water reaches 95°C. 3. Place 2 spoonfuls of dried rose petals into teapot. 4. Pour water into pot. 5. Wait exactly 4 minutes. 6. Pour tea through strainer into cup. Notice how every step is clear, ordered, and produces a perfect cup every time.',
    moral:
      'An algorithm turns uncertainty into guaranteed, repeatable results.',
  },

  steps: [
    {
      phase: 'Step 1: Input Specification',
      description: 'Clearly define what information enters the algorithm.',
      details: 'e.g., An unsorted list of flower heights.',
    },
    {
      phase: 'Step 2: Definite Steps',
      description: 'Each instruction must be clear and unambiguous.',
      details: 'Computers cannot guess: "stir until it feels right" is invalid; "stir for 30 seconds" is definite.',
    },
    {
      phase: 'Step 3: Guaranteed Termination (Finiteness)',
      description: 'The algorithm must eventually stop after a finite number of operations.',
      details: 'Infinite loops that never terminate are not valid algorithms.',
    },
    {
      phase: 'Step 4: Output Delivery',
      description: 'Produce the intended result matching the problem specification.',
      details: 'e.g., The list sorted in ascending order.',
    },
  ],

  defaultInput: { sample: 'Baking Tea' },

  pseudocode: [
    { line: 1, code: 'Algorithm MakeTea(teaType, waterAmount):', explanation: 'Define inputs' },
    { line: 2, code: '  BoilWater(waterAmount, 95)', explanation: 'Unambiguous step 1' },
    { line: 3, code: '  AddTeaLeaves(teaType)', explanation: 'Unambiguous step 2' },
    { line: 4, code: '  WaitMinutes(4)', explanation: 'Unambiguous step 3' },
    { line: 5, code: '  return PouredCup', explanation: 'Guaranteed output' },
  ],

  code: {
    python: `def make_tea(tea_type, water_ml):
    """
    An algorithm modeled as a Python function.
    Input: tea_type (str), water_ml (int)
    Output: ready_tea (str)
    """
    water = f"Boiled {water_ml}ml of water at 95°C"
    steeped = f"Steeped {tea_type} for 4 minutes"
    ready_tea = f"A soothing cup of {tea_type} tea!"
    return ready_tea

# Example:
print(make_tea("Rosehip", 500))`,

    javascript: `function makeTea(teaType, waterMl) {
  // Input validation
  if (waterMl <= 0) return "Not enough water!";

  // Step-by-step transformation
  const boiled = \`Boiled \${waterMl}ml at 95°C\`;
  const steeped = \`Steeped \${teaType} for 4 minutes\`;
  
  // Guaranteed output
  return \`Fresh hot cup of \${teaType} tea!\`;
}

console.log(makeTea("Rosehip", 500));`,

    cpp: `#include <iostream>
#include <string>

std::string makeTea(const std::string& teaType, int waterMl) {
    if (waterMl <= 0) return "Error: No water";
    return "A fresh cup of " + teaType + " tea!";
}

int main() {
    std::cout << makeTea("Rosehip", 500) << std::endl;
    return 0;
}`,

    java: `public class TeaAlgorithm {
    public static String makeTea(String teaType, int waterMl) {
        if (waterMl <= 0) return "Error: No water";
        return "A fresh cup of " + teaType + " tea!";
    }

    public static void main(String[] args) {
        System.out.println(makeTea("Rosehip", 500));
    }
}`,
  },

  complexity: {
    bestTime: 'O(1)',
    bestReason: 'A fixed sequence of finite steps takes constant time.',
    averageTime: 'O(1)',
    averageReason: 'Fixed execution path.',
    worstTime: 'O(1)',
    worstReason: 'Fixed execution path.',
    space: 'O(1)',
    spaceReason: 'Only local parameters are retained.',
    auxiliarySpace: 'O(1)',
  },

  whenToUsePractical: [
    {
      scenario: 'Writing software to solve any logical task',
      reason: 'Computers require explicit, unambiguous algorithmic steps.',
      recommendation: 'Always plan the algorithm on paper or pseudocode before writing code.',
    },
  ],

  commonMistakes: [
    {
      mistake: 'Confusing an algorithm with a programming language',
      whyItHappens: 'Thinking Python or Java IS the algorithm. An algorithm is the abstract mathematical idea; Python is just the ink used to write it down.',
      howToFix: 'Remember: the recipe is the algorithm; whether it is written in English, French, or Python does not change the recipe.',
    },
    {
      mistake: 'Leaving steps ambiguous',
      whyItHappens: 'Writing "find the best flower" without defining what "best" means (tallest? brightest? rarest?).',
      howToFix: 'Ensure every instruction has a precise mathematical or logical definition.',
    },
    {
      mistake: 'Creating infinite loops that never terminate',
      whyItHappens: 'Forgetting an exit condition on a loop means the program runs forever, violating finiteness.',
      howToFix: 'Every valid algorithm must be guaranteed to terminate in finite steps.',
    },
  ],

  quiz: [
    {
      id: 'wa-q1',
      type: 'definition',
      question: 'What is the most accurate definition of an algorithm in computer science?',
      options: [
        'A precise, step-by-step sequence of unambiguous instructions designed to solve a problem and terminate in finite time',
        'A high-end graphics processing card used for video games',
        'Any random guess generated by artificial intelligence',
        'A file saved on a USB thumb drive',
      ],
      correctIndex: 0,
      explanation:
        'An algorithm is defined by its precision, definiteness, finiteness, input handling, and output delivery.',
      whyWrong: [
        'Graphics cards are hardware, not algorithms.',
        'Random guesses lack definiteness and guaranteed correctness.',
        'A USB file is a storage artifact, not an active procedure.',
      ],
      miniExample: 'A recipe: 1. Do A. 2. Do B. 3. Finish.',
    },
    {
      id: 'wa-q2',
      type: 'conceptual',
      question: 'Can the same algorithm be written in multiple different programming languages?',
      options: [
        'Yes! The algorithm is the abstract concept; Python, JavaScript, and C++ are just different ways to write it',
        'No, each algorithm can only ever exist in one language',
        'Only if the computer is turned off',
        'No, algorithms only exist in machine bytecode',
      ],
      correctIndex: 0,
      explanation:
        'Just like a story can be translated into English, Spanish, or Japanese without changing the plot, an algorithm can be implemented in Python, C++, or JavaScript.',
      whyWrong: [
        'Algorithms are language-agnostic concepts.',
        'Machine state does not limit concept portability.',
        'Bytecode is machine representation; algorithms exist even on paper.',
      ],
    },
    {
      id: 'wa-q3',
      type: 'step-by-step',
      question: 'Which of the following instructions violates the requirement of "definiteness" in an algorithm?',
      options: [
        '"Add a little bit of sugar until it feels sweet"',
        '"Add exactly 10 grams of sugar"',
        '"Repeat loop 5 times"',
        '"If temperature > 100, turn off heater"',
      ],
      correctIndex: 0,
      explanation:
        '"A little bit" and "until it feels sweet" are subjective and ambiguous; a machine cannot interpret feelings.',
      whyWrong: [
        '10 grams is exact and measurable.',
        '5 times is a precise loop count.',
        'temperature > 100 is an unambiguous boolean condition.',
      ],
    },
    {
      id: 'wa-q4',
      type: 'practical',
      question: 'What is "pseudocode"?',
      options: [
        'Informal, human-readable structured English used to plan algorithm logic without worrying about syntax rules',
        'A fake virus designed to hack computers',
        'A secret spy language',
        'Broken code that produces compiler errors',
      ],
      correctIndex: 0,
      explanation:
        'Pseudocode bridges human thought and computer syntax: it lets developers design algorithms clearly before implementing them.',
      whyWrong: [
        'Pseudocode has nothing to do with malware.',
        'It is an educational and engineering tool, not espionage.',
        'It is intentionally non-executable, not broken code.',
      ],
    },
    {
      id: 'wa-q5',
      type: 'complexity',
      question: 'Why must every algorithm guarantee "finiteness"?',
      options: [
        'Because an instruction set that runs forever without stopping can never return an answer to the user',
        'Because computers only have 1 hour of battery',
        'Because algorithms must fit on one sheet of paper',
        'Because programming languages only allow 50 lines of code',
      ],
      correctIndex: 0,
      explanation:
        'If a process never terminates, it can never produce a final answer or complete its mission.',
      whyWrong: [
        'Battery duration does not define theoretical computer science.',
        'Algorithms can span thousands of lines if needed.',
        'Code length is not restricted to 50 lines.',
      ],
    },
  ],

  recap: {
    takeaways: [
      'An algorithm is a step-by-step recipe to solve a specific problem.',
      'Must have clear inputs, definite steps, finite execution, and outputs.',
      'Independent of any programming language (Python, JS, C++ are just media).',
      'Pseudocode lets you design logic without syntax distraction.',
      'You use algorithms every day in cooking, morning routines, and navigation.',
    ],
    keyTerms: [
      { term: 'Definiteness', definition: 'Every operation must be unambiguous and rigorously defined.' },
      { term: 'Finiteness', definition: 'The guarantee that an algorithm halts after a countable number of steps.' },
      { term: 'Pseudocode', definition: 'Informal structured outline of code used for algorithm design.' },
    ],
    finalChallengePrompt: 'Can you write pseudocode for the algorithm of making a peanut butter sandwich?',
  },

  relearn: {
    conceptKey: 'what-is-algorithm-basics',
    simplifiedTitle: 'The Cookie Recipe',
    differentAnalogy:
      'Imagine your grandmother gives you a secret cookie recipe on an index card. It says: 1. Put butter in bowl. 2. Add sugar. 3. Stir 20 times. 4. Bake for 12 minutes. That card is an Algorithm! If you follow it, you get delicious cookies. If you leave out step 4, you get raw dough. Computers are just super-fast helpers who follow recipes step by step without skipping anything!',
    babySteps: [
      '1. Start with ingredients (Inputs).',
      '2. Follow numbered instructions in order (Steps).',
      '3. Make sure every step is crystal clear (No guessing!).',
      '4. Finish the job and stop (Finiteness).',
      '5. Enjoy your baked cookies (Output)!',
    ],
    workedExample:
      'Algorithm: Put on shoes.\n- Step 1: Put on left sock.\n- Step 2: Put on right sock.\n- Step 3: Put on left shoe.\n- Step 4: Put on right shoe.\n- Step 5: Tie laces.\nResult: Ready to walk outside!',
    miniPractice: [
      {
        id: 'wa-mini-1',
        type: 'definition',
        question: 'Is a cooking recipe an algorithm?',
        options: [
          'Yes! It is step-by-step instructions to make food',
          'No, algorithms are only made of metal',
          'Only if you cook on a computer',
          'Only if the recipe has math formulas',
        ],
        correctIndex: 0,
        explanation: 'A cooking recipe is the classic real-world example of an algorithm!',
      },
      {
        id: 'wa-mini-2',
        type: 'conceptual',
        question: 'What happens if a step says "bake for some time" instead of "bake for 10 minutes"?',
        options: [
          'The computer will get confused because "some time" is not exact!',
          'It will bake perfectly',
          'The kitchen will turn purple',
          'The computer will eat the cookie',
        ],
        correctIndex: 0,
        explanation: 'Computers cannot guess what "some time" means—they need exact instructions!',
      },
      {
        id: 'wa-mini-3',
        type: 'step-by-step',
        question: 'Can you write an algorithm on a piece of paper with a pencil?',
        options: [
          'Yes! Algorithms are ideas, not physical machines',
          'No, pencil lead breaks algorithms',
          'Only if you write in robot voice',
          'No, you must have an internet connection',
        ],
        correctIndex: 0,
        explanation: 'Algorithms existed on paper thousands of years before electronic computers were invented!',
      },
    ],
    buddyEncouragement:
      "You have been using algorithms your whole life without even knowing it! From waking up to brushing your teeth, you are a natural algorithmic master. Welcome to AlgoBloom! 🌸",
  },
};
