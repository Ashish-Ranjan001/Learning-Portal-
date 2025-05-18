// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Course } from '../../../models/course';

// @Component({
//   selector: 'app-course-form',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './course-form.component.html',
//   styleUrl: './course-form.component.css'
// })
// export class CourseFormComponent implements OnInit {
//   @Input() courseData: Course = {
//     name: '',
//     category: '',
//     description: '',
//     sme: '',
//     lob: '',
//     author: ''
//   };

//   @Output() formDataChange = new EventEmitter<{ course: Course, thumbnailImage?: File }>();

//   thumbnailImage?: File;
//   thumbnailPreview: string | null = null;
//   categories: string[] = ['Development', 'Design', 'Marketing', 'Business', 'IT & Software'];

//   constructor() {}

//   ngOnInit(): void {}

//   onThumbnailChange(event: Event): void {
//     const input = event.target as HTMLInputElement;
    
//     if (input.files && input.files.length > 0) {
//       this.thumbnailImage = input.files[0];
      
//       // Create preview
//       const reader = new FileReader();
//       reader.onload = () => {
//         this.thumbnailPreview = reader.result as string;
//       };
//       reader.readAsDataURL(this.thumbnailImage);
      
//       this.emitFormData();
//     }
//   }

//   onFormChange(): void {
//     this.emitFormData();
//   }
  
//   onDragOver(event: DragEvent): void {
//     event.preventDefault();
//     event.stopPropagation();
//   }
  
//   onDrop(event: DragEvent): void {
//     event.preventDefault();
//     event.stopPropagation();
    
//     if (event.dataTransfer && event.dataTransfer.files.length > 0) {
//       const file = event.dataTransfer.files[0];
//       if (file.type.startsWith('image/')) {
//         this.thumbnailImage = file;
        
//         // Create preview
//         const reader = new FileReader();
//         reader.onload = () => {
//           this.thumbnailPreview = reader.result as string;
//         };
//         reader.readAsDataURL(this.thumbnailImage);
        
//         this.emitFormData();
//       }
//     }
//   }

//   emitFormData(): void {
//     this.formDataChange.emit({
//       course: this.courseData,
//       thumbnailImage: this.thumbnailImage
//     });
//   }
// }




// -------------------------------------------------------------------------------------------------



// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Course } from '../../../models/course';
// import { SmeServicesService } from '../../../services/smes/sme-services.service';
// import { LobServicesService } from '../../../services/lobs/lob-services.service';


// @Component({
//   selector: 'app-course-form',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './course-form.component.html',
//   styleUrl: './course-form.component.css'
// })
// export class CourseFormComponent implements OnInit {
//   @Input() courseData: Course = {
//     name: '',
//     category: '',
//     description: '',
//     smeId: '',
//     lobId: '',
//     author: ''
//   };
//   @Output() formDataChange = new EventEmitter<{ course: Course, thumbnailImage?: File }>();
  
//   thumbnailImage?: File;
//   thumbnailPreview: string | null = null;
//   categories: string[] = ['Development', 'Design', 'Marketing', 'Business', 'IT & Software'];
  
//   smeList: any[] = [];
//   lobList: any[] = [];

//   constructor(
//     private smeService: SmeServicesService,
//     private lobService: LobServicesService
//   ) {}

//   ngOnInit(): void {
//     this.loadSmes();
//     this.loadLobs();
//   }

//   loadSmes(): void {
//     this.smeService.viewSmes().subscribe({
//       next: (response: any) => {
//         this.smeList = response;
//       },
//       error: (error:any) => {
//         console.error('Error loading SMEs:', error);
//       }
//     });
//   }

//   loadLobs(): void {
//     this.lobService.viewLobs().subscribe({
//       next: (response: any) => {
//         this.lobList = response;
//       },
//       error: (error:any) => {
//         console.error('Error loading LOBs:', error);
//       }
//     });
//   }

//   onThumbnailChange(event: Event): void {
//     const input = event.target as HTMLInputElement;
   
//     if (input.files && input.files.length > 0) {
//       this.thumbnailImage = input.files[0];
     
//       // Create preview
//       const reader = new FileReader();
//       reader.onload = () => {
//         this.thumbnailPreview = reader.result as string;
//       };
//       reader.readAsDataURL(this.thumbnailImage);
     
//       this.emitFormData();
//     }
//   }

//   onFormChange(): void {
//     this.emitFormData();
//   }
 
//   onDragOver(event: DragEvent): void {
//     event.preventDefault();
//     event.stopPropagation();
//   }
 
//   onDrop(event: DragEvent): void {
//     event.preventDefault();
//     event.stopPropagation();
   
//     if (event.dataTransfer && event.dataTransfer.files.length > 0) {
//       const file = event.dataTransfer.files[0];
//       if (file.type.startsWith('image/')) {
//         this.thumbnailImage = file;
       
//         // Create preview
//         const reader = new FileReader();
//         reader.onload = () => {
//           this.thumbnailPreview = reader.result as string;
//         };
//         reader.readAsDataURL(this.thumbnailImage);
       
//         this.emitFormData();
//       }
//     }
//   }

//   emitFormData(): void {
//     this.formDataChange.emit({
//       course: this.courseData,
//       thumbnailImage: this.thumbnailImage
//     });
//   }
// }




// ----------------------------------------------------------------------------------------------------------------------------




import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Course } from '../../../models/course';
import { SmeServicesService } from '../../../services/smes/sme-services.service';
import { LobServicesService } from '../../../services/lobs/lob-services.service';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})
export class CourseFormComponent implements OnInit {
  @Input() courseData: Course = {
    name: '',
    category: '',
    description: '',
    smeId: '',
    lobId: '',
    author: ''
  };
  @Output() formDataChange = new EventEmitter<{ course: Course, thumbnailImage?: File }>();
  
  thumbnailImage?: File;
  thumbnailPreview: string | null = null;
  categories: string[] = ['Development', 'Design', 'Marketing', 'Business', 'IT & Software'];
  
  smeList: any[] = [];
  lobList: any[] = [];

  constructor(
    private smeService: SmeServicesService,
    private lobService: LobServicesService
  ) {}

  ngOnInit(): void {
    this.loadSmes();
    this.loadLobs();
  }

  loadSmes(): void {
    this.smeService.viewSmes().subscribe({
      next: (response: any) => {
        console.log('SMEs received:', response);
        // Check if response is an array or has a data property
        if (Array.isArray(response)) {
          this.smeList = response;
        } else if (response && response.data && Array.isArray(response.data)) {
          this.smeList = response.data;
        } else {
          console.error('Unexpected SME response format:', response);
          this.smeList = [];
        }
        console.log('SME List after processing:', this.smeList);
      },
      error: (error:any) => {
        console.error('Error loading SMEs:', error);
        this.smeList = [];
      }
    });
  }
  
  
  
 
  


  loadLobs(): void {
    this.lobService.viewLobs().subscribe({
      next: (response: any) => {
        console.log('LOBs received:', response);
     
        if (Array.isArray(response)) {
          this.lobList = response;
        } else if (response && response.data && Array.isArray(response.data)) {
          this.lobList = response.data;
        } else {
          console.error('Unexpected LOB response format:', response);
          this.lobList = [];
        }
        console.log('LOB List after processing:', this.lobList);
      },
      error: (error:any) => {
        console.error('Error loading LOBs:', error);
        this.lobList = [];
      }
    });
  }

  onThumbnailChange(event: Event): void {
    const input = event.target as HTMLInputElement;
   
    if (input.files && input.files.length > 0) {
      this.thumbnailImage = input.files[0];
     
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        this.thumbnailPreview = reader.result as string;
      };
      reader.readAsDataURL(this.thumbnailImage);
     
      this.emitFormData();
    }
  }

  onFormChange(): void {
    this.emitFormData();
  }
 
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }
 
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
   
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        this.thumbnailImage = file;
       
        // Create preview
        const reader = new FileReader();
        reader.onload = () => {
          this.thumbnailPreview = reader.result as string;
        };
        reader.readAsDataURL(this.thumbnailImage);
       
        this.emitFormData();
      }
    }
  }

  emitFormData(): void {
    this.formDataChange.emit({
      course: this.courseData,
      thumbnailImage: this.thumbnailImage
    });
  }
}