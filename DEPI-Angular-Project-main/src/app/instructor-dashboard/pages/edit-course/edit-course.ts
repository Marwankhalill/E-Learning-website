import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { LessonsService, Lesson } from '../../services/lessons.service';
import { InstructorCourse } from '../../models/instructor-course';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './edit-course.html',
  styleUrl: './edit-course.css',
})
export class EditCourse implements OnInit {
  courseForm: FormGroup;
  lessonForm: FormGroup;
  submitting = false;
  loading = true;
  courseId: string | null = null;
  lessons: Lesson[] = [];
  showLessonForm = false;
  submittingLesson = false;
  loadingLessons = false;
  editingLessonId: string | null = null;
  originalLessonData: Lesson | null = null;

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private lessonsService: LessonsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      level: ['beginner', Validators.required],
      thumbnail: [null],
      status: ['draft', Validators.required],
    });

    this.lessonForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      lessonUrl: [null, Validators.required],
      isPreviewFree: [false],
      lessonOrder: [1, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.loadCourse();
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.courseForm.patchValue({ thumbnail: file });
    }
  }

  loadCourse() {
    if (!this.courseId) return;

    this.loading = true;
    this.coursesService.getById(this.courseId).subscribe({
      next: (course) => {
        if (course) {
          this.courseForm.patchValue({
            title: course.title,
            description: course.description,
            category: course.category,
            price: course.price,
            level: course.level,
            status: course.status,
            thumbnail: null, // Don't set file, just show existing image
          });
          this.loading = false;
          this.loadLessons();
        } else {
          this.router.navigate(['/instructor/my-courses']);
        }
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/instructor/my-courses']);
      },
    });
  }

  loadLessons() {
    if (!this.courseId) return;

    this.loadingLessons = true;
    this.lessonsService.getByCourseId(this.courseId).subscribe({
      next: (lessons) => {
        this.lessons = lessons.sort((a, b) => a.lessonOrder - b.lessonOrder);
        this.loadingLessons = false;
      },
      error: (error) => {
        console.error('Error loading lessons:', error);
        this.lessons = [];
        this.loadingLessons = false;
      },
    });
  }

  onSubmit() {
    if (this.courseForm.valid && this.courseId) {
      this.submitting = true;
      const formValue = this.courseForm.value;

      const courseData: Partial<InstructorCourse> & { imageUrl?: string | File } = {
        title: formValue.title,
        description: formValue.description,
        category: formValue.category,
        price: formValue.price,
        status: (formValue.status === 'published' ? 'published' : 'draft') as 'published' | 'draft',
      };

      // Handle thumbnail: pass File directly if it's a File, otherwise pass as string (existing URL)
      if (formValue.thumbnail instanceof File) {
        // Pass File directly - the service will handle it
        courseData.imageUrl = formValue.thumbnail;
      } else if (formValue.thumbnail && typeof formValue.thumbnail === 'string') {
        // Existing thumbnail URL - don't send it if it hasn't changed
        // Only send if it's a new data URL
        if (formValue.thumbnail.startsWith('data:')) {
          courseData.imageUrl = formValue.thumbnail;
        }
        // If it's a regular URL string, don't include it (backend will keep existing)
      }

      this.updateCourse(courseData);
    } else {
      Object.keys(this.courseForm.controls).forEach((key) => {
        this.courseForm.get(key)?.markAsTouched();
      });
    }
  }

  private updateCourse(courseData: Partial<InstructorCourse> & { imageUrl?: string | File }) {
    this.coursesService.update(this.courseId!, courseData).subscribe({
      next: () => {
        this.router.navigate(['/instructor/my-courses']);
      },
      error: (error) => {
        this.submitting = false;
        console.error('Error updating course:', error);
        alert(error?.error?.message || 'Error updating course. Please try again.');
      },
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.courseForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName} is required`;
    }
    if (field?.hasError('minlength')) {
      return `${fieldName} is too short`;
    }
    if (field?.hasError('min')) {
      return `${fieldName} must be positive`;
    }
    return '';
  }

  // Lesson management methods
  toggleLessonForm() {
    this.showLessonForm = !this.showLessonForm;
    if (this.showLessonForm && !this.editingLessonId) {
      // Set default lesson order for new lesson
      const nextOrder =
        this.lessons.length > 0 ? Math.max(...this.lessons.map((l) => l.lessonOrder)) + 1 : 1;
      this.lessonForm.patchValue({ lessonOrder: nextOrder });
    } else if (!this.showLessonForm) {
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.editingLessonId = null;
    this.originalLessonData = null;

    // Restore required validator for video when canceling edit
    const videoControl = this.lessonForm.get('lessonUrl');
    if (videoControl) {
      videoControl.setValidators([Validators.required]);
      videoControl.updateValueAndValidity();
    }

    this.lessonForm.reset({
      lessonOrder: 1,
      isPreviewFree: false,
    });
  }

  editLesson(lesson: Lesson) {
    this.editingLessonId = lesson.id || null;
    this.originalLessonData = { ...lesson }; // Store original data for comparison
    this.showLessonForm = true;

    // Make video optional when editing (similar to course thumbnail)
    const videoControl = this.lessonForm.get('lessonUrl');
    if (videoControl) {
      videoControl.clearValidators();
      videoControl.updateValueAndValidity();
    }

    // Populate form with all existing lesson data
    this.lessonForm.patchValue({
      title: lesson.title,
      description: lesson.description,
      lessonOrder: lesson.lessonOrder,
      isPreviewFree: lesson.isPreviewFree,
      lessonUrl: typeof lesson.lessonUrl === 'string' ? lesson.lessonUrl : null, // Store existing URL if it's a string
    });

    // Scroll to form
    setTimeout(() => {
      const formElement = document.querySelector('.lesson-form-container');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  onLessonFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.lessonForm.patchValue({ lessonUrl: file });
    }
  }

  onSubmitLesson() {
    if (this.lessonForm.valid && this.courseId) {
      this.submittingLesson = true;
      const formValue = this.lessonForm.value;

      if (this.editingLessonId && this.originalLessonData) {
        // Update existing lesson - only send changed fields
        const lessonData: Partial<Lesson> & { lessonUrl?: string | File } = {};

        // Only include fields that have changed
        if (formValue.title !== this.originalLessonData.title) {
          lessonData.title = formValue.title;
        }
        if (formValue.description !== this.originalLessonData.description) {
          lessonData.description = formValue.description;
        }
        if (formValue.isPreviewFree !== this.originalLessonData.isPreviewFree) {
          lessonData.isPreviewFree = formValue.isPreviewFree || false;
        }
        if (formValue.lessonOrder !== this.originalLessonData.lessonOrder) {
          lessonData.lessonOrder = formValue.lessonOrder;
        }

        // Handle video: only send if a new file was selected
        if (formValue.lessonUrl instanceof File) {
          lessonData.lessonUrl = formValue.lessonUrl;
        }

        // Check if at least one field has changed
        const hasChanges = Object.keys(lessonData).length > 0;
        if (!hasChanges) {
          alert('No changes detected. Please modify at least one field.');
          this.submittingLesson = false;
          return;
        }

        this.updateLesson(lessonData);
      } else {
        // Create new lesson
        if (!formValue.lessonUrl) {
          alert('Please select a video file for the lesson.');
          this.submittingLesson = false;
          return;
        }

        const lessonData: Lesson = {
          courseId: this.courseId,
          title: formValue.title,
          description: formValue.description,
          lessonUrl: formValue.lessonUrl,
          isPreviewFree: formValue.isPreviewFree || false,
          lessonOrder: formValue.lessonOrder,
        };

        this.lessonsService.create(lessonData).subscribe({
          next: () => {
            this.submittingLesson = false;
            this.lessonForm.reset({
              lessonOrder: this.lessons.length + 1,
              isPreviewFree: false,
            });
            this.showLessonForm = false;
            this.loadLessons();
            alert('Lesson added successfully!');
          },
          error: (error) => {
            this.submittingLesson = false;
            console.error('Error creating lesson:', error);
            alert(error?.error?.message || 'Error creating lesson. Please try again.');
          },
        });
      }
    } else {
      Object.keys(this.lessonForm.controls).forEach((key) => {
        this.lessonForm.get(key)?.markAsTouched();
      });
    }
  }

  private updateLesson(lessonData: Partial<Lesson> & { lessonUrl?: string | File }) {
    this.lessonsService.update(this.editingLessonId!, lessonData).subscribe({
      next: () => {
        this.submittingLesson = false;
        this.originalLessonData = null;
        this.cancelEdit();
        this.showLessonForm = false;
        this.loadLessons();
        alert('Lesson updated successfully!');
      },
      error: (error) => {
        this.submittingLesson = false;
        console.error('Error updating lesson:', error);
        alert(error?.error?.message || 'Error updating lesson. Please try again.');
      },
    });
  }

  deleteLesson(lessonId: string) {
    if (confirm('Are you sure you want to delete this lesson?')) {
      this.lessonsService.delete(lessonId).subscribe({
        next: () => {
          this.loadLessons();
          alert('Lesson deleted successfully!');
        },
        error: (error) => {
          console.error('Error deleting lesson:', error);
          alert(error?.error?.message || 'Error deleting lesson. Please try again.');
        },
      });
    }
  }

  getLessonFieldError(fieldName: string): string {
    const field = this.lessonForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName} is required`;
    }
    if (field?.hasError('minlength')) {
      return `${fieldName} is too short`;
    }
    if (field?.hasError('min')) {
      return `${fieldName} must be positive`;
    }
    return '';
  }

  getFileName(): string {
    const file = this.lessonForm.get('lessonUrl')?.value;
    if (file instanceof File) {
      return file.name;
    }
    // If editing and there's an existing video URL, show it
    if (
      this.editingLessonId &&
      this.originalLessonData &&
      typeof this.originalLessonData.lessonUrl === 'string'
    ) {
      const url = this.originalLessonData.lessonUrl;
      // Extract filename from URL or show a message
      const fileName = url.split('/').pop() || 'Current video';
      return `Current: ${fileName}`;
    }
    return '';
  }

  removeFile() {
    // If editing, reset to original video URL (string), otherwise set to null
    if (
      this.editingLessonId &&
      this.originalLessonData &&
      typeof this.originalLessonData.lessonUrl === 'string'
    ) {
      this.lessonForm.patchValue({ lessonUrl: this.originalLessonData.lessonUrl });
    } else {
      this.lessonForm.patchValue({ lessonUrl: null });
    }
    // Reset the file input
    const fileInput = document.getElementById('lesson-video') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}
