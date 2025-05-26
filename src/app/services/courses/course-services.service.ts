import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseServicesService {

  constructor(private client:HttpClient) { }
    private apiBaseUrl = 'http://localhost:5053';

    addCourse(courseData: FormData) {
      const url = `${this.apiBaseUrl}/api/Course`;
      return this.client.post(url, courseData);
    } 
    viewCourses() {
      const url = `${this.apiBaseUrl}/api/Course`;
      return this.client.get(url);
    }
    getCourseById(courseId: string) {
      const url = `${this.apiBaseUrl}/api/Course/${courseId}`;
      return this.client.get<any>(url);
    }
    
    updateCourse(courseId: string, courseData: FormData) {
      const url = `${this.apiBaseUrl}/api/Course/${courseId}`;
      return this.client.put(url, courseData);
    }
    
    addModule(data:FormData){
      const url = `${this.apiBaseUrl}/api/Module`;
      return this.client.post(url, data); 
    }

    getAllModules() {
      const url = `${this.apiBaseUrl}/api/Module`;
      return this.client.get<any[]>(url);
    }
  
    getModuleById(moduleId: string) {
      const url = `${this.apiBaseUrl}/api/Module/${moduleId}`;
      return this.client.get<any>(url);
    }
  
    updateModule(moduleId: string, moduleData: FormData) {
      const url = `${this.apiBaseUrl}/api/Module/${moduleId}`;
      return this.client.put(url, moduleData);
    }
  

}
