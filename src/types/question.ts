export interface QuestionSet {
  _id: string;
  title: string;
  subtitle: string;
  totalQuestions: number;
  color: string;
  icon: string;
  xp: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  examples: string[];
  status?: 'locked' | 'current' | 'completed';
  estimatedTime?: number;
  isUnlocked?: boolean;
  price?: number;
}

export type Option = {
  label: string;
  text: string;
};

export type Question = {
  questionId: number;
  question: string;
  questionEn?: string;
  options: Option[];
  correctAnswer: string; 
  type: "multiple-choice"; 
};