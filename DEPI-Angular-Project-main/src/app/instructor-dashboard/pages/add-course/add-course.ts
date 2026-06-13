import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './add-course.html',
  styleUrl: './add-course.css'
})
export class AddCourse {
  courseForm: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private router: Router
  ) {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      level: ['beginner', Validators.required],
      thumbnail: [null],
      status: ['draft', Validators.required]
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.courseForm.patchValue({ thumbnail: file });
    }
  }

  onSubmit() {
    if (this.courseForm.valid) {
      this.submitting = true;
      const formValue = this.courseForm.value;
      
      // Prepare course data for backend
      const courseData = {
        title: formValue.title,
        description: formValue.description,
        category: formValue.category,
        price: formValue.price,
        status: formValue.status === 'published' ? 'published' : 'draft',
        thumbnail: formValue.thumbnail,
      };

      this.coursesService.create(courseData).subscribe({
        next: () => {
          this.router.navigate(['/instructor/my-courses']);
        },
        error: (error) => {
          this.submitting = false;
          console.error('Error creating course:', error);
          alert(error?.error?.message || 'Error creating course. Please try again.');
        }
      });
    } else {
      Object.keys(this.courseForm.controls).forEach(key => {
        this.courseForm.get(key)?.markAsTouched();
      });
    }
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
}

