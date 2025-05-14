import { Component } from '@angular/core';
import { DashheaderComponent } from "../dashheader/dashheader.component";
import { DashboardsidebarComponent } from "../dashboardsidebar/dashboardsidebar.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { DashFooterComponent } from "../dash-footer/dash-footer.component";

@Component({
  selector: 'app-dashboardhome',
  imports: [DashheaderComponent, DashboardsidebarComponent, RouterOutlet, DashFooterComponent , RouterModule],
  templateUrl: './dashboardhome.component.html',
  styleUrl: './dashboardhome.component.css'
})
export class DashboardhomeComponent {

  isSidebarOpen = true;

  // ← UPDATED: called when header emits menuToggle
  onMenuToggle(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
