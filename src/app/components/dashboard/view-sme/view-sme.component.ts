import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SmeServicesService } from '../../../services/smes/sme-services.service';

interface Sme {
  smeId: string;
  adminId: string;
  name: string;
  email: string;
  phone: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-view-sme',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-sme.component.html',
  styleUrls: ['./view-sme.component.css']
})

export class ViewSmeComponent implements OnInit {
  smes: Sme[] = [];
  searchTerm: string = '';
  filteredSmes: Sme[] = [];
  paginatedSmes: Sme[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  pages: number[] = [];

  constructor(
    private smeService: SmeServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSmes();
  }

  loadSmes(): void {
    this.isLoading = true;
    this.error = null;
    
    this.smeService.viewSmes().subscribe({
      next: (response: any) => {
        this.smes = response.data;
        this.filterSmes();
        this.isLoading = false;
      },
      error: (error:any) => {
        console.error('Error fetching SMEs:', error);
        this.error = 'Failed to load SME data. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  search(): void {
    this.currentPage = 1; // Reset to first page when searching
    this.filterSmes();
  }

  filterSmes(): void {
    if (!this.searchTerm.trim()) {
      this.filteredSmes = [...this.smes];
    } else {
      const term = this.searchTerm.toLowerCase().trim();
      this.filteredSmes = this.smes.filter(sme => 
        sme.name.toLowerCase().includes(term) || 
        sme.email.toLowerCase().includes(term)
      );
    }

    this.calculateTotalPages();
    this.updatePagination();
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredSmes.length / this.itemsPerPage);
    this.generatePageArray();
  }

  generatePageArray(): void {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedSmes = this.filteredSmes.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
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

  editSme(smeId: number): void {
  console.log('Navigating to Edit SME:', smeId);
  this.router.navigate(['/dashboard/sme/edit', smeId]); // Ensure this route exists in routing module
}

  changePassword(smeId: number): void {
    console.log('Change password for SME with ID:', smeId);
    // Navigate to change password page with smeId
    // this.router.navigate(['/change-password', smeId]);
  }

  getStatusClass(status: boolean): string {
    return status ? 'active' : 'inactive';
  }

  getStatusText(status: boolean): string {
    return status ? 'Active' : 'Inactive';
  }
}