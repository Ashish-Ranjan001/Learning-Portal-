export interface Quiz {
  id?: string | number;
  courseId?: string | number;
  quizFile?: File;
  questions?: QuizQuestion[];
}

export interface QuizQuestion {
  id?: string | number;
  question: string;
  options: string[];
  correctAnswer: number;
}