// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-add-user',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
//   templateUrl: './user.component.html',
//   styleUrls: ['./user.component.css']
// })
// export class UserComponent implements OnInit {
//   userForm!: FormGroup;
  
//   // Static data for the dropdown
//   courseOptions: string[] = [
//     'Computer Science',
//     'Business Administration',
//     'Mechanical Engineering',
//     'Electrical Engineering',
//     'Medicine',
//     'Architecture',
//     'Civil Engineering',
//     'Psychology',
//     'Literature',
//     'Mathematics',
//     'Physics',
//     'Chemistry',
//     'Biology',
//     'Economics',
//     'Political Science'
//   ];

//   constructor(private fb: FormBuilder) { }

//   ngOnInit(): void {
//     this.initializeForm();
//   }

//   initializeForm(): void {
//     this.userForm = this.fb.group({
//       name: ['', [Validators.required]],
//       email: ['', [Validators.required, Validators.email]],
//       phone: ['', [Validators.required]],
//       courseApplicability: ['', [Validators.required]],
//       designation: ['', [Validators.required]],
//       grade: ['', [Validators.required]],
//       dateOfJoining: ['', [Validators.required]],
//       gender: ['', [Validators.required]],
//       subLob: ['', [Validators.required]],
//       collegeName: ['', [Validators.required]]
//     });
//   }

//   onSubmit(): void {
//     if (this.userForm.valid) {
//       console.log('Form submitted:', this.userForm.value);
//       // Here you would typically call your service method to save the data
//       this.saveUser();
//     } else {
//       // Mark all form controls as touched to trigger validation messages
//       Object.keys(this.userForm.controls).forEach(key => {
//         const control = this.userForm.get(key);
//         control?.markAsTouched();
//       });
//     }
//   }

//   // Method to reset form
//   resetForm(): void {
//     this.userForm.reset();
//   }

//   /* 
//   // Service Integration Code (commented out as requested)
//   // -------------------------------------------------
  
//   // 1. First, create a user service in a separate file:
//   // ng generate service services/user
  
//   // 2. In user.service.ts:
//   // import { Injectable } from '@angular/core';
//   // import { HttpClient } from '@angular/common/http';
//   // import { Observable } from 'rxjs';
  
//   // @Injectable({
//   //   providedIn: 'root'
//   // })
//   // export class UserService {
//   //   private apiUrl = 'https://your-api-endpoint.com/api/users';
//   //
//   //   constructor(private http: HttpClient) { }
//   //
//   //   // Get course options from API
//   //   getCourseOptions(): Observable<string[]> {
//   //     return this.http.get<string[]>(`${this.apiUrl}/courses`);
//   //   }
//   //
//   //   // Create new user
//   //   createUser(userData: any): Observable<any> {
//   //     return this.http.post<any>(this.apiUrl, userData);
//   //   }
//   // }
  
//   // 3. Then, inject and use the service in this component:
//   // constructor(private fb: FormBuilder, private userService: UserService) { }
  
//   // 4. Load course options from API in ngOnInit:
//   // ngOnInit(): void {
//   //   this.initializeForm();
//   //   this.loadCourseOptions();
//   // }
  
//   // loadCourseOptions(): void {
//   //   this.userService.getCourseOptions().subscribe({
//   //     next: (data) => this.courseOptions = data,
//   //     error: (err) => console.error('Error loading course options:', err)
//   //   });
//   // }
  
//   // 5. Use the service to save user data:
//   // saveUser(): void {
//   //   this.userService.createUser(this.userForm.value).subscribe({
//   //     next: (response) => {
//   //       console.log('User created successfully', response);
//   //       // Show success message or navigate to user list
//   //       this.resetForm();
//   //     },
//   //     error: (err) => {
//   //       console.error('Error creating user:', err);
//   //       // Show error message
//   //     }
//   //   });
//   // }
//   */

//   // Placeholder for the service call - replace with actual service call when ready
//   saveUser(): void {
//     alert('User created successfully!');
//     this.resetForm();
//   }
// }

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
// import { LobServicesService } from '../../../services/lobs/lob-services.service';

// @Component({
//   selector: 'app-add-user',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
//   templateUrl: './user.component.html',
//   styleUrls: ['./user.component.css']
// })
// export class UserComponent implements OnInit {
//   userForm!: FormGroup;
  
//   // LOB list for the dropdown
//   lobList: any[] = [];
//   loadingData: boolean = false;
//   errorMessage: string = '';

//   constructor(
//     private fb: FormBuilder,
//     private lobService: LobServicesService
//   ) { }

//   ngOnInit(): void {
//     this.initializeForm();
//     this.loadLobs();
//   }

//   initializeForm(): void {
//     this.userForm = this.fb.group({
//       name: ['', [Validators.required]],
//       email: ['', [Validators.required, Validators.email]],
//       phone: ['', [Validators.required]],
//       courseApplicability: ['', [Validators.required]], // This will store lobId
//       designation: ['', [Validators.required]],
//       grade: ['', [Validators.required]],
//       dateOfJoining: ['', [Validators.required]],
//       gender: ['', [Validators.required]],
//       subLob: ['', [Validators.required]],
//       collegeName: ['', [Validators.required]]
//     });
//   }

//   loadLobs(): void {
//     this.loadingData = true;
    
//     this.lobService.viewLobs().subscribe({
//       next: (response: any) => {
//         console.log('LOBs received:', response);
        
//         if (Array.isArray(response)) {
//           this.lobList = response;
//         } else if (response && response.data && Array.isArray(response.data)) {
//           this.lobList = response.data;
//         } else {
//           console.error('Unexpected LOB response format:', response);
//           this.lobList = [];
//           this.errorMessage = 'Failed to load LOB data. Please refresh the page.';
//         }
        
//         console.log('LOB List after processing:', this.lobList);
//         this.loadingData = false;
//       },
//       error: (error: any) => {
//         console.error('Error loading LOBs:', error);
//         this.lobList = [];
//         this.errorMessage = 'Failed to load LOB data. Please refresh the page.';
//         this.loadingData = false;
//       }
//     });
//   }

//   onSubmit(): void {
//     if (this.userForm.valid) {
//       console.log('Form submitted:', this.userForm.value);
//       // Here you would typically call your service method to save the data
//       this.saveUser();
//     } else {
//       // Mark all form controls as touched to trigger validation messages
//       Object.keys(this.userForm.controls).forEach(key => {
//         const control = this.userForm.get(key);
//         control?.markAsTouched();
//       });
//     }
//   }

//   // Method to reset form
//   resetForm(): void {
//     this.userForm.reset();
//   }

//   // Placeholder for the service call - replace with actual service call when ready
//   saveUser(): void {
//     // Get selected LOB name for display purpose
//     const selectedLobId = this.userForm.get('courseApplicability')?.value;
//     const selectedLob = this.lobList.find(lob => lob.lobId === selectedLobId);
//     const lobName = selectedLob ? selectedLob.lobName : 'Unknown LOB';
    
//     console.log('Selected LOB:', {id: selectedLobId, name: lobName});
    
//     alert('User created successfully!');
//     this.resetForm();
//   }
// }





// --------------------------------------------------------------------------------------

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
// import { LobServicesService } from '../../../services/lobs/lob-services.service';

// @Component({
//   selector: 'app-add-user',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
//   templateUrl: './user.component.html',
//   styleUrls: ['./user.component.css']
// })
// export class UserComponent implements OnInit {
//   userForm!: FormGroup;
  
//   // LOB list for the dropdown
//   lobList: any[] = [];
//   loadingData: boolean = false;
//   errorMessage: string = '';

//   constructor(
//     private fb: FormBuilder,
//     private lobService: LobServicesService
//   ) { }

//   ngOnInit(): void {
//     this.initializeForm();
//     this.loadLobs();
//   }

//   initializeForm(): void {
//     this.userForm = this.fb.group({
//       name: ['', [Validators.required, Validators.maxLength(255)]],
//       email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
//       password: ['', [Validators.required, Validators.maxLength(255)]],
//       phone: ['', [Validators.required]],
//       lobId: ['', [Validators.required]],
//       designation: ['', [Validators.required, Validators.maxLength(255)]],
//       level: ['', [Validators.required, Validators.maxLength(255)]],
//       gender: ['', [Validators.required, Validators.maxLength(200)]],
//       subLob: ['', [Validators.required, Validators.maxLength(200)]],
//       collegeName: ['', [Validators.required, Validators.maxLength(200)]],
//       location: ['', [Validators.required, Validators.maxLength(200)]],
//       specialization: ['', [Validators.required, Validators.maxLength(200)]],
//       collegeLocation: ['', [Validators.required, Validators.maxLength(200)]],
//       offerReleaseSpoc: ['', [Validators.required, Validators.maxLength(200)]],
//       doj: ['', [Validators.required]],
//       trf: ['', [Validators.required, Validators.maxLength(200)]],
//       expectanceDate: ['', [Validators.required]],
//       collegeTier: ['', [Validators.required, Validators.maxLength(200)]],
//       qualification: ['', [Validators.required, Validators.maxLength(250)]],
//       joinerStatus: ['', [Validators.required, Validators.maxLength(200)]],
//       uploader: ['', [Validators.required, Validators.maxLength(255)]]
//     });
//   }

//   loadLobs(): void {
//     this.loadingData = true;
    
//     this.lobService.viewLobs().subscribe({
//       next: (response: any) => {
//         console.log('LOBs received:', response);
        
//         if (Array.isArray(response)) {
//           this.lobList = response;
//         } else if (response && response.data && Array.isArray(response.data)) {
//           this.lobList = response.data;
//         } else {
//           console.error('Unexpected LOB response format:', response);
//           this.lobList = [];
//           this.errorMessage = 'Failed to load LOB data. Please refresh the page.';
//         }
        
//         console.log('LOB List after processing:', this.lobList);
//         this.loadingData = false;
//       },
//       error: (error: any) => {
//         console.error('Error loading LOBs:', error);
//         this.lobList = [];
//         this.errorMessage = 'Failed to load LOB data. Please refresh the page.';
//         this.loadingData = false;
//       }
//     });
//   }

//   onSubmit(): void {
//     if (this.userForm.valid) {
//       console.log('Form submitted:', this.userForm.value);
      
//       // Convert the phone number string to a number
//       const formData = {
//         ...this.userForm.value,
//         phone: Number(this.userForm.value.phone),
//         lobId: Number(this.userForm.value.lobId)
//       };
      
//       console.log('Formatted data for submission:', formData);
      
//       // Here you would call your service to save the user
//       this.saveUser(formData);
//     } else {
//       // Mark all form controls as touched to trigger validation messages
//       Object.keys(this.userForm.controls).forEach(key => {
//         const control = this.userForm.get(key);
//         control?.markAsTouched();
//       });
//     }
//   }

//   // Method to reset form
//   resetForm(): void {
//     this.userForm.reset();
//   }

//   // Save user method
//   saveUser(userData: any): void {
//     // Get selected LOB name for display purpose
//     const selectedLobId = userData.lobId;
//     const selectedLob = this.lobList.find(lob => lob.lobId === selectedLobId);
//     const lobName = selectedLob ? selectedLob.lobName : 'Unknown LOB';
    
//     console.log('Selected LOB:', {id: selectedLobId, name: lobName});
    
//     // Here you would make the API call to create the user
//     // For example:
//     // this.userService.createUser(userData).subscribe({
//     //   next: (response) => {
//     //     console.log('User created successfully', response);
//     //     alert('User created successfully!');
//     //     this.resetForm();
//     //   },
//     //   error: (error) => {
//     //     console.error('Error creating user:', error);
//     //     alert('Error creating user. Please try again.');
//     //   }
//     // });
    
//     // Placeholder alert until the actual service is implemented
//     alert('User created successfully!');
//     this.resetForm();
//   }
// }



import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LobServicesService } from '../../../services/lobs/lob-services.service';
import { UserServiceService } from '../../../services/User/user-service.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;

  // LOB list for the dropdown
  lobList: any[] = [];
  loadingData: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private lobService: LobServicesService,
    private userService: UserServiceService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadLobs();
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      Name: ['', [Validators.required, Validators.maxLength(255)]],
      Email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      Password: ['', [Validators.required, Validators.maxLength(255)]],
      Phone: ['', [Validators.required]],
      LobId: ['', [Validators.required]],
      Designation: ['', [Validators.required, Validators.maxLength(255)]],
      Level: ['', [Validators.required, Validators.maxLength(255)]],
      Gender: ['', [Validators.required, Validators.maxLength(200)]],
      SubLob: ['', [Validators.required, Validators.maxLength(200)]],
      CollegeName: ['', [Validators.required, Validators.maxLength(200)]],
      Location: ['', [Validators.required, Validators.maxLength(200)]],
      Specialization: ['', [Validators.required, Validators.maxLength(200)]],
      CollegeLocation: ['', [Validators.required, Validators.maxLength(200)]],
      OfferReleaseSpoc: ['', [Validators.required, Validators.maxLength(200)]],
      Doj: ['', [Validators.required]],
      Trf: ['', [Validators.required, Validators.maxLength(200)]],
      ExpectanceDate: ['', [Validators.required]],
      CollegeTier: ['', [Validators.required, Validators.maxLength(200)]],
      Qualification: ['', [Validators.required, Validators.maxLength(250)]],
      JoinerStatus: ['', [Validators.required, Validators.maxLength(200)]],
      Uploader: ['', [Validators.required, Validators.maxLength(255)]]
    });
  }

  loadLobs(): void {
    this.loadingData = true;

    this.lobService.viewLobs().subscribe({
      next: (response: any) => {
        console.log('LOBs received:', response.data);
        
        if (Array.isArray(response.data)) {
          this.lobList = response.data;
        } else if (response && response.data && Array.isArray(response.data)) {
          this.lobList = response.data;
        } else {
          console.error('Unexpected LOB response format:', response);
          this.lobList = [];
          this.errorMessage = 'Failed to load LOB data. Please refresh the page.';
        }
        
        console.log('LOB List after processing:', this.lobList);
        this.loadingData = false;
      },
      error: (error: any) => {
        console.error('Error loading LOBs:', error);
        this.lobList = [];
        this.errorMessage = 'Failed to load LOB data. Please refresh the page.';
        this.loadingData = false;
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Form submitted:', this.userForm.value);
      
      // Convert the phone number string to a number
      const formData = {
        ...this.userForm.value,
        Phone: Number(this.userForm.value.Phone),
        LobId: Number(this.userForm.value.LobId)
      };
      
      console.log('Formatted data for submission:', formData);
      
      // Here you would call your service to save the user
      this.saveUser(formData);
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

  // Save user method
  saveUser(userData: any): void {
    // Get selected LOB name for display purpose
    const selectedLobId = userData.LobId;
    const selectedLob = this.lobList.find(lob => lob.lobId === selectedLobId);
    const lobName = selectedLob ? selectedLob.lobName : 'Unknown LOB';

    console.log('Selected LOB:', {id: selectedLobId, name: lobName});

 
    this.userService.addUser(userData).subscribe({
      next: (response) => {
        console.log('User created successfully', response);
        alert('User created successfully!');
        this.resetForm();
      },
      error: (error) => {
        console.error('Error creating user:', error);
        alert('Error creating user. Please try again.');
      }
    });

   
   
  }
}