import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiServicService } from './service/api.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private apiService: ApiServicService, private router: Router) {}

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    if (!token) {
      this.router.navigate(['/login']); // Redirect to login if no token
      return of(false);
    }

    return this.apiService.getUserProfile().pipe(
      map(user => {
        if (user && user.admin) {
          return true; // Allow access if user is admin
        } else {
          this.router.navigate(['/home']); // Redirect to home or other page
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']); // Redirect to login on error
        return of(false);
      })
    );
  }
}
