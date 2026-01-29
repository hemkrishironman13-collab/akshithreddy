import { ScanResult } from '../types';

// Mock service implementation
// In production, replace with actual Google Generative AI SDK
export const geminiService = {
  async scanUrl(url: string): Promise<ScanResult> {
    // Simulated response for demo
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          score: Math.floor(Math.random() * 100),
          threats: ['Potential phishing', 'Unverified SSL certificate'],
          recommendation: 'Exercise caution when visiting this URL. Consider using a VPN.',
          isSafe: Math.random() > 0.5
        });
      }, 1500);
    });
  },

  async analyzeFile(fileName: string, _contentSnippet: string): Promise<ScanResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          score: Math.floor(Math.random() * 100),
          threats: [],
          recommendation: `File ${fileName} appears safe for execution.`,
          isSafe: true
        });
      }, 1500);
    });
  },

  async getChatResponse(prompt: string, userName?: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          detectedLanguage: 'English',
          text: `Hello${userName ? `, ${userName}` : ''}! I'm Nexus AI. How can I help you with cybersecurity today?`
        });
      }, 1000);
    });
  },

  async speakText(text: string, voiceName: string = 'Kore', rate: string = 'normal') {
    // Simulated TTS
    console.log(`Speaking (${voiceName}, ${rate}): ${text}`);
  },

  async generateQuiz(difficulty: 'easy' | 'hard' = 'easy') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            question: 'What does MFA stand for?',
            options: ['Multi-Factor Authentication', 'Multiple File Access', 'Master Function Application', 'Mobile File Authorization'],
            correctAnswer: 'Multi-Factor Authentication',
            explanation: 'MFA is a security system requiring multiple authentication methods.'
          },
          {
            id: '2',
            question: 'Which is a strong password characteristic?',
            options: ['12+ characters', 'Only letters', 'Common words', 'Your birthdate'],
            correctAnswer: '12+ characters',
            explanation: 'Strong passwords are long with mixed character types.'
          },
          {
            id: '3',
            question: 'What should you do if you receive a phishing email?',
            options: ['Report it to IT', 'Click the link to verify', 'Forward to friends', 'Save for later'],
            correctAnswer: 'Report it to IT',
            explanation: 'Always report suspicious emails to your IT security team.'
          },
          {
            id: '4',
            question: 'What is a VPN?',
            options: ['Virtual Private Network', 'Very Personal Network', 'Virus Protection Network', 'Virtual Phone Network'],
            correctAnswer: 'Virtual Private Network',
            explanation: 'A VPN encrypts your internet connection for privacy and security.'
          },
          {
            id: '5',
            question: 'How often should you update your software?',
            options: ['As soon as updates are available', 'Once a year', 'Never', 'Only when told to'],
            correctAnswer: 'As soon as updates are available',
            explanation: 'Regular updates patch security vulnerabilities.'
          }
        ]);
      }, 1000);
    });
  }
};
