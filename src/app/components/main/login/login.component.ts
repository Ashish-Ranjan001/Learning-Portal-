import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting = false;
  showPassword = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
  if (this.loginForm.invalid) {
    return;
  }

  this.isSubmitting = true;
  const credentials = this.loginForm.value;

  this.http.post<{ token: string }>('https://localhost:7264/api/Login/login', credentials).subscribe({
    next: (response) => {
      localStorage.setItem('authToken', response.token);
      this.router.navigate(['/dashboard']); // Redirect after successful login
    },
    error: (error) => {
      this.isSubmitting = false;
      this.errorMessage = error.error?.msg || 'Invalid credentials. Please try again.';
    }
  });
}
}