import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {
  private apiUrl = 'https://localhost:7264/api/admins'; // Update this URL as needed

  constructor(private http: HttpClient) { }

  getAdmins(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getAdminById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createAdmin(adminData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, adminData);
  }
}