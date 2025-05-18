// export interface Course {
//   id?: string;
//   thumbnailUrl?: string;
//   name: string;
//   category: string;
//   description: string;
//   sme?: string;
//   lob?: string;
//   author?: string;
// }

// export interface CourseFormData {
//   thumbnailImage?: File;
//   course: Course;
// }

export interface Course {
  id?: string;
  thumbnailUrl?: string;
  name: string;
  category: string;
  description: string;
  smeId?: string;
  lobId?: string;
  sme?: string;
  lob?: string;
  author?: string;
}

export interface CourseFormData {
  thumbnailImage?: File;
  course: Course;
}