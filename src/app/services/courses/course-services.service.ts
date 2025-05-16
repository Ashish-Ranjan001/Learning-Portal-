import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseServicesService {

  constructor(private client:HttpClient) { }
    private apiBaseUrl = 'https://localhost:7264';

    addCategory(categoryData: any) {
      const url = `${this.apiBaseUrl}/api/Categories`;
      return this.client.post(url, categoryData);
    }
    viewCategories() {
      const url = `${this.apiBaseUrl}/api/Categories`;
      return this.client.get(url);
    }
    addCourse(courseData: any) {
      const url = `${this.apiBaseUrl}/api/Courses`;
      return this.client.post(url, courseData);
    } 
    viewCourses() {
      const url = `${this.apiBaseUrl}/api/Courses`;
      return this.client.get(url);
    }
    getCategoryById(categoryId: number) {
      const url = `${this.apiBaseUrl}/api/Categories/${categoryId}`;
      return this.client.get(url);
    }
    updateCategory(categoryId: number, categoryData: any) {
      const url = `${this.apiBaseUrl}/api/Categories/${categoryId}`;
      return this.client.put(url, categoryData);
    }
}
