// import { Component, OnInit, OnDestroy, Output, EventEmitter, signal, computed } from '@angular/core';
// import { CommonModule } from '@angular/common';

// interface CourseCard {
//   id: number;
//   title: string;
//   count: number;
//   icon: string;
//   color: string;
//   bgColor: string;
//   graphColor: string;
// }

// @Component({
//   selector: 'app-card-carousel',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './card-carousel.component.html',
//   styleUrls: ['./card-carousel.component.css']
// })
// export class CardCarouselComponent implements OnInit, OnDestroy {
//   @Output() itemSelected = new EventEmitter<CourseCard>();

//   public currentIndex = signal(0);
//   private intervalId: any;
//   private animationTimeouts: any[] = [];

//   cards: CourseCard[] = [
//     {
//       id: 1,
//       title: 'Completed Courses',
//       count: 155,
//       icon: '📚',
//       color: '#4285f4',
//       bgColor: '#e3f2fd',
//       graphColor: '#26a69a'
//     },
//     {
//       id: 2,
//       title: 'Ongoing Courses',
//       count: 25,
//       icon: '🎓',
//       color: '#7c4dff',
//       bgColor: '#f3e5f5',
//       graphColor: '#7c4dff'
//     },
//     {
//       id: 3,
//       title: 'Favorite Courses',
//       count: 39,
//       icon: '❤️',
//       color: '#26a69a',
//       bgColor: '#e0f2f1',
//       graphColor: '#26a69a'
//     },
//     {
//       id: 4,
//       title: 'Saved Courses',
//       count: 18,
//       icon: '💾',
//       color: '#ff9800',
//       bgColor: '#fff3e0',
//       graphColor: '#ff9800'
//     }
//   ];

//   currentCard = computed(() => this.cards[this.currentIndex()]);
//   animatedCount = signal(0);

//   ngOnInit() {
//     this.startCarousel();
//     this.animateCount();
//   }

//   ngOnDestroy() {
//     if (this.intervalId) {
//       clearInterval(this.intervalId);
//     }
//     this.animationTimeouts.forEach(timeout => clearTimeout(timeout));
//   }

//   startCarousel() {
//     this.intervalId = setInterval(() => {
//       this.nextCard();
//     }, 4000);
//   }

//   nextCard() {
//     this.currentIndex.set((this.currentIndex() + 1) % this.cards.length);
//     this.animateCount();
//     this.itemSelected.emit(this.currentCard());
//   }

//   previousCard() {
//     this.currentIndex.set(this.currentIndex() === 0 ? this.cards.length - 1 : this.currentIndex() - 1);
//     this.animateCount();
//     this.itemSelected.emit(this.currentCard());
//   }

//   selectCard(index: number) {
//     this.currentIndex.set(index);
//     this.animateCount();
//     this.itemSelected.emit(this.currentCard());
    
//     // Reset carousel timer
//     if (this.intervalId) {
//       clearInterval(this.intervalId);
//       this.startCarousel();
//     }
//   }

//   private animateCount() {
//     this.animatedCount.set(0);
//     const targetCount = this.currentCard().count;
//     const duration = 1500;
//     const steps = 60;
//     const increment = targetCount / steps;
//     let currentStep = 0;

//     // Clear existing timeouts
//     this.animationTimeouts.forEach(timeout => clearTimeout(timeout));
//     this.animationTimeouts = [];

//     const animate = () => {
//       if (currentStep < steps) {
//         this.animatedCount.set(Math.floor(increment * currentStep));
//         currentStep++;
//         const timeout = setTimeout(animate, duration / steps);
//         this.animationTimeouts.push(timeout);
//       } else {
//         this.animatedCount.set(targetCount);
//       }
//     };

//     animate();
//   }

//   getGraphPoints(): string {
//     const width = 80;
//     const height = 30;
//     const points = 8;
//     let pathData = '';
    
//     for (let i = 0; i <= points; i++) {
//       const x = (i / points) * width;
//       const y = height - (Math.random() * 0.7 + 0.3) * height * (i / points);
//       pathData += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
//     }
    
//     return pathData;
//   }
// }


import { Component, OnInit, OnDestroy, Output, EventEmitter, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CourseCard {
  id: number;
  title: string;
  count: number;
  icon: string;
  color: string;
  bgGradient: string;
  graphColor: string;
  shadowColor: string;
}

@Component({
  selector: 'app-card-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.css']
})
export class CardCarouselComponent implements OnInit, OnDestroy {
  @Output() itemSelected = new EventEmitter<CourseCard>();

  public currentIndex = signal(0);
  private intervalId: any;
  private animationTimeouts: any[] = [];
  public progressWidth = signal(0);

  cards: CourseCard[] = [
    {
      id: 1,
      title: 'Completed Courses',
      count: 155,
      icon: '🎯',
      color: '#667eea',
      bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      graphColor: '#667eea',
      shadowColor: 'rgba(102, 126, 234, 0.3)'
    },
    {
      id: 2,
      title: 'Ongoing Courses',
      count: 25,
      icon: '🚀',
      color: '#f093fb',
      bgGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      graphColor: '#f093fb',
      shadowColor: 'rgba(240, 147, 251, 0.3)'
    },
    {
      id: 3,
      title: 'Favorite Courses',
      count: 39,
      icon: '💎',
      color: '#4facfe',
      bgGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      graphColor: '#4facfe',
      shadowColor: 'rgba(79, 172, 254, 0.3)'
    },
    {
      id: 4,
      title: 'Saved Courses',
      count: 18,
      icon: '⭐',
      color: '#43e97b',
      bgGradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      graphColor: '#43e97b',
      shadowColor: 'rgba(67, 233, 123, 0.3)'
    }
  ];

  currentCard = computed(() => this.cards[this.currentIndex()]);
  animatedCount = signal(0);
  isTransitioning = signal(false);

  constructor() {
    // Progress bar effect
    effect(() => {
      if (!this.isTransitioning()) {
        this.startProgressBar();
      }
    });
  }

  ngOnInit() {
    this.startCarousel();
    this.animateCount();
    this.startProgressBar();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.animationTimeouts.forEach(timeout => clearTimeout(timeout));
  }

  startProgressBar() {
    // Reset progress
    this.progressWidth.set(0);
    
    // Animate progress over 5 seconds
    const startTime = Date.now();
    const duration = 5000; // Exactly 5 seconds
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration * 100, 100);
      this.progressWidth.set(progress);
      
      if (progress < 100) {
        requestAnimationFrame(updateProgress);
      }
    };
    
    requestAnimationFrame(updateProgress);
  }

  startCarousel() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    
    this.intervalId = setInterval(() => {
      this.nextCard();
    }, 8000); // Exactly 5 seconds
  }

  nextCard() {
    this.isTransitioning.set(true);
    setTimeout(() => {
      this.currentIndex.set((this.currentIndex() + 1) % this.cards.length);
      this.animateCount();
      this.itemSelected.emit(this.currentCard());
      this.isTransitioning.set(false);
    }, 300);
  }

  previousCard() {
    this.isTransitioning.set(true);
    setTimeout(() => {
      this.currentIndex.set(this.currentIndex() === 0 ? this.cards.length - 1 : this.currentIndex() - 1);
      this.animateCount();
      this.itemSelected.emit(this.currentCard());
      this.isTransitioning.set(false);
    }, 300);
  }

  selectCard(index: number) {
    if (index === this.currentIndex()) return;
    
    this.isTransitioning.set(true);
    setTimeout(() => {
      this.currentIndex.set(index);
      this.animateCount();
      this.itemSelected.emit(this.currentCard());
      this.isTransitioning.set(false);
    }, 300);
    
    // Reset carousel timer
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.startCarousel();
    }
  }

  private animateCount() {
    this.animatedCount.set(0);
    const targetCount = this.currentCard().count;
    const duration = 1000; // Faster animation (1 second)
    const steps = 20; // Fewer steps for faster animation
    const increment = targetCount / steps;
    let currentStep = 0;

    // Clear existing timeouts
    this.animationTimeouts.forEach(timeout => clearTimeout(timeout));
    this.animationTimeouts = [];

    const animate = () => {
      if (currentStep < steps) {
        // Cubic easing for smoother animation
        const progress = currentStep / steps;
        const easedProgress = this.easeOutCubic(progress);
        this.animatedCount.set(Math.floor(targetCount * easedProgress));
        currentStep++;
        const timeout = setTimeout(animate, duration / steps);
        this.animationTimeouts.push(timeout);
      } else {
        this.animatedCount.set(targetCount);
      }
    };

    // Start animation immediately
    animate();
  }

  // Cubic easing function for smoother animation
  private easeOutCubic(x: number): number {
    return 1 - Math.pow(1 - x, 3);
  }

  getGraphPoints(): string {
    const width = 100;
    const height = 35;
    const points = 12;
    let pathData = '';
    
    // Create a more dynamic graph based on the current card index
    const cardIndex = this.currentIndex();
    const seed = cardIndex * 0.25; // Different seed for each card
    
    for (let i = 0; i <= points; i++) {
      const x = (i / points) * width;
      const progress = i / points;
      
      // Create a more interesting curve with multiple sine waves
      const wave1 = Math.sin((progress + seed) * Math.PI * 2) * 0.3;
      const wave2 = Math.sin((progress + seed) * Math.PI * 4) * 0.15;
      const baseHeight = 0.7 - wave1 - wave2;
      
      // Adjust y position based on progress to create an upward trend
      const trendFactor = 0.3 * (1 - progress);
      const y = height - (baseHeight + trendFactor) * height;
      
      pathData += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    }
    
    return pathData;
  }
}