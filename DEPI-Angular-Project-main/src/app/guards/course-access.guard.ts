import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { CourseAccessService } from '../services/course-access.service';
import { map } from 'rxjs/operators';

export const courseAccessGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const courseAccessService = inject(CourseAccessService);
  const router = inject(Router);

  // Check if user is logged in
  if (!courseAccessService.isLoggedIn()) {
    router.navigate(['/login'], { 
      queryParams: { returnUrl: route.url.join('/') } 
    });
    return false;
  }

  // Get course ID from route
  const courseId = route.paramMap.get('id');
  if (!courseId) {
    router.navigate(['/courses']);
    return false;
  }

  // Fetch enrollments from backend, then check access
  return courseAccessService.fetchEnrollments().pipe(
    map((enrollments) => {
      // Check if user has purchased the course
      if (!courseAccessService.hasPurchasedCourse(courseId)) {
        router.navigate(['/courses', courseId], {
          queryParams: { message: 'Please purchase this course to access the content' }
        });
        return false;
      }
      return true;
    })
  );
};

