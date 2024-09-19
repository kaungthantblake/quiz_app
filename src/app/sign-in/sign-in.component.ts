import { Component, OnInit } from '@angular/core';
import { ApiServicService } from '../service/api.service';
import { FormControl } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('0.5s ease-in', style({ opacity: 1 }))
      ]),
    ]),
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)'
      })),
      transition('void => in', [
        style({ transform: 'translateX(100%)' }),
        animate(300)
      ]),
      transition('in => void', [
        animate(300, style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ],
  
})
export class SignInComponent implements OnInit {
  
  data = {
    username: '',
    email: '',
    password: '',
    admin: false // You can default it to false or leave it as is for user input
  };
  isPopupActive = false;
  isPasswordVisible = false;
  passwordControl = new FormControl('');
  ngOnInit(): void {}

  constructor(
    private api: ApiServicService,
    private router: Router,
  ) {}

  register() {
    this.api.register(this.data).subscribe({
      next: (res) => {
        console.log('Registered successfully', res);
        localStorage.setItem('token', res.token); // Save token to local storage
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log('Error', err);
      }
    });
  }
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
 
}
