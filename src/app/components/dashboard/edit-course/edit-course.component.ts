// edit-course.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseServicesService } from '../../../services/courses/course-services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class EditCourseComponent implements OnInit {
  courseForm: FormGroup;
  courseId: string = '';
  imagePreview: string | ArrayBuffer | null = null;
  selectedImageFile: File | null = null;
  selectedQuizFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private courseService: CourseServicesService,
    private router: Router
  ) {
    this.courseForm = this.fb.group({
      course_name: ['', Validators.required],
      description: [''],
      author: [''],
      status: [false],
      imagepath: [null],
      category_id: [''],
      sme_id: [''],
      lob_id: [''],
      quizPath: [null]
    });
  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    this.loadCourseData();
  }

  loadCourseData(): void {
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (response) => {
        const course = response.data || response; // Handle both response formats
        this.courseForm.patchValue({
          course_name: course.course_name,
          description: course.description,
          author: course.author,
          status: course.status,
          category_id: course.category_id,
          sme_id: course.sme_id,
          lob_id: course.lob_id
        });
        
        // Set image preview if exists
        if (course.imagepath) {
          this.imagePreview = 'https://localhost:7264' + course.imagepath;
        }
      },
      error: (err) => {
        console.error('Error fetching course:', err);
        alert('Error loading course data');
      }
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImageFile = file;
      this.courseForm.patchValue({ imagepath: file });
      
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onQuizSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedQuizFile = file;
      this.courseForm.patchValue({ quizPath: file });
    }
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      alert('Please fill in all required fields');
      return;
    }
  
    const formData = new FormData();
    formData.append('course_name', this.courseForm.get('course_name')?.value || '');
    formData.append('description', this.courseForm.get('description')?.value || '');
    formData.append('author', this.courseForm.get('author')?.value || '');
    formData.append('category_id', this.courseForm.get('category_id')?.value || '');
    formData.append('sme_id', this.courseForm.get('sme_id')?.value || '');
    formData.append('lob_id', this.courseForm.get('lob_id')?.value || '');
    
    // Add image file if selected
    if (this.selectedImageFile) {
      formData.append('imagepath', this.selectedImageFile);
    }

    // Add quiz file if selected
    if (this.selectedQuizFile) {
      formData.append('quizPath', this.selectedQuizFile);
    }
  
    this.courseService.updateCourse(this.courseId, formData).subscribe({
      next: (response) => {
        console.log('Course updated successfully:', response);
        alert('Course updated successfully!');
        this.router.navigate(['/view-courses']);
      },
      error: (err) => {
        console.error('Error updating course:', err);
        alert('Error updating course: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/view-courses']);
  }
}