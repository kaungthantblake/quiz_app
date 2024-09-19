import { Component, OnInit } from '@angular/core';
import { ApiServicService } from '../service/api.service';
import { FormControl } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('0.5s ease-in', style({ opacity: 1 }))
      ]),
    ])
  ]
})
export class LoginComponent implements OnInit {

  data = {
    email: '',
    password: ''
  };
  isPasswordVisible = false;
  passwordControl = new FormControl('');
  loginError: string | null = null; // Property to hold error message

  constructor(
    private api: ApiServicService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.api.login(this.data).subscribe({
      next: (res) => {
        console.log('Login successful', res);
        localStorage.setItem('token', res.token); // Save token to local storage
        if(res.token){
          this.router.navigate(['/admin']); // Redirect to admin page or other page
        }
        this.loginError = null; // Clear error on success
      },
      error: (err) => {
        console.error('Login error', err);
        this.loginError = 'Invalid email or password. Please try again.'; // Set error message
      }
    });
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
