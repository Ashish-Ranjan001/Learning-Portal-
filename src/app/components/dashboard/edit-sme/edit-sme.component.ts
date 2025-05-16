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
  smeId!: number;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private smeService: SmeServicesService, private router: Router) {
    this.smeForm = this.fb.group({
      status: [false]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.smeId = Number(params.get('id'));
      if (this.smeId) {
        this.loadSmeStatus();
      }
    });
  }

  loadSmeStatus() {
    this.smeService.getSmeById(this.smeId).subscribe((sme) => {
      if (sme) {
        this.smeForm.patchValue({ status: sme.status });
        console.log('Loaded SME Status:', sme.status);
      }
    });
  }

  toggleActiveStatus(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.smeForm.patchValue({ status: checked });
    console.log('Updated Status:', checked);
  }

  onSave() {
    console.log('Saved Status:', this.smeForm.value);
    this.smeService.updateSme(this.smeId, { status: this.smeForm.value.status }).subscribe(() => {
      console.log('SME Status Updated Successfully');
      this.router.navigate(['/dashboard/sme/view']);
    });
  }

  onCancel() {
    console.log('Edit cancelled');
    this.router.navigate(['/dashboard/sme/view']);
  }
}