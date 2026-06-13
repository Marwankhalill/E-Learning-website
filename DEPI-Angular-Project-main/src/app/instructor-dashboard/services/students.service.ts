import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { InstructorStudent } from '../models/instructor-student';
import { AuthService } from '../../services/auth';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private coursesService: CoursesService
  ) {}
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getAll(): Observable<InstructorStudent[]> {
    const headers = this.getHeaders();
    
    return this.http.get<InstructorStudent[]>(`${this.apiUrl}/courses/instructor/students`, { headers }).pipe(
      map((students) => students || []),
      catchError((error) => {
        console.error('Error loading students:', error);
        return of([]);
      })
    );
  }

  getById(id: string): Observable<InstructorStudent | undefined> {
    return this.getAll().pipe(
      map((students) => students.find((s) => s.id === id))
    );
  }

  getByCourseId(courseId: string): Observable<InstructorStudent[]> {
    return this.getAll().pipe(
      map((students) => students.filter((s) => s.enrolledCourseId === courseId))
    );
  }

  create(student: Omit<InstructorStudent, 'id'>): Observable<InstructorStudent> {
    // Enrollment is handled through the enrollments endpoint
    throw new Error('Use enrollments endpoint to create student enrollments');
  }

  update(id: string, student: Partial<InstructorStudent>): Observable<InstructorStudent> {
    // Student updates are handled through user profile updates
    throw new Error('Student updates should be done through user profile endpoint');
  }

  delete(id: string): Observable<boolean> {
    // Student deletion/unenrollment would need a specific endpoint
    throw new Error('Student deletion requires unenrollment endpoint');
  }
}

