import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { UserLearningService, CourseDetailDto, ModuleDto } from '../../../services/user-learning.service';
import { ModuleServicesService } from '../../../services/Module/module-services.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-course-module-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coursemodulevideocomponent.component.html',
  styleUrl: './coursemodulevideocomponent.component.css'
})
export class CoursemodulevideocomponentComponent implements OnInit, OnDestroy {
  courseDetail: CourseDetailDto | null = null;
  selectedModule: ModuleDto | null = null;
  courseId: string = '';
  userId: string = '';
  loading = true;
  error = '';
  completedModules = 0;
  totalModules = 0;
  allModulesCompleted = false;
  safeVideoUrl: SafeResourceUrl | null = null;
  currentVideoData: any = null;
  videoLoading = false;
  videoWatched = false; // New property to track if video is watched

  private subscriptions = new Subscription();
  private userLearningService = inject(UserLearningService);
  private moduleService = inject(ModuleServicesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  constructor() {
    this.userId = this.getDecodedUserId();
  }

  getDecodedUserId() {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No auth token found in localStorage.");
        return '';
      }

      const decodedToken: any = jwtDecode(token);
      console.log("=== DECODED TOKEN ===", decodedToken);

      const userId = decodedToken.UserId || decodedToken.nameid || decodedToken.sub;
      console.log("=== EXTRACTED USER ID ===", userId);
      return userId;
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return '';
    }
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.params.subscribe(params => {
        this.courseId = params['courseId'];
        if (this.courseId) {
          this.loadCourseData();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadCourseData(): void {
    this.loading = true;
    this.error = '';

    this.subscriptions.add(
      this.userLearningService.getCourseDetail(this.courseId, this.userId).subscribe({
        next: (courseDetail) => {
          this.courseDetail = courseDetail;
          console.log(this.courseDetail);
          this.processCourseData();
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to load course data';
          this.loading = false;
          console.error('Error loading course:', error);
        }
      })
    );
  }

  processCourseData(): void {
    if (this.courseDetail?.modules) {
      // Sort modules by order
      this.courseDetail.modules.sort((a, b) => a.order - b.order);
      
      // Calculate progress
      this.totalModules = this.courseDetail.modules.length;
      this.completedModules = this.courseDetail.modules.filter(m => m.isCompleted).length;
      this.allModulesCompleted = this.completedModules === this.totalModules;
      
      // Update course progress if not set
      if (!this.courseDetail.progress) {
        this.courseDetail.progress = Math.round((this.completedModules / this.totalModules) * 100);
      }
      
      // Select first uncompleted module or first module
      const firstIncompleteModule = this.courseDetail.modules.find(m => !m.isCompleted);
      this.selectedModule = firstIncompleteModule || this.courseDetail.modules[0];
      
      // Load initial video data
      if (this.selectedModule) {
        this.loadModuleData(this.selectedModule);
      }
    }
  }

  selectModule(module: ModuleDto): void {
    this.selectedModule = module;
    this.videoWatched = module.isCompleted; // Set videoWatched based on completion status
    this.loadModuleData(module);
  }

  private loadModuleData(module: ModuleDto): void {
    // Reset video state
    this.safeVideoUrl = null;
    this.currentVideoData = null;
    
    if (module.videoUrl) {
      this.setVideoUrl(module.videoUrl);
    } else {
      // Fetch video data from service using moduleId
      this.loadVideoData(module.moduleId);
    }
  }

  loadVideoData(moduleId: string): void {
    this.videoLoading = true;
    this.subscriptions.add(
      this.moduleService.getVideoModuleById(moduleId).subscribe({
        next: (response) => {
          this.currentVideoData = response.data;
          if (this.currentVideoData?.videopath) {
            this.setVideoUrl(this.currentVideoData.videopath);
          }
          this.videoLoading = false;
        },
        error: (error) => {
          console.error('Error loading video data:', error);
          this.videoLoading = false;
        }
      })
    );
  }

  // setVideoUrl(url: string): void {
  //   if (!url) {
  //     this.safeVideoUrl = null;
  //     return;
  //   }

  //   // Handle different video URL formats
  //   if (url.includes('youtube.com/watch')) {
  //     // Convert YouTube watch URL to embed URL
  //     const videoId = url.split('v=')[1]?.split('&')[0];
  //     if (videoId) {
  //       this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
  //         `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0`
  //       );
  //     }
  //   } else if (url.includes('youtu.be/')) {
  //     // Handle short YouTube URLs
  //     const videoId = url.split('youtu.be/')[1]?.split('?')[0];
  //     if (videoId) {
  //       this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
  //         `https://www.youtube  {
  //       this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
  //         `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0`
  //       );
  //     }
  //   } else if (url.includes('youtube.com/embed/')) {
  //     // Already an embed URL
  //     this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  //   } else if (url.includes('vimeo.com/')) {
  //     // Handle Vimeo URLs
  //     const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
  //     if (videoId) {
  //       this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
  //         `https://player.vimeo.com/video/${videoId}`
  //       );
  //     }
  //   } else if (url.startsWith('http') || url.startsWith('//')) {
  //     // Direct video URL or protocol-relative URL
  //     this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  //   } else {
  //     // Relative path - construct full URL if needed
  //     const fullUrl = url.startsWith('/') ? `https://localhost:7264${url}` : url;
  //     this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl);
  //   }
  // }

  setVideoUrl(url: string): void {
    if (!url) {
      this.safeVideoUrl = null;
      return;
    }
  
    // Handle different video URL formats
    if (url.includes('youtube.com/watch')) {
      // Convert YouTube watch URL to embed URL
      const videoId = url.split('v=')[1]?.split('&')[0];
      if (videoId) {
        this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0`
        );
      }
    } else if (url.includes('youtu.be/')) {
      // Handle short YouTube URLs
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      if (videoId) {
        this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0`
        );
      }
    } else if (url.includes('youtube.com/embed/')) {
      // Already an embed URL
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else if (url.includes('vimeo.com/')) {
      // Handle Vimeo URLs
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      if (videoId) {
        this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://player.vimeo.com/video/${videoId}`
        );
      }
    } else if (url.startsWith('http') || url.startsWith('//')) {
      // Direct video URL or protocol-relative URL
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      // Relative path - construct full URL if needed
      const fullUrl = url.startsWith('/') ? `https://localhost:7264${url}` : url;
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl);
    }
  }
  

  // New method to handle video start watching
  startWatchingVideo(): void {
    this.videoWatched = true;
    // You can add additional logic here like tracking video progress
    console.log('User started watching video for module:', this.selectedModule?.moduleName);
  }

  // Enhanced method to handle video load event
  onVideoLoad(): void {
    console.log('Video loaded successfully');
    // Simulate video completion after a certain time or user interaction
    // In a real implementation, you might want to track actual video progress
    setTimeout(() => {
      if (!this.selectedModule?.isCompleted) {
        this.videoWatched = true;
      }
    }, 5000); // Simulate 5 seconds of watching
  }

  playVideo(module: ModuleDto): void {
    this.selectModule(module);
  }

  // Enhanced PDF download method using documentpath
  downloadModulePdf(module: ModuleDto): void {
    if (module.documentPath) {
      const pdfUrl = `https://localhost:7264/${module.documentPath}`;
      
      // Create a temporary link element to trigger download
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // Extract filename from path for download attribute
      const filename = module.documentPath.split('/').pop() || 'module-document.pdf';
      link.download = filename;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('Downloading PDF from:', pdfUrl);
    } else {
      console.error('No document path available for this module');
    }
  }

  // Legacy PDF download method (keeping for backward compatibility)
  downloadPdf(module: ModuleDto): void {
    if (module.documentPath) {
      // Create a temporary link element to trigger download
      const link = document.createElement('a');
      link.href = module.documentPath;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Mark module as completed after download
      this.markModuleAsCompleted(module);
    }
  }

  markModuleAsCompleted(module: ModuleDto): void {
    if (!module.isCompleted) {
      const progressData = {
        userId: this.userId,
        courseId: this.courseId,
        moduleId: module.moduleId
      };

      this.subscriptions.add(
        this.userLearningService.updateModuleProgress(progressData).subscribe({
          next: () => {
            module.isCompleted = true;
            this.updateProgress();
            this.loadCourseData();
          },
          error: (error) => {
            console.error('Error updating progress:', error);
          }
        })
      );
    }
  }

  markCurrentModuleAsCompleted(): void {
    if (this.selectedModule && !this.selectedModule.isCompleted && this.videoWatched) {
      this.markModuleAsCompleted(this.selectedModule);
    }
  }

  updateProgress(): void {
    if (this.courseDetail?.modules) {
      this.completedModules = this.courseDetail.modules.filter(m => m.isCompleted).length;
      this.allModulesCompleted = this.completedModules === this.totalModules;
      
      // Update course progress
      this.courseDetail.progress = Math.round((this.completedModules / this.totalModules) * 100);
      
      if (this.allModulesCompleted) {
        this.courseDetail.isCompleted = true;
      }
    }
  }

  downloadAssignment(): void {
    if (this.courseDetail && !this.courseDetail.assignmentDownloaded) {
      this.subscriptions.add(
        this.userLearningService.downloadAssignment(this.userId, this.courseId).subscribe({
          next: (response) => {
            // Handle the assignment download
            if (response && response.url) {
              const link = document.createElement('a');
              link.href = response.url;
              link.download = `${this.courseDetail!.courseName}_Assignment.pdf`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
            this.courseDetail!.assignmentDownloaded = true;
          },
          error: (error) => {
            console.error('Error downloading assignment:', error);
          }
        })
      );
    }
  }

  getModuleIcon(module: ModuleDto): string {
    const hasVideo = module.videoUrl || this.hasVideoForModule(module.moduleId);
    const hasDocument = module.documentPath || module.documentPath;
    
    if (hasVideo && hasDocument) {
      return 'fas fa-file-video';
    } else if (hasVideo) {
      return 'fas fa-play-circle';
    } else if (hasDocument) {
      return 'fas fa-file-pdf';
    }
    return 'fas fa-book';
  }

  private hasVideoForModule(moduleId: string): boolean {
    // This could be enhanced to check if video data exists
    // For now, we'll assume modules might have video content
    return true;
  }

  getModuleStatusIcon(module: ModuleDto): string {
    return module.isCompleted ? 
      'fas fa-check-circle text-success' : 
      'far fa-circle text-muted';
  }

  goBack(): void {
    this.router.navigate(['/categories']);
  }

  retryLoad(): void {
    this.loadCourseData();
  }

  // Utility method to get module duration if available
  getModuleDuration(module: ModuleDto): string {
    // This would depend on your ModuleDto structure
    // Return duration if available, otherwise return empty string
    return (module as any).duration || '';
  }
}