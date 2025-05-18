import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface Admin {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-view-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.css']
})
export class ViewAdminComponent implements OnInit {
  // Static admin data
  admins: Admin[] = [
    { id: 1, name: 'Super Admin', email: 'university@evalueserve.com', phone: '8000000006', status: 'Active' },
    { id: 2, name: 'John Doe', email: 'john.doe@evalueserve.com', phone: '8000000001', status: 'Active' },
    { id: 3, name: 'Jane Smith', email: 'jane.smith@evalueserve.com', phone: '8000000002', status: 'Active' },
    { id: 4, name: 'Michael Johnson', email: 'michael.johnson@evalueserve.com', phone: '8000000003', status: 'Inactive' },
    { id: 5, name: 'Emily Brown', email: 'emily.brown@evalueserve.com', phone: '8000000004', status: 'Active' },
    { id: 6, name: 'David Wilson', email: 'david.wilson@evalueserve.com', phone: '8000000005', status: 'Inactive' },
    { id: 7, name: 'Sarah Davis', email: 'sarah.davis@evalueserve.com', phone: '8000000007', status: 'Active' },
    { id: 8, name: 'Robert Miller', email: 'robert.miller@evalueserve.com', phone: '8000000008', status: 'Active' },
    { id: 9, name: 'Jennifer Taylor', email: 'jennifer.taylor@evalueserve.com', phone: '8000000009', status: 'Inactive' },
    { id: 10, name: 'William Anderson', email: 'william.anderson@evalueserve.com', phone: '8000000010', status: 'Active' },
    { id: 11, name: 'Lisa Thomas', email: 'lisa.thomas@evalueserve.com', phone: '8000000011', status: 'Active' },
    { id: 12, name: 'James White', email: 'james.white@evalueserve.com', phone: '8000000012', status: 'Inactive' }
  ];

  // Filtered admins (based on search)
  filteredAdmins: Admin[] = [];
  
  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  
  // Search functionality
  searchControl = new FormControl('');
  
  ngOnInit(): void {
    // Initialize filtered admins with all admins
    this.filteredAdmins = [...this.admins];
    this.calculateTotalPages();
    
    // Set up search with debounce
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchTerm => {
        this.search(searchTerm || '');
      });
  }
  
  search(term: string): void {
    if (!term.trim()) {
      this.filteredAdmins = [...this.admins];
    } else {
      const lowerCaseTerm = term.toLowerCase();
      this.filteredAdmins = this.admins.filter(admin => 
        admin.name.toLowerCase().includes(lowerCaseTerm) ||
        admin.email.toLowerCase().includes(lowerCaseTerm) ||
        admin.phone.includes(term)
      );
    }
    
    this.currentPage = 1; // Reset to first page when searching
    this.calculateTotalPages();
  }
  
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredAdmins.length / this.itemsPerPage);
  }
  
  getCurrentPageItems(): Admin[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredAdmins.slice(startIndex, startIndex + this.itemsPerPage);
  }
  
  // Pagination methods
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  
  goToFirstPage(): void {
    this.currentPage = 1;
  }
  
  goToLastPage(): void {
    this.currentPage = this.totalPages;
  }
  
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  
  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  
  // Generate page numbers array for pagination display
  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  
  // Actions
  editAdmin(admin: Admin): void {
    console.log('Edit admin:', admin);
    // Implement edit functionality
  }
  
  changePassword(admin: Admin): void {
    console.log('Change password for admin:', admin);
    // Implement change password functionality
  }
}