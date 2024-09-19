import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServicService } from '../service/api.service';
import { catchError, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-controll',
  templateUrl: './user-control.component.html',
  styleUrls: ['./user-control.component.css']
})
export class UserControlComponent {

  constructor(
    private router:Router,
    private api:ApiServicService
  ){}
  

  users: any[] = [];
  userProfile: any = null;
  errorMessage: string = '';

  
  ngOnInit(): void {
    this.getUsers();
    this.getUserProfile();
  }
  token(){
    const token = localStorage.getItem('token', );
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getUsers(): void {
    this.token();
    console.log('hello' , this.token())
    this.api.getUsers().pipe(
      catchError(err => {
        this.errorMessage = err.error.message;
        return of([]);
      })
    ).subscribe((data: any[]) => {
      this.users = data;
    });
  }

  getUserById(id: any): void {
    this.api.getUserById(id).pipe(
      catchError(err => {
        this.errorMessage = err.error.message;
        return of(null);
      })
    ).subscribe((data: any) => {
      // handle user data here, e.g., display user details in a modal
    });
  }

  updateUser(data: any, id: any): void {
    this.api.updateUser(data, id).pipe(
      catchError(err => {
        this.errorMessage = err.error.message;
        return of(null);
      })
    ).subscribe((response: any) => {
      // handle the update response here, e.g., notify the user
      this.getUsers(); // Refresh user list after update
    });
  }

  deleteUserById(id: any): void {
    this.api.deleteUserById(id).pipe(
      catchError(err => {
        this.errorMessage = err.error.message;
        return of(null);
      })
    ).subscribe((response: any) => {
      // handle the delete response here, e.g., notify the user
      this.getUsers(); // Refresh user list after deletion
    });
  }

  getUserProfile(): void {
    this.api.getUserProfile().pipe(
      catchError(err => {
        this.errorMessage = err.error.message;
        return of(null);
      })
    ).subscribe((profile: any) => {
      this.userProfile = profile;
    });
  }

  logout(): void {
    this.api.logout();
      this.router.navigate(['/login']);
  };

  
}
