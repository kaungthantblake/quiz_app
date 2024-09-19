import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component,ElementRef,Renderer2, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../service/quiz.service';
import { ApiServicService } from '../service/api.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)'
      })),
      transition('void => in', [
        style({ transform: 'translateX(100%)' }),
        animate(300)
      ]),
      transition('in => void', [
        animate(400, style({ transform: 'translateX(-100%)' }))
      ])
    ]),
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('0.7s ease-in', style({ opacity: 1 }))
      ]),
    ])
  ]
})
export class QuestionsComponent implements OnInit {
  quizById: any = { };
  QuestionList: any[] = [];
  QuestionListId: any = {};

  selectedQuiz: any;
  currentQuestionIndex: number = 0;
  score: number = 0;
  selectedOption: any;
  isQuizCompleted: boolean = false; // New flag to handle quiz completion
  Username: any = {}
  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private quiz : QuizService,
    private renderer: Renderer2,
    private admin:ApiServicService,
    private el: ElementRef

  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const quizId = params['quizId'];
      this.getQuizById(quizId);
      this.getQuestions();
      this.getQuestionById(quizId);
    });
  }
  

  logout(){
    this.admin.logout(); 
  }

  goto(){
    this.router.navigate([`/home`])
  }

  getQuizById(quizId: string) {
    this.quiz.getQuizById(quizId).subscribe({
      next: data => {
        this.quizById = data;
        console.log(`Quiz ${quizId} fetched successfully`, data);
      },
      error: err => console.error('Something went wrong', err)
    });
  }

  getQuestionById(quizId:string){
    this.quiz.getQuestionsById(quizId).subscribe({
      next: data => {
        this.QuestionListId = data;
        console.log('Questions fetched successfully', data);
      },
      error: err => console.error('Something went wrong', err)
    });
  }

  getQuestions() {
    this.quiz.getQuestions().subscribe({
      next: data => {
        this.QuestionList = data;
        console.log('Questions fetched successfully', data);
      },
      error: err => console.error('Something went wrong', err)
    });
  }

  

  selectOption(option: any) {
    this.selectedOption = option;
  }
  
  next() {
    if (this.selectedOption) {
      // Check if the selected option is correct
      if (this.selectedOption.is_correct) {
        this.score++;
      }

      // Move to the next question
      this.currentQuestionIndex++;
      this.selectedOption = null;

      // Check if the quiz has ended
      if (this.currentQuestionIndex >= this.quizById.Questions.length) {
        this.isQuizCompleted = true; // Mark quiz as completed
      }
    }
  
  }
}
