export type QuestionType = 'mcq' | 'tf' | 'fill';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  sourceId: string; // e.g., 'Q1', 'Q325', 'Q401'
  type: QuestionType;
  difficulty: Difficulty;
  prompt: string;
  options?: string[]; // 4 options for MCQ
  correctAnswer: string;
  acceptableAnswers?: string[]; // Variations for fill in the blanks
  explanation?: string;
  category: 'Computer Fundamentals' | 'MS Word' | 'MS Excel' | 'MS PowerPoint' | 'Number Systems';
}

export type SubmissionReason = 
  | 'normal'
  | 'timer_expired'
  | 'fullscreen_limit'
  | 'tab_switch_limit';

export interface StudentAnswer {
  questionId: string;
  studentAnswer: string;
  isCorrect: boolean;
  correctAnswer: string;
  questionPrompt: string;
  type: QuestionType;
}

export interface QuizResult {
  id: string;
  studentName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpentSeconds: number;
  submittedAt: string;
  submissionReason: SubmissionReason;
  fullscreenViolations: number;
  tabSwitchViolations: number;
  answers: StudentAnswer[];
  syncedToGoogleSheet?: boolean;
}

export interface GoogleSheetConfig {
  webhookUrl: string;
  enabled: boolean;
  autoSync: boolean;
}
