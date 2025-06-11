import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CategoryData {
  name: string;
  totalCourses: number;
  completedCourses: number;
  ongoingCourses: number;
}

interface ChartDataset {
  label: string;
  data: number[];
  color: string;
  fillColor: string;
}

interface TooltipData {
  show: boolean;
  x: number;
  y: number;
  category: string;
  data: { label: string; value: number; color: string }[];
}

@Component({
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HeroBannerComponent implements OnInit, OnDestroy {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Output() action = new EventEmitter<any>();

  // Static data for categories
  categoryData: CategoryData[] = [
    { name: 'Web Dev', totalCourses: 25, completedCourses: 15, ongoingCourses: 22 },
    { name: 'Mobile', totalCourses: 18, completedCourses: 12, ongoingCourses: 20 },
    { name: 'Design', totalCourses: 32, completedCourses: 28, ongoingCourses: 38 },
    { name: 'Data Sci', totalCourses: 28, completedCourses: 20, ongoingCourses: 35 },
    { name: 'AI/ML', totalCourses: 40, completedCourses: 32, ongoingCourses: 46 },
    { name: 'DevOps', totalCourses: 22, completedCourses: 18, ongoingCourses: 28 },
    { name: 'Security', totalCourses: 30, completedCourses: 22, ongoingCourses: 35 },
    { name: 'Cloud', totalCourses: 35, completedCourses: 25, ongoingCourses: 42 }
  ];

  datasets: ChartDataset[] = [
    {
      label: 'Completed Courses',
      data: [],
      color: '#3b82f6',
      fillColor: 'rgba(59, 130, 246, 0.2)'
    },
    {
      label: 'Ongoing Courses',
      data: [],
      color: '#10b981',
      fillColor: 'rgba(16, 185, 129, 0.2)'
    }
  ];

  selectedPeriod = 'Categories';
  tooltip: TooltipData = {
    show: false,
    x: 0,
    y: 0,
    category: '',
    data: []
  };

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private animationId!: number;
  private isAnimating = false;

  ngOnInit(): void {
    this.prepareData();
    this.initializeChart();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  prepareData(): void {
    this.datasets[0].data = this.categoryData.map(cat => cat.completedCourses);
    this.datasets[1].data = this.categoryData.map(cat => cat.ongoingCourses);
  }

  initializeChart(): void {
    this.canvas = this.chartCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    
    this.resizeCanvas();
    
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.canvas.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    
    this.animateChart();
  }

  resizeCanvas(): void {
    const container = this.canvas.parentElement!;
    const rect = container.getBoundingClientRect();
    
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  animateChart(): void {
    let progress = 0;
    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      this.drawChart(easedProgress);
      
      if (progress < 1) {
        this.animationId = requestAnimationFrame(animate);
      } else {
        this.isAnimating = false;
      }
    };

    this.isAnimating = true;
    animate();
  }

  drawChart(animationProgress: number = 1): void {
    const { width, height } = this.canvas;
    const padding = { top: 30, right: 40, bottom: 50, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    this.ctx.clearRect(0, 0, width, height);

    const maxValue = Math.max(...this.datasets.flatMap(dataset => dataset.data));
    const scale = chartHeight / maxValue;

    this.drawGrid(padding, chartWidth, chartHeight, maxValue);

    this.datasets.forEach((dataset, index) => {
      this.drawAreaChart(dataset, padding, chartWidth, chartHeight, scale, animationProgress);
    });

    this.drawAxes(padding, chartWidth, chartHeight, maxValue);
  }

  drawGrid(padding: any, chartWidth: number, chartHeight: number, maxValue: number): void {
    this.ctx.strokeStyle = '#f1f5f9';
    this.ctx.lineWidth = 1;

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i;
      this.ctx.beginPath();
      this.ctx.moveTo(padding.left, y);
      this.ctx.lineTo(padding.left + chartWidth, y);
      this.ctx.stroke();
    }

    // Vertical grid lines
    const stepX = chartWidth / (this.categoryData.length - 1);
    for (let i = 0; i < this.categoryData.length; i++) {
      const x = padding.left + stepX * i;
      this.ctx.strokeStyle = '#f8fafc';
      this.ctx.beginPath();
      this.ctx.moveTo(x, padding.top);
      this.ctx.lineTo(x, padding.top + chartHeight);
      this.ctx.stroke();
    }
  }

  drawAreaChart(dataset: ChartDataset, padding: any, chartWidth: number, chartHeight: number, scale: number, animationProgress: number): void {
    const points: { x: number; y: number }[] = [];
    const stepX = chartWidth / (this.categoryData.length - 1);

    // Calculate points with animation
    dataset.data.forEach((value: number, i: number) => {
      const animatedValue = value * animationProgress;
      const x = padding.left + stepX * i;
      const y = padding.top + chartHeight - (animatedValue * scale);
      points.push({ x, y });
    });

    // Create smooth curve points
    const smoothPoints = this.createSmoothCurve(points);

    // Draw filled area
    this.ctx.fillStyle = dataset.fillColor;
    this.ctx.beginPath();
    this.ctx.moveTo(smoothPoints[0].x, padding.top + chartHeight);
    
    for (let i = 0; i < smoothPoints.length - 1; i += 3) {
      const cp1 = smoothPoints[i + 1];
      const cp2 = smoothPoints[i + 2];
      const end = smoothPoints[i + 3] || smoothPoints[smoothPoints.length - 1];
      this.ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    }
    
    this.ctx.lineTo(smoothPoints[smoothPoints.length - 1].x, padding.top + chartHeight);
    this.ctx.closePath();
    this.ctx.fill();

    // Draw line
    this.ctx.strokeStyle = dataset.color;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(smoothPoints[0].x, smoothPoints[0].y);
    
    for (let i = 0; i < smoothPoints.length - 1; i += 3) {
      const cp1 = smoothPoints[i + 1];
      const cp2 = smoothPoints[i + 2];
      const end = smoothPoints[i + 3] || smoothPoints[smoothPoints.length - 1];
      this.ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    }
    this.ctx.stroke();

    // Draw data points
    points.forEach((point, i) => {
      this.ctx.fillStyle = '#ffffff';
      this.ctx.strokeStyle = dataset.color;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
    });
  }

  createSmoothCurve(points: { x: number; y: number }[]): { x: number; y: number }[] {
    if (points.length < 3) return points;

    const smoothPoints: { x: number; y: number }[] = [];
    smoothPoints.push(points[0]);

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      
      const cp1 = {
        x: current.x + (next.x - current.x) * 0.3,
        y: current.y
      };
      
      const cp2 = {
        x: next.x - (next.x - current.x) * 0.3,
        y: next.y
      };

      smoothPoints.push(cp1, cp2, next);
    }

    return smoothPoints;
  }

  drawAxes(padding: any, chartWidth: number, chartHeight: number, maxValue: number): void {
    this.ctx.fillStyle = '#64748b';
    this.ctx.font = '12px Inter, system-ui, sans-serif';

    // Y-axis labels
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxValue / 5) * (5 - i));
      const y = padding.top + (chartHeight / 5) * i;
      this.ctx.textAlign = 'right';
      this.ctx.fillText(`${value}`, padding.left - 10, y + 4);
    }

    // X-axis labels
    const stepX = chartWidth / (this.categoryData.length - 1);
    this.categoryData.forEach((category, i) => {
      const x = padding.left + stepX * i;
      this.ctx.textAlign = 'center';
      this.ctx.fillText(category.name, x, padding.top + chartHeight + 25);
    });
  }

  onMouseMove(event: MouseEvent): void {
    if (this.isAnimating) return;

    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const padding = { top: 30, right: 40, bottom: 50, left: 60 };
    const chartWidth = this.canvas.width - padding.left - padding.right;
    const stepX = chartWidth / (this.categoryData.length - 1);

    const categoryIndex = Math.round((x - padding.left) / stepX);
    
    if (categoryIndex >= 0 && categoryIndex < this.categoryData.length) {
      const category = this.categoryData[categoryIndex];
      const data = [
        {
          label: 'Completed Courses',
          value: category.completedCourses,
          color: this.datasets[0].color
        },
        {
          label: 'Ongoing Courses',
          value: category.ongoingCourses,
          color: this.datasets[1].color
        }
      ];

      this.tooltip = {
        show: true,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        category: category.name,
        data
      };
    }
  }

  onMouseLeave(): void {
    this.tooltip.show = false;
  }

  onPeriodChange(period: string): void {
    this.selectedPeriod = period;
    this.action.emit({ type: 'periodChange', period });
  }
}