import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboardsidebar',
  standalone: true,
  imports: [CommonModule, RouterModule , RouterLink],
  templateUrl: './dashboardsidebar.component.html',
  styleUrls: ['./dashboardsidebar.component.css']
})
export class DashboardsidebarComponent {
  @Input() collapsed = false;

  // controls for expanding sub-menus
  businessOpen = true;
  smeOpen = false;
  usersOpen = false;
  taOpen = false;
  adminOpen = false;
  courseOpen = false;
  assignmentOpen = false; 
  reportsOpen = false;

  toggleBusiness() { this.businessOpen = !this.businessOpen; }
  toggleSME()      { this.smeOpen      = !this.smeOpen; }
  toggleUsers()    { this.usersOpen    = !this.usersOpen; }
  toggleTA()       { this.taOpen       = !this.taOpen; }
  toggleAdmin()    { this.adminOpen    = !this.adminOpen; }
  toggleCourse()   { this.courseOpen   = !this.courseOpen; }
  toggleUser()   { this.usersOpen   = !this.usersOpen; }
  toggleAssignment() { this.assignmentOpen = !this.assignmentOpen; }
  toggleReports()    { this.reportsOpen = !this.reportsOpen; }
}
