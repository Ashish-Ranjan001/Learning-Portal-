import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-mainheader',
  imports: [FormsModule, CommonModule],
  templateUrl: './mainheader.component.html',
  styleUrl: './mainheader.component.css'
})
export class MainheaderComponent {

  @Input() userName: string = 'User';
  @Input() userAvatar: string | undefined;
  @Input() notificationCount: number = 0;
  @Input() isSidebarOpen: boolean = false;

  @Output() menuToggle = new EventEmitter<void>();
  @Output() searchSubmit = new EventEmitter<string>();
  @Output() notificationClick = new EventEmitter<void>();
  @Output() profileClick = new EventEmitter<void>();

  searchQuery: string = '';

  handleSearchSubmit(event: Event): void {
    event.preventDefault();
    this.searchSubmit.emit(this.searchQuery);
  }

  onMenuToggle(): void {
    this.menuToggle.emit();
  }

  onNotificationClick(): void {
    this.notificationClick.emit();
  }

  onProfileClick(): void {
    this.profileClick.emit();
  }

  getUserInitial(): string {
    return this.userName.charAt(0).toUpperCase();
  }
}
