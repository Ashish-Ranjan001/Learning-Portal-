import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseModule } from '../../../models/course-module';

@Component({
  selector: 'app-module-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './module-form.component.html',
  styleUrl: './module-form.component.css'
})
export class ModuleFormComponent implements OnInit {
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

  constructor() {}

  ngOnInit(): void {
    if (this.moduleData.videoFile) {
      this.videoFile = this.moduleData.videoFile;
      this.videoFileName = this.videoFile.name;
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
        
        this.updateModuleData();
      }
    }
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
    // Check if it's an MP4 file
    if (!file.name.toLowerCase().endsWith('.mp4')) {
      this.videoError = 'Please upload an MP4 file';
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
}