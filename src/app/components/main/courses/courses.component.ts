import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLearningService, CourseBasicDto } from '../../../services/user-learning.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Extended interface for internal use
interface CourseWithImageStatus extends CourseBasicDto {
  imageLoadError?: boolean;
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container-fluid">
      <!-- Header -->
      <div class="row mb-4">
        <div class="col-12">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a routerLink="/" class="text-primary">Home</a></li>
              <li class="breadcrumb-item"><a routerLink="/categories" class="text-primary">Categories</a></li>
              <li class="breadcrumb-item active" aria-current="page">{{ categoryName }}</li>
            </ol>
          </nav>
        </div>
      </div>

      <!-- Debug Info (Remove in production) -->
      <div class="alert alert-info mb-4" *ngIf="!loading && courses.length > 0">
        <strong>Debug Info:</strong>
        <br>Courses count: {{ courses.length }}
        <br>Sample course data: {{ courses[0] | json }}
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="d-flex justify-content-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading courses...</span>
        </div>
      </div>

      <!-- Error State -->
      <div *ngIf="error" class="alert alert-danger" role="alert">
        <i class="fas fa-exclamation-triangle me-2"></i>
        {{ error }}
        <button class="btn btn-outline-danger ms-2" (click)="loadCourses()">
          <i class="fas fa-redo me-1"></i>Retry
        </button>
      </div>

      <!-- Courses Grid -->
      <div *ngIf="!loading && !error" class="row">
        <div class="col-12 mb-4">
          <div class="d-flex justify-content-between align-items-center">
            <h2 class="mb-0">
              <i class="fas fa-book me-2"></i>{{ categoryName }}
            </h2>
            <span class="badge bg-info fs-6">{{ courses.length }} Course{{ courses.length !== 1 ? 's' : '' }}</span>
          </div>
        </div>
        
        <div class="col-lg-6 col-md-6 mb-4" *ngFor="let course of courses; trackBy: trackByCourse">
          <div class="course-card h-100" 
               (click)="viewCourseDetail(course.courseId)"
               role="button"
               tabindex="0"
               (keydown.enter)="viewCourseDetail(course.courseId)"
               (keydown.space)="viewCourseDetail(course.courseId)">
            <div class="card h-100 border-0 shadow-sm hover-lift">
              <div class="row g-0 h-100">
                <!-- Course Image -->
                <div class="col-md-4">
                  <div class="course-image position-relative">
                    <!-- Course image with improved fallback handling -->
                    <img *ngIf="!course.imageLoadError" 
                         [src]="getCourseImageUrl(course)" 
                         class="img-fluid h-100 w-100 course-img" 
                         [alt]="course.courseName"
                         style="object-fit: cover;"
                         (error)="onImageError($event, course)"
                         (load)="onImageLoad($event, course)">
                    
                    <!-- Fallback content when image fails -->
                    <div *ngIf="course.imageLoadError" 
                         class="fallback-content position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-gradient-primary">
                      <div class="text-center text-white">
                        <i class="fas fa-book fa-3x mb-2"></i>
                        <div class="fw-bold fs-6">{{ course.courseName }}</div>
                      </div>
                    </div>
                    
                    <!-- Play overlay -->
                    <div class="course-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                      <div class="university-logo">
                        <i class="fas fa-play-circle fa-2x text-white opacity-75"></i>
                      </div>
                    </div>
                    
                    <!-- Enrollment Status Badge -->
                    <div class="position-absolute top-0 end-0 m-2">
                      <span *ngIf="course.isCompleted" class="badge bg-success">
                        <i class="fas fa-check me-1"></i>Completed
                      </span>
                      <span *ngIf="course.isEnrolled && !course.isCompleted" class="badge bg-primary">
                        <i class="fas fa-user-check me-1"></i>Enrolled
                      </span>
                      <span *ngIf="!course.isEnrolled && !course.isCompleted" class="badge bg-secondary">
                        <i class="fas fa-plus me-1"></i>Available
                      </span>
                    </div>
                  </div>
                </div>
                
                <!-- Course Content -->
                <div class="col-md-8">
                  <div class="card-body d-flex flex-column h-100 p-3">
                    <h5 class="card-title mb-2 fw-bold">{{ course.courseName }}</h5>
                    <p class="card-text text-muted flex-grow-1 small">
                      {{ course.description || 'No description available for this course.' }}
                    </p>
                    
                    <!-- Course Metadata -->
                    <div class="course-meta mb-3">
                      <div class="row g-2">
                        <div class="col-6" *ngIf="course.duration">
                          <small class="text-muted">
                            <i class="fas fa-clock me-1"></i>{{ course.duration }}
                          </small>
                        </div>
                        <div class="col-6" *ngIf="course.instructor">
                          <small class="text-muted">
                            <i class="fas fa-user me-1"></i>{{ course.instructor }}
                          </small>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Progress Bar -->
                    <div class="progress-section mb-3" *ngIf="course.isEnrolled">
                      <div class="d-flex justify-content-between align-items-center mb-1">
                        <small class="text-muted fw-semibold">Progress</small>
                        <small class="text-muted">{{ course.progress || 0 }}%</small>
                      </div>
                      <div class="progress" style="height: 8px;">
                        <div class="progress-bar progress-bar-striped" 
                             [class]="getProgressClass(course.progress || 0)"
                             role="progressbar" 
                             [style.width.%]="course.progress || 0"
                             [attr.aria-valuenow]="course.progress || 0"
                             aria-valuemin="0" 
                             aria-valuemax="100">
                        </div>
                      </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="d-flex justify-content-between align-items-center mt-auto">
                      <button class="btn btn-sm px-3" 
                              [class]="getButtonClass(course)"
                              (click)="course.isEnrolled ? viewCourseDetail(course.courseId) : enrollInCourse(course, $event)"
                              [disabled]="course.isCompleted">
                        <i class="fas me-1" 
                           [class.fa-play]="!course.isEnrolled && !course.isCompleted"
                           [class.fa-arrow-right]="course.isEnrolled && !course.isCompleted"
                           [class.fa-check]="course.isCompleted"></i>
                        {{ getButtonText(course) }}
                      </button>
                      
                      <div *ngIf="course.isCompleted" class="text-success">
                        <i class="fas fa-trophy me-1"></i>
                        <small class="fw-semibold">Done!</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="!loading && !error && courses.length === 0" class="text-center py-5">
        <div class="empty-state">
          <i class="fas fa-book-open fa-4x text-muted mb-4"></i>
          <h4 class="text-muted mb-3">No Courses Available</h4>
          <p class="text-muted mb-4">There are no courses available in the "{{ categoryName }}" category at the moment.</p>
          <div class="d-flex gap-2 justify-content-center">
            <button class="btn btn-primary" routerLink="/categories">
              <i class="fas fa-arrow-left me-2"></i>Back to Categories
            </button>
            <button class="btn btn-outline-primary" (click)="loadCourses()">
              <i class="fas fa-refresh me-2"></i>Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Courses Component Styles */
    .course-card {
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .course-card:hover {
      transform: translateY(-3px);
    }

    .course-card .card {
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s ease;
      height: 100%;
    }

    .course-card:hover .card {
      box-shadow: 0 10px 25px rgba(0, 123, 255, 0.15) !important;
    }

    .course-image {
      height: 200px;
      overflow: hidden;
      background: #f8f9fa;
    }

    .course-img {
      transition: transform 0.3s ease;
    }

    .course-card:hover .course-img {
      transform: scale(1.05);
    }

    .fallback-content {
      background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    }

    .bg-gradient-primary {
      background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    }

    .course-overlay {
      background: rgba(0, 0, 0, 0.3);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .course-card:hover .course-overlay {
      opacity: 1;
    }

    .hover-lift {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .course-card:hover .hover-lift {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .progress {
      border-radius: 10px;
      background-color: #e9ecef;
    }

    .progress-bar {
      border-radius: 10px;
      transition: width 0.6s ease;
    }

    .progress-bar-striped {
      background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
      background-size: 1rem 1rem;
    }

    .btn {
      font-weight: 500;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .btn:hover {
      transform: translateY(-1px);
    }

    .empty-state {
      max-width: 500px;
      margin: 0 auto;
    }

    .spinner-border {
      width: 3rem;
      height: 3rem;
    }

    @media (max-width: 768px) {
      .course-image {
        height: 150px;
      }
    }
  `]
})
export class CoursesComponent implements OnInit {
  courses: CourseWithImageStatus[] = [];
  categoryId: string = '';
  categoryName: string = '';
  loading = true;
  error = '';
  userId = '';
  
  // Add your backend base URL here
  private readonly BASE_URL = 'http://localhost:5053'; // Change this to your actual backend URL

  constructor(
    private userLearningService: UserLearningService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userId = localStorage.getItem('userId') || 'user-id-placeholder';
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId'];
      console.log('Category ID from route:', this.categoryId);
    });

    this.route.queryParams.subscribe(params => {
      this.categoryName = params['categoryName'] || 'Courses';
      console.log('Category Name from query:', this.categoryName);
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
    
    console.log('Loading courses for category:', this.categoryId, 'user:', this.userId);
    
    this.userLearningService.getCoursesByCategory(this.categoryId, this.userId).subscribe({
      next: (courses) => {
        // Initialize imageLoadError property for each course
        this.courses = courses.map(course => ({
          ...course,
          imageLoadError: false
        } as CourseWithImageStatus));
        this.loading = false;
        console.log('Courses loaded:', this.courses);
      },
      error: (error) => {
        this.error = 'Failed to load courses';
        this.loading = false;
        console.error('Error loading courses:', error);
      }
    });
  }

  getCourseImageUrl(course: CourseWithImageStatus): string {
    // Try multiple possible image fields from your API response
    const possibleImageFields = [
      course.thumbnailUrl,
      course.imagePath,
      course.imageUrl,
      course.thumbnail,
      course.image
    ];

    // Find the first non-empty image URL
    for (const imageUrl of possibleImageFields) {
      if (imageUrl && imageUrl.trim()) {
        const cleanUrl = imageUrl.trim();
        
        // If it's a relative path, combine with backend URL
        if (cleanUrl.startsWith('/')) {
          return `${this.BASE_URL}${cleanUrl}`;
        }
        
        // If it's already a full URL, return as is
        if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
          return cleanUrl;
        }
        
        // If it's a relative path without leading slash
        return `${this.BASE_URL}/${cleanUrl}`;
      }
    }

    // Return a data URL as fallback instead of a file path
    return this.getDefaultImageDataUrl();
  }

  private getDefaultImageDataUrl(): string {
    // Create a simple SVG as a data URL for the default image
    const svg = `
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f8f9fa"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#6c757d" font-family="Arial, sans-serif" font-size="16">
          Course Image
        </text>
      </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }

  onImageError(event: Event, course: CourseWithImageStatus): void {
    const target = event.target as HTMLImageElement;
    
    console.error('Course image failed to load:', {
      courseId: course.courseId,
      courseName: course.courseName,
      attemptedUrl: target.src,
      originalImagePath: course.imagePath,
      course: course
    });

    // Set the imageLoadError flag to show fallback content
    course.imageLoadError = true;
  }

  onImageLoad(event: Event, course: CourseWithImageStatus): void {
    const target = event.target as HTMLImageElement;
    console.log('Course image loaded successfully:', {
      courseId: course.courseId,
      courseName: course.courseName,
      imageUrl: target.src
    });
    
    // Ensure the error flag is false when image loads successfully
    course.imageLoadError = false;
  }

  viewCourseDetail(courseId: string): void {
    console.log('Navigating to course detail:', courseId);
    this.router.navigate(['/course-detail', courseId]);
  }

  enrollInCourse(course: CourseWithImageStatus, event: Event): void {
    event.stopPropagation();
    
    console.log('Enrolling in course:', course.courseId);
    
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

  getButtonText(course: CourseWithImageStatus): string {
    if (course.isCompleted) return 'Completed';
    if (course.isEnrolled) return 'Continue Learning';
    return 'Start Course';
  }

  getButtonClass(course: CourseWithImageStatus): string {
    if (course.isCompleted) return 'btn-success';
    if (course.isEnrolled) return 'btn-primary';
    return 'btn-outline-primary';
  }

  trackByCourse(index: number, course: CourseWithImageStatus): string {
    return course.courseId;
  }
}

