// /api/quiz.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { difficulty } = req.query;

    // Use your Gemini/OpenAI key from environment variables
    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
      return res.status(500).json({ error: 'Missing API key' });
    }

    // Prompt for AI to generate questions
    const prompt = `
      Generate 4 cybersecurity quiz questions for difficulty: ${difficulty}.
      Each question must have 4 options, one correct answer, and a short explanation.
      Format the response as JSON array:
      [
        {
          "question": "...",
          "options": ["...", "...", "...", "..."],
          "correctAnswer": "...",
          "explanation": "..."
        }
      ]
    `;

    const response = await fetch('https://api.generativeai.googleapis.com/v1beta2/models/gemini-2.5-chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        max_output_tokens: 800,
      }),
    });

    const data = await response.json();

    // Parse the AI response safely
    let questions: QuizQuestion[] = [];
    try {
      questions = JSON.parse(data.choices?.[0]?.content?.text || '[]');
    } catch {
      questions = [];
    }

    // Fallback if AI fails
    if (!questions.length) {
      questions = [
        {
          question: 'Fallback question: What is phishing?',
          options: ['Steal info', 'Improve security', 'Encrypt data', 'Fix bugs'],
          correctAnswer: 'Steal info',
          explanation: 'Phishing tries to steal sensitive info from users.'
        }
      ];
    }

    res.status(200).json({ questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
