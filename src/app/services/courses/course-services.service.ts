import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseServicesService {

  constructor(private client:HttpClient) { }
    private apiBaseUrl = 'https://localhost:7264';

    addCourse(courseData: FormData) {
      const url = `${this.apiBaseUrl}/api/Course`;
      return this.client.post(url, courseData);
    } 
    viewCourses() {
      const url = `${this.apiBaseUrl}/api/Course`;
      return this.client.get(url);
    }
    getCategoryById(categoryId: string) {
      const url = `${this.apiBaseUrl}/api/Categories/${categoryId}`;
      return this.client.get(url);
    }
    updateCategory(categoryId: string, categoryData: any) {
      const url = `${this.apiBaseUrl}/api/Categories/${categoryId}`;
      return this.client.put(url, categoryData);
    }

    addModule(data:FormData){
      const url = `${this.apiBaseUrl}/api/Module`;
      return this.client.post(url, data); 
    }

}
