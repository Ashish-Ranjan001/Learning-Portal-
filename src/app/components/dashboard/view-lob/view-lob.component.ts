import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Lob {
  name: string;
  description: string;
  status: string;
}

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
  itemsPerPage: number = 10;
  
  constructor() {}

  ngOnInit(): void {
    // In the future, this would be replaced with an API call
    this.loadDefaultEntries();
  }

  loadDefaultEntries(): void {
    this.lobList = [
      { name: 'CIB', description: 'cib', status: 'Active' },
      { name: 'RQS', description: 'Risk & Quant', status: 'Active' },
      { name: 'DA', description: 'Data Analytics', status: 'Active' },
      { name: 'ITC', description: 'Information Technology Center', status: 'Active' }
    ];
  }

  get filteredLobs(): Lob[] {
    return this.lobList.filter(lob => 
      lob.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
      lob.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get paginatedLobs(): Lob[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredLobs.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredLobs.length / this.itemsPerPage);
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

  editLob(lobName: string): void {
    // This would be implemented to navigate to edit page or open a modal
    console.log(`Edit LOB: ${lobName}`);
  }
}




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