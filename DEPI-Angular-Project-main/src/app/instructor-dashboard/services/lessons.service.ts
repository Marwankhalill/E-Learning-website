import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth';

export interface Lesson {
  id?: string;
  courseId: string;
  title: string;
  description: string;
  lessonUrl: string | File;
  isPreviewFree: boolean;
  lessonOrder: number;
}

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  create(lesson: Lesson): Observable<any> {
    const headers = this.getHeaders();
    const formData = new FormData();

    formData.append('courseId', lesson.courseId);
    formData.append('title', lesson.title);
    formData.append('description', lesson.description);
    formData.append('isPreviewFree', lesson.isPreviewFree.toString());
    formData.append('lessonOrder', lesson.lessonOrder.toString());

    // Handle video file upload
    if (lesson.lessonUrl instanceof File) {
      formData.append('lessonUrl', lesson.lessonUrl);
    } else if (typeof lesson.lessonUrl === 'string' && lesson.lessonUrl.startsWith('data:')) {
      // Convert data URL to blob if needed
      const blob = this.dataURLtoBlob(lesson.lessonUrl);
      formData.append('lessonUrl', blob, 'lesson-video.mp4');
    }

    return this.http.post<any>(`${this.apiUrl}/lessons`, formData, { headers }).pipe(
      map((response) => response),
      catchError((error) => {
        console.error('Error creating lesson:', error);
        throw error;
      })
    );
  }

  getAll(): Observable<Lesson[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/lessons`, { headers }).pipe(
      map((lessons) =>
        lessons.map((lesson) => ({
          id: lesson._id || lesson.id,
          courseId: lesson.courseId?._id || lesson.courseId || '',
          title: lesson.title,
          description: lesson.description || '',
          lessonUrl: lesson.lessonUrl || '',
          isPreviewFree: lesson.isPreviewFree || false,
          lessonOrder: lesson.lessonOrder || 0,
        }))
      ),
      catchError((error) => {
        console.error('Error loading lessons:', error);
        throw error;
      })
    );
  }

  getByCourseId(courseId: string): Observable<Lesson[]> {
    return this.getAll().pipe(
      map((lessons) => lessons.filter((lesson) => lesson.courseId === courseId))
    );
  }

  update(id: string, lesson: Partial<Lesson> & { lessonUrl?: string | File }): Observable<any> {
    const headers = this.getHeaders();
    const formData = new FormData();

    if (lesson.title) formData.append('title', lesson.title);
    if (lesson.description) formData.append('description', lesson.description);
    if (lesson.isPreviewFree !== undefined)
      formData.append('isPreviewFree', lesson.isPreviewFree.toString());
    if (lesson.lessonOrder !== undefined)
      formData.append('lessonOrder', lesson.lessonOrder.toString());

    // Handle video: if it's a File, send it directly; if it's a data URL, convert to blob
    const video = lesson.lessonUrl as string | File | undefined;
    if (video) {
      if (video instanceof File) {
        formData.append('lessonUrl', video);
      } else if (typeof video === 'string' && video.startsWith('data:')) {
        const blob = this.dataURLtoBlob(video);
        formData.append('lessonUrl', blob, 'lesson-video.mp4');
      }
    }

    return this.http.patch<any>(`${this.apiUrl}/lessons/${id}`, formData, { headers }).pipe(
      map((response) => response),
      catchError((error) => {
        console.error('Error updating lesson:', error);
        throw error;
      })
    );
  }

  delete(id: string): Observable<boolean> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/lessons/${id}`, { headers }).pipe(
      map(() => true),
      catchError((error) => {
        console.error('Error deleting lesson:', error);
        throw error;
      })
    );
  }

  private dataURLtoBlob(dataurl: string): Blob {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'video/mp4';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
}
