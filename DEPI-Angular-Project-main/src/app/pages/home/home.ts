import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CourseAccessService } from '../../services/course-access.service';

interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: any;
  category: string[];
  rating: any[];
  enrolledStudents: any[];
  thumbnail?: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  featuredCourses: Course[] = [];
  loading = true;
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router,
    private courseAccessService: CourseAccessService
  ) {}

  ngOnInit() {
    this.fetchCourses();
  }

  fetchCourses() {
    this.http.get<Course[]>(`${this.apiUrl}/courses`).subscribe({
      next: (data) => {
        this.featuredCourses = data.slice(0, 3);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  getCourseId(course: Course): string {
    return course._id || '';
  }

  getInstructorName(course: Course): string {
    return course.instructor?.username || course.instructor?.email || 'Unknown Instructor';
  }

  getCategory(course: Course): string {
    return course.category?.[0] || 'General';
  }

  getRating(course: Course): number {
    if (!course.rating || course.rating.length === 0) return 0;
    const sum = course.rating.reduce((acc: number, r: any) => acc + (r.score || 0), 0);
    return Math.round((sum / course.rating.length) * 10) / 10;
  }

  getStudents(course: Course): number {
    return course.enrolledStudents?.length || 0;
  }

  onCourseClick(course: Course) {
    const courseId = this.getCourseId(course);
    if (!courseId) return;

    // Check if user is logged in
    if (!this.courseAccessService.isLoggedIn()) {
      // Not logged in - go to course details
      this.router.navigate(['/courses', courseId]);
      return;
    }

    // Check if user has purchased/enrolled in the course
    // First fetch enrollments if not cached
    this.courseAccessService.fetchEnrollments().subscribe(() => {
      if (this.courseAccessService.hasPurchasedCourse(courseId)) {
        // User is enrolled - go to course player
        this.router.navigate(['/course', courseId, 'player']);
      } else {
        // User is not enrolled - go to course details
        this.router.navigate(['/courses', courseId]);
      }
    });
  }
}
