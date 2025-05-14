export interface Quiz {
  id?: string;
  courseId?: string;
  quizFile?: File;
  questions?: QuizQuestion[];
}

export interface QuizQuestion {
  id?: string;
  question: string;
  options: string[];
  correctAnswer: number;
}