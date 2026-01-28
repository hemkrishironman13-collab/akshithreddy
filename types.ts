
export enum View {
  DASHBOARD = 'DASHBOARD',
  URL_SCANNER = 'URL_SCANNER',
  PASSWORD_CHECKER = 'PASSWORD_CHECKER',
  AI_ASSISTANT = 'AI_ASSISTANT',
  FILE_SCANNER = 'FILE_SCANNER',
  QUIZ = 'QUIZ',
  FAQS = 'FAQS',
  LOGIN = 'LOGIN',
  FEEDBACK = 'FEEDBACK',
  PROFILE = 'PROFILE'
}

export interface ScanResult {
  score: number;
  threats: string[];
  recommendation: string;
  isSafe: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}