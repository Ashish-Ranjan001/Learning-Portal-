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
      quize_path: ['']

    });
  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (course) => {
        this.courseForm.patchValue({
          course_name: course.course_name,
          description: course.description,
          author: course.author,
          status: course.status,
          category_id: course.category_id,
          quize_path: course.quize_path
        });
        this.imagePreview = 'https://localhost:7264' + course.imagepath;
      },
      error: (err) => {
        console.error('Error fetching course:', err);
      }
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.courseForm.patchValue({ imagepath: file });
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.courseForm.invalid) return;
  
    const formData = new FormData();
    formData.append('course_name', this.courseForm.get('course_name')?.value);
    formData.append('description', this.courseForm.get('description')?.value);
    formData.append('author', this.courseForm.get('author')?.value);
    formData.append('category_id', this.courseForm.get('category_id')?.value || '');
    formData.append('quize_path', this.courseForm.get('quize_path')?.value || '');
    
    // Explicitly stringify boolean value
    formData.append('status', this.courseForm.get('status')?.value ? 'true' : 'false');
  
    const imageFile = this.courseForm.get('imagepath')?.value;
    if (imageFile) {
      formData.append('imagepath', imageFile);
    }
  
    this.courseService.updateCourse(this.courseId, formData).subscribe({
      next: () => {
        this.router.navigate(['/view-courses']);
      },
      error: (err) => {
        console.error('Error updating course:', err);
      }
    });
  }
  
  }

