import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseAccessService {
  private apiUrl = 'http://localhost:3000';
  private cachedEnrollments: string[] | null = null;

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {}

  // Check if user has purchased a course
  hasPurchasedCourse(courseId: string): boolean {
    if (!this.isLoggedIn()) return false;
    
    // If we have cached enrollments, check them
    if (this.cachedEnrollments !== null) {
      return this.cachedEnrollments.includes(courseId);
    }
    
    // Otherwise return false and let the caller fetch enrollments
    return false;
  }

  // Fetch enrollments from backend and cache them
  fetchEnrollments(): Observable<string[]> {
    const token = this.authService.getToken();
    if (!token || !this.isLoggedIn()) {
      this.cachedEnrollments = [];
      return of([]);
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<{ enrolledCourses: any[] }>(`${this.apiUrl}/enrollments`, { headers })
      .pipe(
        map(response => {
          const courseIds = (response.enrolledCourses || []).map(course => 
            typeof course === 'string' ? course : course._id || course.id
          );
          this.cachedEnrollments = courseIds;
          return courseIds;
        }),
        catchError(error => {
          console.error('Error fetching enrollments:', error);
          this.cachedEnrollments = [];
          return of([]);
        })
      );
  }

  // Clear cached enrollments (call this after enrollment/payment)
  clearCache(): void {
    this.cachedEnrollments = null;
  }

  // Get all purchased courses for a user (from cache or fetch)
  getPurchasedCourses(userId: string): string[] {
    return this.cachedEnrollments || [];
  }

  // Mark a course as purchased (add to cache)
  markCourseAsPurchased(courseId: string): void {
    if (this.cachedEnrollments === null) {
      this.cachedEnrollments = [];
    }
    
    if (!this.cachedEnrollments.includes(courseId)) {
      this.cachedEnrollments.push(courseId);
    }
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}

