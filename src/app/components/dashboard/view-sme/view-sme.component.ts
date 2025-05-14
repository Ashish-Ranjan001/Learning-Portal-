import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-view-sme',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-sme.component.html',
  styleUrls: ['./view-sme.component.css']
})
export class ViewSmeComponent implements OnInit {
  users: User[] = [];
  searchTerm: string = '';
  filteredUsers: User[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // For now, use static data
    // Later, we'll replace this with an API call
    this.users = [
      { 
        id: 1, 
        name: 'Mohak Pachisia', 
        email: 'mohak.pachisia@evalueserve.com', 
        phone: '7766776677', 
        status: 'Active' 
      },
      { 
        id: 2, 
        name: 'Ravinder Ahuja', 
        email: 'ravinder.ahuja@evalueserve.com', 
        phone: '6677667777', 
        status: 'Active' 
      },
      { 
        id: 3, 
        name: 'Ravi Shankar Jha', 
        email: 'ravi.jha@evalueserve.com', 
        phone: '9999998899', 
        status: 'Active' 
      },
      { 
        id: 4, 
        name: 'Sushant Raj', 
        email: 'sushant.raj@evalueserve.com', 
        phone: '7777778877', 
        status: 'Active' 
      },
      { 
        id: 5, 
        name: 'Sumit Joshi', 
        email: 'sumit.joshi@evalueserve.com', 
        phone: '9899987878', 
        status: 'Active' 
      }
    ];
    
    this.filteredUsers = [...this.users];

    // When ready to fetch from API, uncomment this code:
    /*
    this.http.get<User[]>('your-api-endpoint').subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = [...this.users];
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
    */
  }

  search(): void {
    if (!this.searchTerm.trim()) {
      this.filteredUsers = [...this.users];
      return;
    }
    
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.phone.includes(term)
    );
  }

  editUser(user: User): void {
    // Implementation for edit functionality
    console.log('Edit user:', user);
  }

  changePassword(user: User): void {
    // Implementation for change password functionality
    console.log('Change password for user:', user);
  }
}