import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ApiServicService } from './service/api.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const nonAdminAuthGuard: CanActivateFn = (route, state) => {
  const apiService = inject(ApiServicService);
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']); // Redirect to login if no token
    return of(false);
  }

  return apiService.getUserProfile().pipe(
    map(user => {
      if (user && !user.admin) {
        return true; // Allow access if user is not an admin
      } else {
        router.navigate(['/admin']); // Redirect to admin page if user is an admin
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/login']); // Redirect to login on error
      return of(false);
    })
  );
};
