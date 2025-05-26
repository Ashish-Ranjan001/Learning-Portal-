import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }
  private apiBaseUrl = 'https://localhost:7264';

   addUser(data: any) {
    const url = `${this.apiBaseUrl}/api/users`;
    return this.http.post(url, data);
  }

  viewUsers() {
    const url = `${this.apiBaseUrl}/api/users`;
    return this.http.get(url);
  }
}
