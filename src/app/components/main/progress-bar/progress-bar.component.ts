import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CourseData {
  label: string;
  value: number;
  maxValue: number;
  color: string;
  percentage: number;
}

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit, OnDestroy {
  @Output() progressUpdate = new EventEmitter<any>();

  hoveredSegment: string | null = null;
  animationProgress = 0;
  private animationFrame: number | null = null;

  // Static data for the radial chart
  courseData: CourseData[] = [
    {
      label: 'Total Courses',
      value: 200,
      maxValue: 200,
      color: '#8B5CF6',
      percentage: 100
    },
    {
      label: 'Enrolled Courses',
      value: 150,
      maxValue: 200,
      color: '#A855F7',
      percentage: 75
    },
    {
      label: 'In Progress',
      value: 80,
      maxValue: 200,
      color: '#C084FC',
      percentage: 40
    },
    {
      label: 'Completed',
      value: 45,
      maxValue: 200,
      color: '#DDD6FE',
      percentage: 22.5
    }
  ];

  ngOnInit(): void {
    this.startAnimation();
  }

  ngOnDestroy(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  private startAnimation(): void {
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      this.animationProgress = this.easeOutCubic(progress);
      
      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(animate);
      } else {
        this.emitProgressUpdate();
      }
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  private easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }

  getProgressDasharray(percentage: number, radius: number): string {
    const circumference = 2 * Math.PI * radius;
    const arcLength = circumference * 0.75; // 270 degrees (3/4 of circle)
    const progress = (percentage / 100) * this.animationProgress;
    const dashLength = arcLength * progress;
    const gapLength = circumference - dashLength;
    return `${dashLength} ${gapLength}`;
  }

  getBackgroundDasharray(radius: number): string {
    const circumference = 2 * Math.PI * radius;
    const arcLength = circumference * 0.75; // 270 degrees
    const gapLength = circumference - arcLength;
    return `${arcLength} ${gapLength}`;
  }

  onSegmentHover(label: string): void {
    this.hoveredSegment = label;
  }

  onSegmentLeave(): void {
    this.hoveredSegment = null;
  }

  getHoveredData(): CourseData | null {
    return this.courseData.find(item => item.label === this.hoveredSegment) || null;
  }

  private emitProgressUpdate(): void {
    this.progressUpdate.emit({
      courseData: this.courseData,
      animationComplete: true
    });
  }
}