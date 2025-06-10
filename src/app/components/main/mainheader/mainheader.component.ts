// // import { Component, EventEmitter, Input, Output } from '@angular/core';
// // import { FormsModule } from '@angular/forms';
// // import { CommonModule } from '@angular/common';
// // @Component({
// //   selector: 'app-mainheader',
// //   imports: [FormsModule, CommonModule],
// //   templateUrl: './mainheader.component.html',
// //   styleUrl: './mainheader.component.css'
// // })
// // export class MainheaderComponent {

// //   @Input() userName: string = 'User';
// //   @Input() userAvatar: string | undefined;
// //   @Input() notificationCount: number = 0;
// //   @Input() isSidebarOpen: boolean = false;

// //   @Output() menuToggle = new EventEmitter<void>();
// //   @Output() searchSubmit = new EventEmitter<string>();
// //   @Output() notificationClick = new EventEmitter<void>();
// //   @Output() profileClick = new EventEmitter<void>();

// //   searchQuery: string = '';

// //   handleSearchSubmit(event: Event): void {
// //     event.preventDefault();
// //     this.searchSubmit.emit(this.searchQuery);
// //   }

// //   onMenuToggle(): void {
// //     this.menuToggle.emit();
// //   }

// //   onNotificationClick(): void {
// //     this.notificationClick.emit();
// //   }

// //   onProfileClick(): void {
// //     this.profileClick.emit();
// //   }

// //   getUserInitial(): string {
// //     return this.userName.charAt(0).toUpperCase();
// //   }
// // }

   

// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-mainheader',
//   imports: [CommonModule , FormsModule],
//   templateUrl: './mainheader.component.html',
//   styleUrl: './mainheader.component.css'
// })
// export class MainheaderComponent {
//   @Input() userName: string = '';
//   @Input() userEmail: string = ''; // New input for email
//   @Input() userAvatar: string | undefined;
//   @Input() notificationCount: number = 0;
//   @Input() isSidebarOpen: boolean = false;

//   @Output() menuToggle = new EventEmitter<void>();
//   @Output() searchSubmit = new EventEmitter<string>();
//   @Output() notificationClick = new EventEmitter<void>();
//   @Output() profileClick = new EventEmitter<void>();

//   searchQuery: string = '';

//   // Flag to toggle the profile dropdown
//   isProfileDropdownOpen = false;

//   // Toggle the profile dropdown
//   toggleProfileDropdown(): void {
//     this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
//   }

//   handleSearchSubmit(event: Event): void {
//     event.preventDefault();
//     this.searchSubmit.emit(this.searchQuery);
//   }

//   onMenuToggle(): void {
//     this.menuToggle.emit();
//   }

//   onNotificationClick(): void {
//     this.notificationClick.emit();
//   }

//   onProfileClick(): void {
//     this.profileClick.emit();
//   }

//   getUserInitial(): string {
//     return this.userName.charAt(0).toUpperCase();
//   }
// }


// import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { trigger, state, style, transition, animate } from '@angular/animations';

// @Component({
//   selector: 'app-mainheader',
//   imports: [CommonModule, FormsModule],
//   templateUrl: './mainheader.component.html',
//   styleUrl: './mainheader.component.css',
//   animations: [
//     trigger('slideDown', [
//       state('in', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
//       transition('void => *', [
//         style({ opacity: 0, transform: 'translateY(-10px) scale(0.95)' }),
//         animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')
//       ]),
//       transition('* => void', [
//         animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px) scale(0.95)' }))
//       ])
//     ])
//   ]
// })
// export class MainheaderComponent {
//   // Input properties
//   @Input() userName: string = 'John Doe';
//   @Input() userEmail: string = 'john.doe@example.com';
//   @Input() userAvatar: string | undefined;
//   @Input() notificationCount: number = 0;
//   @Input() isSidebarOpen: boolean = false;
//   @Input() showNotifications: boolean = true; // Toggle notification button visibility

//   // Output events
//   @Output() menuToggle = new EventEmitter<void>();
//   @Output() searchSubmit = new EventEmitter<string>();
//   @Output() notificationClick = new EventEmitter<void>();
//   @Output() profileClick = new EventEmitter<void>();
//   @Output() accountSettingsClick = new EventEmitter<void>();
//   @Output() changePasswordClick = new EventEmitter<void>();
//   @Output() logoutClick = new EventEmitter<void>();

//   // Component state
//   searchQuery: string = '';
//   isProfileDropdownOpen = false;

//   constructor(private router: Router) {}

//   // Listen for clicks outside the dropdown to close it
//   @HostListener('document:click', ['$event'])
//   onDocumentClick(event: Event): void {
//     const target = event.target as HTMLElement;
//     const profileContainer = target.closest('.profile-container');
    
//     if (!profileContainer && this.isProfileDropdownOpen) {
//       this.closeDropdown();
//     }
//   }

//   // Listen for escape key to close dropdown
//   @HostListener('document:keydown.escape', ['$event'])
//   onEscapeKey(event: KeyboardEvent): void {
//     if (this.isProfileDropdownOpen) {
//       this.closeDropdown();
//     }
//   }

//   /**
//    * Toggle the profile dropdown visibility
//    */
//   toggleProfileDropdown(): void {
//     this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
    
//     if (this.isProfileDropdownOpen) {
//       // Add slight delay to ensure smooth animation
//       setTimeout(() => {
//         this.profileClick.emit();
//       }, 100);
//     }
//   }

//   /**
//    * Close the profile dropdown
//    */
//   closeDropdown(): void {
//     this.isProfileDropdownOpen = false;
//   }

//   /**
//    * Handle search form submission
//    */
//   handleSearchSubmit(event: Event): void {
//     event.preventDefault();
//     if (this.searchQuery.trim()) {
//       this.searchSubmit.emit(this.searchQuery.trim());
//     }
//   }

//   /**
//    * Handle menu toggle button click
//    */
//   onMenuToggle(): void {
//     this.menuToggle.emit();
//   }

//   /**
//    * Handle notification button click
//    */
//   onNotificationClick(): void {
//     this.notificationClick.emit();
//   }

//   /**
//    * Handle profile button click (for backward compatibility)
//    */
//   onProfileClick(): void {
//     this.profileClick.emit();
//   }

//   /**
//    * Get user's first initial for avatar fallback
//    */
//   getUserInitial(): string {
//     if (!this.userName || this.userName.trim() === '') {
//       return 'U';
//     }
//     return this.userName.charAt(0).toUpperCase();
//   }

//   /**
//    * Handle Account Settings click
//    */
//   onAccountSettings(): void {
//     console.log(`Account Settings clicked for user: ${this.userName}`);
//     this.closeDropdown();
//     this.accountSettingsClick.emit();
    
//     // You can add navigation logic here
//     // this.router.navigate(['/account-settings']);
    
//     // For now, just show an alert (remove this in production)
//     this.showMessage('Account Settings', `Opening account settings for ${this.userName}`);
//   }

//   /**
//    * Handle Change Password click
//    */
//   onChangePassword(): void {
//     console.log(`Change Password clicked for user: ${this.userName}`);
//     this.closeDropdown();
//     this.changePasswordClick.emit();
    
//     // You can add navigation logic here
//     // this.router.navigate(['/change-password']);
    
//     // For now, just show an alert (remove this in production)
//     this.showMessage('Change Password', `Opening change password for ${this.userName}`);
//   }

//   /**
//    * Handle Logout click
//    */
//   onLogout(): void {
//     console.log(`Logout clicked for user: ${this.userName}`);
//     this.closeDropdown();
    
//     try {
//       // Remove auth token from localStorage
//       localStorage.removeItem('authToken');
      
//       // Also remove any other auth-related items you might have
//       localStorage.removeItem('refreshToken');
//       localStorage.removeItem('userInfo');
//       localStorage.removeItem('userPermissions');
      
//       // Clear session storage as well (optional)
//       sessionStorage.clear();
      
//       // Emit logout event
//       this.logoutClick.emit();
      
//       // Show logout message
//       this.showMessage('Logout', `${this.userName} has been logged out successfully`);
      
//       // Redirect to login page after a brief delay
//       setTimeout(() => {
//         this.router.navigate(['/login']).then(() => {
//           // Optional: Reload the page to ensure complete cleanup
//           window.location.reload();
//         }).catch((error) => {
//           console.error('Navigation to login failed:', error);
//           // Fallback: redirect using window.location
//           window.location.href = '/login';
//         });
//       }, 1000);
      
//     } catch (error) {
//       console.error('Error during logout:', error);
//       // Still try to navigate to login even if localStorage operations fail
//       this.router.navigate(['/login']);
//     }
//   }

//   /**
//    * Utility method to show messages (replace with your preferred notification system)
//    */
//   private showMessage(title: string, message: string): void {
//     // Replace this with your preferred notification/toast system
//     // For example: this.toastr.info(message, title);
    
//     // Temporary implementation using console and alert
//     console.log(`${title}: ${message}`);
    
//     // You can uncomment the following line for testing, but remove in production
//     // alert(`${title}: ${message}`);
//   }

//   /**
//    * Check if user is authenticated (utility method)
//    */
//   isAuthenticated(): boolean {
//     return !!localStorage.getItem('authToken');
//   }

//   /**
//    * Get stored auth token
//    */
//   getAuthToken(): string | null {
//     return localStorage.getItem('authToken');
//   }

//   /**
//    * Handle profile dropdown item navigation with animation
//    */
//   private navigateWithDelay(route: string, delay: number = 300): void {
//     this.closeDropdown();
//     setTimeout(() => {
//       this.router.navigate([route]);
//     }, delay);
//   }
// }

import { Component, EventEmitter, Input, Output, HostListener, type OnInit, type OnDestroy } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import  { Router } from "@angular/router"
import { trigger, state, style, transition, animate } from "@angular/animations"

@Component({
  selector: "app-mainheader",
  imports: [CommonModule, FormsModule],
  templateUrl: "./mainheader.component.html",
  styleUrl: "./mainheader.component.css",
  animations: [
    trigger("slideDown", [
      state("in", style({ opacity: 1, transform: "translateY(0) scale(1)" })),
      transition("void => *", [
        style({ opacity: 0, transform: "translateY(-10px) scale(0.95)" }),
        animate("300ms cubic-bezier(0.4, 0, 0.2, 1)"),
      ]),
      transition("* => void", [
        animate("200ms ease-in", style({ opacity: 0, transform: "translateY(-10px) scale(0.95)" })),
      ]),
    ]),
  ],
})
export class MainheaderComponent implements OnInit, OnDestroy {
  // Input properties
  @Input() userName = "John Doe"
  @Input() userEmail = "john.doe@example.com"
  @Input() userAvatar: string | undefined

  // Output events
  @Output() searchSubmit = new EventEmitter<string>()
  @Output() profileClick = new EventEmitter<void>()
  @Output() accountSettingsClick = new EventEmitter<void>()
  @Output() changePasswordClick = new EventEmitter<void>()
  @Output() logoutClick = new EventEmitter<void>()
  @Output() myLearningClick = new EventEmitter<void>()

  // Component state
  searchQuery = ""
  isProfileDropdownOpen = false

  // Typewriter effect properties
  displayText = ""
  fullText = "Evalueserve University"
  typewriterSpeed = 100 // milliseconds
  private typewriterInterval: any
  private currentIndex = 0
  private isErasing = false
  private eraseSpeed = 50 // faster erasing for better effect
  private pauseDuration = 3000 // pause before erasing

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.startTypewriterEffect()
  }

  ngOnDestroy(): void {
    if (this.typewriterInterval) {
      clearInterval(this.typewriterInterval)
    }
  }

  /**
   * Improved typewriter effect with smooth erasing
   */
  startTypewriterEffect(): void {
    this.typewriterInterval = setInterval(() => {
      if (!this.isErasing && this.currentIndex < this.fullText.length) {
        // Typing forward
        this.displayText += this.fullText.charAt(this.currentIndex)
        this.currentIndex++

        // When we reach the end, pause before erasing
        if (this.currentIndex >= this.fullText.length) {
          clearInterval(this.typewriterInterval)
          setTimeout(() => {
            this.isErasing = true
            this.typewriterInterval = setInterval(this.typewriterCallback.bind(this), this.eraseSpeed)
          }, this.pauseDuration)
        }
      } else if (this.isErasing && this.displayText.length > 0) {
        // Erasing
        this.displayText = this.displayText.substring(0, this.displayText.length - 1)

        // When we've erased everything, start typing again
        if (this.displayText.length === 0) {
          this.isErasing = false
          this.currentIndex = 0
          clearInterval(this.typewriterInterval)
          setTimeout(() => {
            this.typewriterInterval = setInterval(this.typewriterCallback.bind(this), this.typewriterSpeed)
          }, 500) // Small pause before starting to type again
        }
      }
    }, this.typewriterSpeed)
  }

  /**
   * Typewriter callback function to handle both typing and erasing
   */
  private typewriterCallback(): void {
    if (!this.isErasing && this.currentIndex < this.fullText.length) {
      // Typing forward
      this.displayText += this.fullText.charAt(this.currentIndex)
      this.currentIndex++

      // When we reach the end, pause before erasing
      if (this.currentIndex >= this.fullText.length) {
        clearInterval(this.typewriterInterval)
        setTimeout(() => {
          this.isErasing = true
          this.typewriterInterval = setInterval(this.typewriterCallback.bind(this), this.eraseSpeed)
        }, this.pauseDuration)
      }
    } else if (this.isErasing && this.displayText.length > 0) {
      // Erasing
      this.displayText = this.displayText.substring(0, this.displayText.length - 1)

      // When we've erased everything, start typing again
      if (this.displayText.length === 0) {
        this.isErasing = false
        this.currentIndex = 0
        clearInterval(this.typewriterInterval)
        setTimeout(() => {
          this.typewriterInterval = setInterval(this.typewriterCallback.bind(this), this.typewriterSpeed)
        }, 500) // Small pause before starting to type again
      }
    }
  }

  // Listen for clicks outside the dropdown to close it
  @HostListener("document:click", ["$event"])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement
    const profileContainer = target.closest(".profile-container")

    if (!profileContainer && this.isProfileDropdownOpen) {
      this.closeDropdown()
    }
  }

  // Listen for escape key to close dropdown
  @HostListener("document:keydown.escape", ["$event"])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.isProfileDropdownOpen) {
      this.closeDropdown()
    }
  }

  /**
   * Toggle the profile dropdown visibility
   */
  toggleProfileDropdown(): void {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen

    if (this.isProfileDropdownOpen) {
      setTimeout(() => {
        this.profileClick.emit()
      }, 100)
    }
  }

  /**
   * Close the profile dropdown
   */
  closeDropdown(): void {
    this.isProfileDropdownOpen = false
  }

  /**
   * Handle search form submission
   */
  handleSearchSubmit(event: Event): void {
    event.preventDefault()
    if (this.searchQuery.trim()) {
      this.searchSubmit.emit(this.searchQuery.trim())
    }
  }

  /**
   * Handle My Learning button click
   */
  onMyLearningClick(): void {
    console.log("My Learning button clicked")
    this.myLearningClick.emit()
    alert("My Learning is clicked")
  }

  /**
   * Handle profile button click (for backward compatibility)
   */
  onProfileClick(): void {
    this.profileClick.emit()
  }

  /**
   * Get user's first initial for avatar fallback
   */
  getUserInitial(): string {
    if (!this.userName || this.userName.trim() === "") {
      return "U"
    }
    return this.userName.charAt(0).toUpperCase()
  }

  /**
   * Handle Account Settings click
   */
  onAccountSettings(): void {
    console.log(`Account Settings clicked for user: ${this.userName}`)
    this.closeDropdown()
    this.accountSettingsClick.emit()
    this.showMessage("Account Settings", `Opening account settings for ${this.userName}`)
  }

  /**
   * Handle Change Password click
   */
  onChangePassword(): void {
    console.log(`Change Password clicked for user: ${this.userName}`)
    this.closeDropdown()
    this.changePasswordClick.emit()
    this.showMessage("Change Password", `Opening change password for ${this.userName}`)
  }

  /**
   * Handle Logout click
   */
  onLogout(): void {
    console.log(`Logout clicked for user: ${this.userName}`)
    this.closeDropdown()

    try {
      localStorage.removeItem("authToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("userInfo")
      localStorage.removeItem("userPermissions")
      sessionStorage.clear()

      this.logoutClick.emit()
      this.showMessage("Logout", `${this.userName} has been logged out successfully`)

      setTimeout(() => {
        this.router
          .navigate(["/login"])
          .then(() => {
            window.location.reload()
          })
          .catch((error) => {
            console.error("Navigation to login failed:", error)
            window.location.href = "/login"
          })
      }, 1000)
    } catch (error) {
      console.error("Error during logout:", error)
      this.router.navigate(["/login"])
    }
  }

  /**
   * Utility method to show messages
   */
  private showMessage(title: string, message: string): void {
    console.log(`${title}: ${message}`)
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem("authToken")
  }

  /**
   * Get stored auth token
   */
  getAuthToken(): string | null {
    return localStorage.getItem("authToken")
  }

  /**
   * Handle profile dropdown item navigation with animation
   */
  private navigateWithDelay(route: string, delay = 300): void {
    this.closeDropdown()
    setTimeout(() => {
      this.router.navigate([route])
    }, delay)
  }
}
