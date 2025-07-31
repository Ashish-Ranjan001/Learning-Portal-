import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  currentStep = 1;
  steps = [
    { number: 1, path: 'course', label: 'Course Details' },
    { number: 2, path: 'quiz', label: 'Quiz Questions' },
    { number: 3, path: 'module', label: 'Modules & Resources' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    
  ) { }

  ngOnInit(): void {
    // Update the current step based on the URL
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentRoute = this.router.url.split('/').pop();
      
      switch (currentRoute) {
        case 'course':
          this.currentStep = 1;
          break;
        case 'quiz':
          this.currentStep = 2;
          break;
        case 'module':
          this.currentStep = 3;
          break;
      }
    });
  }

  navigateToStep(step: number): void {
    if (step >= 1 && step <= this.steps.length) {
      this.router.navigate(['/add-course', this.steps[step - 1].path]);
    }
  }

  goToNextStep(): void {
    const nextStep = this.currentStep + 1;
    if (nextStep <= this.steps.length) {
      this.router.navigate(['/add-course', this.steps[nextStep - 1].path]);
    }
  }

  goToPrevStep(): void {
    const prevStep = this.currentStep - 1;
    if (prevStep >= 1) {
      this.router.navigate(['/add-course', this.steps[prevStep - 1].path]);
    }
  }

  submitCourse(): void {
    // this.courseService.submitCourse();
    // Navigate to a success page or dashboard
    this.router.navigate(['dashboard']);
  }
}