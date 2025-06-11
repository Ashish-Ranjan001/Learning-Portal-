import {
  Component,
  OnInit,
  OnDestroy,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit,
  HostListener,
  Renderer2,
} from "@angular/core"
import { CommonModule } from "@angular/common"
import { trigger, state, style, transition, animate, keyframes } from "@angular/animations"

interface SavedCourse {
  id: number
  title: string
  category: string
  categoryColor: string
  categoryBg: string
  image: string
  progress: number
  lastAccessed: string
  instructor: string
}

@Component({
  selector: "app-home-saved-course",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./home-saved-course.component.html",
  styleUrls: ["./home-saved-course.component.css"],
  animations: [
    trigger("cardHover", [
      state("normal", style({ transform: "scale(1)" })),
      state("hovered", style({ transform: "scale(1.05)" })),
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
  ],
})
export class HomeSavedCourseComponent implements OnInit, OnDestroy, AfterViewInit {
  savedCourses: SavedCourse[] = [
    {
      id: 1,
      title: "Advanced JavaScript",
      category: "Development",
      categoryColor: "#065f46",
      categoryBg: "#d1fae5",
      image: "evslogo.png",
      progress: 65,
      lastAccessed: "2 days ago",
      instructor: "David Miller",
    },
    {
      id: 2,
      title: "UI/UX Masterclass",
      category: "Design",
      categoryColor: "#9a3412",
      categoryBg: "#ffedd5",
      image: "evslogo.png",
      progress: 42,
      lastAccessed: "Yesterday",
      instructor: "Sarah Chen",
    },
    {
      id: 3,
      title: "React Hooks Deep Dive",
      category: "Frontend",
      categoryColor: "#9f1239",
      categoryBg: "#ffe4e6",
      image: "evslogo.png",
      progress: 78,
      lastAccessed: "3 days ago",
      instructor: "Michael Johnson",
    },
    {
      id: 4,
      title: "Node.js Microservices",
      category: "Backend",
      categoryColor: "#1e40af",
      categoryBg: "#dbeafe",
      image: "evslogo.png",
      progress: 23,
      lastAccessed: "1 week ago",
      instructor: "Emily Parker",
    },
    {
      id: 5,
      title: "Data Visualization",
      category: "Data Science",
      categoryColor: "#7c2d12",
      categoryBg: "#fed7aa",
      image: "evslogo.png",
      progress: 91,
      lastAccessed: "Today",
      instructor: "Alex Wong",
    },
    {
      id: 6,
      title: "TypeScript Fundamentals",
      category: "Development",
      categoryColor: "#166534",
      categoryBg: "#dcfce7",
      image: "evslogo.png",
      progress: 54,
      lastAccessed: "4 days ago",
      instructor: "Jessica Lee",
    },
  ]

  // 3D Gallery properties
  isScreenSizeSm = false
  cylinderWidth = 1200
  faceCount = this.savedCourses.length
  faceWidth = 0
  radius = 0
  currentRotation = 0
  autoplayInterval: any
  isDragging = false
  startX = 0
  currentX = 0
  dragFactor = 0.3
  rotationSpeed = 0.5
  isAutoRotating = true

  // Animation states
  hoveredCard: number | null = null
  clickedCard: number | null = null
  autoplay = true
  pauseOnHover = true

  // Decay effect properties
  cursor = { x: 0, y: 0 }
  cachedCursor = { x: 0, y: 0 }
  winsize = { width: 0, height: 0 }
  animationFrameId: number | null = null

  @ViewChildren("svgRef") svgRefs!: QueryList<ElementRef>
  @ViewChildren("displacementMapRef") displacementMapRefs!: QueryList<ElementRef>
  @ViewChildren("galleryTrack") galleryTrackRef!: QueryList<ElementRef>

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.calculateDimensions()
    this.winsize = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    this.cursor = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }
    this.cachedCursor = { ...this.cursor }
  }

  ngAfterViewInit(): void {
    this.startRotationAnimation()
    this.initDecayEffect()
  }

  ngOnDestroy(): void {
    this.stopRotationAnimation()
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize(): void {
    this.calculateDimensions()
    this.winsize = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }

  @HostListener("window:mousemove", ["$event"])
  onMouseMove(event: MouseEvent): void {
    // Update cursor position for decay effect
    this.cursor = { x: event.clientX, y: event.clientY }
    
    // Handle dragging for 3D gallery rotation
    if (this.isDragging) {
      this.currentX = event.clientX
      const deltaX = this.currentX - this.startX
      this.currentRotation += deltaX * this.dragFactor
      this.startX = this.currentX
    }
  }

  calculateDimensions(): void {
    this.isScreenSizeSm = window.innerWidth <= 768
    this.cylinderWidth = this.isScreenSizeSm ? 700 : 1200
    this.faceWidth = (this.cylinderWidth / this.faceCount) * 1.2
    this.radius = this.cylinderWidth / (2 * Math.PI)
  }

  startRotationAnimation(): void {
    if (this.autoplay && !this.animationFrameId) {
      const animate = () => {
        if (this.isAutoRotating && !this.isDragging) {
          this.currentRotation -= this.rotationSpeed
          if (this.galleryTrackRef && this.galleryTrackRef.first) {
            this.renderer.setStyle(
              this.galleryTrackRef.first.nativeElement,
              "transform",
              `rotateY(${this.currentRotation}deg)`,
            )
          }
        }
        this.animationFrameId = requestAnimationFrame(animate)
      }
      this.animationFrameId = requestAnimationFrame(animate)
    }
  }

  stopRotationAnimation(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
      this.animationFrameId = null
    }
  }

  onMouseEnter(): void {
    if (this.pauseOnHover) {
      this.isAutoRotating = false
    }
  }

  onMouseLeave(): void {
    if (this.pauseOnHover) {
      this.isAutoRotating = true
    }
  }

  onMouseDown(event: MouseEvent): void {
    this.isDragging = true
    this.startX = event.clientX
    this.isAutoRotating = false
  }

  onMouseUp(): void {
    this.isDragging = false
    if (this.autoplay) {
      this.isAutoRotating = true
    }
  }

  onCardHover(courseId: number): void {
    this.hoveredCard = courseId
  }

  onCardLeave(): void {
    this.hoveredCard = null
  }

  onCardClick(course: SavedCourse): void {
    this.clickedCard = course.id
    setTimeout(() => {
      this.clickedCard = null
    }, 300)

    // Show alert when card is clicked
    alert(`You clicked on "${course.title}" course`)

    // Log the click event
    console.log("Course clicked:", course)
  }

  onSeeAll(): void {
    console.log("See All clicked")
  }

  onContinueCourse(courseId: number, event: Event): void {
    event.stopPropagation() // Prevent card click event
    console.log("Continue course clicked for course:", courseId)
  }

  getCardTransform(index: number): string {
    const rotateY = (360 / this.faceCount) * index
    return `rotateY(${rotateY}deg) translateZ(${this.radius}px)`
  }

  getGalleryTransform(): string {
    return `rotateY(${this.currentRotation}deg)`
  }

  getCardZIndex(index: number): number {
    // Calculate which card is most front-facing based on current rotation
    const cardAngle = (360 / this.faceCount) * index
    const currentAngle = this.currentRotation % 360
    const angleDiff = Math.abs((cardAngle - currentAngle) % 360)

    // Cards facing front get higher z-index
    return 1000 - Math.round(angleDiff)
  }

  getProgressColor(progress: number): string {
    if (progress < 30) return "#ef4444"
    if (progress < 70) return "#f59e0b"
    return "#10b981"
  }

  // Decay effect methods
  initDecayEffect(): void {
    this.svgRefs.forEach((svgRef, index) => {
      const displacementMapRef = this.displacementMapRefs.toArray()[index]

      const imgValues = {
        imgTransforms: { x: 0, y: 0, rz: 0 },
        displacementScale: 0,
      }

      const renderFrame = () => {
        // Lerp function
        const lerp = (a: number, b: number, n: number): number => (1 - n) * a + n * b

        // Map function
        const map = (x: number, a: number, b: number, c: number, d: number): number => ((x - a) * (d - c)) / (b - a) + c

        // Distance function
        const distance = (x1: number, x2: number, y1: number, y2: number): number => {
          const a = x1 - x2
          const b = y1 - y2
          return Math.hypot(a, b)
        }

        // Calculate target transforms
        let targetX = lerp(imgValues.imgTransforms.x, map(this.cursor.x, 0, this.winsize.width, -20, 20), 0.1)
        let targetY = lerp(imgValues.imgTransforms.y, map(this.cursor.y, 0, this.winsize.height, -20, 20), 0.1)
        const targetRz = lerp(imgValues.imgTransforms.rz, map(this.cursor.x, 0, this.winsize.width, -3, 3), 0.1)

        // Apply elastic bounds
        const bound = 20
        if (targetX > bound) targetX = bound + (targetX - bound) * 0.2
        if (targetX < -bound) targetX = -bound + (targetX + bound) * 0.2
        if (targetY > bound) targetY = bound + (targetY - bound) * 0.2
        if (targetY < -bound) targetY = -bound + (targetY + bound) * 0.2

        imgValues.imgTransforms.x = targetX
        imgValues.imgTransforms.y = targetY
        imgValues.imgTransforms.rz = targetRz

        // Apply transforms
        if (svgRef && svgRef.nativeElement) {
          this.renderer.setStyle(
            svgRef.nativeElement,
            "transform",
            `translate(${imgValues.imgTransforms.x}px, ${imgValues.imgTransforms.y}px) rotateZ(${imgValues.imgTransforms.rz}deg)`,
          )
        }

        // Calculate displacement scale based on cursor movement
        const cursorTravelledDistance = distance(this.cachedCursor.x, this.cursor.x, this.cachedCursor.y, this.cursor.y)

        imgValues.displacementScale = lerp(
          imgValues.displacementScale,
          map(cursorTravelledDistance, 0, 100, 0, 60),
          0.06,
        )

        // Apply displacement scale
        if (displacementMapRef && displacementMapRef.nativeElement) {
          this.renderer.setAttribute(displacementMapRef.nativeElement, "scale", imgValues.displacementScale.toString())
        }

        this.cachedCursor = { ...this.cursor }

        // Continue animation loop
        requestAnimationFrame(renderFrame)
      }

      requestAnimationFrame(renderFrame)
    })
  }
}