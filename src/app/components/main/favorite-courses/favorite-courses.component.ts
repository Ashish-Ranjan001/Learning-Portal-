// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-favorite-courses',
// //   imports: [],
  // templateUrl: './favorite-courses.component.html',
  // styleUrl: './favorite-courses.component.css'
// // })
// // export class FavoriteCoursesComponent {

// // }

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';

// interface Course {
//   id: number;
//   title: string;
//   category: string;
//   categoryColor: string;
//   image: string;
//   creator: string;
//   creatorAvatar: string;
//   lessons: number;
//   duration: number;
//   rating: number;
//   reviews: string;
// }

// @Component({
//   selector: 'app-favorite-courses',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './favorite-courses.component.html',
//   styleUrls: ['./favorite-courses.component.css']
// })
// export class FavoriteCoursesComponent {
//   courses: Course[] = [
//     {
//       id: 1,
//       title: 'Full Stack Web Development',
//       category: 'Development',
//       categoryColor: '#10b981',
//       image: '/placeholder.svg?height=131&width=130',
//       creator: 'Albert James',
//       creatorAvatar: '/placeholder.svg?height=24&width=24',
//       lessons: 24,
//       duration: 40,
//       rating: 4.9,
//       reviews: '12k'
//     },
//     {
//       id: 2,
//       title: 'Design System',
//       category: 'Design',
//       categoryColor: '#f59e0b',
//       image: '/placeholder.svg?height=101&width=121',
//       creator: 'Albert James',
//       creatorAvatar: '/placeholder.svg?height=24&width=24',
//       lessons: 24,
//       duration: 40,
//       rating: 4.9,
//       reviews: '12k'
//     },
//     {
//       id: 3,
//       title: 'React Native Course',
//       category: 'Frontend',
//       categoryColor: '#ef4444',
//       image: '/placeholder.svg?height=116&width=173',
//       creator: 'Albert James',
//       creatorAvatar: '/placeholder.svg?height=24&width=24',
//       lessons: 24,
//       duration: 40,
//       rating: 4.9,
//       reviews: '12k'
//     }
//   ];

//   onSeeAll() {
//     console.log('See All clicked');
//     // Add navigation logic here
//   }

//   onViewDetails(courseId: number) {
//     console.log('View Details clicked for course:', courseId);
//     // Add navigation logic here
//   }
// }


// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';

// interface Course {
//   id: number;
//   title: string;
//   category: string;
//   categoryColor: string;
//   categoryBg: string;
//   image: string;
//   creator: string;
//   creatorAvatar: string;
//   lessons: number;
//   duration: number;
//   rating: number;
//   reviews: string;
//   popular?: boolean;
// }

// @Component({
//   selector: 'app-favorite-courses',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './favorite-courses.component.html',
//   styleUrls: ['./favorite-courses.component.css']
// })
// export class FavoriteCoursesComponent {
//   courses: Course[] = [
//     {
//       id: 1,
//       title: 'Full Stack Web Development',
//       category: 'Development',
//       categoryColor: '#065f46',
//       categoryBg: '#d1fae5',
//       image: '/placeholder.svg?height=131&width=130',
//       creator: 'Albert James',
//       creatorAvatar: '/placeholder.svg?height=32&width=32',
//       lessons: 24,
//       duration: 40,
//       rating: 4.9,
//       reviews: '12k',
//       popular: true
//     },
//     {
//       id: 2,
//       title: 'Design System',
//       category: 'Design',
//       categoryColor: '#9a3412',
//       categoryBg: '#ffedd5',
//       image: '/placeholder.svg?height=101&width=121',
//       creator: 'Albert James',
//       creatorAvatar: '/placeholder.svg?height=32&width=32',
//       lessons: 24,
//       duration: 40,
//       rating: 4.9,
//       reviews: '12k'
//     },
//     {
//       id: 3,
//       title: 'React Native Course',
//       category: 'Frontend',
//       categoryColor: '#9f1239',
//       categoryBg: '#ffe4e6',
//       image: '/placeholder.svg?height=116&width=173',
//       creator: 'Albert James',
//       creatorAvatar: '/placeholder.svg?height=32&width=32',
//       lessons: 24,
//       duration: 40,
//       rating: 4.9,
//       reviews: '12k'
//     }
//   ];

//   onSeeAll() {
//     console.log('See All clicked');
//     // Add navigation logic here
//   }

//   onViewDetails(courseId: number) {
//     console.log('View Details clicked for course:', courseId);
//     // Add navigation logic here
//   }
// }



// import { Component, ElementRef, OnInit, OnDestroy, HostListener } from '@angular/core';
// import { CommonModule } from '@angular/common';

// interface Course {
//   id: number;
//   title: string;
//   category: string;
//   categoryColor: string;
//   categoryBg: string;
//   image: string;
//   creator: string;
//   creatorAvatar: string;
//   lessons: number;
//   duration: number;
//   rating: number;
//   reviews: string;
//   popular?: boolean;
// }

// @Component({
//   selector: 'app-favorite-courses',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './favorite-courses.component.html',
//   styleUrls: ['./favorite-courses.component.css']
// })
// export class FavoriteCoursesComponent implements OnInit, OnDestroy {
//   courses: Course[] = [
//     {
//       id: 1,
//       title: 'Full Stack Web Development',
//       category: 'Development',
//       categoryColor: '#065f46',
//       categoryBg: '#d1fae5',
//       image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop',
//       creator: 'Albert James',
//       creatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
//       lessons: 24,
//       duration: 40,
//       rating: 4.9,
//       reviews: '12k',
//       popular: true
//     },
//     {
//       id: 2,
//       title: 'UI/UX Design System',
//       category: 'Design',
//       categoryColor: '#9a3412',
//       categoryBg: '#ffedd5',
//       image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=300&h=200&fit=crop',
//       creator: 'Sarah Wilson',
//       creatorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b332fce7?w=32&h=32&fit=crop&crop=face',
//       lessons: 18,
//       duration: 25,
//       rating: 4.8,
//       reviews: '8.5k'
//     },
//     {
//       id: 3,
//       title: 'React Native Mobile',
//       category: 'Frontend',
//       categoryColor: '#9f1239',
//       categoryBg: '#ffe4e6',
//       image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop',
//       creator: 'Mike Chen',
//       creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
//       lessons: 32,
//       duration: 55,
//       rating: 4.7,
//       reviews: '15k'
//     },
//     {
//       id: 4,
//       title: 'Data Science & AI',
//       category: 'Data Science',
//       categoryColor: '#1e40af',
//       categoryBg: '#dbeafe',
//       image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
//       creator: 'Dr. Lisa Park',
//       creatorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
//       lessons: 45,
//       duration: 80,
//       rating: 4.9,
//       reviews: '22k'
//     },
//     {
//       id: 5,
//       title: 'Cloud Architecture',
//       category: 'DevOps',
//       categoryColor: '#7c3aed',
//       categoryBg: '#ede9fe',
//       image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop',
//       creator: 'John Rodriguez',
//       creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face',
//       lessons: 28,
//       duration: 45,
//       rating: 4.6,
//       reviews: '9.2k'
//     },
//     {
//       id: 6,
//       title: 'Cybersecurity Fundamentals',
//       category: 'Security',
//       categoryColor: '#dc2626',
//       categoryBg: '#fef2f2',
//       image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&h=200&fit=crop',
//       creator: 'Emma Thompson',
//       creatorAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=32&h=32&fit=crop&crop=face',
//       lessons: 20,
//       duration: 35,
//       rating: 4.8,
//       reviews: '11k'
//     }
//   ];

//   // 3D Gallery properties
//   isScreenSizeSm = false;
//   cylinderWidth = 1400;
//   faceCount = 6;
//   faceWidth = 280;
//   radius = 200;
//   currentRotation = 0;
//   autoplayInterval: any = null;
//   isDragging = false;
//   startX = 0;
//   currentX = 0;
//   isAutoplayPaused = false;

//   constructor(private elementRef: ElementRef) {}

//   ngOnInit() {
//     this.checkScreenSize();
//     this.calculateDimensions();
//     this.startAutoplay();
//   }

//   ngOnDestroy() {
//     this.stopAutoplay();
//   }

//   @HostListener('window:resize', ['$event'])
//   onResize() {
//     this.checkScreenSize();
//     this.calculateDimensions();
//   }

//   private checkScreenSize() {
//     this.isScreenSizeSm = window.innerWidth <= 768;
//   }

//   private calculateDimensions() {
//     this.cylinderWidth = this.isScreenSizeSm ? 900 : 1400;
//     this.faceCount = this.courses.length;
//     this.faceWidth = this.isScreenSizeSm ? 200 : 280;
//     this.radius = this.cylinderWidth / (2 * Math.PI);
//   }

//   private startAutoplay() {
//     this.autoplayInterval = setInterval(() => {
//       if (!this.isAutoplayPaused && !this.isDragging) {
//         this.currentRotation -= 360 / this.faceCount;
//         this.updateGalleryTransform();
//       }
//     }, 3000);
//   }

//   private stopAutoplay() {
//     if (this.autoplayInterval) {
//       clearInterval(this.autoplayInterval);
//       this.autoplayInterval = null;
//     }
//   }

//   private updateGalleryTransform() {
//     const galleryTrack = this.elementRef.nativeElement.querySelector('.gallery-track');
//     if (galleryTrack) {
//       galleryTrack.style.transform = `rotateY(${this.currentRotation}deg)`;
//     }
//   }

//   onMouseEnter() {
//     this.isAutoplayPaused = true;
//   }

//   onMouseLeave() {
//     this.isAutoplayPaused = false;
//   }

//   onMouseDown(event: MouseEvent) {
//     this.isDragging = true;
//     this.startX = event.clientX;
//     this.currentX = event.clientX;
//     event.preventDefault();
//   }

//   @HostListener('document:mousemove', ['$event'])
//   onMouseMove(event: MouseEvent) {
//     if (this.isDragging) {
//       this.currentX = event.clientX;
//       const deltaX = this.currentX - this.startX;
//       const rotationDelta = deltaX * 0.3;
//       const galleryTrack = this.elementRef.nativeElement.querySelector('.gallery-track');
//       if (galleryTrack) {
//         galleryTrack.style.transform = `rotateY(${this.currentRotation + rotationDelta}deg)`;
//       }
//     }
//   }

//   @HostListener('document:mouseup', ['$event'])
//   onMouseUp(event: MouseEvent) {
//     if (this.isDragging) {
//       const deltaX = this.currentX - this.startX;
//       const rotationDelta = deltaX * 0.3;
//       this.currentRotation += rotationDelta;
//       this.isDragging = false;
//       this.updateGalleryTransform();
//     }
//   }

//   getItemTransform(index: number): string {
//     const angle = (360 / this.faceCount) * index;
//     return `rotateY(${angle}deg) translateZ(${this.radius}px)`;
//   }

//   onSeeAll() {
//     console.log('See All clicked');
//   }

//   onViewDetails(courseId: number) {
//     console.log('View Details clicked for course:', courseId);
//   }
// }

// import { Component, type OnInit, type OnDestroy, HostListener } from "@angular/core"
// import { CommonModule } from "@angular/common"
// import { trigger, state, style, transition, animate, keyframes } from "@angular/animations"

// interface Course {
//   id: number
//   title: string
//   category: string
//   categoryColor: string
//   categoryBg: string
//   image: string
//   creator: string
//   creatorAvatar: string
//   lessons: number
//   duration: number
//   rating: number
//   reviews: string
//   popular?: boolean
// }

// @Component({
//   selector: "app-favorite-courses",
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: "./favorite-courses.component.html",
//   styleUrls: ["./favorite-courses.component.css"],
//   animations: [
//     trigger("cardHover", [
//       state("normal", style({ transform: "scale(1)", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" })),
//       state("hovered", style({ transform: "scale(1.05)", boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)" })),
//       transition("normal <=> hovered", animate("250ms cubic-bezier(0.4, 0, 0.2, 1)")),
//     ]),
//     trigger("cardClick", [
//       transition("* => *", [
//         animate(
//           "300ms",
//           keyframes([style({ transform: "scale(0.95)", offset: 0.3 }), style({ transform: "scale(1)", offset: 1.0 })]),
//         ),
//       ]),
//     ]),
//     trigger("fadeIn", [
//       transition(":enter", [
//         style({ opacity: 0, transform: "translateY(10px)" }),
//         animate("400ms cubic-bezier(0.4, 0, 0.2, 1)", style({ opacity: 1, transform: "translateY(0)" })),
//       ]),
//     ]),
//     trigger("galleryRotation", [transition("* => *", [animate("1500ms cubic-bezier(0.4, 0, 0.2, 1)")])]),
//   ],
// })
// export class FavoriteCoursesComponent implements OnInit, OnDestroy {
//   courses: Course[] = [
//     {
//       id: 1,
//       title: "Full Stack Web Development",
//       category: "Development",
//       categoryColor: "#065f46",
//       categoryBg: "#d1fae5",
//       image: "/placeholder.svg?height=80&width=120",
//       creator: "Albert James",
//       creatorAvatar: "/placeholder.svg?height=24&width=24",
//       lessons: 24,
//       duration: 40,
//       rating: 4.9,
//       reviews: "12k",
//       popular: true,
//     },
//     {
//       id: 2,
//       title: "Design System",
//       category: "Design",
//       categoryColor: "#9a3412",
//       categoryBg: "#ffedd5",
//       image: "/placeholder.svg?height=80&width=120",
//       creator: "Albert James",
//       creatorAvatar: "/placeholder.svg?height=24&width=24",
//       lessons: 24,
//       duration: 40,
//       rating: 4.9,
//       reviews: "12k",
//     },
//     {
//       id: 3,
//       title: "React Native Course",
//       category: "Frontend",
//       categoryColor: "#9f1239",
//       categoryBg: "#ffe4e6",
//       image: "/placeholder.svg?height=80&width=120",
//       creator: "Albert James",
//       creatorAvatar: "/placeholder.svg?height=24&width=24",
//       lessons: 24,
//       duration: 40,
//       rating: 4.9,
//       reviews: "12k",
//     },
//     {
//       id: 4,
//       title: "Node.js Backend",
//       category: "Backend",
//       categoryColor: "#1e40af",
//       categoryBg: "#dbeafe",
//       image: "/placeholder.svg?height=80&width=120",
//       creator: "Sarah Wilson",
//       creatorAvatar: "/placeholder.svg?height=24&width=24",
//       lessons: 18,
//       duration: 35,
//       rating: 4.8,
//       reviews: "8k",
//     },
//     {
//       id: 5,
//       title: "UI/UX Fundamentals",
//       category: "Design",
//       categoryColor: "#7c2d12",
//       categoryBg: "#fed7aa",
//       image: "/placeholder.svg?height=80&width=120",
//       creator: "Mike Chen",
//       creatorAvatar: "/placeholder.svg?height=24&width=24",
//       lessons: 16,
//       duration: 28,
//       rating: 4.7,
//       reviews: "6k",
//     },
//     {
//       id: 6,
//       title: "Python Data Science",
//       category: "Data Science",
//       categoryColor: "#166534",
//       categoryBg: "#dcfce7",
//       image: "/placeholder.svg?height=80&width=120",
//       creator: "Dr. Lisa Park",
//       creatorAvatar: "/placeholder.svg?height=24&width=24",
//       lessons: 32,
//       duration: 55,
//       rating: 4.9,
//       reviews: "15k",
//     },
//   ]

//   // 3D Gallery properties
//   isScreenSizeSm = false
//   cylinderWidth = 1400
//   faceCount = this.courses.length
//   faceWidth = 0
//   radius = 0
//   currentRotation = 0
//   autoplayInterval: any
//   isDragging = false
//   startX = 0
//   currentX = 0
//   dragFactor = 0.3

//   // Animation states
//   hoveredCard: number | null = null
//   clickedCard: number | null = null
//   autoplay = true
//   pauseOnHover = true

//   // Card colors for subtle animations
//   cardColors = [
//     "rgba(236, 246, 255, 0.8)", // Light blue
//     "rgba(240, 253, 244, 0.8)", // Light green
//     "rgba(254, 242, 242, 0.8)", // Light red
//     "rgba(255, 251, 235, 0.8)", // Light yellow
//     "rgba(240, 240, 255, 0.8)", // Light purple
//     "rgba(245, 243, 255, 0.8)", // Light lavender
//   ]

//   ngOnInit(): void {
//     this.calculateDimensions()
//     this.startAutoplay()
//   }

//   ngOnDestroy(): void {
//     this.stopAutoplay()
//   }

//   @HostListener("window:resize", ["$event"])
//   onResize(): void {
//     this.calculateDimensions()
//   }

//   calculateDimensions(): void {
//     this.isScreenSizeSm = window.innerWidth <= 768
//     this.cylinderWidth = this.isScreenSizeSm ? 800 : 1400
//     this.faceWidth = (this.cylinderWidth / this.faceCount) * 1.2
//     this.radius = this.cylinderWidth / (2 * Math.PI)
//   }

//   startAutoplay(): void {
//     if (this.autoplay) {
//       this.autoplayInterval = setInterval(() => {
//         this.rotateToNext()
//       }, 3000)
//     }
//   }

//   stopAutoplay(): void {
//     if (this.autoplayInterval) {
//       clearInterval(this.autoplayInterval)
//     }
//   }

//   rotateToNext(): void {
//     this.currentRotation -= 360 / this.faceCount
//   }

//   onMouseEnter(): void {
//     if (this.pauseOnHover) {
//       this.stopAutoplay()
//     }
//   }

//   onMouseLeave(): void {
//     if (this.pauseOnHover) {
//       this.startAutoplay()
//     }
//   }

//   onMouseDown(event: MouseEvent): void {
//     this.isDragging = true
//     this.startX = event.clientX
//     this.stopAutoplay()
//   }

//   onMouseMove(event: MouseEvent): void {
//     if (!this.isDragging) return

//     this.currentX = event.clientX
//     const deltaX = this.currentX - this.startX
//     this.currentRotation += deltaX * this.dragFactor
//     this.startX = this.currentX
//   }

//   onMouseUp(): void {
//     this.isDragging = false
//     if (this.autoplay) {
//       this.startAutoplay()
//     }
//   }

//   onCardHover(courseId: number): void {
//     this.hoveredCard = courseId
//   }

//   onCardLeave(): void {
//     this.hoveredCard = null
//   }

//   onCardClick(course: Course): void {
//     this.clickedCard = course.id
//     setTimeout(() => {
//       this.clickedCard = null
//     }, 300)

//     // Show alert when card is clicked
//     alert(`You clicked on "${course.title}" course`)

//     // Log the click event
//     console.log("Course clicked:", course)
//   }

//   onSeeAll(): void {
//     console.log("See All clicked")
//   }

//   onViewDetails(courseId: number, event: Event): void {
//     event.stopPropagation() // Prevent card click event
//     console.log("View Details clicked for course:", courseId)
//   }

//   getCardTransform(index: number): string {
//     const rotateY = (360 / this.faceCount) * index
//     return `rotateY(${rotateY}deg) translateZ(${this.radius}px)`
//   }

//   getGalleryTransform(): string {
//     return `rotateY(${this.currentRotation}deg)`
//   }

//   getCardBackground(index: number): string {
//     return this.cardColors[index % this.cardColors.length]
//   }

//   getCardZIndex(index: number): number {
//     // Calculate which card is most front-facing based on current rotation
//     const cardAngle = (360 / this.faceCount) * index
//     const currentAngle = this.currentRotation % 360
//     const angleDiff = Math.abs((cardAngle - currentAngle) % 360)

//     // Cards facing front get higher z-index
//     return 1000 - Math.round(angleDiff)
//   }
// }

import { Component, type OnInit, type OnDestroy, HostListener } from "@angular/core"
import { CommonModule } from "@angular/common"
import { trigger, state, style, transition, animate, keyframes } from "@angular/animations"

interface Course {
  id: number
  title: string
  category: string
  categoryColor: string
  categoryBg: string
  image: string
  creator: string
  creatorAvatar: string
  lessons: number
  duration: number
  rating: number
  reviews: string
  popular?: boolean
}

@Component({
  selector: "app-favorite-courses",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./favorite-courses.component.html",
  styleUrls: ["./favorite-courses.component.css"],
  animations: [
    trigger("cardHover", [
      state("normal", style({ transform: "scale(1)", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" })),
      state("hovered", style({ transform: "scale(1.05)", boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)" })),
      transition("normal <=> hovered", animate("250ms cubic-bezier(0.4, 0, 0.2, 1)")),
    ]),
    trigger("cardClick", [
      transition("* => *", [
        animate(
          "300ms",
          keyframes([style({ transform: "scale(0.95)", offset: 0.3 }), style({ transform: "scale(1)", offset: 1.0 })]),
        ),
      ]),
    ]),
    trigger("fadeIn", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(10px)" }),
        animate("400ms cubic-bezier(0.4, 0, 0.2, 1)", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
    trigger("galleryRotation", [transition("* => *", [animate("1500ms cubic-bezier(0.4, 0, 0.2, 1)")])]),
  ],
})
export class FavoriteCoursesComponent implements OnInit, OnDestroy {
  courses: Course[] = [
    {
      id: 1,
      title: "Full Stack Web Development",
      category: "Development",
      categoryColor: "#065f46",
      categoryBg: "#d1fae5",
      image: "/evslogo.png?height=80&width=120",
      creator: "Albert James",
      creatorAvatar: "male.svg?height=24&width=24",
      lessons: 24,
      duration: 40,
      rating: 4.9,
      reviews: "12k",
      popular: true,
    },
    {
      id: 2,
      title: "Design System",
      category: "Design",
      categoryColor: "#9a3412",
      categoryBg: "#ffedd5",
      image: "/evslogo.png?height=80&width=120",
      creator: "Albert James",
      creatorAvatar: "/male.svg?height=24&width=24",
      lessons: 24,
      duration: 40,
      rating: 4.9,
      reviews: "12k",
    },
    {
      id: 3,
      title: "React Native Course",
      category: "Frontend",
      categoryColor: "#9f1239",
      categoryBg: "#ffe4e6",
      image: "/evslogo.png?height=80&width=120",
      creator: "Albert James",
      creatorAvatar: "/male.svg?height=24&width=24",
      lessons: 24,
      duration: 40,
      rating: 4.9,
      reviews: "12k",
    },
    {
      id: 4,
      title: "Node.js Backend",
      category: "Backend",
      categoryColor: "#1e40af",
      categoryBg: "#dbeafe",
      image: "/evslogo.png?height=80&width=120",
      creator: "Sarah Wilson",
      creatorAvatar: "/male.svg?height=24&width=24",
      lessons: 18,
      duration: 35,
      rating: 4.8,
      reviews: "8k",
    },
    {
      id: 5,
      title: "UI/UX Fundamentals",
      category: "Design",
      categoryColor: "#7c2d12",
      categoryBg: "#fed7aa",
      image: "/evslogo.png?height=80&width=120",
      creator: "Mike Chen",
      creatorAvatar: "/male.svg?height=24&width=24",
      lessons: 16,
      duration: 28,
      rating: 4.7,
      reviews: "6k",
    },
    {
      id: 6,
      title: "Python Data Science",
      category: "Data Science",
      categoryColor: "#166534",
      categoryBg: "#dcfce7",
      image: "/evslogo.png?height=80&width=120",
      creator: "Dr. Lisa Park",
      creatorAvatar: "/male.svg?height=24&width=24",
      lessons: 32,
      duration: 55,
      rating: 4.9,
      reviews: "15k",
    },
  ]

  // 3D Gallery properties
  isScreenSizeSm = false
  cylinderWidth = 1400
  faceCount = this.courses.length
  faceWidth = 0
  radius = 0
  currentRotation = 0
  currentIndex = 0 // Track current card index
  autoplayInterval: any
  isDragging = false
  startX = 0
  currentX = 0
  dragFactor = 0.2 // Reduced drag sensitivity

  // Animation states
  hoveredCard: number | null = null
  clickedCard: number | null = null
  autoplay = true
  pauseOnHover = true
  isAnimating = false // Prevent multiple animations

  // Card colors for subtle animations
  cardColors = [
    "rgba(236, 246, 255, 0.8)", // Light blue
    "rgba(240, 253, 244, 0.8)", // Light green
    "rgba(254, 242, 242, 0.8)", // Light red
    "rgba(255, 251, 235, 0.8)", // Light yellow
    "rgba(240, 240, 255, 0.8)", // Light purple
    "rgba(245, 243, 255, 0.8)", // Light lavender
  ]

  ngOnInit(): void {
    this.calculateDimensions()
    this.startAutoplay()
  }

  ngOnDestroy(): void {
    this.stopAutoplay()
  }

  @HostListener("window:resize", ["$event"])
  onResize(): void {
    this.calculateDimensions()
  }

  calculateDimensions(): void {
    this.isScreenSizeSm = window.innerWidth <= 768
    this.cylinderWidth = this.isScreenSizeSm ? 800 : 1400
    this.faceWidth = (this.cylinderWidth / this.faceCount) * 1.2
    this.radius = this.cylinderWidth / (2 * Math.PI)
  }

  startAutoplay(): void {
    if (this.autoplay) {
      this.autoplayInterval = setInterval(() => {
        this.rotateToNext()
      }, 4500) // Increased to 6 seconds for slower rotation
    }
  }

  stopAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval)
    }
  }

  rotateToNext(): void {
    if (this.isAnimating) return // Prevent overlapping animations
    
    this.isAnimating = true
    this.currentIndex = (this.currentIndex + 1) % this.faceCount
    const anglePerCard = 360 / this.faceCount
    
    // Smooth rotation to the next card
    this.currentRotation -= anglePerCard
    
    // Reset animation flag after transition completes
    setTimeout(() => {
      this.isAnimating = false
    }, 1000) // Match with CSS transition duration
  }

  rotateToPrevious(): void {
    if (this.isAnimating) return
    
    this.isAnimating = true
    this.currentIndex = this.currentIndex === 0 ? this.faceCount - 1 : this.currentIndex - 1
    const anglePerCard = 360 / this.faceCount
    
    this.currentRotation += anglePerCard
    
    setTimeout(() => {
      this.isAnimating = false
    }, 1000)
  }

  rotateToCard(index: number): void {
    if (this.isAnimating || index === this.currentIndex) return
    
    this.isAnimating = true
    const anglePerCard = 360 / this.faceCount
    const currentAngle = this.currentIndex * anglePerCard
    const targetAngle = index * anglePerCard
    let angleDiff = targetAngle - currentAngle
    
    // Find shortest rotation path
    if (angleDiff > 180) {
      angleDiff -= 360
    } else if (angleDiff < -180) {
      angleDiff += 360
    }
    
    this.currentRotation -= angleDiff
    this.currentIndex = index
    
    setTimeout(() => {
      this.isAnimating = false
    }, 1000)
  }

  onMouseEnter(): void {
    if (this.pauseOnHover) {
      this.stopAutoplay()
    }
  }

  onMouseLeave(): void {
    if (this.pauseOnHover && !this.isDragging) {
      this.startAutoplay()
    }
  }

  onMouseDown(event: MouseEvent): void {
    this.isDragging = true
    this.startX = event.clientX
    this.stopAutoplay()
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return

    this.currentX = event.clientX
    const deltaX = this.currentX - this.startX
    
    // Update rotation based on drag
    this.currentRotation += deltaX * this.dragFactor
    
    // Update current index based on rotation
    const anglePerCard = 360 / this.faceCount
    const normalizedRotation = ((this.currentRotation % 360) + 360) % 360
    this.currentIndex = Math.round(normalizedRotation / anglePerCard) % this.faceCount
    
    this.startX = this.currentX
  }

  onMouseUp(): void {
    if (!this.isDragging) return
    
    this.isDragging = false
    
    // Snap to nearest card
    const anglePerCard = 360 / this.faceCount
    const targetRotation = Math.round(this.currentRotation / anglePerCard) * anglePerCard
    this.currentRotation = targetRotation
    
    if (this.autoplay) {
      setTimeout(() => {
        this.startAutoplay()
      }, 1000) // Wait before restarting autoplay
    }
  }

  onCardHover(courseId: number): void {
    this.hoveredCard = courseId
  }

  onCardLeave(): void {
    this.hoveredCard = null
  }

  onCardClick(course: Course): void {
    // Find the index of the clicked course
    const clickedIndex = this.courses.findIndex(c => c.id === course.id)
    
    // If it's not the current card, rotate to it
    if (clickedIndex !== this.currentIndex) {
      this.rotateToCard(clickedIndex)
    } else {
      // If it's the current card, show the alert
      this.clickedCard = course.id
      setTimeout(() => {
        this.clickedCard = null
      }, 300)

      alert(`You clicked on "${course.title}" course`)
      console.log("Course clicked:", course)
    }
  }

  onSeeAll(): void {
    console.log("See All clicked")
  }

  onViewDetails(courseId: number, event: Event): void {
    event.stopPropagation()
    console.log("View Details clicked for course:", courseId)
  }

  getCardTransform(index: number): string {
    const rotateY = (360 / this.faceCount) * index
    return `rotateY(${rotateY}deg) translateZ(${this.radius}px)`
  }

  getGalleryTransform(): string {
    return `rotateY(${this.currentRotation}deg)`
  }

  getCardBackground(index: number): string {
    return this.cardColors[index % this.cardColors.length]
  }

  getCardZIndex(index: number): number {
    // Calculate which card is most front-facing based on current rotation
    const anglePerCard = 360 / this.faceCount
    const cardAngle = (anglePerCard * index) % 360
    const currentAngle = (this.currentRotation % 360 + 360) % 360
    
    let angleDiff = Math.abs(cardAngle - currentAngle)
    if (angleDiff > 180) {
      angleDiff = 360 - angleDiff
    }

    // Cards facing front get higher z-index
    return 1000 - Math.round(angleDiff)
  }
}