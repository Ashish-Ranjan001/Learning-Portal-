export interface CourseModule {
  id?: string | number;
  courseId?: string | number;
  name: string;
  duration: string;
  description: string;
  videoFile?: File;
  pdfFile?: File;
}