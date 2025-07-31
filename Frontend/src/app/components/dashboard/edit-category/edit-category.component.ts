// import { ActivatedRoute } from '@angular/router';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Component, OnInit } from '@angular/core';
// import { CourseServicesService } from '../../../services/courses/course-services.service';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-edit-category',
//   templateUrl: './edit-category.component.html',
//   imports: [ReactiveFormsModule, FormsModule, CommonModule],
//   styleUrls: ['./edit-category.component.css']
// })
// export class EditCategoryComponent implements OnInit {
//   categoryForm: FormGroup;
//   categoryId!: number;
//   selectedFile: File | null = null;

//   constructor(private route: ActivatedRoute, private fb: FormBuilder, private courseService: CourseServicesService, private router: Router) {
//     this.categoryForm = this.fb.group({
//       name: [''],
//       subSet: [''],
//       imageUrl: [''],
//       status: [false]
//     });
//   }

//   ngOnInit() {
//     this.route.paramMap.subscribe(params => {
//       this.categoryId = Number(params.get('id'));
//       // if (this.categoryId) {
//       //   this.loadCategoryDetails();
//       // }
//     });
//   }

//   // loadCategoryDetails() {
//   //   this.courseService.getCategoryById(this.categoryId).subscribe((category) => {
//   //     if (category) {
//   //       this.categoryForm.patchValue({
//   //         Name: category.name,
//   //         SubSet: category.subSet,
//   //         imageUrl: category.imageUrl,
//   //         status: category.status
//   //       });
//   //       console.log('Loaded Category:', category);
//   //     }
//   //   });
//   // }

//   toggleActiveStatus(event: Event) {
//     const checked = (event.target as HTMLInputElement).checked;
//     this.categoryForm.patchValue({ status: checked });
//     console.log('Updated Status:', checked);
//   }

//   onFileSelected(event: Event) {
//     const file = (event.target as HTMLInputElement).files?.[0];
//     if (file) {
//       this.selectedFile = file;
//       // Here, you can implement logic to upload the image & update categoryForm.imageUrl accordingly
//       console.log('Selected File:', file.name);
//     }
//   }

//   onSave() {
//     console.log('Saved Category Data:', this.categoryForm.value);
//     this.courseService.updateCategory(this.categoryId, this.categoryForm.value).subscribe(() => {
//       console.log('Category Updated Successfully');
//       this.router.navigate(['/dashboard/category/view']);
//     });
//   }

//   onCancel() {
//     console.log('Edit cancelled');
//     this.router.navigate(['/dashboard/category/view']);
//   }
// }


import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
// Import the correct service - update the path as needed
import { CategoriesServiceService } from '../../../services/Categories/categories-service.service';
@Component({
selector: 'app-edit-category',
templateUrl: './edit-category.component.html',
imports: [ReactiveFormsModule, FormsModule, CommonModule],
styleUrls: ['./edit-category.component.css'],
standalone: true
})
export class EditCategoryComponent implements OnInit {
categoryForm: FormGroup;
categoryId!: string;
selectedFile: File | null = null;
isSubmitting = false;
successMessage = '';
errorMessage = '';
constructor(
private route: ActivatedRoute,
private fb: FormBuilder,
private categoryService: CategoriesServiceService,
private router: Router
) {
this.categoryForm = this.fb.group({
name: ['', Validators.required],
subset: ['', Validators.required],  // Changed from 'subSet' to 'subset' to match API response
imageUrl: [''],
status: [false]
});
}
ngOnInit() {
this.route.paramMap.subscribe(params => {
const id = params.get('id');
if (id) {
this.categoryId =(id);
this.loadCategoryDetails();
} else {
this.errorMessage = 'Category ID is missing';
console.error('Category ID is missing');
}
});
}
loadCategoryDetails() {
this.categoryService.getCategoryById(this.categoryId).subscribe({
next: (response: any) => {
// Assuming the backend returns data directly or in a 'data' property
const category = response.data || response;
    if (category) {
      console.log('API Response Category:', category);
      this.categoryForm.patchValue({
        name: category.name,
        subset: category.subset,  // This matches the API response field name
        imageUrl: category.imagepath,
        status: category.status
      });
      console.log('Form after patch:', this.categoryForm.value);
    }
  },
  error: (error: any) => {
    this.errorMessage = 'Failed to load category details';
    console.error('Error loading category:', error);
  }
});
}
onFileSelected(event: Event) {
const fileInput = event.target as HTMLInputElement;
if (fileInput.files && fileInput.files.length > 0) {
this.selectedFile = fileInput.files[0];
  // Create a temporary URL for preview
  const reader = new FileReader();
  reader.onload = () => {
    this.categoryForm.patchValue({
      imageUrl: reader.result as string
    });
  };
  reader.readAsDataURL(this.selectedFile);
  
  console.log('Selected File:', this.selectedFile.name);
}
}
onSave() {
if (this.categoryForm.invalid) {
// Mark all fields as touched to trigger validation messages
Object.keys(this.categoryForm.controls).forEach(key => {
const control = this.categoryForm.get(key);
control?.markAsTouched();
});
return;
}
this.isSubmitting = true;
this.successMessage = '';
this.errorMessage = '';

// Create FormData to send multipart/form-data (for file upload)
const formData = new FormData();

// Add form fields to FormData
formData.append('name', this.categoryForm.get('name')?.value);
formData.append('subset', this.categoryForm.get('subset')?.value);  // Changed to match form control name
formData.append('status', this.categoryForm.get('status')?.value);

// Add file if selected
if (this.selectedFile) {
  formData.append('ImageFile', this.selectedFile, this.selectedFile.name);
}

this.categoryService.updateCategory(this.categoryId, formData)
  .pipe(finalize(() => this.isSubmitting = false))
  .subscribe({
    next: (response: any) => {
      console.log('Category Updated Successfully', response);
      console.log('FormData After Sending:', [...formData.entries()]); // Debugging
      this.successMessage = 'Category updated successfully';
      
      // Navigate after a short delay to allow the user to see the success message
      setTimeout(() => {
        this.router.navigate(['dashboard/course/viewCategory']);
      }, 1500);
    },
    error: (error: HttpErrorResponse) => {
      console.error('Error updating category:', error);
      
      if (error.status === 404) {
        this.errorMessage = 'Category not found';
      } else if (error.error && error.error.message) {
        this.errorMessage = error.error.message;
      } else {
        this.errorMessage = 'Failed to update category. Please try again.';
      }
    }
  });
}
onCancel() {
console.log('Edit cancelled');
this.router.navigate(['dashboard/course/viewCategory']);
}
}