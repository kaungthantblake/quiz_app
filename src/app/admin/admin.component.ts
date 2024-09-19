import { AppRoutingModule } from './../app-routing.module';

import { Component, OnInit } from '@angular/core';
import { QuizService } from '../service/quiz.service';
import { Router } from '@angular/router';
import { ApiServicService } from '../service/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  quizzes: any = {
    title: "",
    description: ""
  }; // Changed to array of quizzes
  Quiz = {
    title: "",
    description: ""
  };
  Id: any[] = [];
  questions = {
    question_text: '',
    options: [{ option_text: '', is_correct: false }]
  };
  QuestionList: any[] = [];
  quizId: string | undefined;
  questionsId: string | undefined;
  DQuestionsId: number | undefined;
  currentQuestionIndex = 0;
  message: string = '';


  constructor(
    private quizService: QuizService,
    private api: ApiServicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getQuiz();
    this.getQuestions();
  }

  LogOut(){
    this.api.logout();
    this.router.navigate(['home'])
  }

  addTitle(): void {
    this.quizService.postQuiz(this.Quiz).subscribe({
      next: (res) => {
        console.log("Quiz created successfully", res);
        this.getQuiz(); // Refresh the list after adding
      },
      error: (err) => {
        console.error("Error creating quiz", err);
      }
    });
  }

  getQuiz(): void {
    this.quizService.getQuiz().subscribe({
      next: (res: any) => {
        this.quizzes = res;
      },
      error: (err) => {
        console.error("Error fetching quizzes", err);
      }
    });
  }

  deleteQuiz(id: string): void {
    if (id) {
      this.quizService.deleteQuizById(id).subscribe({
        next: () => {
          console.log('Quiz deleted successfully with id:', id);
          this.getQuiz(); // Refresh the list after deletion
        },
        error: (err) => {
          console.error("Error deleting quiz", err);
        }
      });
    } else {
      console.error('Quiz ID is undefined');
    }
  }

  addOption(): void {
    if (this.questions.options.length < 4) {
      this.questions.options.push({ option_text: '', is_correct: false });
    } else {
      this.message = "Maximum of 4 options can be added.";
      console.log(this.message);
      setTimeout(() => {
        this.message = '';
      }, 3000);
    }
  }
  
  removeOption(index: number): void {
    if (this.questions.options.length > 1) {
      this.questions.options.splice(index, 1);
    }
  }

  postQuestions(): void {
    if (this.quizId) {
      this.quizService.postQuestion(this.questions, this.quizId).subscribe({
        next: () => {
          console.log('Questions posted successfully');
          this.getQuestions(); 
        },
        error: (err) => {
          console.error("Error posting questions", err);
        }
      });
    } else {
      console.error('Quiz ID is undefined');
    }
  }

  getQuestions(): void {
    this.quizService.getQuestions().subscribe({
      next: (data) => {
        this.QuestionList = data;
        console.log('Questions fetched successfully', data);
      },
      error: (err) => {
        console.error('Error fetching questions', err);
      }
    });
  }

  updateQuestions(): void {
    if (this.questionsId) {
      this.quizService.updateQuestions(this.questions, this.questionsId).subscribe({
        next: () => {
          console.log('Questions updated successfully');
          this.getQuestions(); 
        },
        error: (err) => {
          console.error("Error updating questions", err);
        }
      });
    } else {
      console.error('Question ID is undefined');
    }
  }

  deleteQuestions(id:string): void {
    if (id) {
      this.quizService.deleteQuestionById(id).subscribe({
        next: () => {
          console.log('Questions deleted successfully');
          this.getQuestions(); 
        },
        error: (err) => {
          console.error("Error deleting questions", err);
        }
      });
    } else {
      console.error('Delete Question ID is undefined');
    }
  }
}
