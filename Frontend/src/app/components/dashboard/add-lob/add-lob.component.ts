import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LobServicesService } from '../../../services/lobs/lob-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-lob',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-lob.component.html',
  styleUrls: ['./add-lob.component.css']
})
export class AddLobComponent implements OnInit {
  lobForm!: FormGroup;

  constructor(private fb: FormBuilder) {}
lobser:any=inject(LobServicesService)
router:any=inject(Router)

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.lobForm = this.fb.group({
      LobName: ['', Validators.required],
      LobDescription: ['', Validators.required]
    });
  }

  onCancel(): void {
    
    this.lobForm.reset();
  }

  onSave(): void {
    if (this.lobForm.valid) {
      // Handle form submission
      console.log('LOB data:', this.lobForm.value);

      this.lobser.addLob(this.lobForm.value).subscribe({
        next:(responce:any)=>{
          console.log(responce);
          alert("LOB Added Successfully")
          this.router.navigate(['dashboard/lob/view'])
         } ,
        error:(error:any)=>{
          console.log(error);
          alert("Error Adding LOB")
        }
      
      }
    );
      this.lobForm.reset();
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.lobForm.controls).forEach(key => {
        const control = this.lobForm.get(key);
        control?.markAsTouched();
      });
    }
  }

//   onSave(): void {
//   if (this.lobForm.valid) {
//     const formData = new FormData(); // ✅ Create FormData
//     formData.append('LobName', this.lobForm.get('name')?.value);
//     formData.append('LobDescription', this.lobForm.get('description')?.value);

//     this.lobser.addLob(formData).subscribe({
//       next: (response: any) => {
//         console.log(response);
//         alert("LOB Added Successfully");
//         this.router.navigate(['/dashboard/lobs']);
//       },
//       error: (error: any) => {
//         console.log(error);
//         alert("Error Adding LOB");
//       }
//     });

//     this.lobForm.reset();
//   } else {
//     Object.keys(this.lobForm.controls).forEach(key => {
//       const control = this.lobForm.get(key);
//       control?.markAsTouched();
//     });
//   }
// }
}

