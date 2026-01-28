
import React, { useState, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { QuizQuestion } from '../types';
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
  Zap,
  Skull,
  ShieldCheck
} from 'lucide-react';

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

  const loadQuiz = async (selectedDiff?: 'easy' | 'hard') => {
    const activeDiff = selectedDiff || difficulty;
    setLoading(true);
    setStarted(true);
    setIsFinished(false);
    setCurrentIdx(0);
    setScore(0);
    setSelectedOption(null);
    setShowExplanation(false);
    try {
      const q = await geminiService.generateQuiz(activeDiff);
      setQuestions(q);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-10 animate-reveal">
        <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-600/40 rotate-12 transition-transform hover:rotate-0">
          <Sparkles size={48} className="text-white" />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">Security Awareness Challenge</h2>
          <p className="text-gray-400 font-medium max-w-md mx-auto">
            Test your cybersecurity reflexes. Choose your authorization level to begin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          {/* Easy Mode */}
          <button 
            onClick={() => { setDifficulty('easy'); loadQuiz('easy'); }}
            className="glass-panel group p-8 rounded-[2.5rem] border border-white/5 hover:border-indigo-500/50 transition-all text-left space-y-4 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-white uppercase italic">Guardian Mode</h3>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Level: Simple</p>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-medium">
              Simple questions for everyone. Focuses on daily digital safety and common sense protection.
            </p>
          </button>

          {/* Hard Mode */}
          <button 
            onClick={() => { setDifficulty('hard'); loadQuiz('hard'); }}
            className="glass-panel group p-8 rounded-[2.5rem] border border-white/5 hover:border-red-500/50 transition-all text-left space-y-4 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="w-12 h-12 bg-red-500/10 text-red-400 rounded-2xl flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all">
              <Skull size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-white uppercase italic">Architect Mode</h3>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Level: Advanced</p>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-medium">
              Technical analysis for specialists. Covers zero-trust architecture, advanced exploits, and cryptography.
            </p>
          </button>
        </div>

        <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em]">Neural Uplink Prepared</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6 animate-fadeIn">
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-20" />
          <Loader2 className="animate-spin text-indigo-500 relative" size={64} />
        </div>
        <div className="text-center">
          <p className="text-white font-bold text-xl mb-1">Nexus AI is thinking...</p>
          <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">
            Compiling {difficulty.toUpperCase()} questions for your profile
          </p>
        </div>
      </div>
    );
  }

  if (isFinished) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="max-w-xl mx-auto glass-panel p-12 rounded-[3rem] text-center space-y-8 animate-reveal">
        <div className="w-24 h-24 bg-indigo-600/20 text-indigo-400 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-indigo-500/20 shadow-2xl">
          <Trophy size={48} />
        </div>
        <div>
          <h2 className="text-4xl font-black text-white mb-2 italic uppercase tracking-tighter">Evaluation Complete!</h2>
          <p className="text-gray-400 text-sm font-medium italic">
            Difficulty: <span className="text-indigo-400 uppercase">{difficulty}</span>
          </p>
        </div>
        <div className="flex flex-col gap-1">
            <p className="text-6xl font-black text-white italic tracking-tighter">{percentage}%</p>
            <p className="text-[10px] text-indigo-400 font-black tracking-[0.3em] uppercase">Intelligence Verified</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-5 rounded-[1.5rem] border border-green-500/20">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Correct</p>
                <p className="text-2xl font-black text-green-500">{score}</p>
            </div>
            <div className="bg-white/5 p-5 rounded-[1.5rem] border border-red-500/20">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Incorrect</p>
                <p className="text-2xl font-black text-red-500">{questions.length - score}</p>
            </div>
        </div>
        <button
          onClick={() => setStarted(false)}
          className="w-full bg-white/10 hover:bg-white/20 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3 uppercase italic tracking-widest border border-white/10"
        >
          <RotateCcw size={20} /> Back to Interface
        </button>
      </div>
    );
  }

  const currentQ = questions[currentIdx];

  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-reveal">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600/20 rounded-xl flex items-center justify-center text-indigo-400 border border-indigo-500/10">
            <HelpCircle size={20} />
          </div>
          <div>
            <h2 className="text-sm font-black text-white uppercase tracking-widest">Question {currentIdx + 1}</h2>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
              {difficulty.toUpperCase()} ARCHIVE • {currentIdx + 1} OF {questions.length}
            </p>
          </div>
        </div>
        <div className="bg-indigo-600/10 px-5 py-2 rounded-xl text-xs font-black text-indigo-400 border border-indigo-500/20 italic tracking-widest">
          SCORE: {score}
        </div>
      </div>

      <div className="space-y-8">
        <div className="glass-panel p-8 rounded-[2rem] border-white/10 shadow-2xl">
          <h3 className="text-2xl font-bold text-white leading-tight italic">{currentQ.question}</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {currentQ.options.map((option, idx) => {
            const isCorrect = option === currentQ.correctAnswer;
            const isSelected = option === selectedOption;
            
            return (
              <button
                key={idx}
                onClick={() => handleSelect(option)}
                disabled={!!selectedOption}
                className={`flex items-center justify-between p-6 rounded-2xl border transition-all text-left group animate-reveal opacity-0 ${
                  isSelected 
                    ? (isCorrect ? 'bg-green-500/20 border-green-500/50 text-white shadow-lg shadow-green-500/10 scale-[1.02]' : 'bg-red-500/20 border-red-500/50 text-white scale-[1.02]')
                    : (selectedOption && isCorrect ? 'bg-green-500/20 border-green-500/50 text-white' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:border-white/20')
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <span className="font-bold text-sm uppercase tracking-wide">{option}</span>
                {isSelected && (isCorrect ? <CheckCircle2 className="text-green-500" /> : <XCircle className="text-red-500" />)}
                {!isSelected && selectedOption && isCorrect && <CheckCircle2 className="text-green-400 animate-pulse" />}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="glass-panel border-indigo-500/30 bg-indigo-500/5 p-8 rounded-[2.5rem] space-y-4 animate-reveal">
            <div className="flex items-center gap-3 text-indigo-400">
                <BookOpen size={20} />
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em]">Intelligence Feed</h4>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-medium italic">
              "{currentQ.explanation}"
            </p>
            <div className="flex justify-end pt-4">
              <button
                onClick={nextQuestion}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl flex items-center gap-2 font-black uppercase italic tracking-widest transition-all shadow-lg shadow-indigo-600/20 hover:scale-105"
              >
                {currentIdx < questions.length - 1 ? 'Next Phase' : 'Complete Evaluation'} <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz; 
