// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { UserLearningService, CourseBasicDto } from '../../../services/user-learning.service';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { jwtDecode } from 'jwt-decode';

// // Extended interface for internal use
// interface CourseWithImageStatus extends CourseBasicDto {
//   imageLoadError?: boolean;
// }

// @Component({
//   selector: 'app-courses',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   templateUrl: './courses.component.html',
//   styles: ['./courses.component.css']
// })
// export class CoursesComponent implements OnInit {
//   courses: CourseWithImageStatus[] = [];
//   categoryId: string = '';
//   categoryName: string = '';
//   loading = true;
//   error = '';
//   userId = '';
  
//   // Add your backend base URL here
//   private readonly BASE_URL = 'https://localhost:7264'; // Change this to your actual backend URL

//   constructor(
//     private userLearningService: UserLearningService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {
//     this.userId = this.getDecodedUserId() ;
//   }

//    getDecodedUserId() {
//       try {
//           // Retrieve token from localStorage
//           const token = localStorage.getItem("authToken");
//           if (!token) {
//               console.error("No auth token found in localStorage.");
//               return null;
//           }
  
//           // Decode JWT
//           const decodedToken: any = jwtDecode(token);
  
//           console.log("=== DECODED TOKEN ===", decodedToken);
  
//           // Extract UserId from possible claims
//           const userId = decodedToken.UserId || decodedToken.nameid || decodedToken.sub;
  
//           console.log("=== EXTRACTED USER ID ===", userId);
//           return userId;
//       } catch (error) {
//           console.error("Error decoding JWT:", error);
//           return null;
//       }
//   }

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.categoryId = params['categoryId'];
//       console.log('Category ID from route:', this.categoryId);
//     });

//     this.route.queryParams.subscribe(params => {
//       this.categoryName = params['categoryName'] || 'Courses';
//       console.log('Category Name from query:', this.categoryName);
//     });

//     if (this.categoryId) {
//       this.loadCourses();
//     }
//   }

//   loadCourses(): void {
//     if (!this.categoryId) {
//       this.error = 'Category ID is required';
//       this.loading = false;
//       return;
//     }

//     this.loading = true;
//     this.error = '';
    
//     console.log('Loading courses for category:', this.categoryId, 'user:', this.userId);
    
//     this.userLearningService.getCoursesByCategory(this.categoryId, this.userId).subscribe({
//       next: (courses) => {
//         // Initialize imageLoadError property for each course
//         this.courses = courses.map(course => ({
//           ...course,
//           imageLoadError: false
//         } as CourseWithImageStatus));
//         this.loading = false;
//         console.log('Courses yash vijay loaded:', this.courses);
//       },
//       error: (error) => {
//         this.error = 'Failed to load courses';
//         this.loading = false;
//         console.error('Error loading courses:', error);
//       }
//     });
//   }

//   getCourseImageUrl(course: CourseWithImageStatus): string {
//     // Try multiple possible image fields from your API response
//     const possibleImageFields = [
//       course.thumbnailUrl,
//       course.imagePath,
//       course.imageUrl,
//       course.thumbnail,
//       course.image
//     ];

//     // Find the first non-empty image URL
//     for (const imageUrl of possibleImageFields) {
//       if (imageUrl && imageUrl.trim()) {
//         const cleanUrl = imageUrl.trim();
        
//         // If it's a relative path, combine with backend URL
//         if (cleanUrl.startsWith('/')) {
//           return `${this.BASE_URL}${cleanUrl}`;
//         }
        
//         // If it's already a full URL, return as is
//         if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
//           return cleanUrl;
//         }
        
//         // If it's a relative path without leading slash
//         return `${this.BASE_URL}/${cleanUrl}`;
//       }
//     }

//     // Return a data URL as fallback instead of a file path
//     return this.getDefaultImageDataUrl();
//   }

//   private getDefaultImageDataUrl(): string {
//     // Create a simple SVG as a data URL for the default image
//     const svg = `
//       <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
//         <rect width="100%" height="100%" fill="#f8f9fa"/>
//         <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#6c757d" font-family="Arial, sans-serif" font-size="16">
//           Course Image
//         </text>
//       </svg>
//     `;
//     return `data:image/svg+xml;base64,${btoa(svg)}`;
//   }

//   onImageError(event: Event, course: CourseWithImageStatus): void {
//     const target = event.target as HTMLImageElement;
    
//     console.error('Course image failed to load:', {
//       courseId: course.courseId,
//       courseName: course.courseName,
//       attemptedUrl: target.src,
//       originalImagePath: course.imagePath,
//       course: course
//     });

//     // Set the imageLoadError flag to show fallback content
//     course.imageLoadError = true;
//   }

//   onImageLoad(event: Event, course: CourseWithImageStatus): void {
//     const target = event.target as HTMLImageElement;
//     console.log('Course image loaded successfully:', {
//       courseId: course.courseId,
//       courseName: course.courseName,
//       imageUrl: target.src
//     });
    
//     // Ensure the error flag is false when image loads successfully
//     course.imageLoadError = false;
//   }

//   viewCourseDetail(courseId: string): void {
//     console.log('Navigating to course detail:', courseId);
//     this.router.navigate([`/module/${courseId}`]);
//   }

//   enrollInCourse(course: CourseWithImageStatus, event: Event): void {
//     event.stopPropagation();
    
//     console.log('Enrolling in course:', course.courseId);
    
//     const enrollData = {
//       userId: this.userId,
//       courseId: course.courseId
//     };
//     console.log('Enrollment data:', enrollData);

//     this.userLearningService.enrollInCourse(enrollData).subscribe({
//       next: (response) => {
//         course.isEnrolled = true;
//         course.progress = 0;
//         console.log('Enrolled successfully:', response);
//       },
//       error: (error) => {
//         console.error('Error enrolling in course:', error);
//       }
//     });
//   }

//   getProgressClass(progress: number): string {
//     if (progress === 0) return 'bg-secondary';
//     if (progress < 30) return 'bg-danger';
//     if (progress < 70) return 'bg-warning';
//     if (progress < 100) return 'bg-info';
//     return 'bg-success';
//   }

//   getButtonText(course: CourseWithImageStatus): string {
//     if (course.isCompleted) return 'Completed';
//     if (course.isEnrolled) return 'Continue Learning';
//     return 'Start Course';
//   }

//   getButtonClass(course: CourseWithImageStatus): string {
//     if (course.isCompleted) return 'btn-success';
//     if (course.isEnrolled) return 'btn-primary';
//     return 'btn-outline-primary';
//   }

//   trackByCourse(index: number, course: CourseWithImageStatus): string {
//     return course.courseId;
//   }
// }




import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLearningService, CoursesByCategoryDto } from '../../../services/user-learning.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface CourseWithImageStatusByCategory extends CoursesByCategoryDto {
  imageLoadError?: boolean;
  isCompleted?: boolean;
  progress?: number;
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './courses.component.html',
  styles: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: CourseWithImageStatusByCategory[] = [];
  categoryId: string = '';
  categoryName: string = '';
  loading = true;
  error = '';
  userId = '';

  private readonly BASE_URL = 'https://localhost:7264';

  constructor(
    private userLearningService: UserLearningService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userId = this.getDecodedUserId();
  }

  getDecodedUserId() {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No auth token found in localStorage.");
        return null;
      }

      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.UserId || decodedToken.nameid || decodedToken.sub;
      return userId;
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId'];
    });

    this.route.queryParams.subscribe(params => {
      this.categoryName = params['categoryName'] || 'Courses';
    });

    if (this.categoryId) {
      this.loadCourses();
    }
  }

  loadCourses(): void {
    if (!this.categoryId) {
      this.error = 'Category ID is required';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.error = '';

    this.userLearningService.getCoursesByCategory(this.categoryId, this.userId).subscribe({
      next: (courses: CoursesByCategoryDto[]) => {
        this.courses = courses.map(course => ({
          ...course,
          isCompleted: course.completionPercentage === 100,
          progress: course.completionPercentage,
          imageLoadError: false
        } as CourseWithImageStatusByCategory));
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load courses';
        this.loading = false;
        console.error('Error loading courses:', error);
      }
    });
  }

  getCourseImageUrl(course: CourseWithImageStatusByCategory): string {
    if (course.imagePath) {
      return `${this.BASE_URL}${course.imagePath}`;
    }
    return this.getDefaultImageDataUrl();
  }

  private getDefaultImageDataUrl(): string {
    const svg = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100%" height="100%" fill="#f8f9fa"/>
                  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#6c757d" font-family="Arial, sans-serif" font-size="16">
                    Course Image
                  </text>
                </svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }

  onImageError(event: Event, course: CourseWithImageStatusByCategory): void {
    const target = event.target as HTMLImageElement;
    console.error('Course image failed to load:', {
      courseId: course.courseId,
      courseName: course.courseName,
      attemptedUrl: target.src,
      originalImagePath: course.imagePath,
      course: course
    });
    course.imageLoadError = true;
  }

  onImageLoad(event: Event, course: CourseWithImageStatusByCategory): void {
    const target = event.target as HTMLImageElement;
    console.log('Course image loaded successfully:', {
      courseId: course.courseId,
      courseName: course.courseName,
      imageUrl: target.src
    });
    course.imageLoadError = false;
  }

  viewCourseDetail(courseId: string): void {
    console.log('Navigating to course detail:', courseId);
    this.router.navigate([`/module/${courseId}`]);
  }

  enrollInCourse(course: CourseWithImageStatusByCategory, event: Event): void {
    event.stopPropagation();

    const enrollData = {
      userId: this.userId,
      courseId: course.courseId
    };

    this.userLearningService.enrollInCourse(enrollData).subscribe({
      next: (response) => {
        course.isEnrolled = true;
        course.progress = 0;
        console.log('Enrolled successfully:', response);
      },
      error: (error) => {
        console.error('Error enrolling in course:', error);
      }
    });
  }

  getProgressClass(progress: number): string {
    if (progress === 0) return 'bg-secondary';
    if (progress < 30) return 'bg-danger';
    if (progress < 70) return 'bg-warning';
    if (progress < 100) return 'bg-info';
    return 'bg-success';
  }

  getButtonText(course: CourseWithImageStatusByCategory): string {
    if (course.isCompleted) return 'Completed';
    if (course.isEnrolled) return 'Continue Learning';
    return 'Start Course';
  }

  getButtonClass(course: CourseWithImageStatusByCategory): string {
    if (course.isCompleted) return 'btn-success';
    if (course.isEnrolled) return 'btn-primary';
    return 'btn-outline-primary';
  }

  trackByCourse(index: number, course: CourseWithImageStatusByCategory): string {
    return course.courseId;
  }
}