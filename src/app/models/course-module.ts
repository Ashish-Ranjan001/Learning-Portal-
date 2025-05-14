export interface CourseModule {
  id?: string;
  courseId?: string;
  name: string;
  duration: string;
  description: string;
  videoFile?: File;
  pdfFile?: File;
}