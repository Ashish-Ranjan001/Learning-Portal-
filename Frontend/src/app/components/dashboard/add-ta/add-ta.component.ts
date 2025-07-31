import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { TaServiceService } from ""// Adjust the path if needed
import { TaServiceService } from '../../../services/tas/ta-service.service'; // Adjust the path if needed
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-ta.component.html',
  styleUrls: ['./add-ta.component.css']
})
export class AddTaComponent implements OnInit {
  taForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taService: TaServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.taForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]]
        phone: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
  if (this.taForm.valid) {
    this.taService.addTa(this.taForm.value).subscribe({
      next: (res: any) => {  // ✅ Explicitly define response type as 'any'
        console.log('TA created successfully:', res);
        this.router.navigate(['/dashboard/ta/view']); // ✅ Redirect
      },
      error: (err: any) => {  // ✅ Explicitly define error type as 'any'
        console.error('Error creating TA:', err);
        alert('Failed to create TA. Please try again.');
      }
    });
  } else {
    Object.keys(this.taForm.controls).forEach(key => {
      const control = this.taForm.get(key);
      control?.markAsTouched();
    });
  }
}
  // onSubmit(): void {
  //   if (this.taForm.valid) {
  //     this.taService.addTa(this.taForm.value).subscribe({
  //       next: (res) => {
  //         console.log('TA created successfully:', res);
  //         this.router.navigate(['/dashboard/ta/view']); // ✅ Redirect
  //       },
  //       error: (err) => {
  //         console.error('Error creating TA:', err);
  //         alert('Failed to create TA. Please try again.');
  //       }
  //     });
  //   } else {
  //     // Mark all fields as touched to show validation
  //     Object.keys(this.taForm.controls).forEach(key => {
  //       const control = this.taForm.get(key);
  //       control?.markAsTouched();
  //     });
  //   }
  // }
}