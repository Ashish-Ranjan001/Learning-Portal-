import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TaServiceService } from '../../../services/tas/ta-service.service';

@Component({
  selector: 'app-edit-ta',
  templateUrl: './edit-ta.component.html',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  styleUrls: ['./edit-ta.component.css']
})
export class EditTaComponent implements OnInit {
  taForm: FormGroup;
  taId!: string;
  isLoading = true;
  isSaving = false;
  taData: any = null;

  constructor(
    private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private taService: TaServiceService, 
    private router: Router
  ) {
    // Initialize form with boolean false instead of empty string
    this.taForm = this.fb.group({
      status: [false] // Boolean initialization
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.taId = params.get('id') as string;
      if (this.taId) {
        this.loadTaStatus();
      }
    });
  }

  loadTaStatus() {
    this.isLoading = true;
    // Convert string ID to number for the service call
    const taIdNumber = this.taId
    
    this.taService.getTaById(taIdNumber).subscribe({
      next: (response: any) => {
        if (response) {
          this.taData = response;
          
          // Access status directly from response
          const statusFromApi = response.status;
          
          this.taForm.patchValue({ 
            status: statusFromApi // This will be true or false from API
          });
          
          console.log('Loaded TA Status from backend:', statusFromApi);
          console.log('Form control value after patch:', this.taForm.get('status')?.value);
          console.log('Full TA Data:', this.taData);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading TA:', error);
        this.isLoading = false;
      }
    });
  }

  toggleActiveStatus(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    console.log('Toggle clicked, new value:', checked);
    
    // Use setValue for single control update
    this.taForm.get('status')?.setValue(checked);
    
    // Add logging to track state changes
    console.log('Form status after toggle:', this.taForm.get('status')?.value);
  }

  // Method to disable/enable form during operations
  private setFormDisabledState(disabled: boolean) {
    if (disabled) {
      this.taForm.get('status')?.disable();
    } else {
      this.taForm.get('status')?.enable();
    }
  }

  onSave() {
    if (!this.isSaving) {
      this.isSaving = true;
      
      // Disable form during save operation
      this.setFormDisabledState(true);
      
      console.log('Saving with current toggle state:', this.taForm.get('status')?.value);
      
      // Convert string ID to number and prepare the request data
      const taIdNumber = this.taId
      const requestData = { 
        status: this.taForm.get('status')?.value 
      };
      
      this.taService.updateTa(taIdNumber, requestData).subscribe({
        next: (response) => {
          console.log('TA Status Updated Successfully:', response);
          this.isSaving = false;
          // Re-enable form before navigation
          this.setFormDisabledState(false);
          this.router.navigate(['/dashboard/ta/view']);
        },
        error: (error) => {
          console.error('Error updating TA:', error);
          this.isSaving = false;
          // Re-enable form on error
          this.setFormDisabledState(false);
        }
      });
    }
  }

  onCancel() {
    console.log('Edit cancelled');
    this.router.navigate(['/dashboard/ta/view']);
  }

  get currentStatus() {
    // Add null safety check
    return this.taForm.get('status')?.value ?? false;
  }
}