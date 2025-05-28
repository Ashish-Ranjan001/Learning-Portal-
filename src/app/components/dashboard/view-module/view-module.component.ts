
// import { Component, OnInit, Input } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';

// import { CourseModule } from '../../../models/course-module';
// import { CourseServicesService } from '../../../services/courses/course-services.service';

// @Component({
//   selector: 'app-view-module',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './view-module.component.html',
//   styleUrl: './view-module.component.css'
// })
// export class ViewModuleComponent implements OnInit {
//   @Input() courseId!: string; // Course ID passed from parent component
  
//   modules: CourseModule[] = [];
//   filteredModules: CourseModule[] = [];
//   searchTerm: string = '';
  
//   // Pagination properties
//   currentPage: number = 1;
//   itemsPerPage: number = 10;
//   totalPages: number = 0;
//   pages: number[] = [];
  
//   constructor(private courseService: CourseServicesService, private route: ActivatedRoute) {}
  
//   ngOnInit(): void {
//     console.log('Course ID received:', this.courseId);
    
//     // Try to get course ID from route immediately
//     this.tryGetCourseIdFromRoute();
    
//     // Also add a delay to check for Input courseId
//     setTimeout(() => {
//       console.log('Course ID after timeout:', this.courseId);
//       if (this.courseId) {
//         this.loadModules();
//       }
//     }, 100);
//   }
  
//   loadModules(): void {
//     console.log('Loading modules for course ID:', this.courseId);
    
//     // Check if courseId is available
//     if (!this.courseId) {
//       console.error('Course ID is not provided!');
//       return;
//     }

//     // Reset modules to prevent issues with duplicate calls
//     this.modules = [];
//     this.filteredModules = [];
    
//     // Use the specific API endpoint
//     this.courseService.getModulesByCourseId(this.courseId).subscribe({
//       next: (response: any) => {
//         console.log('API Response:', response);
        
//         // Extract the data array from the response object
//         const data = response.data || [];
//         console.log('Data array:', data);
//         console.log('Data array length:', data.length);
        
//         if (data.length === 0) {
//           console.log('No modules found for course ID:', this.courseId);
//         }
        
//         // Simply map the response data to modules
//         this.modules = data.map((item: any) => ({
//           id: item.module_id, // Use module_id as the main ID
//           module_id: item.module_id,
//           courseId: item.course_id,
//           modulename: item.modulename || 'Untitled Module', // Handle empty module names
//           duration: item.duration || 0,
//           description: item.description || 'No description available',
//           videoFile: item.videoFile || null,
//           pdfFile: item.pdfFile || null
//         }));
        
//         this.filteredModules = [...this.modules];
//         this.setupPagination();
        
//         console.log('Processed modules count:', this.modules.length);
//         console.log('Processed modules:', this.modules);
//       },
//       error: (error) => {
//         console.error('Error loading modules by course ID:', error);
//         console.error('Error details:', error.error);
//       }
//     });
//   }
  
//   search(): void {
//     if (!this.searchTerm.trim()) {
//       this.filteredModules = [...this.modules];
//     } else {
//       this.filteredModules = this.modules.filter(module =>
//         module.modulename.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//         module.description.toLowerCase().includes(this.searchTerm.toLowerCase())
//       );
//     }
//     this.currentPage = 1;
//     this.setupPagination();
//   }
  
//   setupPagination(): void {
//     this.totalPages = Math.ceil(this.filteredModules.length / this.itemsPerPage);
//     this.pages = [];
    
//     const startPage = Math.max(1, this.currentPage - 2);
//     const endPage = Math.min(this.totalPages, this.currentPage + 2);
    
//     for (let i = startPage; i <= endPage; i++) {
//       this.pages.push(i);
//     }
//   }
  
//   get paginatedModules(): CourseModule[] {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     const endIndex = startIndex + this.itemsPerPage;
//     return this.filteredModules.slice(startIndex, endIndex);
//   }
  
//   goToPage(page: number): void {
//     this.currentPage = page;
//     this.setupPagination();
//   }
  
//   goToFirstPage(): void {
//     this.currentPage = 1;
//     this.setupPagination();
//   }
  
//   goToPreviousPage(): void {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//       this.setupPagination();
//     }
//   }
  
//   goToNextPage(): void {
//     if (this.currentPage < this.totalPages) {
//       this.currentPage++;
//       this.setupPagination();
//     }
//   }
  
//   goToLastPage(): void {
//     this.currentPage = this.totalPages;
//     this.setupPagination();
//   }
  
//   editModule(module: CourseModule): void {
//     console.log('dashboard/module/edit', module);
//     // Implement edit functionality
//   }
  
//   viewModule(module: CourseModule): void {
//     console.log('View module:', module);
//     // Implement view functionality
//   }
  
//   formatDuration(duration: string | number): string {
//     if (typeof duration === 'number') {
//       return `${duration} mins`;
//     }
//     return duration.toString();
//   }
  
//   getModuleId(module: any): string {
//     return module.module_id || module.id || 'N/A';
//   }
  
//   private tryGetCourseIdFromRoute(): void {
//     console.log('Attempting to get course ID from route...');
    
//     // Method 1: Try to get from direct route params
//     this.route.params.subscribe(params => {
//       console.log('Route params:', params);
      
//       // Check for common parameter names
//       if (params['courseId']) {
//         this.courseId = params['courseId'];
//         console.log('Got course ID from route params (courseId):', this.courseId);
//         this.loadModules();
//         return;
//       }
      
//       if (params['id']) {
//         this.courseId = params['id'];
//         console.log('Got course ID from route params (id):', this.courseId);
//         this.loadModules();
//         return;
//       }
//     });

//     // Method 2: Get from URL segments - this should work for your URL structure
//     const urlSegments = this.route.snapshot.url;
//     console.log('URL segments:', urlSegments);
    
//     if (urlSegments.length > 0) {
//       // Get the last segment which should be your course ID
//       const lastSegment = urlSegments[urlSegments.length - 1];
//       if (lastSegment && lastSegment.path) {
//         this.courseId = lastSegment.path;
//         console.log('Got course ID from last URL segment:', this.courseId);
//         this.loadModules();
//         return;
//       }
//     }

//     // Method 3: Try to get from parent route
//     this.route.parent?.params.subscribe(parentParams => {
//       console.log('Parent route params:', parentParams);
//       if (parentParams['courseId']) {
//         this.courseId = parentParams['courseId'];
//         console.log('Got course ID from parent route:', this.courseId);
//         this.loadModules();
//         return;
//       }
//     });

//     // Method 4: Try to get from query parameters
//     this.route.queryParams.subscribe(queryParams => {
//       console.log('Query params:', queryParams);
//       if (queryParams['courseId']) {
//         this.courseId = queryParams['courseId'];
//         console.log('Got course ID from query params:', this.courseId);
//         this.loadModules();
//         return;
//       }
//     });

//     // Method 5: Extract from full URL as last resort
//     const fullUrl = window.location.pathname;
//     console.log('Full URL:', fullUrl);
    
//     // Split the URL and get the last part
//     const urlParts = fullUrl.split('/').filter(part => part.length > 0);
//     console.log('URL parts:', urlParts);
    
//     if (urlParts.length > 0) {
//       const lastPart = urlParts[urlParts.length - 1];
//       // Check if it looks like a course ID (contains letters, numbers, hyphens)
//       if (lastPart && /^[A-Z0-9\-]+$/.test(lastPart)) {
//         this.courseId = lastPart;
//         console.log('Got course ID from URL parsing:', this.courseId);
//         this.loadModules();
//         return;
//       }
//     }

//     // Method 6: Try pattern matching for course ID in URL
//     const courseMatch = fullUrl.match(/\/([A-Z]+-[A-Z]+-\d{8}-\d{6}-[A-Z0-9]+)$/);
//     if (courseMatch && courseMatch[1]) {
//       this.courseId = courseMatch[1];
//       console.log('Got course ID from pattern match:', this.courseId);
//       this.loadModules();
//       return;
//     }

//     console.error('Could not find course ID from any source');
//     console.log('Available route data:', {
//       params: this.route.snapshot.params,
//       queryParams: this.route.snapshot.queryParams,
//       url: this.route.snapshot.url,
//       data: this.route.snapshot.data
//     });
//   }
// }


import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CourseModule } from '../../../models/course-module';
import { CourseServicesService } from '../../../services/courses/course-services.service';

@Component({
  selector: 'app-view-module',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-module.component.html',
  styleUrl: './view-module.component.css'
})
export class ViewModuleComponent implements OnInit {
  @Input() courseId!: string; // Course ID passed from parent component
  
  modules: CourseModule[] = [];
  filteredModules: CourseModule[] = [];
  searchTerm: string = '';
  
  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  pages: number[] = [];
  
  constructor(private courseService: CourseServicesService, private route: ActivatedRoute, private router: Router) {}
  
  ngOnInit(): void {
    console.log('Course ID received:', this.courseId);
    
    // Try to get course ID from route immediately
    this.tryGetCourseIdFromRoute();
    
    // Also add a delay to check for Input courseId
    setTimeout(() => {
      console.log('Course ID after timeout:', this.courseId);
      if (this.courseId) {
        this.loadModules();
      }
    }, 100);
  }
  
  loadModules(): void {
    console.log('Loading modules for course ID:', this.courseId);
    
    // Check if courseId is available
    if (!this.courseId) {
      console.error('Course ID is not provided!');
      return;
    }

    // Reset modules to prevent issues with duplicate calls
    this.modules = [];
    this.filteredModules = [];
    
    // Use the specific API endpoint
    this.courseService.getModulesByCourseId(this.courseId).subscribe({
      next: (response: any) => {
        console.log('API Response:', response);
        
        // Extract the data array from the response object
        const data = response.data || [];
        console.log('Data array:', data);
        console.log('Data array length:', data.length);
        
        if (data.length === 0) {
          console.log('No modules found for course ID:', this.courseId);
        }
        
        // Simply map the response data to modules
        this.modules = data.map((item: any) => ({
          id: item.module_id, // Use module_id as the main ID
          module_id: item.module_id,
          courseId: item.course_id,
          modulename: item.modulename || 'Untitled Module', // Handle empty module names
          duration: item.duration || 0,
          description: item.description || 'No description available',
          videoFile: item.videoFile || null,
          pdfFile: item.pdfFile || null
        }));
        
        this.filteredModules = [...this.modules];
        this.setupPagination();
        
        console.log('Processed modules count:', this.modules.length);
        console.log('Processed modules:', this.modules);
      },
      error: (error) => {
        console.error('Error loading modules by course ID:', error);
        console.error('Error details:', error.error);
      }
    });
  }
  
  search(): void {
    if (!this.searchTerm.trim()) {
      this.filteredModules = [...this.modules];
    } else {
      this.filteredModules = this.modules.filter(module =>
        module.modulename.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        module.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.currentPage = 1;
    this.setupPagination();
  }
  
  setupPagination(): void {
    this.totalPages = Math.ceil(this.filteredModules.length / this.itemsPerPage);
    this.pages = [];
    
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, this.currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
      this.pages.push(i);
    }
  }
  
  get paginatedModules(): CourseModule[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredModules.slice(startIndex, endIndex);
  }
  
  goToPage(page: number): void {
    this.currentPage = page;
    this.setupPagination();
  }
  
  goToFirstPage(): void {
    this.currentPage = 1;
    this.setupPagination();
  }
  
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setupPagination();
    }
  }
  
  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.setupPagination();
    }
  }
  
  goToLastPage(): void {
    this.currentPage = this.totalPages;
    this.setupPagination();
  }
  
  editModule(module: CourseModule): void {
    console.log('Navigating to edit module:', module);
    const moduleId = this.getModuleId(module);
    
    // Navigate to edit module page using your routing structure
    this.router.navigate(['/dashboard/module/edit', moduleId]).then(
      (success) => {
        if (success) {
          console.log('Navigation successful to: /dashboard/module/edit/' + moduleId);
        } else {
          console.error('Navigation failed.');
          console.log('Attempted to navigate to:', '/dashboard/module/edit/' + moduleId);
          console.log('Module ID used:', moduleId);
        }
      }
    ).catch((error) => {
      console.error('Navigation error:', error);
    });
  }
  
  viewModule(module: CourseModule): void {
    console.log('View module:', module);
    this.router.navigate([`/dashboard/module/video/${module.module_id}`])
    // Implement view functionality
  }
  
  formatDuration(duration: string | number): string {
    if (typeof duration === 'number') {
      return `${duration} mins`;
    }
    return duration.toString();
  }
  
  getModuleId(module: any): string {
    return module.module_id || module.id || 'N/A';
  }
  
  private tryGetCourseIdFromRoute(): void {
    console.log('Attempting to get course ID from route...');
    
    // Method 1: Try to get from direct route params
    this.route.params.subscribe(params => {
      console.log('Route params:', params);
      
      // Check for common parameter names
      if (params['courseId']) {
        this.courseId = params['courseId'];
        console.log('Got course ID from route params (courseId):', this.courseId);
        this.loadModules();
        return;
      }
      
      if (params['id']) {
        this.courseId = params['id'];
        console.log('Got course ID from route params (id):', this.courseId);
        this.loadModules();
        return;
      }
    });

    // Method 2: Get from URL segments - this should work for your URL structure
    const urlSegments = this.route.snapshot.url;
    console.log('URL segments:', urlSegments);
    
    if (urlSegments.length > 0) {
      // Get the last segment which should be your course ID
      const lastSegment = urlSegments[urlSegments.length - 1];
      if (lastSegment && lastSegment.path) {
        this.courseId = lastSegment.path;
        console.log('Got course ID from last URL segment:', this.courseId);
        this.loadModules();
        return;
      }
    }

    // Method 3: Try to get from parent route
    this.route.parent?.params.subscribe(parentParams => {
      console.log('Parent route params:', parentParams);
      if (parentParams['courseId']) {
        this.courseId = parentParams['courseId'];
        console.log('Got course ID from parent route:', this.courseId);
        this.loadModules();
        return;
      }
    });

    // Method 4: Try to get from query parameters
    this.route.queryParams.subscribe(queryParams => {
      console.log('Query params:', queryParams);
      if (queryParams['courseId']) {
        this.courseId = queryParams['courseId'];
        console.log('Got course ID from query params:', this.courseId);
        this.loadModules();
        return;
      }
    });

    // Method 5: Extract from full URL as last resort
    const fullUrl = window.location.pathname;
    console.log('Full URL:', fullUrl);
    
    // Split the URL and get the last part
    const urlParts = fullUrl.split('/').filter(part => part.length > 0);
    console.log('URL parts:', urlParts);
    
    if (urlParts.length > 0) {
      const lastPart = urlParts[urlParts.length - 1];
      // Check if it looks like a course ID (contains letters, numbers, hyphens)
      if (lastPart && /^[A-Z0-9\-]+$/.test(lastPart)) {
        this.courseId = lastPart;
        console.log('Got course ID from URL parsing:', this.courseId);
        this.loadModules();
        return;
      }
    }

    // Method 6: Try pattern matching for course ID in URL
    const courseMatch = fullUrl.match(/\/([A-Z]+-[A-Z]+-\d{8}-\d{6}-[A-Z0-9]+)$/);
    if (courseMatch && courseMatch[1]) {
      this.courseId = courseMatch[1];
      console.log('Got course ID from pattern match:', this.courseId);
      this.loadModules();
      return;
    }

    console.error('Could not find course ID from any source');
    console.log('Available route data:', {
      params: this.route.snapshot.params,
      queryParams: this.route.snapshot.queryParams,
      url: this.route.snapshot.url,
      data: this.route.snapshot.data
    });
  }
}