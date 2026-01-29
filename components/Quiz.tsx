import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import type { QuizQuestion } from '../types';

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'hard'>('easy');
  const [error, setError] = useState<string | null>(null);

  // 🔥 AI GENERATION HAPPENS HERE
  const startQuiz = async (level: 'easy' | 'hard') => {
    setDifficulty(level);
    setLoading(true);
    setStarted(true);
    setFinished(false);
    setIndex(0);
    setScore(0);
    setSelected(null);
    setError(null);

    try {
      const aiQuestions = await geminiService.generateQuiz(level);
      setQuestions(aiQuestions);
    } catch (e) {
      console.error(e);
      setError('Failed to generate quiz with AI');
      setStarted(false);
    } finally {
      setLoading(false);
    }
  };

  const choose = (option: string) => {
    if (selected) return;
    setSelected(option);

    if (option === questions[index].correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const next = () => {
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  // ---------- UI ----------

  if (!started) {
    return (
      <div>
        <h2>AI Cybersecurity Quiz</h2>
        <p>Questions are generated live by Gemini AI</p>
        <button onClick={() => startQuiz('easy')}>Easy (AI)</button>
        <button onClick={() => startQuiz('hard')}>Hard (AI)</button>
      </div>
    );
  }

  if (loading) {
    return <p>🧠 Gemini AI is generating questions…</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (finished) {
    return (
      <div>
        <h2>Quiz Complete</h2>
        <p>
          Score: {score} / {questions.length}
        </p>
        <button onClick={() => setStarted(false)}>Generate New AI Quiz</button>
      </div>
    );
  }

  const q = questions[index];

  return (
    <div>
      <h3>
        Question {index + 1} of {questions.length}
      </h3>

      <p>{q.question}</p>

      {q.options.map((opt) => (
        <button
          key={opt}
          disabled={!!selected}
          onClick={() => choose(opt)}
          style={{
            display: 'block',
            marginBottom: 8,
            background:
              selected && opt === q.correctAnswer
                ? '#4caf50'
                : selected === opt
                ? '#f44336'
                : '#eee',
          }}
        >
          {opt}
        </button>
      ))}

      {selected && (
        <>
          <p>
            <strong>AI Explanation:</strong> {q.explanation}
          </p>
          <button onClick={next}>
            {index < questions.length - 1 ? 'Next' : 'Finish'}
          </button>
        </>
      )}
    </div>
  );
};

export default Quiz;
