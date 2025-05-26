// import { ActivatedRoute } from '@angular/router';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Component, OnInit } from '@angular/core';
// import { LobServicesService } from '../../../services/lobs/lob-services.service';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-edit-lob',
//   templateUrl: './edit-lob.component.html',
//   imports:[ReactiveFormsModule,FormsModule,CommonModule],
//   styleUrls: ['./edit-lob.component.css']
// })
// export class EditLobComponent implements OnInit {
//   lobForm: FormGroup;
//   lobId!: number;

//   constructor(private route: ActivatedRoute, private fb: FormBuilder, private lobService: LobServicesService,private router: Router) {
//     this.lobForm = this.fb.group({
//       LobName: [''],
//       LobDescription: [''],
//       Status: [false]
//     });
//   }

//   ngOnInit() {
//     this.route.paramMap.subscribe(params => {
//       this.lobId = Number(params.get('id'));
//       if (this.lobId) {
//         this.loadLobDetails();
//       }
//     });
//   }

//  loadLobDetails() {
//   this.lobService.getLobById(this.lobId).subscribe((lob) => {
//     if (lob) {
//       this.lobForm.patchValue({
//         LobName: lob.lobName,
//         LobDescription: lob.lobDescription,
//         Status: lob.status // Ensure this matches the actual form control name
//       });
//       console.log('Loaded LOB Status:', lob.status);
//     }
//   });
// }
//  toggleActiveStatus() {
//   const currentStatus = this.lobForm.get('Status')?.value;
//   this.lobForm.patchValue({ Status: !currentStatus });
//   console.log('Updated Status:', this.lobForm.get('Status')?.value);
// }
//   onSave() {
//   console.log('Saved Data:', this.lobForm.value);
//   this.lobService.updateLob(this.lobId, this.lobForm.value).subscribe(() => {
//     console.log('LOB Updated Successfully');
//   });
// }


//   onCancel() {
//     console.log('Edit cancelled');
//     this.router.navigate(['/dashboard/lob/view']);
//   }
// }

import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LobServicesService } from '../../../services/lobs/lob-services.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-lob',
  templateUrl: './edit-lob.component.html',
  imports:[ReactiveFormsModule,FormsModule,CommonModule],
  styleUrls: ['./edit-lob.component.css']
})
export class EditLobComponent implements OnInit {
  lobForm: FormGroup;
  lobId!: string;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private lobService: LobServicesService, private router: Router) {
    this.lobForm = this.fb.group({
      LobName: [''],
      LobDescription: [''],
      Status: [false]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
     this.lobId = params.get('id') as string;
      if (this.lobId) {
        this.loadLobDetails();
      }
    });
  }

  // loadLobDetails() {
  //   this.lobService.getLobById(this.lobId).subscribe((lob) => {
  //     if (lob) {
  //       this.lobForm.patchValue({
  //         LobName: lob.lobName,
  //         LobDescription: lob.lobDescription,
  //         Status: lob.status
  //       });
  //       console.log('Loaded LOB Status:', lob.status);
  //     }
  //   });
  // }

  loadLobDetails() {
  this.lobService.getLobById(this.lobId).subscribe({
    next: (data:any) => {
      // if (data) {
        this.lobForm.patchValue({
          LobName: data.data.lobName,
          LobDescription: data.data.lobDescription,
          Status: data.data.status
        });
      //   console.log('Loaded LOB Status:', data.data.status);
      // }
      console.log('LOB Details:', data);
    },
    error: (err) => {
      console.error('Error fetching LOB details:', err);
    }
  });
}

  toggleActiveStatus(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.lobForm.patchValue({ Status: checked });
    console.log('Updated Status:', checked);
  }

  onSave() {
    console.log('Saved Data:', this.lobForm.value);
    this.lobService.updateLob(this.lobId, this.lobForm.value).subscribe(() => {
      console.log('LOB Updated Successfully');
      this.router.navigate(['/dashboard/lob/view']);
    });
  }

  onCancel() {
    console.log('Edit cancelled');
    this.router.navigate(['/dashboard/lob/view']);
  }
}