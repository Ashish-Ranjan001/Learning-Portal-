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
    getCourseById(course_Id: string) {
      const url = `${this.apiBaseUrl}/api/Course/${course_Id}`;
      return this.client.get(url);
    }

    // updateCourse(courseId: string, courseData: FormData) {
    //   const url = `${this.apiBaseUrl}/api/Course/${courseId}`;
    //   return this.client.put(url, courseData);
    // }

    updateCourse(courseId: string, courseData: FormData) {
  const url = `${this.apiBaseUrl}/api/Course/${courseId}`;
  return this.client.put(url, courseData, {
    headers: { 'enctype': 'multipart/form-data' }
  });
}

    addModule(data:FormData){
      const url = `${this.apiBaseUrl}/api/Module`;
      return this.client.post(url, data); 
    }

}
