import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainfooterComponent } from '../mainfooter/mainfooter.component';
import { MainheaderComponent } from '../mainheader/mainheader.component';
import { MainsidebarComponent } from '../mainsidebar/mainsidebar.component';
import { CategoryWithCoursesDto } from '../../../services/user-learning.service';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, MainfooterComponent, MainheaderComponent, MainsidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // Changed variable name for clarity - true means sidebar is collapsed/hidden
  isSidebarCollapsed = false; // Start with sidebar open
  
  // Currently selected category
  selectedCategory: CategoryWithCoursesDto | null = null;

  /**
   * Toggle sidebar from header menu button
   */
  onMenuToggle(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  /**
   * Handle category selection from sidebar
   */
  onCategorySelected(category: CategoryWithCoursesDto): void {
    this.selectedCategory = category;
    console.log('Selected category in parent:', category);
    
    // You can add additional logic here like:
    // - Navigate to category page
    // - Load category courses
    // - Update breadcrumbs
    // - Store in service/state management
    
    // Example: Navigate to category-specific route
    // this.router.navigate(['/category', category.id]);
  }

  /**
   * Handle sidebar toggle from sidebar component
   */
  onSidebarToggled(collapsed: boolean): void {
    this.isSidebarCollapsed = collapsed;
    console.log('Sidebar toggled, collapsed:', collapsed);
    
    // Optional: You can add additional logic here like:
    // - Save sidebar state to localStorage
    // - Emit event to other components
    // - Adjust layout classes
  }

  /**
   * Get current sidebar state for other components
   */
  get isSidebarOpen(): boolean {
    return !this.isSidebarCollapsed;
  }

  /**
   * Programmatically open sidebar
   */
  openSidebar(): void {
    this.isSidebarCollapsed = false;
  }

  /**
   * Programmatically close sidebar
   */
  closeSidebar(): void {
    this.isSidebarCollapsed = true;
  }

  /**
   * Get selected category info
   */
  getSelectedCategoryInfo(): string {
    if (!this.selectedCategory) {
      return 'No category selected';
    }
    return `${this.selectedCategory.name} (${this.selectedCategory.courseCount} courses)`;
  }
}