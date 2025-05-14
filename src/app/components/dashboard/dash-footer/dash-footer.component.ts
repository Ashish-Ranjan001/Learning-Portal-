import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dash-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dash-footer.component.html',
  styleUrls: ['./dash-footer.component.css']
})
export class DashFooterComponent {
  /** Controls the left offset to match the sidebar */
  @Input() isSidebarOpen = false;
}
