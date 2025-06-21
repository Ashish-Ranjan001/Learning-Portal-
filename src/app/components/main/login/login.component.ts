import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting = false;
  showPassword = false;
  errorMessage = '';
  loginSuccess = false;
 
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
 
  onSubmit() {
    if (this.loginForm.invalid) {
      console.log('=== LOGIN FORM INVALID ===');
      this.loginForm.markAllAsTouched();
      return;
    }
 
    this.isSubmitting = true;
    const credentials = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    };
 
    this.http.post<{ token: string }>('https://localhost:7264/api/Login/login', credentials).subscribe({
      next: (response) => {
        console.log('=== LOGIN RESPONSE ===');
        console.log('Full response:', response);
        console.log('Token:', response.token);
       
        localStorage.setItem('authToken', response.token);
       
        try {
          const decodedToken: any = this.decodeJWT(response.token);
          console.log('=== DECODED TOKEN ===');
          console.log('Full decoded token:', decodedToken);
         
          console.log('=== ALL TOKEN PROPERTIES ===');
          for (const key in decodedToken) {
            if (decodedToken.hasOwnProperty(key)) {
              console.log(`${key}:`, decodedToken[key], `(type: ${typeof decodedToken[key]})`);
            }
          }
         
          const roleId = decodedToken.roleid || decodedToken.role_id || decodedToken.RoleId ||
                        decodedToken.role || decodedToken.Role || decodedToken.roleID || decodedToken.ROLE_ID;
         
          console.log('=== EXTRACTED ROLE INFO ===');
          console.log('Extracted roleId:', roleId);
          console.log('RoleId type:', typeof roleId);
 
          this.loginSuccess = true;
          setTimeout(() => {
            if (roleId === 1 || roleId === '1') {
              console.log('Role ID matches 1 - redirecting to /categories');
              this.router.navigate(['/categories']);
            } else {
              console.log('Role ID does not match 1 - redirecting to /dashboard');
              this.router.navigate(['/dashboard']);
            }
          }, 1000);
         
        } catch (error) {
          console.error('=== TOKEN DECODING ERROR ===');
          console.error('Error decoding token:', error);
          this.router.navigate(['/dashboard']);
        }
       
        this.isSubmitting = false;
      },
      error: (error) => {
        console.log('=== LOGIN ERROR ===');
        console.log('Login error:', error);
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
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding JWT manually:', error);
      throw error;
    }
  }
}