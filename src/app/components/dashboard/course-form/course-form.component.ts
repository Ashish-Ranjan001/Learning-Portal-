import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Course } from '../../../models/course';

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
    sme: '',
    lob: '',
    author: ''
  };

  @Output() formDataChange = new EventEmitter<{ course: Course, thumbnailImage?: File }>();

  thumbnailImage?: File;
  thumbnailPreview: string | null = null;
  categories: string[] = ['Development', 'Design', 'Marketing', 'Business', 'IT & Software'];

  constructor() {}

  ngOnInit(): void {}

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