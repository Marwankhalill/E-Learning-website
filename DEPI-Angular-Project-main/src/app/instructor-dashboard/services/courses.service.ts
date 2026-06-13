import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { InstructorCourse } from '../models/instructor-course';
import { AuthService } from '../../services/auth';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthService) {}
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getAll(): Observable<InstructorCourse[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/courses/instructor-courses`, { headers }).pipe(
      map((courses) =>
        courses.map((course) => ({
          id: course._id || course.id,
          title: course.title,
          description: course.description || '',
          category: Array.isArray(course.category)
            ? course.category[0]
            : course.category || 'General',
          price: course.price || 0,
          level: 'beginner' as const, // Default level
          imageUrl: course.thumbnail || '',
          videoUrl: '',
          status: course.isPublished ? ('published' as const) : ('draft' as const),
          createdAt: course.createdAt || new Date().toISOString(),
          updatedAt: course.updatedAt || new Date().toISOString(),
          enrolledStudents: (course.enrolledStudents || []).length,
        }))
      ),
      catchError((error) => {
        console.error('Error loading courses:', error);
        return of([]);
      })
    );
  }

  getById(id: string): Observable<InstructorCourse | undefined> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/courses/${id}`, { headers }).pipe(
      map((course) => ({
        id: course._id || course.id,
        title: course.title,
        description: course.description || '',
        category: Array.isArray(course.category)
          ? course.category[0]
          : course.category || 'General',
        price: course.price || 0,
        level: 'beginner' as const,
        imageUrl: course.thumbnail || '',
        videoUrl: '',
        status: course.isPublished ? ('published' as const) : ('draft' as const),
        createdAt: course.createdAt || new Date().toISOString(),
        updatedAt: course.updatedAt || new Date().toISOString(),
        enrolledStudents: (course.enrolledStudents || []).length,
      })),
      catchError((error) => {
        console.error('Error loading course:', error);
        return of(undefined);
      })
    );
  }

  create(course: any): Observable<InstructorCourse> {
    const headers = this.getHeaders();
    const formData = new FormData();

    formData.append('title', course.title);
    formData.append('description', course.description);
    formData.append('category', course.category);
    formData.append('price', course.price.toString());
    formData.append('isPublished', course.status === 'published' ? 'true' : 'false');

    // Append thumbnail file if provided
    if (course.thumbnail instanceof File) {
      formData.append('thumbnail', course.thumbnail);
    } else if (
      course.thumbnail &&
      typeof course.thumbnail === 'string' &&
      course.thumbnail.startsWith('data:')
    ) {
      // Convert data URL to blob if needed
      const blob = this.dataURLtoBlob(course.thumbnail);
      formData.append('thumbnail', blob, 'thumbnail.jpg');
    }

    return this.http.post<any>(`${this.apiUrl}/courses`, formData, { headers }).pipe(
      map((createdCourse) => ({
        id: createdCourse._id || createdCourse.id,
        title: createdCourse.title,
        description: createdCourse.description || '',
        category: Array.isArray(createdCourse.category)
          ? createdCourse.category[0]
          : createdCourse.category || 'General',
        price: createdCourse.price || 0,
        level: 'beginner' as const,
        imageUrl: createdCourse.thumbnail || '',
        videoUrl: '',
        status: createdCourse.isPublished ? ('published' as const) : ('draft' as const),
        createdAt: createdCourse.createdAt || new Date().toISOString(),
        updatedAt: createdCourse.updatedAt || new Date().toISOString(),
        enrolledStudents: 0,
      })),
      catchError((error) => {
        console.error('Error creating course:', error);
        throw error;
      })
    );
  }

  update(
    id: string,
    course: Partial<InstructorCourse> & { imageUrl?: string | File }
  ): Observable<InstructorCourse> {
    const headers = this.getHeaders();
    const formData = new FormData();

    if (course.title) formData.append('title', course.title);
    if (course.description) formData.append('description', course.description);
    if (course.category) formData.append('category', course.category);
    if (course.price !== undefined) formData.append('price', course.price.toString());
    if (course.status)
      formData.append('isPublished', course.status === 'published' ? 'true' : 'false');

    // Handle thumbnail: if it's a File, send it directly; if it's a data URL, convert to blob
    const thumbnail = course.imageUrl as string | File | undefined;
    if (thumbnail) {
      if (thumbnail instanceof File) {
        formData.append('thumbnail', thumbnail);
      } else if (typeof thumbnail === 'string' && thumbnail.startsWith('data:')) {
        const blob = this.dataURLtoBlob(thumbnail);
        formData.append('thumbnail', blob, 'thumbnail.jpg');
      }
    }

    return this.http.patch<any>(`${this.apiUrl}/courses/${id}`, formData, { headers }).pipe(
      map((updatedCourse) => ({
        id: updatedCourse._id || updatedCourse.id,
        title: updatedCourse.title,
        description: updatedCourse.description || '',
        category: Array.isArray(updatedCourse.category)
          ? updatedCourse.category[0]
          : updatedCourse.category || 'General',
        price: updatedCourse.price || 0,
        level: 'beginner' as const,
        imageUrl: updatedCourse.thumbnail || '',
        videoUrl: '',
        status: updatedCourse.isPublished ? ('published' as const) : ('draft' as const),
        createdAt: updatedCourse.createdAt || new Date().toISOString(),
        updatedAt: updatedCourse.updatedAt || new Date().toISOString(),
        enrolledStudents: (updatedCourse.enrolledStudents || []).length,
      })),
      catchError((error) => {
        console.error('Error updating course:', error);
        throw error;
      })
    );
  }

  delete(id: string): Observable<boolean> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/courses/${id}`, { headers }).pipe(
      map(() => true),
      catchError((error) => {
        console.error('Error deleting course:', error);
        return of(false);
      })
    );
  }

  private dataURLtoBlob(dataurl: string): Blob {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
}
