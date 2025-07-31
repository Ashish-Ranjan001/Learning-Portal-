
// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Course } from '../../../models/course';
// import { SmeServicesService } from '../../../services/smes/sme-services.service';
// import { LobServicesService } from '../../../services/lobs/lob-services.service';

// import { CategoriesServiceService } from '../../../services/Categories/categories-service.service';

// @Component({
//   selector: 'app-course-form',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './course-form.component.html',
//   styleUrl: './course-form.component.css'
// })
// export class CourseFormComponent implements OnInit {
//   @Input() courseData: Course = {
//     name: '',
//     category: '',
//     description: '',
//     smeId: '',
//     lobId: '',
//     author: ''
//   };
//   @Output() formDataChange = new EventEmitter<{ course: Course, thumbnailImage?: File }>();
  
//   thumbnailImage?: File;
//   thumbnailPreview: string | null = null;
  
//   // We'll now load categories from the API instead of hardcoding them
//   categories: any[] = [];
//   smeList: any[] = [];
//   lobList: any[] = [];
  
//   loadingData: boolean = false;
//   errorMessage: string = '';

//   constructor(
//     private smeService: SmeServicesService,
//     private lobService: LobServicesService,
//     private categoriesService: CategoriesServiceService
//   ) {}

//   ngOnInit(): void {
//     this.loadingData = true;
    
//     // Load SMEs, LOBs, and Categories in parallel
//     Promise.all([
//       this.loadSmes(),
//       this.loadLobs(),
//       this.loadCategories()
//     ])
//     .finally(() => {
//       this.loadingData = false;
//     });
//   }

//   loadSmes(): Promise<void> {
//     return new Promise<void>((resolve) => {
//       this.smeService.viewSmes().subscribe({
//         next: (response: any) => {
//           console.log('SMEs received:', response);
          
//           if (Array.isArray(response)) {
//             this.smeList = response;
//           } else if (response && response.data && Array.isArray(response.data)) {
//             this.smeList = response.data;
//           } else {
//             console.error('Unexpected SME response format:', response);
//             this.smeList = [];
//             this.errorMessage = 'Failed to load SME data. Please refresh the page.';
//           }
          
//           console.log('SME List after processing:', this.smeList);
//           resolve();
//         },
//         error: (error: any) => {
//           console.error('Error loading SMEs:', error);
//           this.smeList = [];
//           this.errorMessage = 'Failed to load SME data. Please refresh the page.';
//           resolve();
//         }
//       });
//     });
//   }

//   loadLobs(): Promise<void> {
//     return new Promise<void>((resolve) => {
//       this.lobService.viewLobs().subscribe({
//         next: (response: any) => {
//           console.log('LOBs received:', response);
          
//           if (Array.isArray(response)) {
//             this.lobList = response;
//           } else if (response && response.data && Array.isArray(response.data)) {
//             this.lobList = response.data;
//           } else {
//             console.error('Unexpected LOB response format:', response);
//             this.lobList = [];
//             this.errorMessage = 'Failed to load LOB data. Please refresh the page.';
//           }
          
//           console.log('LOB List after processing:', this.lobList);
//           resolve();
//         },
//         error: (error: any) => {
//           console.error('Error loading LOBs:', error);
//           this.lobList = [];
//           this.errorMessage = 'Failed to load LOB data. Please refresh the page.';
//           resolve();
//         }
//       });
//     });
//   }

//   loadCategories(): Promise<void> {
//     return new Promise<void>((resolve) => {
//       this.categoriesService.getCategories().subscribe({
//         next: (response: any) => {
//           console.log('Categories received:', response);
          
//           if (Array.isArray(response)) {
//             this.categories = response;
//           } else if (response && response.data && Array.isArray(response.data)) {
//             this.categories = response.data;
//             console.log('Categories yash List:', this.categories);
//           } else {
//             console.error('Unexpected Categories response format:', response);
//             this.categories = [];
//             this.errorMessage = 'Failed to load Categories data. Please refresh the page.';
//           }
          
//           console.log('Categories List after processing:', this.categories);
//           resolve();
//         },
//         error: (error: any) => {
//           console.error('Error loading Categories:', error);
//           this.categories = [];
//           this.errorMessage = 'Failed to load Categories data. Please refresh the page.';
//           resolve();
//         }
//       });
//     });
//   }

//   onThumbnailChange(event: Event): void {
//     const input = event.target as HTMLInputElement;
    
//     if (input.files && input.files.length > 0) {
//       this.thumbnailImage = input.files[0];
      
//       // Create preview
//       const reader = new FileReader();
//       reader.onload = () => {
//         this.thumbnailPreview = reader.result as string;
//       };
//       reader.readAsDataURL(this.thumbnailImage);
      
//       this.emitFormData();
//     }
//   }

//   onFormChange(): void {
//     this.emitFormData();
//   }
  
//   onDragOver(event: DragEvent): void {
//     event.preventDefault();
//     event.stopPropagation();
//   }
  
//   onDrop(event: DragEvent): void {
//     event.preventDefault();
//     event.stopPropagation();
    
//     if (event.dataTransfer && event.dataTransfer.files.length > 0) {
//       const file = event.dataTransfer.files[0];
//       if (file.type.startsWith('image/')) {
//         this.thumbnailImage = file;
        
//         // Create preview
//         const reader = new FileReader();
//         reader.onload = () => {
//           this.thumbnailPreview = reader.result as string;
//         };
//         reader.readAsDataURL(this.thumbnailImage);
        
//         this.emitFormData();
//       }
//     }
//   }

//   emitFormData(): void {
//     this.formDataChange.emit({
//       course: this.courseData,
//       thumbnailImage: this.thumbnailImage
//     });
//   }
// }



import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Course } from '../../../models/course';
import { SmeServicesService } from '../../../services/smes/sme-services.service';
import { LobServicesService } from '../../../services/lobs/lob-services.service';

import { CategoriesServiceService } from '../../../services/Categories/categories-service.service';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})
export class CourseFormComponent implements OnInit {
  @Input() courseData: Course = {
    name: '',
    category: '',
    description: '',
    smeId: '',
    lobId: '',
    author: ''
  };
  @Output() formDataChange = new EventEmitter<{ course: Course, thumbnailImage?: File }>();
  
  thumbnailImage?: File;
  thumbnailPreview: string | null = null;
  
  // We'll now load categories from the API instead of hardcoding them
  categories: any[] = [];
  smeList: any[] = [];
  lobList: any[] = [];
  
  loadingData: boolean = false;
  errorMessage: string = '';

  constructor(
    private smeService: SmeServicesService,
    private lobService: LobServicesService,
    private categoriesService: CategoriesServiceService
  ) {}

  ngOnInit(): void {
    this.loadingData = true;
    
    // Load SMEs, LOBs, and Categories in parallel
    Promise.all([
      this.loadSmes(),
      this.loadLobs(),
      this.loadCategories()
    ])
    .finally(() => {
      this.loadingData = false;
    });
  }

  loadSmes(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.smeService.viewSmes().subscribe({
        next: (response: any) => {
          console.log('SMEs received:', response);
          
          let smeData: any[] = [];
          
          if (Array.isArray(response)) {
            smeData = response;
          } else if (response && response.data && Array.isArray(response.data)) {
            smeData = response.data;
          } else {
            console.error('Unexpected SME response format:', response);
            this.smeList = [];
            this.errorMessage = 'Failed to load SME data. Please refresh the page.';
            resolve();
            return;
          }
          
          // Filter only active SMEs (status: true)
          this.smeList = smeData.filter(sme => sme.status === true);
          
          console.log('SME List after processing and filtering:', this.smeList);
          resolve();
        },
        error: (error: any) => {
          console.error('Error loading SMEs:', error);
          this.smeList = [];
          this.errorMessage = 'Failed to load SME data. Please refresh the page.';
          resolve();
        }
      });
    });
  }

  loadLobs(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.lobService.viewLobs().subscribe({
        next: (response: any) => {
          console.log('LOBs received:', response);
          
          let lobData: any[] = [];
          
          if (Array.isArray(response)) {
            lobData = response;
          } else if (response && response.data && Array.isArray(response.data)) {
            lobData = response.data;
          } else {
            console.error('Unexpected LOB response format:', response);
            this.lobList = [];
            this.errorMessage = 'Failed to load LOB data. Please refresh the page.';
            resolve();
            return;
          }
          
          // Filter only active LOBs (status: true)
          this.lobList = lobData.filter(lob => lob.status === true);
          
          console.log('LOB List after processing and filtering:', this.lobList);
          resolve();
        },
        error: (error: any) => {
          console.error('Error loading LOBs:', error);
          this.lobList = [];
          this.errorMessage = 'Failed to load LOB data. Please refresh the page.';
          resolve();
        }
      });
    });
  }

  loadCategories(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.categoriesService.getCategories().subscribe({
        next: (response: any) => {
          console.log('Categories received:', response);
          
          let categoryData: any[] = [];
          
          if (Array.isArray(response)) {
            categoryData = response;
          } else if (response && response.data && Array.isArray(response.data)) {
            categoryData = response.data;
            console.log('Categories yash List:', categoryData);
          } else {
            console.error('Unexpected Categories response format:', response);
            this.categories = [];
            this.errorMessage = 'Failed to load Categories data. Please refresh the page.';
            resolve();
            return;
          }
          
          // Filter only active Categories (status: true)
          this.categories = categoryData.filter(category => category.status === true);
          
          console.log('Categories List after processing and filtering:', this.categories);
          resolve();
        },
        error: (error: any) => {
          console.error('Error loading Categories:', error);
          this.categories = [];
          this.errorMessage = 'Failed to load Categories data. Please refresh the page.';
          resolve();
        }
      });
    });
  }

  onThumbnailChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length > 0) {
      this.thumbnailImage = input.files[0];
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        this.thumbnailPreview = reader.result as string;
      };
      reader.readAsDataURL(this.thumbnailImage);
      
      this.emitFormData();
    }
  }

  onFormChange(): void {
    this.emitFormData();
  }
  
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }
  
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        this.thumbnailImage = file;
        
        // Create preview
        const reader = new FileReader();
        reader.onload = () => {
          this.thumbnailPreview = reader.result as string;
        };
        reader.readAsDataURL(this.thumbnailImage);
        
        this.emitFormData();
      }
    }
  }

  emitFormData(): void {
    this.formDataChange.emit({
      course: this.courseData,
      thumbnailImage: this.thumbnailImage
    });
  }
}