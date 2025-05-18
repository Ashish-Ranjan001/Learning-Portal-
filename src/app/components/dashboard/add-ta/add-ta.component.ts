import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ta',
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './add-ta.component.html',
  styleUrl: './add-ta.component.css'
})
export class AddTaComponent {
 smeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.smeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]]
    });
  }

  // onSubmit(): void {
  //   if (this.smeForm.valid) {
  //     this.smeService.addSme(this.smeForm.value).subscribe({
  //       next: (res) => {
  //         console.log('SME created successfully:', res);
  //         this.router.navigate(['/dashboard/sme/view']); // ✅ Redirect
  //       },
  //       error: (err) => {
  //         console.error('Error creating SME:', err);
  //         alert('Failed to create SME. Please try again.');
  //       }
  //     });
  //   } else {
  //     // Mark all fields as touched to show validation
  //     Object.keys(this.smeForm.controls).forEach(key => {
  //       const control = this.smeForm.get(key);
  //       control?.markAsTouched();
  //     });
  //   }
  // }

  onSubmit(): void {
    if (this.smeForm.valid) {
      console.log('Form submitted:', this.smeForm.value);
      // Here you would typically call your service method to save the data
      // this.saveUser();
      this.router.navigate(['/dashboard/ta/view']); // ✅ Redirect
    } else {
      // Mark all fields as touched to show validation
      Object.keys(this.smeForm.controls).forEach(key => {
        const control = this.smeForm.get(key);
        control?.markAsTouched();
      });
    }
  }

}
