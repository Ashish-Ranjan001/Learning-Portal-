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
 
  constructor(
    private fb: FormBuilder,
     private http: HttpClient,
     private router: Router
  ) {
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
 
   
    this.http.post<any>('https://localhost:7264/api/Login/login', credentials)
      .subscribe({
        next: (response) => {
          // Store token in localStorage
          localStorage.setItem('token', response.token);
          // Navigate to dashboard or home page
          this.router.navigate(['categories']);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.errorMessage = error.error.message || 'Login failed. Please try again.';
          console.error('Login error:', error);
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
   
 
   
  }
}
 