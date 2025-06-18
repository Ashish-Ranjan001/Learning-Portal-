import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Course {
  id: number;
  title: string;
  description: string;
  progress?: number;
  completedDate?: Date;
  category: 'all' | 'completed' | 'saved' | 'ongoing';
  imageUrl?: string;
  subCategory?: string;
  author?: string;
}

interface Category {
  id: number;
  name: string;
  subCategory: string;
  imageUrl: string;
  courseCount: number;
}

@Component({
  selector: 'app-learning-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './learningpage.component.html',
  styleUrl: './learningpage.component.css'
})
export class LearningpageComponent implements OnInit {
  activeCategory: 'all' | 'completed' | 'saved' | 'ongoing' = 'all';
  
  categories = [
    { key: 'all', label: 'All Categories', icon: '📚' },
    { key: 'completed', label: 'Completed Courses', icon: '✅' },
    { key: 'saved', label: 'Saved Courses', icon: '❤️' },
    { key: 'ongoing', label: 'Ongoing Courses', icon: '📖' }
  ] as const;

  // Categories data for "All Categories" view
  allCategories: Category[] = [
    {
      id: 1,
      name: 'Web Development',
      subCategory: 'Frontend Technologies',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop',
      courseCount: 12
    },
    {
      id: 2,
      name: 'Data Science',
      subCategory: 'Analytics & Machine Learning',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop',
      courseCount: 8
    },
    {
      id: 3,
      name: 'Mobile Development',
      subCategory: 'iOS & Android',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop',
      courseCount: 6
    },
    {
      id: 4,
      name: 'Cloud Computing',
      subCategory: 'AWS & Azure',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop',
      courseCount: 9
    }
  ];

  allCourses: Course[] = [
    {
      id: 1,
      title: 'Angular Fundamentals',
      description: 'Learn the basics of Angular framework',
      progress: 100,
      completedDate: new Date('2024-05-15'),
      category: 'completed',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop',
      subCategory: 'Frontend Development',
      author: 'John Smith'
    },
    {
      id: 2,
      title: 'TypeScript Advanced',
      description: 'Master advanced TypeScript concepts',
      progress: 65,
      category: 'ongoing',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop',
      subCategory: 'Programming Languages',
      author: 'Sarah Johnson'
    },
    {
      id: 3,
      title: 'RxJS Operators',
      description: 'Deep dive into reactive programming',
      category: 'saved',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop',
      subCategory: 'Reactive Programming',
      author: 'Mike Davis'
    },
    {
      id: 4,
      title: 'Angular Signals',
      description: 'Modern state management with signals',
      progress: 30,
      category: 'ongoing',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop',
      subCategory: 'State Management',
      author: 'Emily Chen'
    },
    {
      id: 5,
      title: 'React Hooks Mastery',
      description: 'Complete guide to React Hooks',
      progress: 100,
      completedDate: new Date('2024-04-20'),
      category: 'completed',
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
      subCategory: 'Frontend Development',
      author: 'Alex Wilson'
    }
  ];

  filteredCourses: Course[] = [];

  ngOnInit() {
    this.filterCourses();
  }

  switchCategory(category: 'all' | 'completed' | 'saved' | 'ongoing') {
    this.activeCategory = category;
    this.filterCourses();
  }

  private filterCourses() {
    if (this.activeCategory === 'all') {
      this.filteredCourses = this.allCourses;
    } else {
      this.filteredCourses = this.allCourses.filter(
        course => course.category === this.activeCategory
      );
    }
  }

  getCourseCount(category: 'all' | 'completed' | 'saved' | 'ongoing'): number {
    if (category === 'all') return this.allCategories.length;
    return this.allCourses.filter(course => course.category === category).length;
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop';
    }
  }
}




// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { UserLearningService, CategoryWithCoursesDto, CourseBasicDto } from './user-learning.service';

// interface Course {
//   id: string;
//   title: string;
//   description: string;
//   progress?: number;
//   completedDate?: Date;
//   category: 'all' | 'completed' | 'saved' | 'ongoing';
//   imageUrl?: string;
//   subCategory?: string;
//   author?: string;
//   isEnrolled?: boolean;
//   isCompleted?: boolean;
//   duration?: string;
// }

// interface Category {
//   id: string;
//   name: string;
//   subCategory: string;
//   imageUrl: string;
//   courseCount: number;
// }

// @Component({
//   selector: 'app-learning-page',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './learningpage.component.html',
//   styleUrl: './learningpage.component.css'
// })
// export class LearningpageComponent implements OnInit {
//   activeCategory: 'all' | 'completed' | 'saved' | 'ongoing' = 'all';
  
//   categories = [
//     { key: 'all', label: 'All Categories', icon: '📚' },
//     { key: 'completed', label: 'Completed Courses', icon: '✅' },
//     { key: 'saved', label: 'Saved Courses', icon: '❤️' },
//     { key: 'ongoing', label: 'Ongoing Courses', icon: '📖' }
//   ] as const;

//   // Data from API
//   allCategories: Category[] = [];
//   completedCourses: Course[] = [];
//   ongoingCourses: Course[] = [];
//   savedCourses: Course[] = []; // Will be implemented later
  
//   filteredCourses: Course[] = [];
//   isLoading = false;
//   error: string | null = null;

//   // You should get this from authentication service
//   private readonly userId = 'your-user-id'; // Replace with actual user ID

//   constructor(private userLearningService: UserLearningService) {}

//   ngOnInit() {
//     this.loadInitialData();
//   }

//   private loadInitialData() {
//     this.isLoading = true;
//     this.error = null;

//     // Load all categories first
//     this.loadCategories();
    
//     // Load completed and ongoing courses
//     this.loadCompletedCourses();
//     this.loadOngoingCourses();
//   }

//   private loadCategories() {
//     this.userLearningService.getAllCategories(this.userId).subscribe({
//       next: (categories) => {
//         this.allCategories = this.mapCategoriesToUI(categories);
//         this.filterCourses();
//       },
//       error: (error) => {
//         console.error('Error loading categories:', error);
//         this.error = 'Failed to load categories';
//         this.isLoading = false;
//       }
//     });
//   }

//   private loadCompletedCourses() {
//     this.userLearningService.getUserCompletedCourses(this.userId).subscribe({
//       next: (courses) => {
//         this.completedCourses = this.mapCoursesToUI(courses, 'completed');
//         this.filterCourses();
//       },
//       error: (error) => {
//         console.error('Error loading completed courses:', error);
//         this.error = 'Failed to load completed courses';
//       }
//     });
//   }

//   private loadOngoingCourses() {
//     this.userLearningService.getUserInProgressCourses(this.userId).subscribe({
//       next: (courses) => {
//         this.ongoingCourses = this.mapCoursesToUI(courses, 'ongoing');
//         this.filterCourses();
//         this.isLoading = false;
//       },
//       error: (error) => {
//         console.error('Error loading ongoing courses:', error);
//         this.error = 'Failed to load ongoing courses';
//         this.isLoading = false;
//       }
//     });
//   }

//   private mapCategoriesToUI(apiCategories: CategoryWithCoursesDto[]): Category[] {
//     return apiCategories.map(category => ({
//       id: category.id,
//       name: category.name,
//       subCategory: category.description || 'Learning Category',
//       imageUrl: category.imagePath || this.getDefaultCategoryImage(),
//       courseCount: category.courseCount
//     }));
//   }

//   private mapCoursesToUI(apiCourses: CourseBasicDto[], category: 'completed' | 'ongoing'): Course[] {
//     return apiCourses.map(course => ({
//       id: course.courseId,
//       title: course.courseName,
//       description: course.description || '',
//       category: category,
//       imageUrl: this.getCourseImageUrl(course),
//       subCategory: 'Course', // You might want to add category info to your DTO
//       author: course.instructor || 'Unknown Instructor',
//       progress: course.progress || (category === 'completed' ? 100 : 0),
//       isEnrolled: course.isEnrolled,
//       isCompleted: course.isCompleted,
//       duration: course.duration,
//       completedDate: category === 'completed' ? new Date() : undefined // You might want to add this to your DTO
//     }));
//   }

//   private getCourseImageUrl(course: CourseBasicDto): string {
//     // Check multiple possible image field names from your DTO
//     return course.thumbnailUrl || 
//            course.imagePath || 
//            course.imageUrl || 
//            course.thumbnail || 
//            course.image || 
//            this.getDefaultCourseImage();
//   }

//   private getDefaultCategoryImage(): string {
//     return 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop';
//   }

//   private getDefaultCourseImage(): string {
//     return 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop';
//   }

//   switchCategory(category: 'all' | 'completed' | 'saved' | 'ongoing') {
//     this.activeCategory = category;
//     this.filterCourses();
//   }

//   private filterCourses() {
//     switch (this.activeCategory) {
//       case 'all':
//         this.filteredCourses = [];
//         break;
//       case 'completed':
//         this.filteredCourses = this.completedCourses;
//         break;
//       case 'ongoing':
//         this.filteredCourses = this.ongoingCourses;
//         break;
//       case 'saved':
//         this.filteredCourses = this.savedCourses;
//         break;
//       default:
//         this.filteredCourses = [];
//     }
//   }

//   getCourseCount(category: 'all' | 'completed' | 'saved' | 'ongoing'): number {
//     switch (category) {
//       case 'all':
//         return this.allCategories.length;
//       case 'completed':
//         return this.completedCourses.length;
//       case 'ongoing':
//         return this.ongoingCourses.length;
//       case 'saved':
//         return this.savedCourses.length;
//       default:
//         return 0;
//     }
//   }

//   onImageError(event: Event): void {
//     const target = event.target as HTMLImageElement;
//     if (target) {
//       target.src = this.getDefaultCourseImage();
//     }
//   }

//   // Method to handle category view button click
//   onViewCategory(categoryId: string) {
//     // You can navigate to category detail page or load courses for this category
//     console.log('View category:', categoryId);
//     // Example: this.router.navigate(['/category', categoryId]);
//   }

//   // Method to handle course view button click
//   onViewCourse(courseId: string) {
//     // Navigate to course detail page
//     console.log('View course:', courseId);
//     // Example: this.router.navigate(['/course', courseId]);
//   }

//   // Method to refresh data
//   refreshData() {
//     this.loadInitialData();
//   }
// }



// <div class="learning-container">
//   <!-- Header Section -->
//   <div class="header-section">
//     <h1>My Learning</h1>
//     <p>Track your learning progress and manage your courses</p>
//   </div>

//   <!-- Loading State -->
//   <div *ngIf="isLoading" class="loading-state">
//     <div class="loading-spinner"></div>
//     <p>Loading your learning data...</p>
//   </div>

//   <!-- Error State -->
//   <div *ngIf="error && !isLoading" class="error-state">
//     <div class="error-icon">⚠️</div>
//     <h3>Something went wrong</h3>
//     <p>{{ error }}</p>
//     <button class="retry-btn" (click)="refreshData()">Try Again</button>
//   </div>

//   <!-- Main Content -->
//   <div *ngIf="!isLoading && !error">
//     <!-- Category Navigation -->
//     <div class="category-nav">
//       <div class="category-tabs">
//         <button 
//           *ngFor="let category of categories"
//           class="category-tab"
//           [class.active]="activeCategory === category.key"
//           (click)="switchCategory(category.key)">
//           <span class="tab-icon">{{ category.icon }}</span>
//           <span class="tab-label">{{ category.label }}</span>
//           <span class="tab-count">({{ getCourseCount(category.key) }})</span>
//         </button>
//       </div>
//     </div>

//     <!-- Content Section -->
//     <div class="content-section">
      
//       <!-- All Categories Grid -->
//       <div class="categories-grid" *ngIf="activeCategory === 'all' && allCategories.length > 0">
//         <div 
//           *ngFor="let category of allCategories" 
//           class="category-card">
          
//           <div class="card-image-container">
//             <img 
//               [src]="category.imageUrl" 
//               [alt]="category.name"
//               class="card-image"
//               (error)="onImageError($event)">
//           </div>
          
//           <div class="card-content">
//             <div class="subcategory-name">{{ category.subCategory }}</div>
//             <h3 class="category-name">{{ category.name }}</h3>
//             <div class="course-count">{{ category.courseCount }} courses</div>
//           </div>

//           <div class="card-footer">
//             <button class="view-btn" (click)="onViewCategory(category.id)">
//               <span class="btn-icon">👁️</span>
//               View
//             </button>
//           </div>
//         </div>
//       </div>

//       <!-- Courses Grid for other categories -->
//       <div class="courses-grid" *ngIf="activeCategory !== 'all' && filteredCourses.length > 0">
//         <div 
//           *ngFor="let course of filteredCourses" 
//           class="course-card"
//           [ngClass]="'course-' + course.category">
          
//           <div class="card-image-container">
//             <img 
//               [src]="course.imageUrl" 
//               [alt]="course.title"
//               class="card-image"
//               (error)="onImageError($event)">
            
//             <!-- Progress Badge for Ongoing Courses -->
//             <div *ngIf="course.category === 'ongoing' && course.progress !== undefined" class="progress-badge">
//               {{ course.progress }}%
//             </div>
            
//             <!-- Completed Badge -->
//             <div *ngIf="course.category === 'completed'" class="completed-badge">
//               ✓ Completed
//             </div>
            
//             <!-- Saved Badge -->
//             <div *ngIf="course.category === 'saved'" class="saved-badge">
//               ❤️ Saved
//             </div>
//           </div>
          
//           <div class="card-content">
//             <div class="course-category">{{ course.subCategory }}</div>
//             <h3 class="course-name">{{ course.title }}</h3>
//             <div class="author-name" *ngIf="course.author">by {{ course.author }}</div>
//           </div>

//           <div class="card-footer">
//             <button class="view-btn" (click)="onViewCourse(course.id)">
//               <span class="btn-icon">👁️</span>
//               View
//             </button>
//           </div>
//         </div>
//       </div>

//       <!-- No Categories State for All -->
//       <div class="empty-state" *ngIf="activeCategory === 'all' && allCategories.length === 0 && !isLoading">
//         <div class="empty-icon">📚</div>
//         <h3>No categories available</h3>
//         <p>There are no learning categories available at the moment.</p>
//       </div>

//       <!-- No Courses State -->
//       <div class="empty-state" *ngIf="activeCategory !== 'all' && filteredCourses.length === 0 && !isLoading">
//         <div class="empty-icon">📚</div>
//         <h3>No courses found</h3>
//         <p>You don't have any {{ activeCategory }} courses yet.</p>
//       </div>
//     </div>
//   </div>
// </div>

/* Loading State */
// .loading-state {
//   text-align: center;
//   padding: 80px 20px;
//   color: #666;
// }

// .loading-spinner {
//   width: 40px;
//   height: 40px;
//   border: 3px solid #f3f3f3;
//   border-top: 3px solid #007bff;
//   border-radius: 50%;
//   animation: spin 1s linear infinite;
//   margin: 0 auto 20px;
// }

// @keyframes spin {
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// }

// /* Error State */
// .error-state {
//   text-align: center;
//   padding: 80px 20px;
//   color: #666;
// }

// .error-icon {
//   font-size: 48px;
//   margin-bottom: 16px;
// }

// .error-state h3 {
//   margin-bottom: 8px;
//   color: #dc3545;
//   font-size: 24px;
// }

// .error-state p {
//   margin-bottom: 20px;
//   color: #666;
// }

// .retry-btn {
//   padding: 12px 24px;
//   background: #007bff;
//   color: white;
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   font-size: 14px;
//   font-weight: 600;
//   transition: all 0.3s ease;
// }

// .retry-btn:hover {
//   background: #0056b3;
//   transform: translateY(-2px);
// }

// .learning-container {
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 20px;
// }

// .header-section {
//   text-align: center;
//   margin-bottom: 30px;
// }

// .header-section h1 {
//   color: #333;
//   margin-bottom: 8px;
//   font-size: 2.5rem;
//   font-weight: 700;
// }

// .header-section p {
//   color: #666;
//   font-size: 16px;
// }

// .category-nav {
//   margin-bottom: 30px;
//   border-bottom: 1px solid #e0e0e0;
// }

// .category-tabs {
//   display: flex;
//   gap: 8px;
//   overflow-x: auto;
//   padding-bottom: 16px;
// }

// .category-tab {
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   padding: 12px 20px;
//   border: none;
//   background: #f8f9fa;
//   border-radius: 12px;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   white-space: nowrap;
//   min-width: fit-content;
//   font-weight: 500;
// }

// .category-tab:hover {
//   background: #e9ecef;
//   transform: translateY(-2px);
// }

// .category-tab.active {
//   background: #007bff;
//   color: white;
//   box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
// }

// .tab-count {
//   font-size: 12px;
//   opacity: 0.8;
//   font-weight: 600;
// }

// /* Grid Layouts */
// .categories-grid, .courses-grid {
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//   gap: 24px;
// }

// /* Card Base Styles */
// .category-card, .course-card {
//   background: white;
//   border-radius: 16px;
//   overflow: hidden;
//   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
//   transition: all 0.3s ease;
//   border: 1px solid rgba(0, 0, 0, 0.05);
// }

// .category-card:hover, .course-card:hover {
//   transform: translateY(-6px);
//   box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
// }

// /* Image Container */
// .card-image-container {
//   position: relative;
//   width: 100%;
//   height: 180px;
//   overflow: hidden;
// }

// .card-image {
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   transition: transform 0.3s ease;
// }

// .category-card:hover .card-image,
// .course-card:hover .card-image {
//   transform: scale(1.05);
// }

// /* Badges */
// .progress-badge, .completed-badge, .saved-badge {
//   position: absolute;
//   top: 12px;
//   right: 12px;
//   padding: 6px 12px;
//   border-radius: 20px;
//   font-size: 12px;
//   font-weight: 600;
//   backdrop-filter: blur(10px);
//   border: 1px solid rgba(255, 255, 255, 0.2);
// }

// .progress-badge {
//   background: rgba(245, 87, 108, 0.9);
//   color: white;
// }

// .completed-badge {
//   background: rgba(17, 153, 142, 0.9);
//   color: white;
// }

// .saved-badge {
//   background: rgba(79, 172, 254, 0.9);
//   color: white;
// }

// /* Card Content */
// .card-content {
//   padding: 20px;
//   flex-grow: 1;
// }

// .subcategory-name, .course-category {
//   font-size: 12px;
//   color: #007bff;
//   font-weight: 600;
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
//   margin-bottom: 8px;
// }

// .category-name, .course-name {
//   font-size: 18px;
//   font-weight: 700;
//   color: #2d3748;
//   margin: 0 0 12px 0;
//   line-height: 1.3;
// }

// .course-count {
//   font-size: 14px;
//   color: #718096;
//   font-weight: 500;
// }

// .author-name {
//   font-size: 14px;
//   color: #718096;
//   font-style: italic;
// }

// /* Card Footer */
// .card-footer {
//   padding: 0 20px 20px;
// }

// .view-btn {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 8px;
//   width: 100%;
//   padding: 12px 20px;
//   border: 2px solid #007bff;
//   background: transparent;
//   color: #007bff;
//   border-radius: 12px;
//   cursor: pointer;
//   font-size: 14px;
//   font-weight: 600;
//   transition: all 0.3s ease;
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
// }

// .view-btn:hover {
//   background: #007bff;
//   color: white;
//   transform: translateY(-2px);
//   box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
// }

// .btn-icon {
//   font-size: 16px;
// }

// /* Category Specific Styling */
// .course-completed {
//   border-left: 4px solid #11998e;
// }

// .course-ongoing {
//   border-left: 4px solid #f5576c;
// }

// .course-saved {
//   border-left: 4px solid #4facfe;
// }

// /* Empty State */
// .empty-state {
//   text-align: center;
//   padding: 80px 20px;
//   color: #666;
// }

// .empty-icon {
//   font-size: 64px;
//   margin-bottom: 20px;
//   opacity: 0.7;
// }

// .empty-state h3 {
//   margin-bottom: 12px;
//   color: #333;
//   font-size: 24px;
// }

// .empty-state p {
//   font-size: 16px;
//   color: #718096;
// }

// /* Responsive Design */
// @media (max-width: 768px) {
//   .learning-container {
//     padding: 16px;
//   }
  
//   .header-section h1 {
//     font-size: 2rem;
//   }
  
//   .category-tabs {
//     flex-direction: column;
//     gap: 8px;
//   }
  
//   .category-tab {
//     justify-content: center;
//   }
  
//   .categories-grid, .courses-grid {
//     grid-template-columns: 1fr;
//     gap: 16px;
//   }
  
//   .card-image-container {
//     height: 160px;
//   }
// }

// @media (max-width: 480px) {
//   .header-section h1 {
//     font-size: 1.75rem;
//   }
  
//   .category-name, .course-name {
//     font-size: 16px;
//   }
  
//   .card-content {
//     padding: 16px;
//   }
  
//   .card-footer {
//     padding: 0 16px 16px;
//   }
// }