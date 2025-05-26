// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-edit-module',
//   imports: [],
//   templateUrl: './edit-module.component.html',
//   styleUrl: './edit-module.component.css'
// })
// export class EditModuleComponent {

// }
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseModule } from '../../../models/course-module';
//import { CourseServicesService } from '../../../services/course-services.service';
import {CourseServicesService} from '../../../services/courses/course-services.service'
@Component({
  selector: 'app-edit-module',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-module.component.html',
  styleUrl: './edit-module.component.css'
})
export class EditModuleComponent implements OnInit, OnDestroy {
  moduleData: CourseModule = {
    name: '',
    duration: '',
    description: ''
  };

  moduleId: string = '';
  courseId: string = '';
  videoFile?: File;
  pdfFile?: File;
  videoFileName: string = 'No file chosen';
  pdfFileName: string = 'No file chosen';
  videoError: string = '';
  pdfError: string = '';
  videoPreview: string | null = null;
  isSubmitting: boolean = false;
  isLoading: boolean = true;
  
  // Store existing file paths
  existingVideoPath: string = '';
  existingPdfPath: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseServicesService
  ) {}

  ngOnInit(): void {
    // Get module ID from URL
    this.moduleId = this.route.snapshot.paramMap.get('moduleId') || 
                   this.route.snapshot.paramMap.get('id') || '';
    
    // Get course ID from URL or query params
    this.courseId = this.route.snapshot.paramMap.get('courseId') || 
                   this.route.snapshot.queryParamMap.get('courseId') || '';

    console.log('Module ID:', this.moduleId);
    console.log('Course ID:', this.courseId);

    if (this.moduleId) {
      this.loadModuleData();
    } else {
      console.error('Module ID is required');
      alert('Module ID is missing');
      this.router.navigate(['/courses']);
    }
  }

  loadModuleData(): void {
    this.isLoading = true;
    
    this.courseService.getModuleById(this.moduleId).subscribe({
      next: (response: any) => {
        console.log('Module data loaded:', response);
        
        // Map the response to your component data structure
        this.moduleData = {
          name: response.modulename || '',
          duration: response.duration || '',
          description: response.description || ''
        };

        this.courseId = response.course_id || this.courseId;
        
        // Handle existing files
        if (response.videopath) {
          this.existingVideoPath = response.videopath;
          this.videoFileName = this.extractFileName(response.videopath) || 'Existing video file';
        }
        
        if (response.documentpath) {
          this.existingPdfPath = response.documentpath;
          this.pdfFileName = this.extractFileName(response.documentpath) || 'Existing PDF file';
        }

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading module:', error);
        alert('Error loading module data');
        this.isLoading = false;
        this.router.navigate(['/courses']);
      }
    });
  }

  extractFileName(filePath: string): string {
    if (!filePath) return '';
    return filePath.split('/').pop() || '';
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
      }
    }
  }

  createVideoPreview(file: File): void {
    // Clean up existing preview
    if (this.videoPreview) {
      URL.revokeObjectURL(this.videoPreview);
    }
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
  
  clearVideoFile(): void {
    this.videoFile = undefined;
    this.videoFileName = this.existingVideoPath ? 
      this.extractFileName(this.existingVideoPath) || 'Existing video file' : 
      'No file chosen';
    this.videoError = '';
    
    if (this.videoPreview) {
      URL.revokeObjectURL(this.videoPreview);
      this.videoPreview = null;
    }
    
    // Reset file input
    const videoInput = document.getElementById('videoFile') as HTMLInputElement;
    if (videoInput) {
      videoInput.value = '';
    }
  }
  
  clearPdfFile(): void {
    this.pdfFile = undefined;
    this.pdfFileName = this.existingPdfPath ? 
      this.extractFileName(this.existingPdfPath) || 'Existing PDF file' : 
      'No file chosen';
    this.pdfError = '';
    
    // Reset file input
    const pdfInput = document.getElementById('pdfFile') as HTMLInputElement;
    if (pdfInput) {
      pdfInput.value = '';
    }
  }

  onSubmit(): void {
    // Validate required fields
    if (!this.moduleData.name || !this.moduleData.duration || !this.moduleData.description) {
      alert('Please fill in all required fields');
      return;
    }

    // Trim whitespace from inputs
    this.moduleData.name = this.moduleData.name.trim();
    this.moduleData.duration = this.moduleData.duration.trim();
    this.moduleData.description = this.moduleData.description.trim();
    
    if (!this.moduleData.name) {
      alert('Module name cannot be empty or just whitespace');
      return;
    }

    console.log('Updating module:', this.moduleId);
    this.isSubmitting = true;

    // Create FormData for submission
    const formData = new FormData();
    formData.append('modulename', this.moduleData.name);
    formData.append('duration', this.moduleData.duration);
    formData.append('description', this.moduleData.description);
    formData.append('course_id', this.courseId);

    // Only append files if new ones are selected
    if (this.videoFile) {
      formData.append('VideoFile', this.videoFile);
    }

    if (this.pdfFile) {
      formData.append('PdfFile', this.pdfFile);
    }

    // Log FormData contents for debugging
    console.log('FormData contents:');
    formData.forEach((value, key) => {
      console.log(key + ':', value);
    });

    // Submit the updated module
    this.courseService.updateModule(this.moduleId, formData).subscribe({
      next: (response) => {
        console.log('Module updated successfully:', response);
        alert('Module updated successfully!');
        this.isSubmitting = false;
        
        // Navigate back to course details or module list
        if (this.courseId) {
          this.router.navigate(['/courses', this.courseId]);
        } else {
          this.router.navigate(['/courses']);
        }
      },
      error: (error) => {
        console.error('Error updating module:', error);
        console.error('Error details:', error.error);
        
        let errorMessage = 'Error updating module. Please try again.';
        
        // Handle specific duplicate key error
        if (error.message && error.message.includes('duplicate key')) {
          errorMessage = 'A module with this name already exists. Please choose a different name.';
        } else if (error.error && error.error.errors) {
          const errorDetails = Object.values(error.error.errors).flat().join(', ');
          errorMessage = `Validation Error: ${errorDetails}`;
        } else if (error.status === 500 && error.error) {
          if (error.error.includes('duplicate key') || error.error.includes('IX_Modules_modulename')) {
            errorMessage = 'A module with this name already exists. Please choose a different name.';
          }
        }
        
        alert(errorMessage);
        this.isSubmitting = false;
      }
    });
  }

  onCancel(): void {
    if (this.courseId) {
      this.router.navigate(['/courses', this.courseId]);
    } else {
      this.router.navigate(['/courses']);
    }
  }
  
  ngOnDestroy(): void {
    // Clean up blob URLs to prevent memory leaks
    if (this.videoPreview) {
      URL.revokeObjectURL(this.videoPreview);
    }
  }
}