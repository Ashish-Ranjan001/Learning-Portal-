// export interface CourseModule {
//   id?: string | number;
//   courseId?: string | number;
//   modulename: string;
//   duration: string;
//   description: string;
//   videoFile?: File;
//   pdfFile?: File;
// }

export interface CourseModule {
  id?: string | number;
  module_id?: string | number; // Added this property
  courseId?: string | number;
  modulename: string;
  duration: string; // Also updated to match your DTO
  description: string;
  videoFile?: File;
  pdfFile?: File;
}