import { Component, OnInit } from '@angular/core';
import { QuizService } from '../service/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit{
  quizzes: any;


  constructor(private api: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.getQuizzes();
  }

  getQuizzes() {
    this.api.getQuiz().subscribe({
      next: (data) => {
        this.quizzes = data;
        console.log('Quizzes fetched successfully', data);
      },
      error: (err) => {
        console.error('Something went wrong', err);
      }
    });
  }

  selectQuiz(quizId: string) {
    this.router.navigate(['/questions', quizId]); // Navigate to the questions component with the quizId
  }
  
}
