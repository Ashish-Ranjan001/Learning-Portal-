import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLearningService, CategoryWithCoursesDto } from "../../../services/user-learning.service";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MainheaderComponent } from '../mainheader/mainheader.component';
import { MainfooterComponent } from '../mainfooter/mainfooter.component';
import { TokenService } from '../../../services/Tokenservice/token.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule , MainheaderComponent , MainfooterComponent],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: CategoryWithCoursesDto[] = [];
  loading = true;
  error = '';
 

  user = {
    userId: '',
    userName: '',
    userEmail: '',
    userAvatar: ''
  };

  constructor(
    private userLearningService: UserLearningService,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.user = tokenService.getDecodedToken() ;
  }

  // getDecodedUserId() {
  //   try {
  //     const token = localStorage.getItem("authToken");
  //     if (!token) {
  //       console.error("No auth token found in localStorage.");
  //       return null;
  //     }

  //     const decodedToken: any = jwtDecode(token);
  //     console.log("=== DECODED TOKEN ===", decodedToken);

  //     const userId = decodedToken.UserId || decodedToken.nameid || decodedToken.sub;
  //     console.log("=== EXTRACTED USER ID ===", userId);
  //     return userId;
  //   } catch (error) {
  //     console.error("Error decoding JWT:", error);
  //     return null;
  //   }
  // }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.error = '';
    
    this.userLearningService.getAllCategories(this.user.userId).subscribe({
      next: (categories) => {
        console.log('Raw categories data:', categories);
        
        if (Array.isArray(categories)) {
          this.categories = categories;
        } else {
          console.warn('Unexpected categories data structure:', categories);
          this.categories = [];
        }
        
        this.loading = false;
        console.log('Processed categories:', this.categories);
      },
      error: (error) => {
        this.error = 'Failed to load categories';
        this.loading = false;
        console.error('Error loading categories:', error);
      }
    });
  }

  getCategoryImageStyle(category: CategoryWithCoursesDto): string {
    if (category.imagePath) {
      return `url('${category.imagePath}')`;
    }
    return this.getDefaultGradient(category.name);
  }

  getDefaultGradient(categoryName: string): string {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
      'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)'
    ];
    
    const index = categoryName.length % gradients.length;
    return gradients[index];
  }

  onImageError(event: any): void {
    console.error('Image failed to load:', event.target.src);
    event.target.style.display = 'none';
    const container = event.target.parentElement;
    if (container) {
      const icon = container.querySelector('.category-icon');
      if (icon) {
        icon.style.display = 'flex';
      }
    }
  }

  onImageLoad(event: any): void {
    console.log('Image loaded successfully:', event.target.src);
  }

  viewCategoryCourses(categoryId: string, categoryName: string): void {
    console.log('Navigating to courses for category:', categoryId, categoryName);
    if (categoryId) {
      this.router.navigate(['/courses', categoryId], { 
        queryParams: { categoryName: categoryName } 
      });
    } else {
      console.error('Category ID is missing');
    }
  }

  trackByCategory(index: number, category: CategoryWithCoursesDto): string {
    return category.id || index.toString();
  }
}