
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesServiceService } from '../../../services/Categories/categories-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  categories: any[] = [];

  constructor(private fb: FormBuilder, private categoryService: CategoriesServiceService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
  }

  initForm(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
      subSet: ['', [Validators.required]],
      image: [null]
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data:any) => {
        this.categories = data;
      },
      error: (error:any) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
      this.categoryForm.patchValue({ image: this.selectedFile });
      this.categoryForm.patchValue({ image: this.selectedFile });
    }
  }

  saveCategory(): void {
    if (this.categoryForm.valid) {
      const formData = new FormData();
      formData.append('name', this.categoryForm.get('name')?.value || '');
      formData.append('subset', this.categoryForm.get('subSet')?.value || '');

      formData.append('name', this.categoryForm.get('name')?.value || '');
      formData.append('subset', this.categoryForm.get('subSet')?.value || '');

      if (this.selectedFile) {
        formData.append('ImageFile', this.selectedFile);
        formData.append('ImageFile', this.selectedFile);
      }

      console.log('FormData Before Sending:', [...formData.entries()]); // Debugging

      this.categoryService.addCategory(formData).subscribe({
        next: (response:any) => {
          console.log('Category created successfully', response);
          this.loadCategories();
          this.resetForm();
          this.router.navigate(['dashboard/course/viewCategory']); // ✅ Redirect
        },
        error: (error:any) => {
          console.error('Error creating category:', error);
          alert('Failed to create category. Please try again.');
        }
      });
    } else {
      this.markFormGroupTouched(this.categoryForm);
    }
  }

 

  cancel(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.categoryForm.reset();
    this.selectedFile = null;
    this.selectedFileName = 'No file chosen';
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}
