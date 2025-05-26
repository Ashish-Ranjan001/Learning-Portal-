// import { CommonModule } from '@angular/common';
// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CourseModule } from '../../../models/course-module';

// @Component({
//   selector: 'app-add-module',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './add-module.component.html',
//   styleUrl: './add-module.component.css'
// })
// export class AddModuleComponent implements OnInit {
//   @Input() moduleData: CourseModule = {
//     name: '',
//     duration: '',
//     description: ''
//   };
//   @Output() formDataChange = new EventEmitter<CourseModule>();

//   videoFile?: File;
//   pdfFile?: File;
//   videoFileName: string = 'No file chosen';
//   pdfFileName: string = 'No file chosen';
//   videoError: string = '';
//   pdfError: string = '';
//   videoPreview: string | null = null;

//   constructor() {}

//   ngOnInit(): void {
//     if (this.moduleData.videoFile) {
//       this.videoFile = this.moduleData.videoFile;
//       this.videoFileName = this.videoFile.name;
//       // Create video preview if possible
//       this.createVideoPreview(this.videoFile);
//     }
    
//     if (this.moduleData.pdfFile) {
//       this.pdfFile = this.moduleData.pdfFile;
//       this.pdfFileName = this.pdfFile.name;
//     }
//   }

//   onVideoFileChange(event: Event): void {
//     const input = event.target as HTMLInputElement;
    
//     if (input.files && input.files.length > 0) {
//       const file = input.files[0];
      
//       if (this.validateVideoFile(file)) {
//         this.videoFile = file;
//         this.videoFileName = file.name;
//         this.videoError = '';
        
//         // Create video preview
//         this.createVideoPreview(file);
        
//         this.updateModuleData();
//       }
//     }
//   }

//   createVideoPreview(file: File): void {
//     // Create a blob URL for video preview
//     this.videoPreview = URL.createObjectURL(file);
//   }

//   onPdfFileChange(event: Event): void {
//     const input = event.target as HTMLInputElement;
    
//     if (input.files && input.files.length > 0) {
//       const file = input.files[0];
      
//       if (this.validatePdfFile(file)) {
//         this.pdfFile = file;
//         this.pdfFileName = file.name;
//         this.pdfError = '';
        
//         this.updateModuleData();
//       }
//     }
//   }

//   validateVideoFile(file: File): boolean {
//     // Check if it's an MP4 file or other common video formats
//     const validVideoExtensions = ['.mp4', '.mov', '.avi', '.webm'];
//     const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
//     if (!validVideoExtensions.includes(fileExtension)) {
//       this.videoError = 'Please upload a video file (MP4, MOV, AVI, or WEBM)';
//       return false;
//     }
    
//     // Check file size (max 100MB)
//     if (file.size > 100 * 1024 * 1024) {
//       this.videoError = 'File size should be less than 100MB';
//       return false;
//     }
    
//     return true;
//   }

//   validatePdfFile(file: File): boolean {
//     // Check if it's a PDF file
//     if (!file.name.toLowerCase().endsWith('.pdf')) {
//       this.pdfError = 'Please upload a PDF file';
//       return false;
//     }
    
//     // Check file size (max 20MB)
//     if (file.size > 20 * 1024 * 1024) {
//       this.pdfError = 'File size should be less than 20MB';
//       return false;
//     }
    
//     return true;
//   }

//   onFormChange(): void {
//     this.updateModuleData();
//   }

//   updateModuleData(): void {
//     this.moduleData = {
//       ...this.moduleData,
//       videoFile: this.videoFile,
//       pdfFile: this.pdfFile
//     };
    
//     this.formDataChange.emit(this.moduleData);
//   }
  
//   clearVideoFile(): void {
//     this.videoFile = undefined;
//     this.videoFileName = 'No file chosen';
//     this.videoError = '';
    
//     if (this.videoPreview) {
//       URL.revokeObjectURL(this.videoPreview);
//       this.videoPreview = null;
//     }
    
//     this.updateModuleData();
//   }
  
//   clearPdfFile(): void {
//     this.pdfFile = undefined;
//     this.pdfFileName = 'No file chosen';
//     this.pdfError = '';
    
//     this.updateModuleData();
//   }
  
//   ngOnDestroy(): void {
//     // Clean up blob URLs to prevent memory leaks
//     if (this.videoPreview) {
//       URL.revokeObjectURL(this.videoPreview);
//     }
//   }
// }
//import {CourseServicesService} from '../../../services/courses/course-services.service'

///////////////////////////////////////////////////////////////////////////

// import { CommonModule } from '@angular/common';
// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CourseModule } from '../../../models/course-module';
// //import { CourseServicesService } from '../../../services/course-services.service';
// import {CourseServicesService} from '../../../services/courses/course-services.service'


// @Component({
//   selector: 'app-add-module',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './add-module.component.html',
//   styleUrl: './add-module.component.css'
// })
// export class AddModuleComponent implements OnInit {
//   @Input() moduleData: CourseModule = {
//     name: '',
//     duration: '',
//     description: ''
//   };
//   @Output() formDataChange = new EventEmitter<CourseModule>();

//   videoFile?: File;
//   pdfFile?: File;
//   videoFileName: string = 'No file chosen';
//   pdfFileName: string = 'No file chosen';
//   videoError: string = '';
//   pdfError: string = '';
//   videoPreview: string | null = null;
//   courseId: string = '';
//   isSubmitting: boolean = false;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private courseService: CourseServicesService
//   ) {}

//   ngOnInit(): void {
//     // Get course ID from URL - try different parameter names
//     this.courseId = this.route.snapshot.paramMap.get('courseId') || 
//                    this.route.snapshot.paramMap.get('id') || 
//                    this.route.snapshot.queryParamMap.get('courseId') || '';
    
//     console.log('Course ID from URL:', this.courseId);
    
//     if (this.moduleData.videoFile) {
//       this.videoFile = this.moduleData.videoFile;
//       this.videoFileName = this.videoFile.name;
//       // Create video preview if possible
//       this.createVideoPreview(this.videoFile);
//     }
    
//     if (this.moduleData.pdfFile) {
//       this.pdfFile = this.moduleData.pdfFile;
//       this.pdfFileName = this.pdfFile.name;
//     }
//   }

//   onVideoFileChange(event: Event): void {
//     const input = event.target as HTMLInputElement;
    
//     if (input.files && input.files.length > 0) {
//       const file = input.files[0];
      
//       if (this.validateVideoFile(file)) {
//         this.videoFile = file;
//         this.videoFileName = file.name;
//         this.videoError = '';
        
//         // Create video preview
//         this.createVideoPreview(file);
        
//         this.updateModuleData();
//       }
//     }
//   }

//   createVideoPreview(file: File): void {
//     // Create a blob URL for video preview
//     this.videoPreview = URL.createObjectURL(file);
//   }

//   onPdfFileChange(event: Event): void {
//     const input = event.target as HTMLInputElement;
    
//     if (input.files && input.files.length > 0) {
//       const file = input.files[0];
      
//       if (this.validatePdfFile(file)) {
//         this.pdfFile = file;
//         this.pdfFileName = file.name;
//         this.pdfError = '';
        
//         this.updateModuleData();
//       }
//     }
//   }

//   validateVideoFile(file: File): boolean {
//     // Check if it's an MP4 file or other common video formats
//     const validVideoExtensions = ['.mp4', '.mov', '.avi', '.webm'];
//     const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
//     if (!validVideoExtensions.includes(fileExtension)) {
//       this.videoError = 'Please upload a video file (MP4, MOV, AVI, or WEBM)';
//       return false;
//     }
    
//     // Check file size (max 100MB)
//     if (file.size > 100 * 1024 * 1024) {
//       this.videoError = 'File size should be less than 100MB';
//       return false;
//     }
    
//     return true;
//   }

//   validatePdfFile(file: File): boolean {
//     // Check if it's a PDF file
//     if (!file.name.toLowerCase().endsWith('.pdf')) {
//       this.pdfError = 'Please upload a PDF file';
//       return false;
//     }
    
//     // Check file size (max 20MB)
//     if (file.size > 20 * 1024 * 1024) {
//       this.pdfError = 'File size should be less than 20MB';
//       return false;
//     }
    
//     return true;
//   }

//   onFormChange(): void {
//     this.updateModuleData();
//   }

//   updateModuleData(): void {
//     this.moduleData = {
//       ...this.moduleData,
//       videoFile: this.videoFile,
//       pdfFile: this.pdfFile
//     };
    
//     this.formDataChange.emit(this.moduleData);
//   }
  
//   clearVideoFile(): void {
//     this.videoFile = undefined;
//     this.videoFileName = 'No file chosen';
//     this.videoError = '';
    
//     if (this.videoPreview) {
//       URL.revokeObjectURL(this.videoPreview);
//       this.videoPreview = null;
//     }
    
//     this.updateModuleData();
//   }
  
//   clearPdfFile(): void {
//     this.pdfFile = undefined;
//     this.pdfFileName = 'No file chosen';
//     this.pdfError = '';
    
//     this.updateModuleData();
//   }

//   onSubmit(): void {
//     // Validate required fields
//     if (!this.moduleData.name || !this.moduleData.duration || !this.moduleData.description) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     // Validate course ID
//     if (!this.courseId) {
//       alert('Course ID is missing. Please ensure you are accessing this page with a valid course ID.');
//       return;
//     }

//     console.log('Submitting module with course ID:', this.courseId);
//     this.isSubmitting = true;

//     // Create FormData for submission
//     const formData = new FormData();
//     formData.append('name', this.moduleData.name);
//     formData.append('duration', this.moduleData.duration);
//     formData.append('description', this.moduleData.description);
    
//     // Try both possible field names for course ID
//     formData.append('courseId', this.courseId);
//     formData.append('course_id', this.courseId);

//     if (this.videoFile) {
//       formData.append('videoFile', this.videoFile);
//     }

//     if (this.pdfFile) {
//       formData.append('pdfFile', this.pdfFile);
//     }

//     // Log FormData contents for debugging
//     console.log('FormData contents:');
//     formData.forEach((value, key) => {
//       console.log(key + ':', value);
//     });

//     // Submit the module
//     this.courseService.addModule(formData).subscribe({
//       next: (response) => {
//         console.log('Module added successfully:', response);
//         alert('Module added successfully!');
//         this.isSubmitting = false;
//         // Optionally navigate back or reset form
//         // this.router.navigate(['/courses', this.courseId]);
//       },
//       error: (error) => {
//         console.error('Error adding module:', error);
//         console.error('Error details:', error.error);
        
//         let errorMessage = 'Error adding module. Please try again.';
//         if (error.error && error.error.errors) {
//           const errorDetails = Object.values(error.error.errors).flat().join(', ');
//           errorMessage = `Validation Error: ${errorDetails}`;
//         }
        
//         alert(errorMessage);
//         this.isSubmitting = false;
//       }
//     });
//   }
  
//   ngOnDestroy(): void {
//     // Clean up blob URLs to prevent memory leaks
//     if (this.videoPreview) {
//       URL.revokeObjectURL(this.videoPreview);
//     }
//   }
// }


import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseModule } from '../../../models/course-module';
//import { CourseServicesService } from '../../../services/course-services.service';
import {CourseServicesService} from '../../../services/courses/course-services.service'

@Component({
  selector: 'app-add-module',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-module.component.html',
  styleUrl: './add-module.component.css'
})
export class AddModuleComponent implements OnInit {
  @Input() moduleData: CourseModule = {
    name: '',
    duration: '',
    description: ''
  };
  @Output() formDataChange = new EventEmitter<CourseModule>();

  videoFile?: File;
  pdfFile?: File;
  videoFileName: string = 'No file chosen';
  pdfFileName: string = 'No file chosen';
  videoError: string = '';
  pdfError: string = '';
  videoPreview: string | null = null;
  courseId: string = '';
  isSubmitting: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseServicesService
  ) {}

  ngOnInit(): void {
    // Get course ID from URL - try different parameter names
    this.courseId = this.route.snapshot.paramMap.get('courseId') || 
                   this.route.snapshot.paramMap.get('id') || 
                   this.route.snapshot.queryParamMap.get('courseId') || '';
    
    console.log('Course ID from URL:', this.courseId);
    
    if (this.moduleData.videoFile) {
      this.videoFile = this.moduleData.videoFile;
      this.videoFileName = this.videoFile.name;
      // Create video preview if possible
      this.createVideoPreview(this.videoFile);
    }
    
    if (this.moduleData.pdfFile) {
      this.pdfFile = this.moduleData.pdfFile;
      this.pdfFileName = this.pdfFile.name;
    }
  }

  onVideoFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      if (this.validateVideoFile(file)) {
        this.videoFile = file;
        this.videoFileName = file.name;
        this.videoError = '';
        
        // Create video preview
        this.createVideoPreview(file);
        
        this.updateModuleData();
      }
    }
  }

  createVideoPreview(file: File): void {
    // Create a blob URL for video preview
    this.videoPreview = URL.createObjectURL(file);
  }

  onPdfFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      if (this.validatePdfFile(file)) {
        this.pdfFile = file;
        this.pdfFileName = file.name;
        this.pdfError = '';
        
        this.updateModuleData();
      }
    }
  }

  validateVideoFile(file: File): boolean {
    // Check if it's an MP4 file or other common video formats
    const validVideoExtensions = ['.mp4', '.mov', '.avi', '.webm'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    if (!validVideoExtensions.includes(fileExtension)) {
      this.videoError = 'Please upload a video file (MP4, MOV, AVI, or WEBM)';
      return false;
    }
    
    // Check file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      this.videoError = 'File size should be less than 100MB';
      return false;
    }
    
    return true;
  }

  validatePdfFile(file: File): boolean {
    // Check if it's a PDF file
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      this.pdfError = 'Please upload a PDF file';
      return false;
    }
    
    // Check file size (max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      this.pdfError = 'File size should be less than 20MB';
      return false;
    }
    
    return true;
  }

  onFormChange(): void {
    this.updateModuleData();
  }

  updateModuleData(): void {
    this.moduleData = {
      ...this.moduleData,
      videoFile: this.videoFile,
      pdfFile: this.pdfFile
    };
    
    this.formDataChange.emit(this.moduleData);
  }
  
  clearVideoFile(): void {
    this.videoFile = undefined;
    this.videoFileName = 'No file chosen';
    this.videoError = '';
    
    if (this.videoPreview) {
      URL.revokeObjectURL(this.videoPreview);
      this.videoPreview = null;
    }
    
    this.updateModuleData();
  }
  
  clearPdfFile(): void {
    this.pdfFile = undefined;
    this.pdfFileName = 'No file chosen';
    this.pdfError = '';
    
    this.updateModuleData();
  }

  onSubmit(): void {
    // Validate required fields
    if (!this.moduleData.name || !this.moduleData.duration || !this.moduleData.description) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate course ID
    if (!this.courseId) {
      alert('Course ID is missing. Please ensure you are accessing this page with a valid course ID.');
      return;
    }

    // Trim whitespace from module name to avoid empty string issues
    this.moduleData.name = this.moduleData.name.trim();
    
    if (!this.moduleData.name) {
      alert('Module name cannot be empty or just whitespace');
      return;
    }

    console.log('Submitting module with course ID:', this.courseId);
    this.isSubmitting = true;

    // Create FormData for submission
    const formData = new FormData();
    formData.append('name', this.moduleData.name);
    formData.append('duration', this.moduleData.duration.trim());
    formData.append('description', this.moduleData.description.trim());
    
    // Try both possible field names for course ID
    formData.append('courseId', this.courseId);
    formData.append('course_id', this.courseId);

    if (this.videoFile) {
      formData.append('videoFile', this.videoFile);
    }

    if (this.pdfFile) {
      formData.append('pdfFile', this.pdfFile);
    }

    // Log FormData contents for debugging
    console.log('FormData contents:');
    formData.forEach((value, key) => {
      console.log(key + ':', value);
    });

    // Submit the module
    this.courseService.addModule(formData).subscribe({
      next: (response) => {
        console.log('Module added successfully:', response);
        alert('Module added successfully!');
        this.isSubmitting = false;
        
        // Reset form after successful submission
        this.resetForm();
        
        // Optionally navigate back or reset form
        // this.router.navigate(['/courses', this.courseId]);
      },
      error: (error) => {
        console.error('Error adding module:', error);
        console.error('Error details:', error.error);
        
        let errorMessage = 'Error adding module. Please try again.';
        
        // Handle specific duplicate key error
        if (error.message && error.message.includes('duplicate key')) {
          errorMessage = 'A module with this name already exists. Please choose a different name.';
        } else if (error.error && error.error.errors) {
          const errorDetails = Object.values(error.error.errors).flat().join(', ');
          errorMessage = `Validation Error: ${errorDetails}`;
        } else if (error.status === 500 && error.error) {
          // Handle SQL constraint errors
          if (error.error.includes('duplicate key') || error.error.includes('IX_Modules_modulename')) {
            errorMessage = 'A module with this name already exists. Please choose a different name.';
          }
        }
        
        alert(errorMessage);
        this.isSubmitting = false;
      }
    });
  }

  resetForm(): void {
    this.moduleData = {
      name: '',
      duration: '',
      description: ''
    };
    this.clearVideoFile();
    this.clearPdfFile();
  }
  
  ngOnDestroy(): void {
    // Clean up blob URLs to prevent memory leaks
    if (this.videoPreview) {
      URL.revokeObjectURL(this.videoPreview);
    }
  }
}