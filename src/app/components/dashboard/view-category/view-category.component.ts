// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

// interface Category {
//   id: number;
//   name: string;
//   subSet: string;
//   imageUrl: string;
//   status: 'Active' | 'Inactive';
// }

// @Component({
//   selector: 'app-view-category',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './view-category.component.html',
//   styleUrls: ['./view-category.component.css']
// })
// export class ViewCategoryComponent implements OnInit {
//   categories: Category[] = [];
//   filteredCategories: Category[] = [];
//   searchTerm: string = '';
  
//   // Pagination properties
//   currentPage: number = 1;
//   itemsPerPage: number = 5;
//   totalPages: number = 1;
//   pages: number[] = [1];

//   constructor(private http: HttpClient,private router:Router) {}

//   ngOnInit(): void {
//     // Sample data - will be replaced with API call
//     this.categories = [
//       {
//         id: 1,
//         name: 'IMBIBE',
//         subSet: 'Behavioral and Communication',
//         imageUrl: 'assets/images/imbibe.png',
//         status: 'Active'
//       },
//       {
//         id: 2,
//         name: 'INNOVATE',
//         subSet: 'Digital and Technology',
//         imageUrl: 'assets/images/innovate.png',
//         status: 'Active'
//       },
//       {
//         id: 3,
//         name: 'INSTILL',
//         subSet: 'Domain and Functional',
//         imageUrl: 'assets/images/instill.png',
//         status: 'Active'
//       }
//     ];
    
//     this.filterCategories();
//     this.calculateTotalPages();

//     // When ready to fetch from API, uncomment this code:
//     /*
//     this.http.get<Category[]>('your-api-endpoint/categories').subscribe({
//       next: (data) => {
//         this.categories = data;
//         this.filterCategories();
//         this.calculateTotalPages();
//       },
//       error: (error) => {
//         console.error('Error fetching categories:', error);
//       }
//     });
//     */
//   }

//   search(): void {
//     this.currentPage = 1;
//     this.filterCategories();
//     this.calculateTotalPages();
//   }

//   filterCategories(): void {
//     if (!this.searchTerm.trim()) {
//       this.filteredCategories = [...this.categories];
//     } else {
//       const term = this.searchTerm.toLowerCase().trim();
//       this.filteredCategories = this.categories.filter(category => 
//         category.name.toLowerCase().includes(term) ||
//         category.subSet.toLowerCase().includes(term)
//       );
//     }
    
//     // Apply pagination
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     this.filteredCategories = this.filteredCategories.slice(startIndex, startIndex + this.itemsPerPage);
//   }

//   calculateTotalPages(): void {
//     let filteredCount = 0;
    
//     if (!this.searchTerm.trim()) {
//       filteredCount = this.categories.length;
//     } else {
//       const term = this.searchTerm.toLowerCase().trim();
//       filteredCount = this.categories.filter(category => 
//         category.name.toLowerCase().includes(term) ||
//         category.subSet.toLowerCase().includes(term)
//       ).length;
//     }
    
//     this.totalPages = Math.ceil(filteredCount / this.itemsPerPage);
//     this.generatePageArray();
//   }

//   generatePageArray(): void {
//     this.pages = [];
//     for (let i = 1; i <= this.totalPages; i++) {
//       this.pages.push(i);
//     }
//   }

//   goToPage(page: number): void {
//     if (page >= 1 && page <= this.totalPages) {
//       this.currentPage = page;
//       this.filterCategories();
//     }
//   }

//   goToFirstPage(): void {
//     this.goToPage(1);
//   }

//   goToLastPage(): void {
//     this.goToPage(this.totalPages);
//   }

//   goToPreviousPage(): void {
//     this.goToPage(this.currentPage - 1);
//   }

//   goToNextPage(): void {
//     this.goToPage(this.currentPage + 1);
//   }

//   editCategory(category: Category): void {
//     // Implementation for edit functionality
//     console.log('Edit category:', category.id);
//     this.router.navigate(['/dashboard/category/edit', category.id]); // Ensure this route exists in routing module
//   }
// }



import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Category {
  id: number;
  name: string;
  subset: string;
  imagepath: string;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-view-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  searchTerm: string = '';
  
  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  pages: number[] = [1];

  constructor(private http: HttpClient) {}

ngOnInit(): void {
  this.loadCategories();
}

// loadCategories(): void {
//   this.http.get<{ categories: Category[] }>('https://localhost:7264/api/Categories').subscribe({
//   next: (data) => {
//     this.categories = data.categories; // ✅ Extract nested array
//     this.filterCategories();
//     this.calculateTotalPages();
//   },
//   error: (error) => {
//     console.error('Error fetching categories:', error);
//   }
// });
// }

loadCategories(): void {
  this.http.get<{ success: boolean; message: string; data: Category[] }>('https://localhost:7264/api/Categories')
    .subscribe({
      next: (response) => {
        console.log('API Response:', response);
        if (response && response.success && Array.isArray(response.data)) {
          this.categories = response.data; // ✅ Extract data correctly
        } else {
          console.error('Invalid response format:', response);
          this.categories = []; // Set empty array to prevent errors
        }
        this.filterCategories();
        this.calculateTotalPages();
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
}

  search(): void {
    this.currentPage = 1;
    this.filterCategories();
    this.calculateTotalPages();
  }

  filterCategories(): void {
    if (!this.searchTerm.trim()) {
      this.filteredCategories = [...this.categories];
    } else {
      const term = this.searchTerm.toLowerCase().trim();
      this.filteredCategories = this.categories.filter(category => 
        category.name.toLowerCase().includes(term) ||
        category.subset.toLowerCase().includes(term)
      );
    }
    
    // Apply pagination
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.filteredCategories = this.filteredCategories.slice(startIndex, startIndex + this.itemsPerPage);
  }

  calculateTotalPages(): void {
    let filteredCount = 0;
    
    if (!this.searchTerm.trim()) {
      filteredCount = this.categories.length;
    } else {
      const term = this.searchTerm.toLowerCase().trim();
      filteredCount = this.categories.filter(category => 
        category.name.toLowerCase().includes(term) ||
        category.subset.toLowerCase().includes(term)
      ).length;
    }
    
    this.totalPages = Math.ceil(filteredCount / this.itemsPerPage);
    this.generatePageArray();
  }

  generatePageArray(): void {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.filterCategories();
    }
  }

  goToFirstPage(): void {
    this.goToPage(1);
  }

  goToLastPage(): void {
    this.goToPage(this.totalPages);
  }

  goToPreviousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  goToNextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  editCategory(category: Category): void {
    // Implementation for edit functionality
    console.log('Edit category:', category);
  }
}
