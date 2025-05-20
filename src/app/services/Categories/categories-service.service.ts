import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesServiceService {
  private baseUrl = 'https://localhost:7264/api/Categories'; // ✅ Correct API URL

  constructor(private http: HttpClient) {}

  // Fetch all categories
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7264/api/Categories`);
  }

  // Get a specific category by ID
  getCategoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // Add a new category with image upload
  addCategory(formData: FormData){
    return this.http.post(`${this.baseUrl}`, formData);
  }

  // Update an existing category
  updateCategory(id: number, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, formData);
  }
}
