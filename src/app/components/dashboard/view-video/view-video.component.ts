// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';

// import { Subscription } from 'rxjs';
// import { ModuleServicesService , VideoModuleResponse } from '../../../services/Module/module-services.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-view-ta',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './view-video.component.html',
//   styleUrls: ['./view-video.component.css']
// })
// export class ViewVideoComponent implements OnInit, OnDestroy {
//   module: VideoModuleResponse | null = null;
//   loading = true;
//   error = '';
//   moduleId = '';
//   videoError = false;
//   videoLoaded = false;
//   isPlaying = false;
//   currentTime = 0;
//   videoDuration = 0;
//   volume = 1;
//   isFullscreen = false;
//   showControls = true;
//   controlsTimeout: any;
  
//   // Add window property for template access
//   window = window;

//   private subscription = new Subscription();

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private moduleService: ModuleServicesService
//   ) {}

//   ngOnInit(): void {
//     this.moduleId = this.route.snapshot.paramMap.get('id') || '';
//     if (this.moduleId) {
//       this.loadModule();
//     } else {
//       this.error = 'Module ID is required';
//       this.loading = false;
//     }
//   }

//   ngOnDestroy(): void {
//     this.subscription.unsubscribe();
//     if (this.controlsTimeout) {
//       clearTimeout(this.controlsTimeout);
//     }
//   }

//   loadModule(): void {
//     this.loading = true;
//     this.error = '';
    
//     const sub = this.moduleService.getVideoModuleById(this.moduleId).subscribe({
//       next: (response) => {
//         this.module = response.data;
//         this.loading = false;
//       },
//       error: (err) => {
//         this.error = 'Failed to load module. Please try again.';
//         this.loading = false;
//         console.error('Error loading module:', err);
//       }
//     });

//     this.subscription.add(sub);
//   }

//   onVideoError(): void {
//     this.videoError = true;
//   }

//   onVideoLoad(): void {
//     this.videoLoaded = true;
//     this.videoError = false;
//   }

//   onVideoTimeUpdate(event: any): void {
//     this.currentTime = event.target.currentTime;
//   }

//   onVideoLoadedMetadata(event: any): void {
//     this.videoDuration = event.target.duration;
//   }

//   togglePlayPause(): void {
//     const video = document.getElementById('moduleVideo') as HTMLVideoElement;
//     if (video) {
//       if (video.paused) {
//         video.play();
//         this.isPlaying = true;
//       } else {
//         video.pause();
//         this.isPlaying = false;
//       }
//     }
//   }

//   seekTo(event: any): void {
//     const video = document.getElementById('moduleVideo') as HTMLVideoElement;
//     if (video && video.duration) {
//       const rect = event.target.getBoundingClientRect();
//       const pos = (event.clientX - rect.left) / rect.width;
//       video.currentTime = pos * video.duration;
//     }
//   }

//   adjustVolume(event: any): void {
//     const video = document.getElementById('moduleVideo') as HTMLVideoElement;
//     if (video && event.target) {
//       this.volume = parseFloat(event.target.value);
//       video.volume = this.volume;
//     }
//   }

//   toggleFullscreen(): void {
//     const videoContainer = document.getElementById('videoContainer');
//     if (videoContainer) {
//       if (!document.fullscreenElement) {
//         videoContainer.requestFullscreen().then(() => {
//           this.isFullscreen = true;
//         }).catch((err) => {
//           console.error('Error attempting to enable fullscreen:', err);
//         });
//       } else {
//         document.exitFullscreen().then(() => {
//           this.isFullscreen = false;
//         }).catch((err) => {
//           console.error('Error attempting to exit fullscreen:', err);
//         });
//       }
//     }
//   }

//   onMouseMove(): void {
//     this.showControls = true;
//     if (this.controlsTimeout) {
//       clearTimeout(this.controlsTimeout);
//     }
//     this.controlsTimeout = setTimeout(() => {
//       if (this.isPlaying) {
//         this.showControls = false;
//       }
//     }, 3000);
//   }

//   formatTime(seconds: number): string {
//     if (!seconds || isNaN(seconds)) return '00:00';
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   }

//   goBack(): void {
//     this.router.navigate(['/modules']);
//   }

//   retry(): void {
//     this.loadModule();
//   }

//   // Method to open video in new tab
//   openVideoInNewTab(): void {
//     if (this.module?.videopath) {
//       window.open(this.module.videopath, '_blank');
//     }
//   }
// }




import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModuleServicesService, VideoModuleResponse } from '../../../services/Module/module-services.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-view-ta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-video.component.html',
  styleUrls: ['./view-video.component.css']
})
export class ViewVideoComponent implements OnInit, OnDestroy {
  module: VideoModuleResponse | null = null;
  loading = true;
  error = '';
  moduleId = '';
  videoError = false;
  videoLoaded = false;
  isPlaying = false;
  currentTime = 0;
  videoDuration = 0;
  volume = 1;
  isFullscreen = false;
  showControls = true;
  controlsTimeout: any;



  private subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moduleService: ModuleServicesService
  ) {}


  ngOnInit(): void {
    this.moduleId = this.route.snapshot.paramMap.get('id') || '';
    if (this.moduleId) {
      this.loadModule();
    } else {
      this.error = 'Module ID is required';
      this.loading = false;
    }
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.controlsTimeout) {
      clearTimeout(this.controlsTimeout);
    }
  }


  loadModule(): void {
    this.loading = true;
    this.error = '';


    const sub = this.moduleService.getVideoModuleById(this.moduleId).subscribe({
      next: (response) => {
        this.module = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load module. Please try again.';
        this.loading = false;
        console.error('Error loading module:', err);
      }
    });


    this.subscription.add(sub);
  }


  onVideoError(): void {
    this.videoError = true;
  }


  onVideoLoad(): void {
    this.videoLoaded = true;
    this.videoError = false;
  }


  onVideoTimeUpdate(event: any): void {
    this.currentTime = event.target.currentTime;
  }


  onVideoLoadedMetadata(event: any): void {
    this.videoDuration = event.target.duration;
  }


  togglePlayPause(): void {
    const video = document.getElementById('moduleVideo') as HTMLVideoElement;
    if (video) {
      if (video.paused) {
        video.play();
        this.isPlaying = true;
      } else {
        video.pause();
        this.isPlaying = false;
      }
    }
  }


  seekTo(event: any): void {
    const video = document.getElementById('moduleVideo') as HTMLVideoElement;
    if (video && video.duration) {
      const rect = event.target.getBoundingClientRect();
      const pos = (event.clientX - rect.left) / rect.width;
      video.currentTime = pos * video.duration;
    }
  }


  adjustVolume(event: any): void {
    const video = document.getElementById('moduleVideo') as HTMLVideoElement;
    if (video && event.target) {
      this.volume = parseFloat(event.target.value);
      video.volume = this.volume;
    }
  }

  toggleFullscreen(): void {
    const videoContainer = document.getElementById('videoContainer');
    if (videoContainer) {
      if (!document.fullscreenElement) {
        videoContainer.requestFullscreen().then(() => {
          this.isFullscreen = true;
        }).catch((err) => {
          console.error('Error attempting to enable fullscreen:', err);
        });
      } else {
        document.exitFullscreen().then(() => {
          this.isFullscreen = false;
        }).catch((err) => {
          console.error('Error attempting to exit fullscreen:', err);
        });
      }
    }
  }


  onMouseMove(): void {
    this.showControls = true;
    if (this.controlsTimeout) {
      clearTimeout(this.controlsTimeout);
    }
    this.controlsTimeout = setTimeout(() => {
      if (this.isPlaying) {
        this.showControls = false;
      }
    }, 3000);
  }


  formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }


  goBack(): void {
    this.router.navigate(['/modules']);
  }

  retry(): void {
    this.loadModule();
  }

  openVideoInNewTab(): void {
    if (this.module?.videopath) {
      window.open(this.module.videopath, '_blank');
    }
}
}