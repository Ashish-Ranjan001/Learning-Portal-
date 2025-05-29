// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { UserLearningService, CategoryWithCoursesDto } from "../../../services/user-learning.service";
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-categories',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   template: `
//     <div class="container-fluid">
//       <!-- Header -->
//       <div class="row mb-4">
//         <div class="col-12">
//           <nav aria-label="breadcrumb">
//             <ol class="breadcrumb">
//               <li class="breadcrumb-item"><a routerLink="/" class="text-primary">Home</a></li>
//               <li class="breadcrumb-item active" aria-current="page">Categories</li>
//             </ol>
//           </nav>
//         </div>
//       </div>

//       <!-- Debug Info (Remove in production) -->
//       <div class="alert alert-info mb-4" *ngIf="!loading">
//         <strong>Debug Info:</strong>
//         <br>Categories count: {{ categories.length }}
//         <br>Loading: {{ loading }}
//         <br>Error: {{ error || 'None' }}
//         <br>Raw data: {{ categories | json }}
//       </div>

//       <!-- Loading State -->
//       <div *ngIf="loading" class="d-flex justify-content-center py-5">
//         <div class="spinner-border text-primary" role="status">
//           <span class="visually-hidden">Loading...</span>
//         </div>
//       </div>

//       <!-- Error State -->
//       <div *ngIf="error" class="alert alert-danger" role="alert">
//         <i class="fas fa-exclamation-triangle me-2"></i>
//         {{ error }}
//         <button class="btn btn-outline-danger ms-2" (click)="loadCategories()">
//           <i class="fas fa-redo me-1"></i>Retry
//         </button>
//       </div>

//       <!-- Categories Grid -->
//       <div *ngIf="!loading && !error && categories && categories.length > 0" class="row">
//         <div class="col-12">
//           <h2 class="mb-4">
//             <i class="fas fa-layer-group me-2"></i>Course Categories
//           </h2>
//         </div>
        
//         <div class="col-lg-4 col-md-6 mb-4" *ngFor="let category of categories; trackBy: trackByCategory; let i = index">
//           <div class="category-card h-100" 
//                (click)="viewCategoryCourses(category.id, category.name)"
//                role="button"
//                tabindex="0"
//                (keydown.enter)="viewCategoryCourses(category.id, category.name)"
//                (keydown.space)="viewCategoryCourses(category.id, category.name)">
//             <div class="card h-100 border-0 shadow-sm hover-lift">
//               <div class="card-img-container">
//                 <div class="category-image bg-gradient-primary">
//                   <div class="category-icon">
//                     <i class="fas fa-graduation-cap fa-3x text-white"></i>
//                   </div>
//                   <div class="category-overlay"></div>
//                 </div>
//               </div>
//               <div class="card-body d-flex flex-column">
//                 <h5 class="card-title text-center mb-3 fw-bold">
//                   {{ category.name }}
//                 </h5>
//                 <p class="card-text text-muted flex-grow-1 text-center">
//                   {{ category.description }}
//                 </p>
//                 <div class="text-center mt-auto">
//                   <div class="d-flex justify-content-between align-items-center mb-3">
//                     <span class="badge bg-primary rounded-pill px-3 py-2">
//                       <i class="fas fa-book me-1"></i>
//                       {{ category.courseCount }} Course{{ category.courseCount !== 1 ? 's' : '' }}
//                     </span>
//                     <i class="fas fa-arrow-right text-primary"></i>
//                   </div>
//                   <button class="btn btn-outline-primary btn-sm w-100">
//                     <i class="fas fa-eye me-1"></i>View Courses
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <!-- Empty State -->
//       <div *ngIf="!loading && !error && (!categories || categories.length === 0)" class="text-center py-5">
//         <div class="empty-state">
//           <i class="fas fa-folder-open fa-4x text-muted mb-4"></i>
//           <h4 class="text-muted mb-3">No Categories Available</h4>
//           <p class="text-muted mb-4">There are no course categories available at the moment.</p>
//           <button class="btn btn-primary" (click)="loadCategories()">
//             <i class="fas fa-refresh me-2"></i>Refresh
//           </button>
//         </div>
//       </div>
//     </div>
//   `,
//   styles: [`
//     /* Categories Component Styles */
//     .category-card {
//       cursor: pointer;
//       transition: all 0.3s ease;
//     }

//     .category-card:hover {
//       transform: translateY(-5px);
//     }

//     .category-card .card {
//       border-radius: 12px;
//       overflow: hidden;
//       transition: all 0.3s ease;
//     }

//     .category-card:hover .card {
//       box-shadow: 0 10px 25px rgba(0, 123, 255, 0.15) !important;
//     }

//     .card-img-container {
//       position: relative;
//       height: 200px;
//       overflow: hidden;
//     }

//     .category-image {
//       height: 100%;
//       background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       position: relative;
//     }

//     .bg-gradient-primary {
//       background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
//     }

//     .category-icon {
//       z-index: 2;
//       position: relative;
//     }

//     .category-overlay {
//       position: absolute;
//       top: 0;
//       left: 0;
//       right: 0;
//       bottom: 0;
//       background: rgba(0, 0, 0, 0.1);
//       opacity: 0;
//       transition: opacity 0.3s ease;
//     }

//     .category-card:hover .category-overlay {
//       opacity: 1;
//     }

//     .hover-lift {
//       transition: transform 0.3s ease, box-shadow 0.3s ease;
//     }

//     .category-card:hover .hover-lift {
//       transform: translateY(-2px);
//       box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
//     }

//     .card-title {
//       color: #2c3e50;
//       font-weight: 600;
//     }

//     .badge {
//       font-size: 0.85rem;
//       padding: 0.5rem 1rem;
//     }

//     .empty-state {
//       max-width: 400px;
//       margin: 0 auto;
//     }

//     .empty-state i {
//       opacity: 0.5;
//     }

//     /* Responsive adjustments */
//     @media (max-width: 768px) {
//       .category-card .card-body {
//         padding: 1rem;
//       }
      
//       .card-img-container {
//         height: 150px;
//       }
      
//       .category-icon i {
//         font-size: 2rem !important;
//       }
//     }

//     /* Focus styles for accessibility */
//     .category-card:focus {
//       outline: 2px solid #007bff;
//       outline-offset: 2px;
//       border-radius: 12px;
//     }

//     .spinner-border {
//       width: 3rem;
//       height: 3rem;
//     }
//   `]
// })
// export class CategoriesComponent implements OnInit {
//   categories: CategoryWithCoursesDto[] = []; // Changed to proper type
//   loading = true;
//   error = '';
//   userId = '';

//   constructor(
//     private userLearningService: UserLearningService,
//     private router: Router
//   ) {
//     // TODO: Get userId from your authentication service
//     this.userId = localStorage.getItem('userId') || 'user-id-placeholder';
//   }

//   ngOnInit(): void {
//     this.loadCategories();
//   }

//   loadCategories(): void {
//     this.loading = true;
//     this.error = ''; // Reset error state
    
//     this.userLearningService.getAllCategories(this.userId).subscribe({
//       next: (categories) => {
//         console.log('Raw categories data:', categories);
        
//         // Handle the response according to your service interface
//         if (Array.isArray(categories)) {
//           this.categories = categories;
//         } else {
//           // If the API returns a different structure, handle it here
//           console.warn('Unexpected categories data structure:', categories);
//           this.categories = [];
//         }
        
//         this.loading = false;
//         console.log('Processed categories:', this.categories);
//       },
//       error: (error) => {
//         this.error = 'Failed to load categories';
//         this.loading = false;
//         console.error('Error loading categories:', error);
//       }
//     });
//   }

//   viewCategoryCourses(categoryId: string, categoryName: string): void {
//     console.log('Navigating to courses for category:', categoryId, categoryName);
//     if (categoryId) {
//       this.router.navigate(['/courses', categoryId], { 
//         queryParams: { categoryName: categoryName } 
//       });
//     } else {
//       console.error('Category ID is missing');
//     }
//   }

//   trackByCategory(index: number, category: CategoryWithCoursesDto): string {
//     return category.id || index.toString();
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLearningService, CategoryWithCoursesDto } from "../../../services/user-learning.service";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
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
              <li class="breadcrumb-item active" aria-current="page">Categories</li>
            </ol>
          </nav>
        </div>
      </div>

      <!-- Debug Info (Remove in production) -->
      <div class="alert alert-info mb-4" *ngIf="!loading">
        <strong>Debug Info:</strong>
        <br>Categories count: {{ categories.length }}
        <br>Loading: {{ loading }}
        <br>Error: {{ error || 'None' }}
        <br>Raw data: {{ categories | json }}
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="d-flex justify-content-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!-- Error State -->
      <div *ngIf="error" class="alert alert-danger" role="alert">
        <i class="fas fa-exclamation-triangle me-2"></i>
        {{ error }}
        <button class="btn btn-outline-danger ms-2" (click)="loadCategories()">
          <i class="fas fa-redo me-1"></i>Retry
        </button>
      </div>

      <!-- Categories Grid -->
      <div *ngIf="!loading && !error && categories && categories.length > 0" class="row">
        <div class="col-12">
          <h2 class="mb-4">
            <i class="fas fa-layer-group me-2"></i>Course Categories
          </h2>
        </div>
        
        <div class="col-lg-4 col-md-6 mb-4" *ngFor="let category of categories; trackBy: trackByCategory; let i = index">
          <div class="category-card h-100" 
               (click)="viewCategoryCourses(category.id, category.name)"
               role="button"
               tabindex="0"
               (keydown.enter)="viewCategoryCourses(category.id, category.name)"
               (keydown.space)="viewCategoryCourses(category.id, category.name)">
            <div class="card h-100 border-0 shadow-sm hover-lift">
              <div class="card-img-container">
                <!-- Updated to use actual image from API -->
                <div class="category-image" [style.background-image]="getCategoryImageStyle(category)">
                  <!-- Fallback icon if image fails to load -->
                  <div class="category-icon" *ngIf="!category.imagePath">
                    <i class="fas fa-graduation-cap fa-3x text-white"></i>
                  </div>
                  <!-- Image error handling -->
                  <img 
                    *ngIf="category.imagePath" 
                    [src]="category.imagePath" 
                    [alt]="category.name"
                    class="category-img"
                    (error)="onImageError($event)"
                    (load)="onImageLoad($event)">
                  <div class="category-overlay"></div>
                </div>
              </div>
              <div class="card-body d-flex flex-column">
                <h5 class="card-title text-center mb-3 fw-bold">
                  {{ category.name }}
                </h5>
                <p class="card-text text-muted flex-grow-1 text-center">
                  {{ category.description }}
                </p>
                <div class="text-center mt-auto">
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="badge bg-primary rounded-pill px-3 py-2">
                      <i class="fas fa-book me-1"></i>
                      {{ category.courseCount }} Course{{ category.courseCount !== 1 ? 's' : '' }}
                    </span>
                    <i class="fas fa-arrow-right text-primary"></i>
                  </div>
                  <button class="btn btn-outline-primary btn-sm w-100">
                    <i class="fas fa-eye me-1"></i>View Courses
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="!loading && !error && (!categories || categories.length === 0)" class="text-center py-5">
        <div class="empty-state">
          <i class="fas fa-folder-open fa-4x text-muted mb-4"></i>
          <h4 class="text-muted mb-3">No Categories Available</h4>
          <p class="text-muted mb-4">There are no course categories available at the moment.</p>
          <button class="btn btn-primary" (click)="loadCategories()">
            <i class="fas fa-refresh me-2"></i>Refresh
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Categories Component Styles */
    .category-card {
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .category-card:hover {
      transform: translateY(-5px);
    }

    .category-card .card {
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .category-card:hover .card {
      box-shadow: 0 10px 25px rgba(0, 123, 255, 0.15) !important;
    }

    .card-img-container {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .category-image {
      height: 100%;
      background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .category-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
    }

    .bg-gradient-primary {
      background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    }

    .category-icon {
      z-index: 2;
      position: relative;
    }

    .category-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.1);
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1;
    }

    .category-card:hover .category-overlay {
      opacity: 1;
    }

    .hover-lift {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .category-card:hover .hover-lift {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .card-title {
      color: #2c3e50;
      font-weight: 600;
    }

    .badge {
      font-size: 0.85rem;
      padding: 0.5rem 1rem;
    }

    .empty-state {
      max-width: 400px;
      margin: 0 auto;
    }

    .empty-state i {
      opacity: 0.5;
    }

    /* Image error handling */
    .category-img.error {
      display: none;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .category-card .card-body {
        padding: 1rem;
      }
      
      .card-img-container {
        height: 150px;
      }
      
      .category-icon i {
        font-size: 2rem !important;
      }
    }

    /* Focus styles for accessibility */
    .category-card:focus {
      outline: 2px solid #007bff;
      outline-offset: 2px;
      border-radius: 12px;
    }

    .spinner-border {
      width: 3rem;
      height: 3rem;
    }
  `]
})
export class CategoriesComponent implements OnInit {
  categories: CategoryWithCoursesDto[] = [];
  loading = true;
  error = '';
  userId = '';

  constructor(
    private userLearningService: UserLearningService,
    private router: Router
  ) {
    // TODO: Get userId from your authentication service
    this.userId = localStorage.getItem('userId') || 'user-id-placeholder';
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.error = '';
    
    this.userLearningService.getAllCategories(this.userId).subscribe({
      next: (categories) => {
        console.log('Raw categories data:', categories);
        
        if (Array.isArray(categories)) {
          this.categories = categories;
        } else {
          console.warn('Unexpected categories data structure:', categories);
          this.categories = [];
        }
        
        this.loading = false;
        console.log('Processed categories:', this.categories);
      },
      error: (error) => {
        this.error = 'Failed to load categories';
        this.loading = false;
        console.error('Error loading categories:', error);
      }
    });
  }

  getCategoryImageStyle(category: CategoryWithCoursesDto): string {
    if (category.imagePath) {
      return `url('${category.imagePath}')`;
    }
    return 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)';
  }

  onImageError(event: any): void {
    console.error('Image failed to load:', event.target.src);
    event.target.style.display = 'none';
    // Show fallback icon
    const container = event.target.parentElement;
    if (container) {
      const icon = container.querySelector('.category-icon');
      if (icon) {
        icon.style.display = 'flex';
      }
    }
  }

  onImageLoad(event: any): void {
    console.log('Image loaded successfully:', event.target.src);
  }

  viewCategoryCourses(categoryId: string, categoryName: string): void {
    console.log('Navigating to courses for category:', categoryId, categoryName);
    if (categoryId) {
      this.router.navigate(['/courses', categoryId], { 
        queryParams: { categoryName: categoryName } 
      });
    } else {
      console.error('Category ID is missing');
    }
  }

  trackByCategory(index: number, category: CategoryWithCoursesDto): string {
    return category.id || index.toString();
  }
}