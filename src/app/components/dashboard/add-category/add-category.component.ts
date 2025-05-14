import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  selectedFile: File | null = null;
  selectedFileName: string = 'No file chosen';
  
  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
      subSet: ['', [Validators.required]],
      image: [null]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
      this.categoryForm.patchValue({
        image: this.selectedFile
      });
    }
  }

  saveCategory(): void {
    if (this.categoryForm.valid) {
      const formData = new FormData();
      formData.append('name', this.categoryForm.get('name')?.value);
      formData.append('subSet', this.categoryForm.get('subSet')?.value);
      
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      // Uncomment when API is ready
      /*
      this.http.post('your-api-endpoint/categories', formData).subscribe({
        next: (response) => {
          console.log('Category created successfully', response);
          this.resetForm();
        },
        error: (error) => {
          console.error('Error creating category:', error);
        }
      });
      */
      
      // For now, just log the form data
      console.log('Form submitted', {
        name: this.categoryForm.get('name')?.value,
        subSet: this.categoryForm.get('subSet')?.value,
        file: this.selectedFile ? this.selectedFileName : 'No file'
      });
      
      // Optional: Reset form after successful submission
      // this.resetForm();
    } else {
      this.markFormGroupTouched(this.categoryForm);
    }
  }

  resetForm(): void {
    this.categoryForm.reset();
    this.selectedFile = null;
    this.selectedFileName = 'No file chosen';
  }

  cancel(): void {
    this.resetForm();
    // Add navigation logic if needed
  }

  // Helper method to mark all controls as touched
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}