import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  imports: [CommonModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {
  userCardHovered = false
  adminCardHovered = false

  router:any=inject(Router)

  onUserCardHover(isHovered: boolean) {
    this.userCardHovered = isHovered
  }

  onAdminCardHover(isHovered: boolean) {
    this.adminCardHovered = isHovered
  }

  signInAsUser() {
    console.log("Signing in as User")
   this.router.navigate(['/login'])
  }

  signInAsAdmin() {
    console.log("Signing in as Admin")
    // Add your admin sign-in logic here
    this.router.navigate(['/login'])
  }
}
