import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;
  
  // Static data for the dropdown
  courseOptions: string[] = [
    'Computer Science',
    'Business Administration',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Medicine',
    'Architecture',
    'Civil Engineering',
    'Psychology',
    'Literature',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Economics',
    'Political Science'
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      courseApplicability: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      grade: ['', [Validators.required]],
      dateOfJoining: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      subLob: ['', [Validators.required]],
      collegeName: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Form submitted:', this.userForm.value);
      // Here you would typically call your service method to save the data
      this.saveUser();
    } else {
      // Mark all form controls as touched to trigger validation messages
      Object.keys(this.userForm.controls).forEach(key => {
        const control = this.userForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  // Method to reset form
  resetForm(): void {
    this.userForm.reset();
  }

  /* 
  // Service Integration Code (commented out as requested)
  // -------------------------------------------------
  
  // 1. First, create a user service in a separate file:
  // ng generate service services/user
  
  // 2. In user.service.ts:
  // import { Injectable } from '@angular/core';
  // import { HttpClient } from '@angular/common/http';
  // import { Observable } from 'rxjs';
  
  // @Injectable({
  //   providedIn: 'root'
  // })
  // export class UserService {
  //   private apiUrl = 'https://your-api-endpoint.com/api/users';
  //
  //   constructor(private http: HttpClient) { }
  //
  //   // Get course options from API
  //   getCourseOptions(): Observable<string[]> {
  //     return this.http.get<string[]>(`${this.apiUrl}/courses`);
  //   }
  //
  //   // Create new user
  //   createUser(userData: any): Observable<any> {
  //     return this.http.post<any>(this.apiUrl, userData);
  //   }
  // }
  
  // 3. Then, inject and use the service in this component:
  // constructor(private fb: FormBuilder, private userService: UserService) { }
  
  // 4. Load course options from API in ngOnInit:
  // ngOnInit(): void {
  //   this.initializeForm();
  //   this.loadCourseOptions();
  // }
  
  // loadCourseOptions(): void {
  //   this.userService.getCourseOptions().subscribe({
  //     next: (data) => this.courseOptions = data,
  //     error: (err) => console.error('Error loading course options:', err)
  //   });
  // }
  
  // 5. Use the service to save user data:
  // saveUser(): void {
  //   this.userService.createUser(this.userForm.value).subscribe({
  //     next: (response) => {
  //       console.log('User created successfully', response);
  //       // Show success message or navigate to user list
  //       this.resetForm();
  //     },
  //     error: (err) => {
  //       console.error('Error creating user:', err);
  //       // Show error message
  //     }
  //   });
  // }
  */

  // Placeholder for the service call - replace with actual service call when ready
  saveUser(): void {
    alert('User created successfully!');
    this.resetForm();
  }
}