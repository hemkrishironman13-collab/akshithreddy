import React, { useState } from 'react';
import {
  Trophy,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Sparkles,
  Skull,
  ShieldCheck
} from 'lucide-react';

/* ================= TYPES ================= */

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

/* ================= AI SERVICE (INLINE) ================= */

const geminiService = {
  async generateQuiz(difficulty: 'easy' | 'hard'): Promise<QuizQuestion[]> {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ difficulty })
    });

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error('Invalid AI response');
    }

    return data;
  }
};

/* ================= COMPONENT ================= */

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'hard'>('easy');

  /* ================= LOAD QUIZ (RETRY LOGIC) ================= */

  const loadQuiz = async (selectedDiff?: 'easy' | 'hard') => {
    const activeDiff = selectedDiff || difficulty;

    setLoading(true);
    setStarted(true);
    setIsFinished(false);
    setCurrentIdx(0);
    setScore(0);
    setSelectedOption(null);
    setShowExplanation(false);

    let attempts = 0;
    let success = false;

    while (attempts < 2 && !success) {
      try {
        attempts++;
        const q = await geminiService.generateQuiz(activeDiff);

        if (!Array.isArray(q) || q.length === 0) {
          throw new Error('AI returned empty quiz');
        }

        setQuestions(q);
        success = true;
      } catch (err) {
        console.error(`AI attempt ${attempts} failed`, err);
        if (attempts >= 2) {
          alert('AI failed to generate quiz. Please try again.');
          setStarted(false);
        }
      }
    }

    setLoading(false);
  };

  /* ================= QUIZ LOGIC ================= */

  const handleSelect = (option: string) => {
    if (selectedOption) return;
    setSelectedOption(option);
    setShowExplanation(true);
    if (option === questions[currentIdx].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  /* ================= START SCREEN ================= */

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-10">
        <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto">
          <Sparkles size={48} className="text-white" />
        </div>

        <h2 className="text-4xl font-black text-white uppercase italic">
          Security Awareness Challenge
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => { setDifficulty('easy'); loadQuiz('easy'); }}
            className="glass-panel p-8 rounded-[2.5rem]"
          >
            <ShieldCheck className="text-indigo-400 mb-3" />
            <h3 className="text-xl font-black text-white">Guardian Mode</h3>
          </button>

          <button
            onClick={() => { setDifficulty('hard'); loadQuiz('hard'); }}
            className="glass-panel p-8 rounded-[2.5rem]"
          >
            <Skull className="text-red-400 mb-3" />
            <h3 className="text-xl font-black text-white">Architect Mode</h3>
          </button>
        </div>
      </div>
    );
  }

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-indigo-500" size={64} />
        <p className="text-white mt-4 font-bold">Nexus AI is thinking…</p>
      </div>
    );
  }

  /* ================= FINISHED ================= */

  if (isFinished) {
    return (
      <div className="max-w-xl mx-auto glass-panel p-12 rounded-[3rem] text-center">
        <Trophy className="text-indigo-400 mx-auto mb-6" size={48} />
        <h2 className="text-4xl font-black text-white">Evaluation Complete</h2>
        <p className="text-gray-400 mt-2">
          Score: {score} / {questions.length}
        </p>

        <button
          onClick={() => setStarted(false)}
          className="mt-8 bg-white/10 text-white px-6 py-3 rounded-xl"
        >
          <RotateCcw size={18} /> Restart
        </button>
      </div>
    );
  }

  const currentQ = questions[currentIdx];

  /* ================= QUESTION ================= */

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="glass-panel p-8 rounded-[2rem]">
        <h3 className="text-xl text-white italic">
          {currentQ.question}
        </h3>
      </div>

      <div className="grid gap-4">
        {currentQ.options.map((option, idx) => {
          const isCorrect = option === currentQ.correctAnswer;
          const isSelected = option === selectedOption;

          return (
            <button
              key={idx}
              onClick={() => handleSelect(option)}
              disabled={!!selectedOption}
              className={`p-6 rounded-2xl border ${
                isSelected
                  ? isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'
                  : 'bg-white/5'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className="glass-panel p-6 rounded-2xl">
          <BookOpen className="text-indigo-400 mb-2" />
          <p className="text-gray-400 italic">
            {currentQ.explanation}
          </p>

          <button
            onClick={nextQuestion}
            className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-xl"
          >
            Next <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;