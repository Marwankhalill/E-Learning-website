import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { InstructorProfile } from '../models/instructor-profile';
import { AuthService } from '../../services/auth';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getProfile(): Observable<InstructorProfile> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Get profile and statistics in parallel
    return this.http.get<any>(`${this.apiUrl}/users/profile/me`, { headers }).pipe(
      switchMap((user) => {
        return this.getStatistics().pipe(
          map((stats) => ({
            id: user.id,
            name: user.username || user.name || 'Instructor',
            email: user.email,
            bio: user.bio || '',
            avatar: user.imgUrl || user.avatar || '',
            skills: [], // Skills can be added later if needed
            totalCourses: stats.totalCourses,
            totalStudents: stats.totalStudents,
            totalRevenue: stats.revenue,
          } as InstructorProfile))
        );
      }),
      catchError((error) => {
        console.error('Error loading profile:', error);
        return of({
          id: '',
          name: 'Instructor',
          email: '',
          bio: '',
          avatar: '',
          skills: [],
          totalCourses: 0,
          totalStudents: 0,
          totalRevenue: 0,
        });
      })
    );
  }

  updateProfile(profile: Partial<InstructorProfile>): Observable<InstructorProfile> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const updateData = {
      username: profile.name,
      email: profile.email,
      imgUrl: profile.avatar,
      bio: profile.bio,
    };

    return this.http.patch<any>(`${this.apiUrl}/users/profile/me`, updateData, { headers }).pipe(
      map((user) => ({
        id: user.id,
        name: user.username || user.name || 'Instructor',
        email: user.email,
        bio: user.bio || '',
        avatar: user.imgUrl || user.avatar || '',
        skills: [],
        totalCourses: 0,
        totalStudents: 0,
        totalRevenue: 0,
      } as InstructorProfile)),
      catchError((error) => {
        console.error('Error updating profile:', error);
        throw error;
      })
    );
  }

  getStatistics(): Observable<{
    totalStudents: number;
    totalCourses: number;
    revenue: number;
    newEnrollments: number;
  }> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<{
      totalStudents: number;
      totalCourses: number;
      revenue: number;
      newEnrollments: number;
    }>(`${this.apiUrl}/courses/instructor/statistics`, { headers }).pipe(
      catchError((error) => {
        console.error('Error loading statistics:', error);
        return of({
          totalStudents: 0,
          totalCourses: 0,
          revenue: 0,
          newEnrollments: 0,
        });
      })
    );
  }
}

