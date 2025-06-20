// import { Component, OnInit, OnDestroy, inject } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { Subscription, interval } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { UserLearningService, CourseDetailDto, ModuleDto } from '../../../services/user-learning.service';
// import { ModuleServicesService } from '../../../services/Module/module-services.service';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { jwtDecode } from 'jwt-decode';

// interface QuizQuestion {
//   question: string;
//   options: string[];
//   correctAnswer: number;
// }

// @Component({
//   selector: 'app-course-module-view',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './coursemodulevideocomponent.component.html',
//   styleUrl: './coursemodulevideocomponent.component.css'
// })
// export class CoursemodulevideocomponentComponent implements OnInit, OnDestroy {
//   courseDetail: CourseDetailDto | null = null;
//   selectedModule: ModuleDto | null = null;
//   courseId: string = '';
//   userId: string = '';
//   loading = true;
//   error = '';
//   completedModules = 0;
//   totalModules = 0;
//   allModulesCompleted = false;
//   safeVideoUrl: SafeResourceUrl | null = null;
//   currentVideoData: any = null;
//   videoLoading = false;
//   videoWatched = false;

//   // Quiz related properties
//   showQuiz = false;
//   quizQuestions: QuizQuestion[] = [];
//   currentQuestionIndex = 0;
//   selectedAnswers: number[] = [];
//   timeRemaining = 0;
//   totalQuizTime = 0;
//   quizCompleted = false;
//   quizScore = 0;
//   correctAnswers = 0;
//   quizTaken = false;
//   quizTimer: Subscription | null = null;

//   private subscriptions = new Subscription();
//   private userLearningService = inject(UserLearningService);
//   private moduleService = inject(ModuleServicesService);
//   private route = inject(ActivatedRoute);
//   private router = inject(Router);
//   private sanitizer = inject(DomSanitizer);
//   private http = inject(HttpClient);

//   constructor() {
//     this.userId = this.getDecodedUserId();
//   }

//   getDecodedUserId() {
//     try {
//       const token = localStorage.getItem("authToken");
//       if (!token) {
//         console.error("No auth token found in localStorage.");
//         return '';
//       }

//       const decodedToken: any = jwtDecode(token);
//       console.log("=== DECODED TOKEN ===", decodedToken);

//       const userId = decodedToken.UserId || decodedToken.nameid || decodedToken.sub;
//       console.log("=== EXTRACTED USER ID ===", userId);
//       return userId;
//     } catch (error) {
//       console.error("Error decoding JWT:", error);
//       return '';
//     }
//   }

//   ngOnInit(): void {
//     this.subscriptions.add(
//       this.route.params.subscribe(params => {
//         this.courseId = params['courseId'];
//         if (this.courseId) {
//           this.loadCourseData();
//         }
//       })
//     );
//   }

//   ngOnDestroy(): void {
//     this.subscriptions.unsubscribe();
//     if (this.quizTimer) {
//       this.quizTimer.unsubscribe();
//     }
//   }

//   loadCourseData(): void {
//     this.loading = true;
//     this.error = '';

//     this.subscriptions.add(
//       this.userLearningService.getCourseDetail(this.courseId, this.userId).subscribe({
//         next: (courseDetail) => {
//           this.courseDetail = courseDetail;
//           console.log(this.courseDetail);
//           this.processCourseData();
//           this.loading = false;
//         },
//         error: (error) => {
//           this.error = 'Failed to load course data';
//           this.loading = false;
//           console.error('Error loading course:', error);
//         }
//       })
//     );
//   }

//   processCourseData(): void {
//     if (this.courseDetail?.modules) {
//       // Sort modules by order
//       this.courseDetail.modules.sort((a, b) => a.order - b.order);
      
//       // Calculate progress
//       this.totalModules = this.courseDetail.modules.length;
//       this.completedModules = this.courseDetail.modules.filter(m => m.isCompleted).length;
//       this.allModulesCompleted = this.completedModules === this.totalModules;
      
//       // Update course progress if not set
//       if (!this.courseDetail.progress) {
//         this.courseDetail.progress = Math.round((this.completedModules / this.totalModules) * 100);
//       }
      
//       // Select first uncompleted module or first module
//       const firstIncompleteModule = this.courseDetail.modules.find(m => !m.isCompleted);
//       this.selectedModule = firstIncompleteModule || this.courseDetail.modules[0];
      
//       // Load initial video data
//       if (this.selectedModule) {
//         this.loadModuleData(this.selectedModule);
//       }
//     }
//   }

//   selectModule(module: ModuleDto): void {
//     this.selectedModule = module;
//     this.videoWatched = module.isCompleted;
//     this.loadModuleData(module);
//   }

//   private loadModuleData(module: ModuleDto): void {
//     // Reset video state
//     this.safeVideoUrl = null;
//     this.currentVideoData = null;
    
//     if (module.videoUrl) {
//       this.setVideoUrl(module.videoUrl);
//     } else {
//       // Fetch video data from service using moduleId
//       this.loadVideoData(module.moduleId);
//     }
//   }

//   loadVideoData(moduleId: string): void {
//     this.videoLoading = true;
//     this.subscriptions.add(
//       this.moduleService.getVideoModuleById(moduleId).subscribe({
//         next: (response) => {
//           this.currentVideoData = response.data;
//           if (this.currentVideoData?.videopath) {
//             this.setVideoUrl(this.currentVideoData.videopath);
//           }
//           this.videoLoading = false;
//         },
//         error: (error) => {
//           console.error('Error loading video data:', error);
//           this.videoLoading = false;
//         }
//       })
//     );
//   }

//   setVideoUrl(url: string): void {
//     if (!url) {
//       this.safeVideoUrl = null;
//       return;
//     }
  
//     // Handle different video URL formats
//     if (url.includes('youtube.com/watch')) {
//       const videoId = url.split('v=')[1]?.split('&')[0];
//       if (videoId) {
//         this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
//           `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0`
//         );
//       }
//     } else if (url.includes('youtu.be/')) {
//       const videoId = url.split('youtu.be/')[1]?.split('?')[0];
//       if (videoId) {
//         this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
//           `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0`
//         );
//       }
//     } else if (url.includes('youtube.com/embed/')) {
//       this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
//     } else if (url.includes('vimeo.com/')) {
//       const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
//       if (videoId) {
//         this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
//           `https://player.vimeo.com/video/${videoId}`
//         );
//       }
//     } else if (url.startsWith('http') || url.startsWith('//')) {
//       this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
//     } else {
//       const fullUrl = url.startsWith('/') ? `https://localhost:7264${url}` : url;
//       this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl);
//     }
//   }

//   startWatchingVideo(): void {
//     this.videoWatched = true;
//     console.log('User started watching video for module:', this.selectedModule?.moduleName);
//   }

//   onVideoLoad(): void {
//     console.log('Video loaded successfully');
//     setTimeout(() => {
//       if (!this.selectedModule?.isCompleted) {
//         this.videoWatched = true;
//       }
//     }, 5000);
//   }

//   playVideo(module: ModuleDto): void {
//     this.selectModule(module);
//   }

//   downloadModulePdf(module: ModuleDto): void {
//     if (module.documentPath) {
//       const pdfUrl = `https://localhost:7264/${module.documentPath}`;
      
//       const link = document.createElement('a');
//       link.href = pdfUrl;
//       link.target = '_blank';
//       link.rel = 'noopener noreferrer';
      
//       const filename = module.documentPath.split('/').pop() || 'module-document.pdf';
//       link.download = filename;
      
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
      
//       console.log('Downloading PDF from:', pdfUrl);
//     } else {
//       console.error('No document path available for this module');
//     }
//   }

//   downloadPdf(module: ModuleDto): void {
//     if (module.documentPath) {
//       const link = document.createElement('a');
//       link.href = module.documentPath;
//       link.target = '_blank';
//       link.rel = 'noopener noreferrer';
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
      
//       this.markModuleAsCompleted(module);
//     }
//   }

//   markModuleAsCompleted(module: ModuleDto): void {
//     if (!module.isCompleted) {
//       const progressData = {
//         userId: this.userId,
//         courseId: this.courseId,
//         moduleId: module.moduleId
//       };

//       this.subscriptions.add(
//         this.userLearningService.updateModuleProgress(progressData).subscribe({
//           next: () => {
//             module.isCompleted = true;
//             this.updateProgress();
//             this.loadCourseData();
//           },
//           error: (error) => {
//             console.error('Error updating progress:', error);
//           }
//         })
//       );
//     }
//   }

//   markCurrentModuleAsCompleted(): void {
//     if (this.selectedModule && !this.selectedModule.isCompleted && this.videoWatched) {
//       this.markModuleAsCompleted(this.selectedModule);
//     }
//   }

//   updateProgress(): void {
//     if (this.courseDetail?.modules) {
//       this.completedModules = this.courseDetail.modules.filter(m => m.isCompleted).length;
//       this.allModulesCompleted = this.completedModules === this.totalModules;
      
//       this.courseDetail.progress = Math.round((this.completedModules / this.totalModules) * 100);
      
//       if (this.allModulesCompleted) {
//         this.courseDetail.isCompleted = true;
//       }
//     }
//   }

//   downloadAssignment(): void {
//     if (this.courseDetail && !this.courseDetail.assignmentDownloaded) {
//       this.subscriptions.add(
//         this.userLearningService.downloadAssignment(this.userId, this.courseId).subscribe({
//           next: (response) => {
//             if (response && response.url) {
//               const link = document.createElement('a');
//               link.href = response.url;
//               link.download = `${this.courseDetail!.courseName}_Assignment.pdf`;
//               document.body.appendChild(link);
//               link.click();
//               document.body.removeChild(link);
//             }
//             this.courseDetail!.assignmentDownloaded = true;
//           },
//           error: (error) => {
//             console.error('Error downloading assignment:', error);
//           }
//         })
//       );
//     }
//   }

//   // ===== QUIZ FUNCTIONALITY =====

//   startQuiz(): void {
//     if (this.quizTaken) {
//       return;
//     }

//     // Show confirmation dialog
//     const confirmed = confirm(
//       '🎯 Ready to take the quiz?\n\n' +
//       '⚠️ Important Instructions:\n' +
//       '• You will have 1 minute per question\n' +
//       '• The screen will be locked during the quiz\n' +
//       '• You cannot skip questions or go back\n' +
//       '• The quiz will auto-submit when time runs out\n\n' +
//       'Do you want to proceed?'
//     );

//     if (confirmed && this.courseDetail?.quizPath) {
//       this.loadQuizData();
//     }
//   }

//   loadQuizData(): void {
//     if (!this.courseDetail?.quizPath) {
//       console.error('No quiz path available');
//       return;
//     }

//     const quizUrl = `https://localhost:7264${this.courseDetail.quizPath}`;
    
//     this.subscriptions.add(
//       this.http.get(quizUrl, { responseType: 'text' }).subscribe({
//         next: (csvData) => {
//           this.parseCSV(csvData);
//           this.initializeQuiz();
//         },
//         error: (error) => {
//           console.error('Error loading quiz data:', error);
//           alert('Failed to load quiz. Please try again.');
//         }
//       })
//     );
//   }

//   parseCSV(csvData: string): void {
//     const lines = csvData.split('\n');
//     const questions: QuizQuestion[] = [];
    
//     // Skip header row
//     for (let i = 1; i < lines.length; i++) {
//       if (!lines[i].trim()) continue;
      
//       const columns = lines[i].split(',');
      
//       if (columns.length >= 6) {
//         const question: QuizQuestion = {
//           question: columns[0].trim(),
//           options: [
//             columns[1].trim(),
//             columns[2].trim(),
//             columns[3].trim(),
//             columns[4].trim()
//           ],
//           correctAnswer: parseInt(columns[5].trim()) - 1 // Convert to 0-based index
//         };
        
//         questions.push(question);
//       }
//     }
    
//     this.quizQuestions = questions;
//   }

//   initializeQuiz(): void {
//     if (this.quizQuestions.length === 0) {
//       alert('No quiz questions found. Please contact support.');
//       return;
//     }

//     // Initialize quiz state
//     this.currentQuestionIndex = 0;
//     this.selectedAnswers = new Array(this.quizQuestions.length).fill(undefined);
//     this.quizCompleted = false;
//     this.quizScore = 0;
//     this.correctAnswers = 0;
    
//     // Set timer (1 minute per question)
//     this.totalQuizTime = this.quizQuestions.length * 60; // 60 seconds per question
//     this.timeRemaining = this.totalQuizTime;
    
//     // Show quiz and start timer
//     this.showQuiz = true;
//     this.startQuizTimer();
    
//     // Prevent tab switching and other navigation
//     this.preventTabSwitching();
//   }

//   startQuizTimer(): void {
//     this.quizTimer = interval(1000).subscribe(() => {
//       this.timeRemaining--;
      
//       if (this.timeRemaining <= 0) {
//         this.submitQuiz();
//       }
//     });
//   }

//   preventTabSwitching(): void {
//     // Prevent context menu
//     document.addEventListener('contextmenu', this.preventEvent);
    
//     // Prevent common keyboard shortcuts
//     document.addEventListener('keydown', this.preventKeyboardShortcuts);
    
//     // Prevent window blur (tab switching)
//     window.addEventListener('blur', this.handleWindowBlur);
    
//     // Prevent beforeunload
//     window.addEventListener('beforeunload', this.preventPageLeave);
//   }

//   private preventEvent = (e: Event) => {
//     e.preventDefault();
//     return false;
//   };

//   private preventKeyboardShortcuts = (e: KeyboardEvent) => {
//     // Prevent Alt+Tab, Ctrl+Tab, F12, Ctrl+Shift+I, etc.
//     if (
//       e.altKey && e.key === 'Tab' ||
//       e.ctrlKey && e.key === 'Tab' ||
//       e.key === 'F12' ||
//       (e.ctrlKey && e.shiftKey && e.key === 'I') ||
//       (e.ctrlKey && e.shiftKey && e.key === 'J') ||
//       (e.ctrlKey && e.key === 'u') ||
//       (e.ctrlKey && e.key === 'w') ||
//       (e.ctrlKey && e.key === 'r') ||
//       e.key === 'F5'
//     ) {
//       e.preventDefault();
//       return false;
//     }
//     return true;
//   };

//   private handleWindowBlur = () => {
//     if (this.showQuiz && !this.quizCompleted) {
//       alert('⚠️ Quiz window focus lost! Please stay on the quiz page.');
//       window.focus();
//     }
//   };

//   private preventPageLeave = (e: BeforeUnloadEvent) => {
//     if (this.showQuiz && !this.quizCompleted) {
//       e.preventDefault();
//       e.returnValue = 'Quiz in progress. Are you sure you want to leave?';
//       return 'Quiz in progress. Are you sure you want to leave?';
//     }
//     return true;
//   };

//   selectOption(optionIndex: number): void {
//     this.selectedAnswers[this.currentQuestionIndex] = optionIndex;
//   }

//   nextQuestion(): void {
//     if (this.selectedAnswers[this.currentQuestionIndex] === undefined) {
//       return;
//     }

//     if (this.currentQuestionIndex < this.quizQuestions.length - 1) {
//       this.currentQuestionIndex++;
//     } else {
//       this.submitQuiz();
//     }
//   }

//    submitQuiz(): void {
//     if (this.quizCompleted) {
//       return;
//     }

//     // Stop timer
//     if (this.quizTimer) {
//       this.quizTimer.unsubscribe();
//       this.quizTimer = null;
//     }

//     // Calculate score
//     this.correctAnswers = 0;
//     for (let i = 0; i < this.quizQuestions.length; i++) {
//       if (this.selectedAnswers[i] === this.quizQuestions[i].correctAnswer) {
//         this.correctAnswers++;
//       }
//     }

//     this.quizScore = Math.round((this.correctAnswers / this.quizQuestions.length) * 100);
//     this.quizCompleted = true;
//     this.quizTaken = true;

//     // Remove event listeners
//     this.removeQuizEventListeners();

//     // Save quiz result (you can implement this API call)
//     this.saveQuizResult();
//   }

//   saveQuizResult(): void {
//     const quizResult = {
//       userId: this.userId,
//       courseId: this.courseId,
//       score: this.quizScore,
//       correctAnswers: this.correctAnswers,
//       totalQuestions: this.quizQuestions.length,
//       completedAt: new Date().toISOString()
//     };

//     // Implement API call to save quiz result
//     console.log('Quiz Result:', quizResult);
    
//     // You can add an API call here to save the quiz result
//     // this.userLearningService.saveQuizResult(quizResult).subscribe({...});
//   }

//   removeQuizEventListeners(): void {
//     document.removeEventListener('contextmenu', this.preventEvent);
//     document.removeEventListener('keydown', this.preventKeyboardShortcuts);
//     window.removeEventListener('blur', this.handleWindowBlur);
//     window.removeEventListener('beforeunload', this.preventPageLeave);
//   }

//   closeQuiz(): void {
//     this.showQuiz = false;
//     this.removeQuizEventListeners();
    
//     // Reset quiz state
//     this.currentQuestionIndex = 0;
//     this.selectedAnswers = [];
//     this.quizCompleted = false;
//     this.timeRemaining = 0;
    
//     if (this.quizTimer) {
//       this.quizTimer.unsubscribe();
//       this.quizTimer = null;
//     }
//   }

//   retakeQuiz(): void {
//     // Reset quiz state for retake
//     this.quizTaken = false;
//     this.closeQuiz();
    
//     // Ask for confirmation again
//     setTimeout(() => {
//       this.startQuiz();
//     }, 500);
//   }

//   formatTime(seconds: number): string {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
//   }

//   getTimerProgress(): number {
//     if (this.totalQuizTime === 0) return 0;
//     return ((this.totalQuizTime - this.timeRemaining) / this.totalQuizTime) * 100;
//   }

//   // ===== EXISTING METHODS =====

//   getModuleIcon(module: ModuleDto): string {
//     const hasVideo = module.videoUrl || this.hasVideoForModule(module.moduleId);
//     const hasDocument = module.documentPath || module.documentPath;
    
//     if (hasVideo && hasDocument) {
//       return 'fas fa-file-video';
//     } else if (hasVideo) {
//       return 'fas fa-play-circle';
//     } else if (hasDocument) {
//       return 'fas fa-file-pdf';
//     }
//     return 'fas fa-book';
//   }

//   private hasVideoForModule(moduleId: string): boolean {
//     return true;
//   }

//   getModuleStatusIcon(module: ModuleDto): string {
//     return module.isCompleted ? 
//       'fas fa-check-circle text-success' : 
//       'far fa-circle text-muted';
//   }

//   goBack(): void {
//     // If quiz is active, prevent navigation
//     if (this.showQuiz && !this.quizCompleted) {
//       alert('Quiz in progress! Please complete or close the quiz first.');
//       return;
//     }
//     this.router.navigate(['/categories']);
//   }

//   retryLoad(): void {
//     this.loadCourseData();
//   }

//   getModuleDuration(module: ModuleDto): string {
//     return (module as any).duration || '';
//   }
// }


import { Component, type OnInit, type OnDestroy, inject } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { CommonModule } from "@angular/common"
import { Subscription, interval } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { UserLearningService, type CourseDetailDto, type ModuleDto } from "../../../services/user-learning.service"
import { ModuleServicesService } from "../../../services/Module/module-services.service"
import { DomSanitizer, type SafeResourceUrl } from "@angular/platform-browser"
import { jwtDecode } from "jwt-decode"

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
}

@Component({
  selector: "app-course-module-view",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./coursemodulevideocomponent.component.html",
  styleUrl: "./coursemodulevideocomponent.component.css",
})
export class CoursemodulevideocomponentComponent implements OnInit, OnDestroy {
  courseDetail: CourseDetailDto | null = null
  selectedModule: ModuleDto | null = null
  courseId = ""
  userId = ""
  loading = true
  error = ""
  completedModules = 0
  totalModules = 0
  allModulesCompleted = false
  safeVideoUrl: SafeResourceUrl | null = null
  currentVideoData: any = null
  videoLoading = false
  videoWatched = false

  // Quiz related properties
  showQuiz = false
  quizQuestions: QuizQuestion[] = []
  currentQuestionIndex = 0
  selectedAnswers: number[] = []
  timeRemaining = 0
  totalQuizTime = 0
  quizCompleted = false
  quizScore = 0
  correctAnswers = 0
  quizTaken = false
  quizTimer: Subscription | null = null

  // Tab switching control
  tabSwitchCount = 0
  maxTabSwitches = 1
  showTabWarning = false

  private subscriptions = new Subscription()
  private userLearningService = inject(UserLearningService)
  private moduleService = inject(ModuleServicesService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private sanitizer = inject(DomSanitizer)
  private http = inject(HttpClient)

  constructor() {
    this.userId = this.getDecodedUserId()
  }

  getDecodedUserId() {
    try {
      const token = localStorage.getItem("authToken")
      if (!token) {
        console.error("No auth token found in localStorage.")
        return ""
      }

      const decodedToken: any = jwtDecode(token)
      console.log("=== DECODED TOKEN ===", decodedToken)

      const userId = decodedToken.UserId || decodedToken.nameid || decodedToken.sub
      console.log("=== EXTRACTED USER ID ===", userId)
      return userId
    } catch (error) {
      console.error("Error decoding JWT:", error)
      return ""
    }
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.params.subscribe((params) => {
        this.courseId = params["courseId"]
        if (this.courseId) {
          this.loadCourseData()
        }
      }),
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
    if (this.quizTimer) {
      this.quizTimer.unsubscribe()
    }
    this.removeQuizEventListeners()
  }

  loadCourseData(): void {
    this.loading = true
    this.error = ""

    this.subscriptions.add(
      this.userLearningService.getCourseDetail(this.courseId, this.userId).subscribe({
        next: (courseDetail) => {
          this.courseDetail = courseDetail
          console.log(this.courseDetail)
          this.processCourseData()
          this.loading = false
        },
        error: (error) => {
          this.error = "Failed to load course data"
          this.loading = false
          console.error("Error loading course:", error)
        },
      }),
    )
  }

  processCourseData(): void {
    if (this.courseDetail?.modules) {
      // Sort modules by order
      this.courseDetail.modules.sort((a, b) => a.order - b.order)

      // Calculate progress
      this.totalModules = this.courseDetail.modules.length
      this.completedModules = this.courseDetail.modules.filter((m) => m.isCompleted).length
      this.allModulesCompleted = this.completedModules === this.totalModules

      // Update course progress if not set
      if (!this.courseDetail.progress) {
        this.courseDetail.progress = Math.round((this.completedModules / this.totalModules) * 100)
      }

      // Select first uncompleted module or first module
      const firstIncompleteModule = this.courseDetail.modules.find((m) => !m.isCompleted)
      this.selectedModule = firstIncompleteModule || this.courseDetail.modules[0]

      // Load initial video data
      if (this.selectedModule) {
        this.loadModuleData(this.selectedModule)
      }
    }
  }

  selectModule(module: ModuleDto): void {
    this.selectedModule = module
    this.videoWatched = module.isCompleted
    this.loadModuleData(module)
  }

  private loadModuleData(module: ModuleDto): void {
    // Reset video state
    this.safeVideoUrl = null
    this.currentVideoData = null

    if (module.videoUrl) {
      this.setVideoUrl(module.videoUrl)
    } else {
      // Fetch video data from service using moduleId
      this.loadVideoData(module.moduleId)
    }
  }

  loadVideoData(moduleId: string): void {
    this.videoLoading = true
    this.subscriptions.add(
      this.moduleService.getVideoModuleById(moduleId).subscribe({
        next: (response) => {
          this.currentVideoData = response.data
          if (this.currentVideoData?.videopath) {
            this.setVideoUrl(this.currentVideoData.videopath)
          }
          this.videoLoading = false
        },
        error: (error) => {
          console.error("Error loading video data:", error)
          this.videoLoading = false
        },
      }),
    )
  }

  setVideoUrl(url: string): void {
    if (!url) {
      this.safeVideoUrl = null
      return
    }

    // Handle different video URL formats
    if (url.includes("youtube.com/watch")) {
      const videoId = url.split("v=")[1]?.split("&")[0]
      if (videoId) {
        this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0`,
        )
      }
    } else if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0]
      if (videoId) {
        this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0`,
        )
      }
    } else if (url.includes("youtube.com/embed/")) {
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url)
    } else if (url.includes("vimeo.com/")) {
      const videoId = url.split("vimeo.com/")[1]?.split("?")[0]
      if (videoId) {
        this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://player.vimeo.com/video/${videoId}`)
      }
    } else if (url.startsWith("http") || url.startsWith("//")) {
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url)
    } else {
      const fullUrl = url.startsWith("/") ? `https://localhost:7264${url}` : url
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl)
    }
  }

  startWatchingVideo(): void {
    this.videoWatched = true
    console.log("User started watching video for module:", this.selectedModule?.moduleName)
  }

  onVideoLoad(): void {
    console.log("Video loaded successfully")
    setTimeout(() => {
      if (!this.selectedModule?.isCompleted) {
        this.videoWatched = true
      }
    }, 5000)
  }

  playVideo(module: ModuleDto): void {
    this.selectModule(module)
  }

  downloadModulePdf(module: ModuleDto): void {
    if (module.documentPath) {
      const pdfUrl = `https://localhost:7264/${module.documentPath}`

      const link = document.createElement("a")
      link.href = pdfUrl
      link.target = "_blank"
      link.rel = "noopener noreferrer"

      const filename = module.documentPath.split("/").pop() || "module-document.pdf"
      link.download = filename

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      console.log("Downloading PDF from:", pdfUrl)
    } else {
      console.error("No document path available for this module")
    }
  }

  downloadPdf(module: ModuleDto): void {
    if (module.documentPath) {
      const link = document.createElement("a")
      link.href = module.documentPath
      link.target = "_blank"
      link.rel = "noopener noreferrer"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      this.markModuleAsCompleted(module)
    }
  }

  markModuleAsCompleted(module: ModuleDto): void {
    if (!module.isCompleted) {
      const progressData = {
        userId: this.userId,
        courseId: this.courseId,
        moduleId: module.moduleId,
      }

      this.subscriptions.add(
        this.userLearningService.updateModuleProgress(progressData).subscribe({
          next: () => {
            module.isCompleted = true
            this.updateProgress()
            this.loadCourseData()
          },
          error: (error) => {
            console.error("Error updating progress:", error)
          },
        }),
      )
    }
  }

  markCurrentModuleAsCompleted(): void {
    if (this.selectedModule && !this.selectedModule.isCompleted && this.videoWatched) {
      this.markModuleAsCompleted(this.selectedModule)
    }
  }

  updateProgress(): void {
    if (this.courseDetail?.modules) {
      this.completedModules = this.courseDetail.modules.filter((m) => m.isCompleted).length
      this.allModulesCompleted = this.completedModules === this.totalModules

      this.courseDetail.progress = Math.round((this.completedModules / this.totalModules) * 100)

      if (this.allModulesCompleted) {
        this.courseDetail.isCompleted = true
      }
    }
  }

  downloadAssignment(): void {
    if (this.courseDetail && !this.courseDetail.assignmentDownloaded) {
      this.subscriptions.add(
        this.userLearningService.downloadAssignment(this.userId, this.courseId).subscribe({
          next: (response) => {
            if (response && response.url) {
              const link = document.createElement("a")
              link.href = response.url
              link.download = `${this.courseDetail!.courseName}_Assignment.pdf`
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            }
            this.courseDetail!.assignmentDownloaded = true
          },
          error: (error) => {
            console.error("Error downloading assignment:", error)
          },
        }),
      )
    }
  }

  // ===== QUIZ FUNCTIONALITY =====

  startQuiz(): void {
    if (this.quizTaken) {
      return
    }

    // Show confirmation dialog
    const confirmed = confirm(
      "🎯 Ready to take the quiz?\n\n" +
        "⚠️ Important Instructions:\n" +
        "• You will have 1 minute per question\n" +
        "• The screen will be monitored during the quiz\n" +
        "• You cannot skip questions or go back\n" +
        "• The quiz will auto-submit when time runs out\n" +
        "• Tab switching is limited - be careful!\n\n" +
        "Do you want to proceed?",
    )

    if (confirmed && this.courseDetail?.quizPath) {
      this.loadQuizData()
    }
  }

  loadQuizData(): void {
    if (!this.courseDetail?.quizPath) {
      console.error("No quiz path available")
      return
    }

    const quizUrl = `https://localhost:7264${this.courseDetail.quizPath}`

    this.subscriptions.add(
      this.http.get(quizUrl, { responseType: "text" }).subscribe({
        next: (csvData) => {
          this.parseCSV(csvData)
          this.initializeQuiz()
        },
        error: (error) => {
          console.error("Error loading quiz data:", error)
          alert("Failed to load quiz. Please try again.")
        },
      }),
    )
  }

  parseCSV(csvData: string): void {
    const lines = csvData.split("\n")
    const questions: QuizQuestion[] = []

    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue

      const columns = lines[i].split(",")

      if (columns.length >= 6) {
        const question: QuizQuestion = {
          question: columns[0].trim(),
          options: [columns[1].trim(), columns[2].trim(), columns[3].trim(), columns[4].trim()],
          correctAnswer: Number.parseInt(columns[5].trim()) - 1, // Convert to 0-based index
        }

        questions.push(question)
      }
    }

    this.quizQuestions = questions
  }

  initializeQuiz(): void {
    if (this.quizQuestions.length === 0) {
      alert("No quiz questions found. Please contact support.")
      return
    }

    // Initialize quiz state
    this.currentQuestionIndex = 0
    this.selectedAnswers = new Array(this.quizQuestions.length).fill(undefined)
    this.quizCompleted = false
    this.quizScore = 0
    this.correctAnswers = 0
    this.tabSwitchCount = 0
    this.showTabWarning = false

    // Set timer (1 minute per question)
    this.totalQuizTime = this.quizQuestions.length * 60 // 60 seconds per question
    this.timeRemaining = this.totalQuizTime

    // Show quiz and start timer
    this.showQuiz = true
    this.startQuizTimer()

    // Prevent tab switching and other navigation
    this.preventTabSwitching()
  }

  startQuizTimer(): void {
    this.quizTimer = interval(1000).subscribe(() => {
      this.timeRemaining--

      if (this.timeRemaining <= 0) {
        this.submitQuiz()
      }
    })
  }

  preventTabSwitching(): void {
    // Prevent context menu
    document.addEventListener("contextmenu", this.preventEvent)

    // Prevent common keyboard shortcuts
    document.addEventListener("keydown", this.preventKeyboardShortcuts)

    // Prevent window blur (tab switching)
    window.addEventListener("blur", this.handleWindowBlur)

    // Prevent beforeunload
    window.addEventListener("beforeunload", this.preventPageLeave)
  }

  private preventEvent = (e: Event) => {
    e.preventDefault()
    return false
  }

  private preventKeyboardShortcuts = (e: KeyboardEvent) => {
    // Prevent Alt+Tab, Ctrl+Tab, F12, Ctrl+Shift+I, etc.
    if (
      (e.altKey && e.key === "Tab") ||
      (e.ctrlKey && e.key === "Tab") ||
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && e.key === "I") ||
      (e.ctrlKey && e.shiftKey && e.key === "J") ||
      (e.ctrlKey && e.key === "u") ||
      (e.ctrlKey && e.key === "w") ||
      (e.ctrlKey && e.key === "r") ||
      e.key === "F5"
    ) {
      e.preventDefault()
      return false
    }
    return true
  }

  private handleWindowBlur = () => {
    if (this.showQuiz && !this.quizCompleted) {
      this.tabSwitchCount++

      if (this.tabSwitchCount === 1) {
        // First warning
        this.showTabWarning = true
        setTimeout(() => {
          this.showTabWarning = false
        }, 3000)
        window.focus()
      } else if (this.tabSwitchCount > this.maxTabSwitches) {
        // Auto submit on second attempt
        alert("⚠️ Quiz auto-submitted due to multiple tab switches!")
        this.submitQuiz()
      }
    }
  }

  private preventPageLeave = (e: BeforeUnloadEvent) => {
    if (this.showQuiz && !this.quizCompleted) {
      e.preventDefault()
      e.returnValue = "Quiz in progress. Are you sure you want to leave?"
      return "Quiz in progress. Are you sure you want to leave?"
    }
    return true
  }

  selectOption(optionIndex: number): void {
    this.selectedAnswers[this.currentQuestionIndex] = optionIndex
  }

  nextQuestion(): void {
    if (this.selectedAnswers[this.currentQuestionIndex] === undefined) {
      return
    }

    if (this.currentQuestionIndex < this.quizQuestions.length - 1) {
      this.currentQuestionIndex++
    } else {
      this.submitQuiz()
    }
  }

  submitQuiz(): void {
    if (this.quizCompleted) {
      return
    }

    // Stop timer
    if (this.quizTimer) {
      this.quizTimer.unsubscribe()
      this.quizTimer = null
    }

    // Calculate score
    this.correctAnswers = 0
    for (let i = 0; i < this.quizQuestions.length; i++) {
      if (this.selectedAnswers[i] === this.quizQuestions[i].correctAnswer) {
        this.correctAnswers++
      }
    }

    this.quizScore = Math.round((this.correctAnswers / this.quizQuestions.length) * 100)
    this.quizCompleted = true
    this.quizTaken = true

    // Remove event listeners
    this.removeQuizEventListeners()

    // Save quiz result (you can implement this API call)
    this.saveQuizResult()
  }

  saveQuizResult(): void {
    const quizResult = {
      userId: this.userId,
      courseId: this.courseId,
      score: this.quizScore,
      correctAnswers: this.correctAnswers,
      totalQuestions: this.quizQuestions.length,
      completedAt: new Date().toISOString(),
    }

    // Implement API call to save quiz result
    console.log("Quiz Result:", quizResult)

    // You can add an API call here to save the quiz result
    // this.userLearningService.saveQuizResult(quizResult).subscribe({...});
  }

  removeQuizEventListeners(): void {
    document.removeEventListener("contextmenu", this.preventEvent)
    document.removeEventListener("keydown", this.preventKeyboardShortcuts)
    window.removeEventListener("blur", this.handleWindowBlur)
    window.removeEventListener("beforeunload", this.preventPageLeave)
  }

  closeQuiz(): void {
    this.showQuiz = false
    this.removeQuizEventListeners()

    // Reset quiz state
    this.currentQuestionIndex = 0
    this.selectedAnswers = []
    this.quizCompleted = false
    this.timeRemaining = 0
    this.tabSwitchCount = 0
    this.showTabWarning = false

    if (this.quizTimer) {
      this.quizTimer.unsubscribe()
      this.quizTimer = null
    }
  }

  retakeQuiz(): void {
    // Reset quiz state for retake
    this.quizTaken = false
    this.closeQuiz()

    // Ask for confirmation again
    setTimeout(() => {
      this.startQuiz()
    }, 500)
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  getTimerProgress(): number {
    if (this.totalQuizTime === 0) return 0
    return ((this.totalQuizTime - this.timeRemaining) / this.totalQuizTime) * 100
  }

  // ===== EXISTING METHODS =====

  getModuleIcon(module: ModuleDto): string {
    const hasVideo = module.videoUrl || this.hasVideoForModule(module.moduleId)
    const hasDocument = module.documentPath || module.documentPath

    if (hasVideo && hasDocument) {
      return "fas fa-file-video"
    } else if (hasVideo) {
      return "fas fa-play-circle"
    } else if (hasDocument) {
      return "fas fa-file-pdf"
    }
    return "fas fa-book"
  }

  private hasVideoForModule(moduleId: string): boolean {
    return true
  }

  getModuleStatusIcon(module: ModuleDto): string {
    return module.isCompleted ? "fas fa-check-circle text-success" : "far fa-circle text-muted"
  }

  goBack(): void {
    // If quiz is active, prevent navigation
    if (this.showQuiz && !this.quizCompleted) {
      alert("Quiz in progress! Please complete or close the quiz first.")
      return
    }
    this.router.navigate(["/categories"])
  }

  retryLoad(): void {
    this.loadCourseData()
  }

  getModuleDuration(module: ModuleDto): string {
    return (module as any).duration || ""
  }
}
