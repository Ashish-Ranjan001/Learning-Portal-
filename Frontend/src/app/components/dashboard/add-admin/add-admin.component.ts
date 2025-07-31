// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-add-admin',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './add-admin.component.html',
//   styleUrls: ['./add-admin.component.css']
// })
// export class AddAdminComponent {
//   adminForm: FormGroup;

//   constructor(private fb: FormBuilder) {
//     this.adminForm = this.fb.group({
//       name: ['', [Validators.required]],
//       email: ['', [Validators.required, Validators.email]],
//       phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
//       password: ['', [Validators.required, Validators.minLength(8)]]
//     });
//   }

//   onSubmit() {
//     if (this.adminForm.valid) {
//       console.log('Admin form submitted:', this.adminForm.value);
//       // Implement your API call or service method to save admin data
//       // Reset form after successful submission
//       // this.adminForm.reset();
//     } else {
//       // Mark all fields as touched to trigger validation messages
//       Object.keys(this.adminForm.controls).forEach(key => {
//         this.adminForm.get(key)?.markAsTouched();
//       });
//     }
//   }

//   // Helper methods for form validation
//   get nameControl() { return this.adminForm.get('name'); }
//   get emailControl() { return this.adminForm.get('email'); }
//   get phoneControl() { return this.adminForm.get('phone'); }
//   get passwordControl() { return this.adminForm.get('password'); }
// }


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AdminserviceService } from '../../../services/Admin/adminservice.service';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {
  adminForm: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private adminService: AdminserviceService) {
    this.adminForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required,Validators.pattern(/^\d{10}$/)]]

    });
  }

  onSubmit() {
    if (this.adminForm.valid) {
      this.isLoading = true;
      this.successMessage = '';
      this.errorMessage = '';
      
      const adminData = {
        email: this.adminForm.value.email,
        phone: this.adminForm.value.phone
      };

      this.adminService.createAdmin(adminData).subscribe({
        next: (response:any) => {
          this.isLoading = false;
          this.successMessage = 'Admin created successfully!';
          this.adminForm.reset();
          
          // Optional: Navigate to admin list or show admin details
          console.log('Admin created:', response);
        },
        error: (error:any) => {
          this.isLoading = false;
          
          // Handle different error scenarios
          if (error.status === 404) {
            this.errorMessage = 'No user found with the provided email and phone number.';
          } else if (error.status === 409) {
            this.errorMessage = 'User is already an admin.';
          } else {
            this.errorMessage = 'An error occurred while creating the admin. Please try again.';
          }
          
          console.error('Error creating admin:', error);
        }
      });
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.adminForm.controls).forEach(key => {
        this.adminForm.get(key)?.markAsTouched();
      });
    }
  }

  // Helper methods for form validation
  get emailControl() { return this.adminForm.get('email'); }
  get phoneControl() { return this.adminForm.get('phone'); }
}