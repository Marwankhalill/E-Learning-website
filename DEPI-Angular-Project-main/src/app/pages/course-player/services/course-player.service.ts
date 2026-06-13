import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Course } from '../models/course';
import { VideoItem } from '../models/video-item';
import { AuthService } from '../../../services/auth';

@Injectable({
  providedIn: 'root'
})
export class CoursePlayerService {
  private readonly BASE_URL = 'http://localhost:3000';
  private readonly API_ENDPOINTS = {
    getCourse: (courseId: string) => `${this.BASE_URL}/courses/${courseId}`,
    getLessons: () => `${this.BASE_URL}/lessons`,
    getLesson: (lessonId: string) => `${this.BASE_URL}/lessons/${lessonId}`,
    updateLesson: (lessonId: string) => `${this.BASE_URL}/lessons/${lessonId}`,
    markLessonViewed: (lessonId: string) => `${this.BASE_URL}/lessons/${lessonId}/mark-viewed`,
    getProgress: (courseId: string) => `${this.BASE_URL}/lessons/progress/${courseId}`
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  /**
   * Get course details including videos (lessons)
   */
  getCourse(courseId: string): Observable<Course> {
    const token = this.authService.getToken();
    const headers = token 
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();

    // Fetch course and lessons in parallel
    return forkJoin({
      course: this.http.get<any>(this.API_ENDPOINTS.getCourse(courseId), { headers }),
      lessons: this.http.get<any[]>(this.API_ENDPOINTS.getLessons(), { headers })
    }).pipe(
      map(({ course, lessons }) => {
        // Filter lessons for this course
        const courseLessons = lessons.filter((lesson: any) => {
          const lessonCourseId = lesson.courseId?._id || lesson.courseId;
          return String(lessonCourseId) === String(courseId);
        });

        // Sort by lessonOrder
        courseLessons.sort((a: any, b: any) => (a.lessonOrder || 0) - (b.lessonOrder || 0));

        // Map lessons to VideoItem format
        const videos: VideoItem[] = courseLessons.map((lesson: any) => ({
          id: lesson._id || lesson.id,
          title: lesson.title,
          url: lesson.lessonUrl,
          duration: this.formatDuration(lesson.duration || 0)
        }));

        // Map course to Course format
        const instructor = course.instructor;
        const instructorName = instructor?.username || instructor?.email || 'Unknown Instructor';

        return {
          id: course._id || course.id,
          title: course.title,
          description: course.description || '',
          instructor: instructorName,
          category: Array.isArray(course.category) ? course.category[0] : course.category || 'General',
          thumbnail: course.thumbnail,
          videos: videos
        } as Course;
      }),
      catchError((error) => {
        console.error('Error loading course:', error);
        // Return fallback course
        return of({
          id: courseId,
          title: 'Course',
          description: 'Unable to load course details',
          instructor: 'Unknown',
          category: 'General',
          videos: []
        } as Course);
      })
    );
  }

  /**
   * Get course videos only (lessons)
   */
  getCourseVideos(courseId: string): Observable<VideoItem[]> {
    return this.getCourse(courseId).pipe(
      map(course => course.videos || []),
      catchError(() => of([]))
    );
  }

  /**
   * Get completion status for a user (viewed lessons from progress endpoint)
   */
  getCompletionStatus(courseId: string, userId: string): Observable<string[]> {
    const token = this.authService.getToken();
    if (!token) {
      return of([]);
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    // Use the new progress endpoint to get user's viewed lessons
    return this.http.get<{ viewedLessonIds: string[] }>(this.API_ENDPOINTS.getProgress(courseId), { headers }).pipe(
      map((response) => {
        return response.viewedLessonIds || [];
      }),
      catchError((error) => {
        console.warn('Failed to load completion status from API', error);
        // Fallback to localStorage
        const localKey = `course_${courseId}_completed_${userId}`;
        const localData = localStorage.getItem(localKey);
        if (localData) {
          try {
            const parsed = JSON.parse(localData);
            if (Array.isArray(parsed)) {
              return of(parsed);
            }
          } catch (e) {
            console.warn('Failed to parse local completion data', e);
          }
        }
        return of([]);
      })
    );
  }

  /**
   * Mark a video (lesson) as completed/viewed
   */
  markVideoCompleted(courseId: string, userId: string, videoId: string): Observable<void> {
    const token = this.authService.getToken();
    if (!token) {
      // If no token, just update localStorage
      this.updateLocalStorage(courseId, userId, videoId);
      return of(void 0);
    }

    const headers = new HttpHeaders({ 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    // Use the new mark-viewed endpoint for students
    return this.http.post<any>(this.API_ENDPOINTS.markLessonViewed(videoId), {}, { headers }).pipe(
      map(() => {
        // Also update localStorage as backup
        this.updateLocalStorage(courseId, userId, videoId);
        return void 0;
      }),
      catchError((error) => {
        console.warn('Failed to mark lesson as viewed on server', error);
        // Still update localStorage as fallback
        this.updateLocalStorage(courseId, userId, videoId);
        return of(void 0);
      })
    );
  }

  /**
   * Helper method to update localStorage
   */
  private updateLocalStorage(courseId: string, userId: string, videoId: string): void {
    const localKey = `course_${courseId}_completed_${userId}`;
    const existing = localStorage.getItem(localKey);
    let completedIds: string[] = [];
    
    if (existing) {
      try {
        completedIds = JSON.parse(existing);
      } catch (e) {
        console.warn('Failed to parse existing completion data', e);
      }
    }

    if (!completedIds.includes(videoId)) {
      completedIds.push(videoId);
      localStorage.setItem(localKey, JSON.stringify(completedIds));
    }
  }

  /**
   * Format duration in minutes to HH:MM or MM:SS format
   */
  private formatDuration(minutes: number): string {
    if (!minutes || minutes === 0) return '00:00';
    
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:00`;
  }

  /**
   * Error handler
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      // Return a safe default value
      return of(result as T);
    };
  }
}

