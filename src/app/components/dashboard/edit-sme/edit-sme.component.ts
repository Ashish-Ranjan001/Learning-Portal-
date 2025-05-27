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
    // Initialize form without any default value - let backend data control it
    this.smeForm = this.fb.group({
      status: [''] // Empty initialization
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
      next: (sme) => {
        if (sme) {
          this.smeData = sme;
          // Directly set the value from backend without any conversion
          this.smeForm.patchValue({ 
            status: sme.status 
          });
          console.log('Loaded SME Status from backend:', sme.status);
          console.log('Form control value after patch:', this.smeForm.get('status')?.value);
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
    // Update the form control value immediately to reflect toggle state
    this.smeForm.get('status')?.setValue(checked);
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
      
      console.log('Saving with current toggle state:', this.smeForm.get('status')?.value);
      
      // Backend only needs ID - it toggles the status automatically
      this.smeService.updateSme(this.smeId).subscribe({
        next: (response) => {
          console.log('SME Status Updated Successfully:', response);
          this.isSaving = false;
          this.router.navigate(['/dashboard/sme/view']);
        },
        error: (error) => {
          console.error('Error updating SME:', error);
          this.isSaving = false;
        }
      });
    }
  }

  onCancel() {
    console.log('Edit cancelled');
    this.router.navigate(['/dashboard/sme/view']);
  }

  get currentStatus() {
    return this.smeForm.get('status')?.value;
  }
}