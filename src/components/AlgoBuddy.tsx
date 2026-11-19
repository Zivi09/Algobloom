import React, { useState } from 'react';
import { MessageSquare, Sparkles, X, Send, HelpCircle, Heart } from 'lucide-react';
import { getAlgoBuddyResponse, TutorResponse } from '../services/algoBuddyTutor';

interface AlgoBuddyProps {
  currentLessonId?: string;
  currentLessonTitle?: string;
  mood?: 'happy' | 'thinking' | 'confused' | 'excited' | 'celebrating' | 'encouraging';
  customGreeting?: string;
}

export const AlgoBuddy: React.FC<AlgoBuddyProps> = ({
  currentLessonId,
  currentLessonTitle,
  mood = 'happy',
  customGreeting,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuestion, setInputQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<
    { sender: 'user' | 'buddy'; text: string; code?: string; expression?: string }[]
  >([
    {
      sender: 'buddy',
      text:
        customGreeting ||
        `Hello petal! 🌸 I'm AlgoBuddy! Ask me anything about ${
          currentLessonTitle || 'algorithms, data structures, or Big O complexity'
        }. Let's make computer science bloom together!`,
      expression: mood,
    },
  ]);

  const handleSend = (textToSend?: string) => {
    const q = textToSend || inputQuestion;
    if (!q.trim()) return;

    // Add user message
    const updatedHistory = [...chatHistory, { sender: 'user' as const, text: q }];
    setChatHistory(updatedHistory);
    setInputQuestion('');

    // Get buddy answer
    const resp: TutorResponse = getAlgoBuddyResponse(q, currentLessonId, currentLessonTitle);
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: 'buddy',
          text: resp.answer,
          code: resp.codeSnippet,
          expression: resp.expression,
        },
      ]);
    }, 400);
  };

  // Botanical Face Avatar with expressive features
  const renderBuddyFace = (expr: string = mood, size = 48) => {
    let mouth = <path d="M 18 28 Q 24 33 30 28" stroke="#403746" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
    let eyes = (
      <>
        <circle cx="17" cy="20" r="2.5" fill="#403746" />
        <circle cx="31" cy="20" r="2.5" fill="#403746" />
      </>
    );

    if (expr === 'excited' || expr === 'celebrating') {
      mouth = <path d="M 16 26 Q 24 36 32 26 Z" fill="#E78E89" stroke="#403746" strokeWidth="2" />;
      eyes = (
        <>
          <path d="M 14 20 Q 17 16 20 20" stroke="#403746" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 28 20 Q 31 16 34 20" stroke="#403746" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      );
    } else if (expr === 'thinking') {
      mouth = <path d="M 19 28 L 29 28" stroke="#403746" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
      eyes = (
        <>
          <circle cx="17" cy="18" r="2.5" fill="#403746" />
          <circle cx="31" cy="18" r="2.5" fill="#403746" />
        </>
      );
    } else if (expr === 'confused') {
      mouth = <path d="M 18 30 Q 24 26 30 30" stroke="#403746" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
      eyes = (
        <>
          <circle cx="17" cy="20" r="2" fill="#403746" />
          <circle cx="31" cy="19" r="3" fill="#403746" />
        </>
      );
    } else if (expr === 'encouraging') {
      mouth = <path d="M 17 27 Q 24 33 31 27" stroke="#403746" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
      eyes = (
        <>
          <circle cx="17" cy="20" r="2.5" fill="#403746" />
          <circle cx="31" cy="20" r="2.5" fill="#403746" />
        </>
      );
    }

    return (
      <svg width={size} height={size} viewBox="0 0 48 48" className="select-none filter drop-shadow-sm">
        {/* Flower Petals */}
        <g fill="#F1B4B1">
          <circle cx="24" cy="7" r="7" />
          <circle cx="38" cy="15" r="7" />
          <circle cx="38" cy="33" r="7" />
          <circle cx="24" cy="41" r="7" />
          <circle cx="10" cy="33" r="7" />
          <circle cx="10" cy="15" r="7" />
        </g>
        {/* Little green leaves */}
        <path d="M 24 40 Q 28 47 34 44 Q 28 43 24 40" fill="#939F7F" />
        <path d="M 24 40 Q 20 47 14 44 Q 20 43 24 40" fill="#939F7F" />
        {/* Flower Center Face */}
        <circle cx="24" cy="24" r="14" fill="#FFE0AF" stroke="#EBB45B" strokeWidth="1.5" />
        {/* Rosy Cheeks */}
        <ellipse cx="14" cy="24" rx="2.5" ry="1.5" fill="#F1B4B1" opacity="0.8" />
        <ellipse cx="34" cy="24" rx="2.5" ry="1.5" fill="#F1B4B1" opacity="0.8" />
        {/* Facial Expression */}
        {eyes}
        {mouth}
      </svg>
    );
  };

  return (
    <>
      {/* Floating Mascot Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {/* Speech Bubble Tooltip when closed */}
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="mb-2 px-3 py-1.5 rounded-2xl bg-white dark:bg-garden-darkcard border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden text-xs font-semibold text-garden-text dark:text-garden-darktext flex items-center gap-1.5 cursor-pointer animate-float hover:scale-105 transition-all"
          >
            <Sparkles size={13} className="text-dustyrose" />
            <span>Ask AlgoBuddy!</span>
          </div>
        )}

        {/* Mascot Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Ask AlgoBuddy"
          className="relative group p-1.5 rounded-full bg-white dark:bg-garden-darkcard border-2 border-dustyrose shadow-garden-lg hover:scale-110 active:scale-95 transition-all duration-300"
        >
          {renderBuddyFace(mood, 52)}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-sagegreen rounded-full border-2 border-white dark:border-garden-darkcard flex items-center justify-center text-[9px] text-white font-bold">
            ✓
          </span>
        </button>
      </div>

      {/* Tutor Modal / Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:pr-8 p-4 bg-black/30 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-garden-darkcard rounded-3xl border border-garden-cardborder dark:border-garden-darkcardborder shadow-garden-lg flex flex-col h-[520px] max-h-[85vh] overflow-hidden">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-buttercream/40 via-dustyrose/30 to-softmauve/30 dark:from-buttercream/10 dark:via-dustyrose/10 dark:to-softmauve/10 border-b border-garden-cardborder dark:border-garden-darkcardborder flex items-center justify-between">
              <div className="flex items-center gap-3">
                {renderBuddyFace(mood, 38)}
                <div>
                  <h3 className="font-heading font-bold text-sm text-garden-text dark:text-garden-darktext flex items-center gap-1.5">
                    AlgoBuddy
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-sagegreen/20 text-sagegreen-500 font-sans font-semibold">
                      Online Tutor
                    </span>
                  </h3>
                  <p className="text-[11px] text-garden-secondary dark:text-garden-darksecondary">
                    {currentLessonTitle ? `Context: ${currentLessonTitle}` : 'Your botanical computer science guide'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-garden-secondary hover:text-garden-text hover:bg-garden-bg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 text-xs sm:text-sm">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'buddy' && (
                    <div className="shrink-0 mt-0.5">{renderBuddyFace(msg.expression || 'happy', 26)}</div>
                  )}
                  <div
                    className={`p-3 rounded-2xl max-w-[82%] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-dustyrose text-garden-text rounded-tr-none'
                        : 'bg-garden-bg dark:bg-garden-darkbg border border-garden-cardborder dark:border-garden-darkcardborder text-garden-text dark:text-garden-darktext rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    {msg.code && (
                      <pre className="mt-2 p-2 rounded-lg bg-black/10 dark:bg-black/30 font-mono text-[11px] overflow-x-auto text-garden-text dark:text-garden-darktext">
                        <code>{msg.code}</code>
                      </pre>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Suggestions Chips */}
            <div className="px-4 py-2 border-t border-garden-cardborder/60 dark:border-garden-darkcardborder/60 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
              {[
                'Big O complexity?',
                'Give me an analogy',
                'Why does this work?',
                'Common mistakes',
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip)}
                  className="px-2.5 py-1 rounded-full bg-garden-bg dark:bg-garden-darkbg border border-garden-cardborder dark:border-garden-darkcardborder text-garden-secondary dark:text-garden-darksecondary hover:text-garden-text hover:border-dustyrose whitespace-nowrap transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <div className="p-3 border-t border-garden-cardborder dark:border-garden-darkcardborder bg-white dark:bg-garden-darkcard flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask AlgoBuddy a question..."
                value={inputQuestion}
                onChange={(e) => setInputQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 px-4 py-2 rounded-xl bg-garden-bg dark:bg-garden-darkbg border border-garden-cardborder dark:border-garden-darkcardborder text-xs sm:text-sm text-garden-text dark:text-garden-darktext focus:outline-none focus:ring-2 focus:ring-dustyrose"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputQuestion.trim()}
                className="p-2.5 rounded-xl bg-dustyrose text-garden-text hover:bg-dustyrose-400 disabled:opacity-40 transition-colors"
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
