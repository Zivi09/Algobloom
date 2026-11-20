import { getLessonById, ALL_LESSONS } from '../curriculum/lessons';
import { AlgorithmLesson } from '../types';

export interface TutorResponse {
  answer: string;
  expression: 'happy' | 'thinking' | 'confused' | 'excited' | 'celebrating' | 'encouraging';
  suggestedFollowUps?: string[];
  codeSnippet?: string;
}

/**
 * Smart Local Curriculum Engine for AlgoBuddy
 * Dynamically queries the rich curriculum database across all 15+ algorithms.
 * Works 100% locally in the browser with zero external network or LLM dependencies.
 */
export function getAlgoBuddyResponse(
  question: string,
  lessonId?: string,
  lessonTitle?: string
): TutorResponse {
  const q = question.toLowerCase().trim();

  // Find the active lesson (or look up by lessonId / fallback)
  let activeLesson: AlgorithmLesson | undefined = lessonId ? getLessonById(lessonId) : undefined;

  // If question mentions a specific algorithm name, switch focus to that algorithm
  const mentionedLesson = ALL_LESSONS.find(
    (l) =>
      q.includes(l.title.toLowerCase()) ||
      q.includes(l.id.replace(/-/g, ' ')) ||
      q.includes(l.id)
  );

  const targetLesson = mentionedLesson || activeLesson;

  // 1. General Greetings & Persona
  if (
    q.includes('hello') ||
    q.includes('hi') ||
    q.includes('hey') ||
    q.includes('who are you') ||
    q.includes('what can you do')
  ) {
    const greetingMsg = targetLesson
      ? `Hello petal! 🌸 I am AlgoBuddy, your botanical learning tutor! We are currently looking at **${targetLesson.title}** (${targetLesson.tagline}). Ask me about its time complexity, how it works, everyday analogies, code in Python/JS, or common mistakes!`
      : `Hello petal! 🌸 I am AlgoBuddy, your botanical learning companion! I can guide you through all 15 algorithms, explain Big O complexity, share real-life analogies, and walk you through code. What would you like to explore today?`;

    return {
      answer: greetingMsg,
      expression: 'happy',
      suggestedFollowUps: targetLesson
        ? [
            `What is the Big O of ${targetLesson.title}?`,
            `Give me an analogy for ${targetLesson.title}`,
            `Show me ${targetLesson.title} in Python`,
          ]
        : ['What is Big O complexity?', 'Explore Linear Search', 'Show me Sorting Algorithms'],
    };
  }

  // 2. Big O / Time & Space Complexity
  if (
    q.includes('big o') ||
    q.includes('complexity') ||
    q.includes('time complexity') ||
    q.includes('space complexity') ||
    q.includes('worst case') ||
    q.includes('best case') ||
    q.includes('average case') ||
    q.includes('runtime') ||
    q.includes('space')
  ) {
    if (targetLesson?.complexity) {
      const c = targetLesson.complexity;
      const snippet = `// Time Complexity:\n// • Best:    ${c.bestTime} (${c.bestReason})\n// • Average: ${c.averageTime} (${c.averageReason})\n// • Worst:   ${c.worstTime} (${c.worstReason})\n// Space Complexity:\n// • Space:   ${c.space} (${c.spaceReason})`;

      return {
        answer: `For **${targetLesson.title}**, here is the Big O breakdown:\n\n• **Best Case:** ${c.bestTime} — ${c.bestReason}\n• **Average Case:** ${c.averageTime} — ${c.averageReason}\n• **Worst Case:** ${c.worstTime} — ${c.worstReason}\n• **Space (Memory):** ${c.space} — ${c.spaceReason}`,
        expression: 'excited',
        codeSnippet: snippet,
        suggestedFollowUps: [
          `Why is the worst case ${c.worstTime}?`,
          `Give me an everyday analogy for ${targetLesson.title}`,
          `When should I use ${targetLesson.title}?`,
        ],
      };
    }

    return {
      answer:
        "Big O measures how algorithm runtime or memory grows as input size (n) increases! Think of it like plant growth:\n• **O(1)**: Instant\n• **O(log n)**: Fast growth that levels off (like Binary Search)\n• **O(n)**: Steady linear growth (like Linear Search)\n• **O(n log n)**: Efficient divide-and-conquer (like Merge Sort)\n• **O(n²)**: Rapidly grows tall and heavy (like Bubble Sort)",
      expression: 'happy',
      codeSnippet: '// Growth order: O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n)',
      suggestedFollowUps: ['Tell me about Linear Search complexity', 'What is O(log n)?', 'Why do we drop constants?'],
    };
  }

  // 3. Real-life Analogy / ELI5 / Simplified Explanation
  if (
    q.includes('analogy') ||
    q.includes('eli5') ||
    q.includes('simple terms') ||
    q.includes('simple') ||
    q.includes('like i am 5') ||
    q.includes('story') ||
    q.includes('metaphor')
  ) {
    if (targetLesson?.realLifeAnalogy) {
      const a = targetLesson.realLifeAnalogy;
      const eli5 = targetLesson.eli5 ? `\n\n🌱 **In simple words:** ${targetLesson.eli5}` : '';

      return {
        answer: `🌸 **${a.title}**\n\n${a.story}\n\n💡 **The Takeaway:** ${a.moral}${eli5}`,
        expression: 'excited',
        suggestedFollowUps: [
          `How does ${targetLesson.title} work step-by-step?`,
          `What is the time complexity?`,
          `Show me the code`,
        ],
      };
    }

    return {
      answer: `Think of algorithms like everyday gardening recipes: when you follow a clear set of repeatable instructions to plant, water, and prune, you get a beautiful bloom every time!`,
      expression: 'happy',
    };
  }

  // 4. How does it work / Step-by-Step Walkthrough / Explanation
  if (
    q.includes('how does it work') ||
    q.includes('how it works') ||
    q.includes('explain') ||
    q.includes('steps') ||
    q.includes('step by step') ||
    q.includes('how to') ||
    q.includes('what is') ||
    q.includes('tell me about')
  ) {
    if (targetLesson) {
      const intro = targetLesson.simpleExplanation || targetLesson.tagline;
      let stepsText = '';
      if (targetLesson.steps && targetLesson.steps.length > 0) {
        stepsText =
          '\n\n**Step-by-step flow:**\n' +
          targetLesson.steps
            .map((s, idx) => `**${idx + 1}. ${s.phase}:** ${s.description}`)
            .join('\n');
      }

      return {
        answer: `**${targetLesson.title}** (${targetLesson.difficulty} level):\n\n${intro}${stepsText}`,
        expression: 'thinking',
        suggestedFollowUps: [
          `What is the Big O of ${targetLesson.title}?`,
          `Give me an analogy`,
          `Show me the Python code`,
        ],
      };
    }
  }

  // 5. Code Implementation / Programming Languages
  if (
    q.includes('code') ||
    q.includes('python') ||
    q.includes('javascript') ||
    q.includes('cpp') ||
    q.includes('c++') ||
    q.includes('java') ||
    q.includes('implement') ||
    q.includes('pseudocode')
  ) {
    if (targetLesson?.code) {
      let lang: 'python' | 'javascript' | 'cpp' | 'java' = 'python';
      if (q.includes('javascript') || q.includes('js')) lang = 'javascript';
      else if (q.includes('cpp') || q.includes('c++')) lang = 'cpp';
      else if (q.includes('java') && !q.includes('javascript')) lang = 'java';

      const code = targetLesson.code[lang] || targetLesson.code.python;
      return {
        answer: `Here is the clean ${lang.toUpperCase()} implementation for **${targetLesson.title}**:`,
        expression: 'excited',
        codeSnippet: code,
        suggestedFollowUps: [
          `Show in ${lang === 'python' ? 'JavaScript' : 'Python'}`,
          `What is the time complexity?`,
          `What are common bugs?`,
        ],
      };
    }
  }

  // 6. When to Use / When to Avoid / Alternatives
  if (
    q.includes('when to use') ||
    q.includes('when should i use') ||
    q.includes('why use') ||
    q.includes('avoid') ||
    q.includes('alternative') ||
    q.includes('compare') ||
    q.includes('versus') ||
    q.includes('vs')
  ) {
    if (targetLesson?.whyNeeded) {
      const w = targetLesson.whyNeeded;
      const whenTo = w.whenToUse.map((item) => `• ${item}`).join('\n');
      const whenAvoid = w.whenToAvoid.map((item) => `• ${item}`).join('\n');
      const alts = w.alternatives ? `\n\n🔄 **Alternatives:** ${w.alternatives.join(', ')}` : '';

      return {
        answer: `**When to use ${targetLesson.title}:**\n${whenTo}\n\n⚠️ **When to avoid it:**\n${whenAvoid}${alts}`,
        expression: 'thinking',
        suggestedFollowUps: [
          `What is the Big O complexity?`,
          `Give me an analogy`,
          `Show me the code`,
        ],
      };
    }
  }

  // 7. Common Mistakes / Bugs / Gotchas
  if (
    q.includes('mistake') ||
    q.includes('bug') ||
    q.includes('gotcha') ||
    q.includes('pitfall') ||
    q.includes('common error') ||
    q.includes('trap')
  ) {
    if (targetLesson?.commonMistakes && targetLesson.commonMistakes.length > 0) {
      const mistakesText = targetLesson.commonMistakes
        .map(
          (m, idx) =>
            `**${idx + 1}. ${m.mistake}**\n• *Why it happens:* ${m.whyItHappens}\n• *How to fix:* ${m.howToFix}`
        )
        .join('\n\n');

      return {
        answer: `Here are the most common pitfalls learners encounter with **${targetLesson.title}**:\n\n${mistakesText}`,
        expression: 'encouraging',
        suggestedFollowUps: [
          `How does ${targetLesson.title} work?`,
          `Show me the implementation`,
          `What is the time complexity?`,
        ],
      };
    }
  }

  // 8. Stuck / Confused / Help
  if (
    q.includes('help') ||
    q.includes('stuck') ||
    q.includes('confused') ||
    q.includes('dont get') ||
    q.includes("don't get") ||
    q.includes('dont understand') ||
    q.includes("don't understand") ||
    q.includes('hard')
  ) {
    const encouragement = targetLesson
      ? `Don't worry, little sprout! 🌱 ${targetLesson.title} takes practice to take root. Would you like me to share an everyday story analogy, break down the steps, or show the code?`
      : `Don't worry, little sprout! 🌱 Computer science concepts take time to blossom. Try stepping through the visualizer above, or ask me for an everyday analogy!`;

    return {
      answer: encouragement,
      expression: 'encouraging',
      suggestedFollowUps: targetLesson
        ? [
            `Give me an analogy for ${targetLesson.title}`,
            `Break ${targetLesson.title} into steps`,
            `Show me ${targetLesson.title} in Python`,
          ]
        : ['What is Big O?', 'Explain Linear Search', 'Explain Binary Search'],
    };
  }

  // 9. Intelligent fallback with lesson context
  if (targetLesson) {
    return {
      answer: `Great question about **${targetLesson.title}**! ${targetLesson.simpleExplanation}\n\nWhat specific part would you like to explore?`,
      expression: 'happy',
      suggestedFollowUps: [
        `What is the Big O of ${targetLesson.title}?`,
        `Give me an analogy for ${targetLesson.title}`,
        `Show me ${targetLesson.title} code`,
        `What are common mistakes?`,
      ],
    };
  }

  // Default general fallback
  return {
    answer:
      `I'm delighted you asked! In computer science, always start by identifying the input size (n) and the core goal. What algorithm or data structure are you curious about today? 🌸`,
    expression: 'happy',
    suggestedFollowUps: [
      'What is Big O complexity?',
      'How does Linear Search work?',
      'How does Binary Search work?',
      'Compare Merge Sort vs Quick Sort',
    ],
  };
}

/**
 * Hybrid LLM Query: Checks if user configured an optional Gemini API Key;
 * if so, queries Gemini 2.0 Flash with botanical persona and active lesson context.
 * If offline or no key, falls back seamlessly to the Smart Local Curriculum Engine.
 */
export async function queryAlgoBuddy(
  question: string,
  lessonId?: string,
  lessonTitle?: string
): Promise<TutorResponse> {
  const localResp = getAlgoBuddyResponse(question, lessonId, lessonTitle);

  try {
    const apiKey = localStorage.getItem('algobloom_gemini_api_key')?.trim();
    if (!apiKey) {
      return localResp;
    }

    const activeLesson = lessonId ? getLessonById(lessonId) : undefined;
    const targetTitle = activeLesson?.title || lessonTitle || 'General Algorithms';

    const systemPrompt = `You are AlgoBuddy, a warm, encouraging botanical computer science tutor for AlgoBloom.
Current Context: ${targetTitle}.
Complexity: ${JSON.stringify(activeLesson?.complexity || {})}.
Real-life Analogy: ${activeLesson?.realLifeAnalogy?.title || ''}: ${activeLesson?.realLifeAnalogy?.story || ''}.
Tone: Friendly, concise, clear, botanical metaphors (🌸, 🌱, petals). Keep response under 150 words.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemPrompt}\n\nStudent Question: ${question}` }],
            },
          ],
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return {
          answer: text,
          expression: 'excited',
          suggestedFollowUps: localResp.suggestedFollowUps,
        };
      }
    }
  } catch (err) {
    // Offline or network error: fallback safely to local engine
    console.warn('Gemini query fell back to Local Curriculum Engine:', err);
  }

  return localResp;
}
