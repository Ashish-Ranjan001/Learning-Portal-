import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Course } from '../../../models/course';
import { Quiz } from '../../../models/quiz';
import { CourseModule } from '../../../models/course-module';
import { CourseFormComponent } from '../course-form/course-form.component';
import { QuizFormComponent } from '../quiz-form/quiz-form.component';
import { ModuleFormComponent } from '../module-form/module-form.component';

@Component({
  selector: 'app-course-creator',
  standalone: true,
  imports: [
    CommonModule,
   
    CourseFormComponent,
    QuizFormComponent,
    ModuleFormComponent
  ],
  templateUrl: './course-creator.component.html',
  styleUrl: './course-creator.component.css'
})
export class CourseCreatorComponent {
  currentStep: number = 0;
  steps: { name: string, completed: boolean }[] = [
    { name: 'Course Details', completed: false },
    { name: 'Quiz Setup', completed: false },
    { name: 'Module Creation', completed: false }
  ];

  courseData: Course = {
    name: '',
    category: '',
    description: '',
    sme: '',
    lob: '',
    author: ''
  };
  
  thumbnailImage?: File;
  
  quizData: Quiz = {};
  
  moduleData: CourseModule = {
    name: '',
    duration: '',
    description: ''
  };

  goToStep(stepIndex: number): void {
    if (stepIndex < 0 || stepIndex > this.steps.length - 1) {
      return;
    }

    // If trying to go forward, validate the current step
    if (stepIndex > this.currentStep) {
      if (!this.validateCurrentStep()) {
        return;
      }
    }

    this.currentStep = stepIndex;
  }

  validateCurrentStep(): boolean {
    switch (this.currentStep) {
      case 0:
        // Validate course form
        return this.validateCourseForm();
      case 1:
        // Validate quiz form
        return this.validateQuizForm();
      case 2:
        // Validate module form
        return this.validateModuleForm();
      default:
        return true;
    }
  }

  validateCourseForm(): boolean {
    // Check if required course fields are filled
    return !!(this.courseData.name && this.courseData.category && this.courseData.description);
  }

  validateQuizForm(): boolean {
    // For now, just allow navigation (will implement validation later)
    return true;
  }

  validateModuleForm(): boolean {
    // Check if required module fields are filled
    return !!(this.moduleData.name && this.moduleData.duration && this.moduleData.description);
  }

  onCourseDataChange(data: { course: Course, thumbnailImage?: File }): void {
    this.courseData = data.course;
    this.thumbnailImage = data.thumbnailImage;
    this.steps[0].completed = true;
  }

  onQuizDataChange(data: Quiz): void {
    this.quizData = data;
    this.steps[1].completed = true;
  }

  onModuleDataChange(data: CourseModule): void {
    this.moduleData = data;
    this.steps[2].completed = true;
  }

  submitCourse(): void {
    // Combine all data into a single object
    const courseSubmission = {
      course: this.courseData,
      thumbnailImage: this.thumbnailImage,
      quiz: this.quizData,
      module: this.moduleData
    };

    // Here you would call a service to submit the data
    console.log('Submitting course data:', courseSubmission);
    
    // Call to service would be something like:
    // this.courseService.createCourse(courseSubmission).subscribe(
    //   response => {
    //     console.log('Course created successfully', response);
    //     // Navigate to courses list or show success message
    //   },
    //   error => {
    //     console.error('Error creating course', error);
    //     // Show error message
    //   }
    // );
    
    alert('Course submitted successfully!');
  }
}

