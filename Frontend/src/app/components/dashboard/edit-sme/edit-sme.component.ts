// import { ActivatedRoute } from '@angular/router';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Component, OnInit } from '@angular/core';
// import { SmeServicesService } from '../../../services/smes/sme-services.service';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-edit-sme',
//   templateUrl: './edit-sme.component.html',
//   imports: [ReactiveFormsModule, FormsModule, CommonModule],
//   styleUrls: ['./edit-sme.component.css']
// })
// export class EditSmeComponent implements OnInit {
//   smeForm: FormGroup;
//   smeId!: string;
//   isLoading = true;
//   isSaving = false;
//   smeData: any = null;

//   constructor(
//     private route: ActivatedRoute, 
//     private fb: FormBuilder, 
//     private smeService: SmeServicesService, 
//     private router: Router
//   ) {
//     // Initialize form without any default value - let backend data control it
//     this.smeForm = this.fb.group({
//       status: [''] // Empty initialization
//     });
//   }

//   ngOnInit() {
//     this.route.paramMap.subscribe(params => {
//       this.smeId = params.get('id') as string;
//       if (this.smeId) {
//         this.loadSmeStatus();
//       }
//     });
//   }

//   loadSmeStatus() {
//     this.isLoading = true;
//     this.smeService.getSmeById(this.smeId).subscribe({
//       next: (sme) => {
//         if (sme) {
//           this.smeData = sme;
//           // Directly set the value from backend without any conversion
//           this.smeForm.patchValue({ 
//             status: sme.status 
//           });
//           console.log('Loaded SME Status from backend:', sme.status);
//           console.log('Form control value after patch:', this.smeForm.get('status')?.value);
//         }
//         this.isLoading = false;
//       },
//       error: (error) => {
//         console.error('Error loading SME:', error);
//         this.isLoading = false;
//       }
//     });
//   }

//   toggleActiveStatus(event: Event) {
//     const checked = (event.target as HTMLInputElement).checked;
//     console.log('Toggle clicked, new value:', checked);
//     // Update the form control value immediately to reflect toggle state
//     this.smeForm.get('status')?.setValue(checked);
//   }

//   // Method to disable/enable form during operations
//   private setFormDisabledState(disabled: boolean) {
//     if (disabled) {
//       this.smeForm.get('status')?.disable();
//     } else {
//       this.smeForm.get('status')?.enable();
//     }
//   }

//   onSave() {
//     if (!this.isSaving) {
//       this.isSaving = true;
      
//       console.log('Saving with current toggle state:', this.smeForm.get('status')?.value);
      
//       // Backend only needs ID - it toggles the status automatically
//       this.smeService.updateSme(this.smeId).subscribe({
//         next: (response) => {
//           console.log('SME Status Updated Successfully:', response);
//           this.isSaving = false;
//           this.router.navigate(['/dashboard/sme/view']);
//         },
//         error: (error) => {
//           console.error('Error updating SME:', error);
//           this.isSaving = false;
//         }
//       });
//     }
//   }

//   onCancel() {
//     console.log('Edit cancelled');
//     this.router.navigate(['/dashboard/sme/view']);
//   }

//   get currentStatus() {
//     return this.smeForm.get('status')?.value;
//   }
// }


// import { ActivatedRoute } from '@angular/router';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Component, OnInit } from '@angular/core';
// import { SmeServicesService } from '../../../services/smes/sme-services.service';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-edit-sme',
//   templateUrl: './edit-sme.component.html',
//   imports: [ReactiveFormsModule, FormsModule, CommonModule],
//   styleUrls: ['./edit-sme.component.css']
// })
// export class EditSmeComponent implements OnInit {
//   smeForm: FormGroup;
//   smeId!: string;
//   isLoading = true;
//   isSaving = false;
//   smeData: any = null;

//   constructor(
//     private route: ActivatedRoute, 
//     private fb: FormBuilder, 
//     private smeService: SmeServicesService, 
//     private router: Router
//   ) {
//     // CHANGE 1: Initialize form with boolean false instead of empty string
//     this.smeForm = this.fb.group({
//       status: [false] // Boolean initialization instead of ''
//     });
//   }

//   ngOnInit() {
//     this.route.paramMap.subscribe(params => {
//       this.smeId = params.get('id') as string;
//       if (this.smeId) {
//         this.loadSmeStatus();
//       }
//     });
//   }

//   loadSmeStatus() {
//     this.isLoading = true;
//     this.smeService.getSmeById(this.smeId).subscribe({
//       next: (response:any) => { // CHANGE 2: Renamed parameter for clarity
//         if (response && response.data) { // CHANGE 3: Check for response.data structure
//           this.smeData = response.data; // CHANGE 4: Store the actual data object
          
//           // CHANGE 5: Access status from response.data.status instead of sme.status
//           const statusFromApi = response.data.status;
          
//           this.smeForm.patchValue({ 
//             status: statusFromApi // This will be true or false from API
//           });
          
//           console.log('Loaded SME Status from backend:', statusFromApi);
//           console.log('Form control value after patch:', this.smeForm.get('status')?.value);
//           console.log('Full SME Data:', this.smeData);
//         }
//         this.isLoading = false;
//       },
//       error: (error) => {
//         console.error('Error loading SME:', error);
//         this.isLoading = false;
//       }
//     });
//   }

//   toggleActiveStatus(event: Event) {
//     const checked = (event.target as HTMLInputElement).checked;
//     console.log('Toggle clicked, new value:', checked);
    
//     // CHANGE 6: Use setValue instead of patchValue for single control update
//     this.smeForm.get('status')?.setValue(checked);
    
//     // CHANGE 7: Add additional logging to track state changes
//     console.log('Form status after toggle:', this.smeForm.get('status')?.value);
//   }

//   // Method to disable/enable form during operations
//   private setFormDisabledState(disabled: boolean) {
//     if (disabled) {
//       this.smeForm.get('status')?.disable();
//     } else {
//       this.smeForm.get('status')?.enable();
//     }
//   }

//   onSave() {
//     if (!this.isSaving) {
//       this.isSaving = true;
      
//       // CHANGE 8: Disable form during save operation
//       this.setFormDisabledState(true);
      
//       console.log('Saving with current toggle state:', this.smeForm.get('status')?.value);
      
//       // Backend only needs ID - it toggles the status automatically
//       this.smeService.updateSme(this.smeId).subscribe({
//         next: (response) => {
//           console.log('SME Status Updated Successfully:', response);
//           this.isSaving = false;
//           // CHANGE 9: Re-enable form before navigation (good practice)
//           this.setFormDisabledState(false);
//           this.router.navigate(['/dashboard/sme/view']);
//         },
//         error: (error) => {
//           console.error('Error updating SME:', error);
//           this.isSaving = false;
//           // CHANGE 10: Re-enable form on error
//           this.setFormDisabledState(false);
//         }
//       });
//     }
//   }

//   onCancel() {
//     console.log('Edit cancelled');
//     this.router.navigate(['/dashboard/sme/view']);
//   }

//   get currentStatus() {
//     // CHANGE 11: Add null safety check
//     return this.smeForm.get('status')?.value ?? false;
//   }
// }


import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SmeServicesService } from '../../../services/smes/sme-services.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-sme',
  templateUrl: './edit-sme.component.html',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  styleUrls: ['./edit-sme.component.css']
})
export class EditSmeComponent implements OnInit {
  smeForm: FormGroup;
  smeId!: string;
  isLoading = true;
  isSaving = false;
  smeData: any = null;

  constructor(
    private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private smeService: SmeServicesService, 
    private router: Router
  ) {
    // Initialize form with boolean false instead of empty string
    this.smeForm = this.fb.group({
      status: [false] // Boolean initialization
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.smeId = params.get('id') as string;
      if (this.smeId) {
        this.loadSmeStatus();
      }
    });
  }

  loadSmeStatus() {
    this.isLoading = true;
    
    this.smeService.getSmeById(this.smeId).subscribe({
      next: (response: any) => {
        if (response && response.data) {
          this.smeData = response.data;
          
          // Access status from response.data.status
          const statusFromApi = response.data.status;
          
          this.smeForm.patchValue({ 
            status: statusFromApi // This will be true or false from API
          });
          
          console.log('Loaded SME Status from backend:', statusFromApi);
          console.log('Form control value after patch:', this.smeForm.get('status')?.value);
          console.log('Full SME Data:', this.smeData);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading SME:', error);
        this.isLoading = false;
      }
    });
  }

  toggleActiveStatus(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    console.log('Toggle clicked, new value:', checked);
    
    // Use setValue for single control update
    this.smeForm.get('status')?.setValue(checked);
    
    // Add logging to track state changes
    console.log('Form status after toggle:', this.smeForm.get('status')?.value);
  }

  // Method to disable/enable form during operations
  private setFormDisabledState(disabled: boolean) {
    if (disabled) {
      this.smeForm.get('status')?.disable();
    } else {
      this.smeForm.get('status')?.enable();
    }
  }

  onSave() {
    if (!this.isSaving) {
      this.isSaving = true;
      
      // Disable form during save operation
      this.setFormDisabledState(true);
      
      console.log('Saving with current toggle state:', this.smeForm.get('status')?.value);
      
      // Prepare the request data with current status
      const requestData = { 
        status: this.smeForm.get('status')?.value 
      };
      
      this.smeService.updateSme(this.smeId, requestData).subscribe({
        next: (response) => {
          console.log('SME Status Updated Successfully:', response);
          this.isSaving = false;
          // Re-enable form before navigation
          this.setFormDisabledState(false);
          this.router.navigate(['/dashboard/sme/view']);
        },
        error: (error) => {
          console.error('Error updating SME:', error);
          this.isSaving = false;
          // Re-enable form on error
          this.setFormDisabledState(false);
        }
      });
    }
  }

  onCancel() {
    console.log('Edit cancelled');
    this.router.navigate(['/dashboard/sme/view']);
  }

  get currentStatus() {
    // Add null safety check
    return this.smeForm.get('status')?.value ?? false;
  }
}