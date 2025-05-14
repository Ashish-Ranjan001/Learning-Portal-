import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-sme',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-sme.component.html',
  styleUrls: ['./add-sme.component.css']
})
export class AddSmeComponent implements OnInit {
  smeForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.smeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.smeForm.valid) {
      // Here you would typically call a service to save the data
      console.log('SME data:', this.smeForm.value);
      this.smeForm.reset();
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.smeForm.controls).forEach(key => {
        const control = this.smeForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}