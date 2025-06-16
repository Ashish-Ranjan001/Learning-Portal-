// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router, RouterModule } from '@angular/router';
// import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {  HttpClient, HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, HttpClientModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   loginForm: FormGroup;
//   isSubmitting = false;
//   showPassword = false;
//   errorMessage = '';

//   constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }

//   togglePasswordVisibility() {
//     this.showPassword = !this.showPassword;
//   }
 
//   onSubmit() {
//   if (this.loginForm.invalid) {
//      console.log('=== LOGIN CREDENTIALS yash===');
//     return;
//   }

//   this.isSubmitting = true;
//   const credentials = this.loginForm.value;

 
//   this.http.post<{ token: string }>('https://localhost:7264/api/Login/login', credentials).subscribe({
//   next: (response) => {
//     console.log('=== LOGIN RESPONSE ===');
//     console.log('Full response:', response);
//     console.log('Token:', response.token);
    
//     localStorage.setItem('authToken', response.token);
    
//     try {
//       // Decode the JWT token
//       const decodedToken: any = jwtDecode(response.token);
      
//       console.log('=== DECODED TOKEN ===');
//       console.log('Full decoded token:', decodedToken);
//       console.log('Decoded token type:', typeof decodedToken);
      
//       // Print all properties of the decoded token
//       console.log('=== ALL TOKEN PROPERTIES ===');
//       for (const key in decodedToken) {
//         if (decodedToken.hasOwnProperty(key)) {
//           console.log(`${key}:`, decodedToken[key], `(type: ${typeof decodedToken[key]})`);
//         }
//       }
      
//       // Try different possible role property names
//       console.log('=== ROLE CHECKS ===');
//       console.log('decodedToken.roleid:', decodedToken.roleid);
//       console.log('decodedToken.role_id:', decodedToken.role_id);
//       console.log('decodedToken.RoleId:', decodedToken.RoleId);
//       console.log('decodedToken.role:', decodedToken.role);
//       console.log('decodedToken.Role:', decodedToken.Role);
//       console.log('decodedToken.roleID:', decodedToken.roleID);
//       console.log('decodedToken.ROLE_ID:', decodedToken.ROLE_ID);
      
//       // Extract role ID from the decoded token
//       const roleId = decodedToken.roleid || decodedToken.role_id || decodedToken.RoleId || 
//                      decodedToken.role || decodedToken.Role || decodedToken.roleID || decodedToken.ROLE_ID;
      
//       console.log('=== EXTRACTED ROLE INFO ===');
//       console.log('Extracted roleId:', roleId);
//       console.log('RoleId type:', typeof roleId);
      
//       // Role-based redirection with detailed logging
//       console.log('=== REDIRECTION LOGIC ===');
//       if (roleId === 1) {
//         console.log('Role ID matches 1 (number) - redirecting to /categories');
//         this.router.navigate(['/categories']);
//       } else if (roleId === '1') {
//         console.log('Role ID matches "1" (string) - redirecting to /categories');
//         this.router.navigate(['/categories']);
//       } else {
//         console.log('Role ID does not match 1 - redirecting to /dashboard');
//         console.log('Current roleId value:', roleId);
//         this.router.navigate(['/dashboard']);
//       }
      
//     } catch (error) {
//       console.error('=== TOKEN DECODING ERROR ===');
//       console.error('Error decoding token:', error);
//       console.error('Token that failed to decode:', response.token);
//       // Fallback to dashboard if token decoding fails
      
//       this.router.navigate(['/dashboard']);
//     }
//   },
//   error: (error) => {
//     console.log('=== LOGIN ERROR ===');
//     console.log('Login error:', error);
//     this.isSubmitting = false;
//     this.errorMessage = error.error?.msg || 'Invalid credentials. Please try again.';
//   }
// });
// }
// }

// function jwtDecode(token: string): any {
//   throw new Error('Function not implemented.');
// }


 
 
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    @Inject(Router) private router: Router
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
      console.log('=== LOGIN FORM INVALID ===');
      return;
    }
 
    this.isSubmitting = true;
    const credentials = this.loginForm.value;

    this.http.post<{ token: string }>('https://localhost:7264/api/Login/login', credentials).subscribe({
      next: (response) => {
        console.log('=== LOGIN RESPONSE ===');
        console.log('Full response:', response);
        console.log('Token:', response.token);
        
        localStorage.setItem('authToken', response.token);
        
        try {
          // Decode the JWT token
          const decodedToken: any = this.decodeJWT(response.token);
          
          console.log('=== DECODED TOKEN ===');
          console.log('Full decoded token:', decodedToken);
          
          // Print all properties of the decoded token
          console.log('=== ALL TOKEN PROPERTIES ===');
          for (const key in decodedToken) {
            if (decodedToken.hasOwnProperty(key)) {
              console.log(`${key}:`, decodedToken[key], `(type: ${typeof decodedToken[key]})`);
            }
          }
          
          // Extract role ID from the decoded token
          const roleId = decodedToken.roleid || decodedToken.role_id || decodedToken.RoleId || 
                         decodedToken.role || decodedToken.Role || decodedToken.roleID || decodedToken.ROLE_ID;
          
          console.log('=== EXTRACTED ROLE INFO ===');
          console.log('Extracted roleId:', roleId);
          console.log('RoleId type:', typeof roleId);
          
          // Role-based redirection
          if (roleId === 1 || roleId === '1') {
            console.log('Role ID matches 1 - redirecting to /categories');
            this.router.navigate(['/categories']);
          } else {
            console.log('Role ID does not match 1 - redirecting to /dashboard');
            this.router.navigate(['/dashboard']);
          }
          
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

  // Manual JWT decode function
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
 