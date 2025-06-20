

// // import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
// // import { Subject } from 'rxjs';
// // import { takeUntil } from 'rxjs/operators';
// // import { MainheaderComponent } from '../mainheader/mainheader.component';
// // import { MainfooterComponent } from '../mainfooter/mainfooter.component';
// // import { CalendarComponent } from '../calendar/calendar.component';
// // import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
// // import { RouterOutlet } from '@angular/router';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';
// // import { CardCarouselComponent } from '../card-carousel/card-carousel.component';
// // import { HeroBannerComponent } from '../hero-banner/hero-banner.component';
// // import { FavoriteCoursesComponent } from '../favorite-courses/favorite-courses.component';
// // // Add these imports for the new components
// // // import { CategoriesComponent } from '../categories/categories.component';
// // // import { PieChartComponent } from '../pie-chart/pie-chart.component';
// // // import { SavedCoursesComponent } from '../saved-courses/saved-courses.component';

// // @Component({
// //   selector: 'app-home',
// //   templateUrl: './home.component.html',
// //   styleUrls: ['./home.component.css'],
// //   imports: [
// //     RouterOutlet, 
// //     MainfooterComponent, 
// //     MainheaderComponent, 
// //     CalendarComponent, 
// //     ProgressBarComponent, 
// //     CommonModule, 
// //     FormsModule, 
// //     CardCarouselComponent, 
// //     HeroBannerComponent, 
// //     FavoriteCoursesComponent
// //     // Add new component imports here when available:
// //     // CategoriesComponent,
// //     // PieChartComponent,
// //     // SavedCoursesComponent
// //   ],
// // })
// // export class HomeComponent implements OnInit, OnDestroy {
// //   // User data
// //   userName = 'John Doe';
// //   userEmail = 'john.doe@example.com';
// //   userAvatar = '/assets/avatar.png';
  
// //   // Component lifecycle
// //   private destroy$ = new Subject<void>();
  
// //   // Mobile breakpoint
// //   private mobileBreakpoint = 768;
// //   private tabletBreakpoint = 1024;
// //   isMobile = false;
// //   isTablet = false;

// //   constructor() {
// //     this.checkScreenSize();
// //   }

// //   ngOnInit(): void {
// //     // Initialize component
// //     this.initializeComponent();
// //   }

// //   ngOnDestroy(): void {
// //     this.destroy$.next();
// //     this.destroy$.complete();
// //   }

// //   /**
// //    * Listen to window resize events
// //    */
// //   @HostListener('window:resize', ['$event'])
// //   onResize(event: Event): void {
// //     this.checkScreenSize();
// //   }

// //   /**
// //    * Check screen size and update mobile/tablet state
// //    */
// //   private checkScreenSize(): void {
// //     const width = window.innerWidth;
// //     this.isMobile = width <= this.mobileBreakpoint;
// //     this.isTablet = width > this.mobileBreakpoint && width <= this.tabletBreakpoint;
// //   }

// //   /**
// //    * Initialize component with default settings
// //    */
// //   private initializeComponent(): void {
// //     // Load user data if needed
// //     this.loadUserData();
    
// //     // Set up any required subscriptions
// //     this.setupSubscriptions();
// //   }

// //   /**
// //    * Load user data from service
// //    */
// //   private loadUserData(): void {
// //     // Implement user data loading logic here
// //     // This could come from a user service, local storage, etc.
    
// //     // Example:
// //     // this.userService.getCurrentUser()
// //     //   .pipe(takeUntil(this.destroy$))
// //     //   .subscribe(user => {
// //     //     this.userName = user.name;
// //     //     this.userEmail = user.email;
// //     //     this.userAvatar = user.avatar;
// //     //   });
// //   }

// //   /**
// //    * Set up component subscriptions
// //    */
// //   private setupSubscriptions(): void {
// //     // Add any reactive subscriptions here
// //     // Remember to use takeUntil(this.destroy$) to prevent memory leaks
// //   }

// //   /**
// //    * Handle component interactions
// //    */
// //   onHeroBannerAction(action: any): void {
// //     console.log('Hero banner action:', action);
// //     // Handle hero banner interactions
// //   }

// //   onCarouselItemSelected(item: any): void {
// //     console.log('Carousel item selected:', item);
// //     // Handle carousel item selection
// //   }

// //   onCourseSelected(course: any): void {
// //     console.log('Course selected:', course);
// //     // Handle course selection
// //   }

// //   onProgressUpdate(progress: any): void {
// //     console.log('Progress updated:', progress);
// //     // Handle progress updates
// //   }

// //   onCalendarEventSelected(event: any): void {
// //     console.log('Calendar event selected:', event);
// //     // Handle calendar event selection
// //   }

// //   onCategorySelected(category: any): void {
// //     console.log('Category selected:', category);
// //     // Handle category selection
// //   }

// //   onSavedCourseSelected(course: any): void {
// //     console.log('Saved course selected:', course);
// //     // Handle saved course selection
// //   }

// //   onPieChartDataSelected(data: any): void {
// //     console.log('Pie chart data selected:', data);
// //     // Handle pie chart data selection
// //   }

// //   /**
// //    * Utility method to get current breakpoint
// //    */
// //   getCurrentBreakpoint(): string {
// //     const width = window.innerWidth;
    
// //     if (width <= 480) return 'xs';
// //     if (width <= 768) return 'sm';
// //     if (width <= 1024) return 'md';
// //     if (width <= 1440) return 'lg';
// //     return 'xl';
// //   }

// //   /**
// //    * Check if current view is mobile
// //    */
// //   get isMobileView(): boolean {
// //     return this.isMobile;
// //   }

// //   /**
// //    * Check if current view is tablet
// //    */
// //   get isTabletView(): boolean {
// //     return this.isTablet;
// //   }
// // }



// import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
// import { Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';
// import { MainheaderComponent } from '../mainheader/mainheader.component';
// import { MainfooterComponent } from '../mainfooter/mainfooter.component';
// import { CalendarComponent } from '../calendar/calendar.component';
// import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
// import { RouterOutlet } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { CardCarouselComponent } from '../card-carousel/card-carousel.component';
// import { HeroBannerComponent } from '../hero-banner/hero-banner.component';
// import { FavoriteCoursesComponent } from '../favorite-courses/favorite-courses.component';
// // Add these imports for the new components
// // import { CategoriesComponent } from '../categories/categories.component';
// // import { PieChartComponent } from '../pie-chart/pie-chart.component';
// // import { SavedCoursesComponent } from '../saved-courses/saved-courses.component';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css'],
  // imports: [
  //   RouterOutlet, 
  //   MainfooterComponent, 
  //   MainheaderComponent, 
  //   CalendarComponent, 
  //   ProgressBarComponent, 
  //   CommonModule, 
  //   FormsModule, 
  //   CardCarouselComponent, 
  //   HeroBannerComponent, 
  //   FavoriteCoursesComponent
  //   // Add new component imports here when available:
  //   // CategoriesComponent,
  //   // PieChartComponent,
  //   // SavedCoursesComponent
  // ],
// })
// export class HomeComponent implements OnInit, OnDestroy {
//   // User data
//   userName = 'John Doe';
//   userEmail = 'john.doe@example.com';
//   userAvatar = '/assets/avatar.png';
  
//   // Component lifecycle
//   private destroy$ = new Subject<void>();
  
//   // Mobile breakpoint
//   private mobileBreakpoint = 768;
//   private tabletBreakpoint = 1024;
//   isMobile = false;
//   isTablet = false;

//   constructor() {
//     this.checkScreenSize();
//   }

//   ngOnInit(): void {
//     // Initialize component
//     this.initializeComponent();
//   }

//   ngOnDestroy(): void {
//     this.destroy$.next();
//     this.destroy$.complete();
//   }

//   /**
//    * Listen to window resize events
//    */
//   @HostListener('window:resize', ['$event'])
//   onResize(event: Event): void {
//     this.checkScreenSize();
//   }

//   /**
//    * Check screen size and update mobile/tablet state
//    */
//   private checkScreenSize(): void {
//     const width = window.innerWidth;
//     this.isMobile = width <= this.mobileBreakpoint;
//     this.isTablet = width > this.mobileBreakpoint && width <= this.tabletBreakpoint;
//   }

//   /**
//    * Initialize component with default settings
//    */
//   private initializeComponent(): void {
//     // Load user data if needed
//     this.loadUserData();
    
//     // Set up any required subscriptions
//     this.setupSubscriptions();
//   }

//   /**
//    * Load user data from service
//    */
//   private loadUserData(): void {
//     // Implement user data loading logic here
//     // This could come from a user service, local storage, etc.
    
//     // Example:
//     // this.userService.getCurrentUser()
//     //   .pipe(takeUntil(this.destroy$))
//     //   .subscribe(user => {
//     //     this.userName = user.name;
//     //     this.userEmail = user.email;
//     //     this.userAvatar = user.avatar;
//     //   });
//   }

//   /**
//    * Set up component subscriptions
//    */
//   private setupSubscriptions(): void {
//     // Add any reactive subscriptions here
//     // Remember to use takeUntil(this.destroy$) to prevent memory leaks
//   }

//   /**
//    * Handle component interactions
//    */
//   onHeroBannerAction(action: any): void {
//     console.log('Hero banner action:', action);
//     // Handle hero banner interactions
//   }

//   onCarouselItemSelected(item: any): void {
//     console.log('Carousel item selected:', item);
//     // Handle carousel item selection
//   }

//   onCourseSelected(course: any): void {
//     console.log('Course selected:', course);
//     // Handle course selection
//   }

//   onProgressUpdate(progress: any): void {
//     console.log('Progress updated:', progress);
//     // Handle progress updates
//   }

//   onCalendarEventSelected(event: any): void {
//     console.log('Calendar event selected:', event);
//     // Handle calendar event selection
//   }

//   onCategorySelected(category: any): void {
//     console.log('Category selected:', category);
//     // Handle category selection
//   }

//   onSavedCourseSelected(course: any): void {
//     console.log('Saved course selected:', course);
//     // Handle saved course selection
//   }

//   onPieChartDataSelected(data: any): void {
//     console.log('Pie chart data selected:', data);
//     // Handle pie chart data selection
//   }

//   /**
//    * Utility method to get current breakpoint
//    */
//   getCurrentBreakpoint(): string {
//     const width = window.innerWidth;
    
//     if (width <= 480) return 'xs';
//     if (width <= 768) return 'sm';
//     if (width <= 1024) return 'md';
//     if (width <= 1440) return 'lg';
//     return 'xl';
//   }

//   /**
//    * Check if current view is mobile
//    */
//   get isMobileView(): boolean {
//     return this.isMobile;
//   }

//   /**
//    * Check if current view is tablet
//    */
//   get isTabletView(): boolean {
//     return this.isTablet;
//   }
// }


import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import { Subject } from 'rxjs';
import { MainfooterComponent } from '../mainfooter/mainfooter.component';
import { MainheaderComponent } from '../mainheader/mainheader.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoriteCoursesComponent } from '../favorite-courses/favorite-courses.component';
import { HeroBannerComponent } from '../hero-banner/hero-banner.component';

import { CardCarouselComponent } from '../card-carousel/card-carousel.component';
import { HomeCategoriesComponent } from '../home-categories/home-categories.component';
import { HomeSavedCourseComponent } from "../home-saved-course/home-saved-course.component";
import { FolderComponent } from '../folder/folder.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone:true,
  imports: [
    MainfooterComponent,
    MainheaderComponent,
    CalendarComponent,
    ProgressBarComponent,
    CommonModule,
    FormsModule,
    CardCarouselComponent,
    HeroBannerComponent,
    FavoriteCoursesComponent,
    // HomeCategoriesComponent
    // Add new component imports here when available:
    // CategoriesComponent,
    // PieChartComponent,
    // SavedCoursesComponent
    
    HomeSavedCourseComponent, FolderComponent
],
  
})
export class HomeComponent implements OnInit, OnDestroy {
  // User data
  userName = 'John Doe';
  userEmail = 'john.doe@example.com';
  userAvatar = '/assets/avatar.png';
  userId: string | null = null;

  // Component lifecycle
  private destroy$ = new Subject<void>();

  // Mobile breakpoint
  private mobileBreakpoint = 768;
  private tabletBreakpoint = 1024;
  isMobile = false;
  isTablet = false;

  constructor() {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.initializeComponent();
    this.userId = this.getDecodedUserId();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    const width = window.innerWidth;
    this.isMobile = width <= this.mobileBreakpoint;
    this.isTablet = width > this.mobileBreakpoint && width <= this.tabletBreakpoint;
  }

  private initializeComponent(): void {
    this.loadUserData();
    this.setupSubscriptions();
  }

  private loadUserData(): void {
    // User data loading logic here if needed
  }

  private setupSubscriptions(): void {
    // Reactive subscriptions logic here
  }

  getDecodedUserId() {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No auth token found in localStorage.");
        return null;
      }

      const decodedToken: any = jwtDecode(token);
      console.log("=== DECODED TOKEN ===", decodedToken);

      this.userName = decodedToken.Name || this.userName;
      this.userEmail = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || this.userEmail;
      const gender = decodedToken.Gender;

      this.userAvatar = gender === 'Male' ? 'male.svg' : 'female.jpg';

      const userId = decodedToken.UserId || decodedToken.nameid || decodedToken.sub;
      console.log("=== EXTRACTED USER ID ===", userId);
      return userId;
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  }

  onHeroBannerAction(action: any): void {
    console.log('Hero banner action:', action);
  }

  onCarouselItemSelected(item: any): void {
    console.log('Carousel item selected:', item);
  }

  onCourseSelected(course: any): void {
    console.log('Course selected:', course);
  }

  onProgressUpdate(progress: any): void {
    console.log('Progress updated:', progress);
  }


  onCalendarEventSelected(event: any): void {
    console.log('Calendar event selected:', event);
  }

  // onCategorySelected(category: any): void {
  //   console.log('Category selected:', category);
  // }
// In your parent component
// onCategorySelected(category: any): void {
//   console.log('Category selected:', category);
//   // Handle the selected category here
// }
  onSavedCourseSelected(course: any): void {
    console.log('Saved course selected:', course);
  }

  onPieChartDataSelected(data: any): void {
    console.log('Pie chart data selected:', data);
  }

  // In your parent component


  getCurrentBreakpoint(): string {
    const width = window.innerWidth;
    if (width <= 480) return 'xs';
    if (width <= 768) return 'sm';
    if (width <= 1024) return 'md';
    if (width <= 1440) return 'lg';
    return 'xl';
  }

  get isMobileView(): boolean {
    return this.isMobile;
  }

  get isTabletView(): boolean {
    return this.isTablet;
  }
}