// 

import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { RecaptchaModule } from 'ng-recaptcha';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, RecaptchaModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting = false;
  showPassword = false;
  errorMessage = '';
  loginSuccess = false;
  captchaToken: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    @Inject(Router) private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onCaptchaResolved(token: string | null): void {
    this.captchaToken = token;
  }

  onSubmit() {
    if (this.loginForm.invalid || !this.captchaToken) {
      console.log('=== LOGIN FORM INVALID or CAPTCHA missing ===');
      this.loginForm.markAllAsTouched();
      if (!this.captchaToken) {
        this.errorMessage = 'Please complete the CAPTCHA verification.';
      }
      return;
    }

    this.isSubmitting = true;

    const credentials = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
      recaptchaToken: this.captchaToken
    };

    this.http.post<{ token: string }>('https://localhost:7264/api/Login/login', credentials).subscribe({
      next: (response) => {
        console.log('=== LOGIN RESPONSE ===', response);
        localStorage.setItem('authToken', response.token);

        try {
          const decodedToken: any = this.decodeJWT(response.token);
          const roleId =
            decodedToken.roleid || decodedToken.role_id || decodedToken.RoleId ||
            decodedToken.role || decodedToken.Role || decodedToken.roleID || decodedToken.ROLE_ID;

          this.loginSuccess = true;
          setTimeout(() => {
            if (roleId === 1 || roleId === '1') {
              this.router.navigate(['/home']);
            } else {
              this.router.navigate(['/dashboard']);
            }
          }, 1000);
        } catch (error) {
          console.error('=== TOKEN DECODING ERROR ===', error);
          this.router.navigate(['/dashboard']);
        }

        this.isSubmitting = false;
      },
      error: (error) => {
        console.log('=== LOGIN ERROR ===', error);
        this.isSubmitting = false;
        this.errorMessage = error.error?.msg || 'Invalid credentials. Please try again.';
      }
    });
  }

  private decodeJWT(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding JWT manually:', error);
      throw error;
    }
  }
}