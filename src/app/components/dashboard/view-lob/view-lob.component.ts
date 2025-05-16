// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// interface Lob {
//   name: string;
//   description: string;
//   status: string;
// }

// @Component({
//   selector: 'app-view-lob',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './view-lob.component.html',
//   styleUrls: ['./view-lob.component.css']
// })
// export class ViewLobComponent implements OnInit {
//   lobList: Lob[] = [];
//   searchTerm: string = '';
//   currentPage: number = 1;
//   itemsPerPage: number = 10;
  
//   constructor() {}

//   ngOnInit(): void {
//     // In the future, this would be replaced with an API call
//     this.loadDefaultEntries();
//   }

//   loadDefaultEntries(): void {
//     this.lobList = [
//       { name: 'CIB', description: 'cib', status: 'Active' },
//       { name: 'RQS', description: 'Risk & Quant', status: 'Active' },
//       { name: 'DA', description: 'Data Analytics', status: 'Active' },
//       { name: 'ITC', description: 'Information Technology Center', status: 'Active' }
//     ];
//   }

//   get filteredLobs(): Lob[] {
//     return this.lobList.filter(lob => 
//       lob.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
//       lob.description.toLowerCase().includes(this.searchTerm.toLowerCase())
//     );
//   }

//   get paginatedLobs(): Lob[] {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     return this.filteredLobs.slice(startIndex, startIndex + this.itemsPerPage);
//   }

//   get totalPages(): number {
//     return Math.ceil(this.filteredLobs.length / this.itemsPerPage);
//   }

//   previousPage(): void {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//     }
//   }

//   nextPage(): void {
//     if (this.currentPage < this.totalPages) {
//       this.currentPage++;
//     }
//   }

//   firstPage(): void {
//     this.currentPage = 1;
//   }

//   lastPage(): void {
//     this.currentPage = this.totalPages;
//   }

//   editLob(lobName: string): void {
//     // This would be implemented to navigate to edit page or open a modal
//     console.log(`Edit LOB: ${lobName}`);
//   }
// }




//  this will work for api calling time --------------------------------------------------------  
// ---------------------------------------------------------------------------------------------

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { LobService, Lob } from '../services/lob.service';
// import { HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-view-lob',
//   standalone: true,
//   imports: [CommonModule, FormsModule, HttpClientModule],
//   templateUrl: './view-lob.component.html',
//   styleUrls: ['./view-lob.component.css']
// })
// export class ViewLobComponent implements OnInit {
//   lobList: Lob[] = [];
//   searchTerm: string = '';
//   currentPage: number = 1;
//   itemsPerPage: number = 10;
//   loading: boolean = true;
//   error: string | null = null;
  
//   constructor(private lobService: LobService) {}

//   ngOnInit(): void {
//     this.loadLobs();
//   }

//   loadLobs(): void {
//     this.loading = true;
//     this.error = null;
    
//     this.lobService.getLobs().subscribe({
//       next: (data) => {
//         this.lobList = data;
//         this.loading = false;
//       },
//       error: (err) => {
//         console.error('Error fetching LOBs:', err);
//         this.error = 'Failed to load LOBs. Please try again later.';
//         this.loading = false;
//       }
//     });
//   }

//   get filteredLobs(): Lob[] {
//     return this.lobList.filter(lob => 
//       lob.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
//       lob.description.toLowerCase().includes(this.searchTerm.toLowerCase())
//     );
//   }

//   get paginatedLobs(): Lob[] {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     return this.filteredLobs.slice(startIndex, startIndex + this.itemsPerPage);
//   }

//   get totalPages(): number {
//     return Math.ceil(this.filteredLobs.length / this.itemsPerPage);
//   }

//   previousPage(): void {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//     }
//   }

//   nextPage(): void {
//     if (this.currentPage < this.totalPages) {
//       this.currentPage++;
//     }
//   }

//   firstPage(): void {
//     this.currentPage = 1;
//   }

//   lastPage(): void {
//     this.currentPage = this.totalPages;
//   }

//   editLob(lobName: string): void {
//     // This would be implemented to navigate to edit page or open a modal
//     console.log(`Edit LOB: ${lobName}`);
//   }
// }


//-------------------------------------------------------------------

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

// interface Lob {
//   lobId: number;
//   lobName: string;
//   lobDescription: string;
//   status: boolean;
// }

// @Component({
//   selector: 'app-view-lob',
//   standalone: true,
//   imports: [CommonModule, FormsModule, HttpClientModule],
//   templateUrl: './view-lob.component.html',
//   styleUrls: ['./view-lob.component.css']
// })
// export class ViewLobComponent implements OnInit {
//   lobList: Lob[] = [];
//   searchTerm: string = '';
//   currentPage: number = 1;
//   itemsPerPage: number = 5; // Changed to 5 as per requirements
//   loading: boolean = false;
//   error: string | null = null;
  
//   private apiBaseUrl = 'https://localhost:7264'; // Replace with your actual API base URL
  
//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.fetchLobs();
//   }

//   fetchLobs(): void {
//     this.loading = true;
//     this.error = null;
    
//     const url = `${this.apiBaseUrl}/api/lobs`;
//     this.http.get<Lob[]>(url).subscribe({
//       next: (data) => {
//         this.lobList = data;
//         console.log(this.lobList);
//         this.loading = false;
//       },
//       error: (err) => {
//         console.error('Error fetching LOBs:', err);
//         this.error = 'Failed to load LOBs. Please try again later.';
//         this.loading = false;
//       }
//     });
//   }

//   get filteredLobs(): Lob[] {
//     return this.lobList.filter(lob => 
//       lob.lobName.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
//       lob.lobDescription.toLowerCase().includes(this.searchTerm.toLowerCase())
//     );
//   }

//   get paginatedLobs(): Lob[] {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     return this.filteredLobs.slice(startIndex, startIndex + this.itemsPerPage);
//   }

//   get totalPages(): number {
//     return Math.ceil(this.filteredLobs.length / this.itemsPerPage);
//   }

//   previousPage(): void {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//     }
//   }

//   nextPage(): void {
//     if (this.currentPage < this.totalPages) {
//       this.currentPage++;
//     }
//   }

//   firstPage(): void {
//     this.currentPage = 1;
//   }

//   lastPage(): void {
//     this.currentPage = this.totalPages;
//   }

//   editLob(lobId: number): void {
//     // This would be implemented to navigate to edit page or open a modal
//     console.log(`Edit LOB ID: ${lobId}`);
//     // You can add navigation logic here
//   }

//   // Helper method to get status display text
//   getStatusText(status: boolean): string {
//     return status ? 'Active' : 'Inactive';
//   }
// }


// --------------------------------------------------------------------

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { LobServicesService  , Lob} from '../../../services/lobs/lob-services.service';

@Component({
  selector: 'app-view-lob',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-lob.component.html',
  styleUrls: ['./view-lob.component.css']
})



export class ViewLobComponent implements OnInit {
  lobList: Lob[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5; // Changed to 5 as per requirements
  loading: boolean = false;
  error: string | null = null;
  
 // Replace with your actual API base URL
  constructor(private router:Router) { }
 lobService:any=inject(LobServicesService)

  ngOnInit(): void {
    this.fetchLobs();
  }

  fetchLobs(): void {
    this.loading = true;
    this.error = null;
    
    this.lobService.viewLobs().subscribe({
      next: (data:any) => {
        this.lobList = data;
        this.loading = false;
      },
      error: (err:any) => {
        console.error('Error fetching LOBs:', err);
        this.error = 'Failed to load LOBs. Please try again later.';
        this.loading = false;
      }
    });
  }

  get filteredLobs(): Lob[] {
    return this.lobList.filter(lob => 
      lob.lobName.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
      lob.lobDescription.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  

  get paginatedLobs(): Lob[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredLobs.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredLobs.length / this.itemsPerPage);
  }
    onSearchChange(): void {
    // Reset to first page when search term changes
    this.currentPage = 1;
  }  
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  firstPage(): void {
    this.currentPage = 1;
  }

  lastPage(): void {
    this.currentPage = this.totalPages;
  }

  editLob(lobId: number) {
  this.router.navigate([`/dashboard/lob/edit/${lobId}`]);
}

  // Helper method to get status display text
  getStatusText(status: boolean): string {
    return status ? 'Active' : 'Inactive';
  }
}