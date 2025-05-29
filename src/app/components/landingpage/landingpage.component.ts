// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Router, NavigationEnd, RouterOutlet, RouterModule } from '@angular/router';
// import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';

// @Component({
//   selector: 'app-landingpage',
//   templateUrl: './landingpage.component.html',
//   imports: [CommonModule,ReactiveFormsModule,FormsModule,MdbCollapseModule,RouterModule],
//   styleUrls: ['./landingpage.component.css']
// })
// export class LandingpageComponent {
//   pageTitle = 'Evalueserve'; // Default title
  

//   constructor(private router: Router) {
//     this.router.events.subscribe(event => {
//       if (event instanceof NavigationEnd) {
//         this.updateTitle(event.url);
//       }
//     });
//   }

//   updateTitle(url: string) {
//     if (url.includes('user-login')) {
//       this.pageTitle = 'User Login';
//     } else if (url.includes('admin-login')) {
//       this.pageTitle = 'Admin Login';
//     } else {
//       this.pageTitle = 'Evalueserve';
//     }
//   }
// }
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';

@Component({
  selector: 'app-landingpage',
  imports: [CommonModule,ReactiveFormsModule,FormsModule,MdbCollapseModule,RouterModule],
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onLogin() {
    const loginData = this.loginForm.value;

    this.http.post<{ token: string }>('/api/login', loginData).subscribe({
      next: (response) => {
        localStorage.setItem('authToken', response.token);  // Save JWT token
        this.router.navigate(['/dashboard']);  // Redirect after login
      },
      error: () => {
        alert("Login failed! Please check your credentials.");
      }
    });
  }
}