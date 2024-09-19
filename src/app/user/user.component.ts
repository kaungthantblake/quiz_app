import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServicService } from '../service/api.service';
import { catchError, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  ngOnInit(): void {
    this.getUserProfile();
  }

  constructor(
    private router:Router,
    private api:ApiServicService
  ){}
  

  isCartOpen = false;
  users: any[] = [];
  userProfile: any = null;
  errorMessage: string = '';

  token(){
    const token = localStorage.getItem('token', );
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  getUserProfile(): void {
    this.api.getUserProfile().pipe(
      catchError(err => {
        this.errorMessage = err.error.message;
        return of(null);
      })
    ).subscribe((profile: any) => {
      this.userProfile = profile;
      console.log(this.userProfile, profile)
    });
  }

  logout(): void {
    this.api.logout();
      this.router.navigate(['/login']);
  };


}
