import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders,  } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService implements OnInit{
  private apiUrl = 'http://localhost:3000/api/quizzes';

  private getHeaders(): HttpHeaders {
    // const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      Accept: 'text/html,application/json',
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
    });
  }

  constructor(
    private http:HttpClient
  ) { }
  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError('Something bad happened; please try again later.');
  }
  ngOnInit(): void {
      
  }


  postQuiz(data: any):Observable<any>{
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/createQuiz`, data).pipe(
      catchError(this.handleError)
    )
  };
  getQuiz():Observable<any>{
    return this.http.get(`${this.apiUrl}/getQuizzes`).pipe(
      catchError(this.handleError)
    )
  };

  getQuizById(id:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/getQuiz/${id}`).pipe(
      catchError(this.handleError)
    )
  };

  deleteQuizById(id:any):Observable<any>{
    return this.http.delete(`${this.apiUrl}/deleteQuiz/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  postQuestion(data:any, id:string):Observable<any>{
    return this.http.post(`${this.apiUrl}/${id}/questions`, data).pipe(
      catchError(this.handleError)
    )
  };

  getQuestions():Observable<any>{
    return this.http.get(`${this.apiUrl}/questions`).pipe(
      catchError(this.handleError)
    )
  };

  getQuestionsById(id:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/questions/${id}`).pipe(
      catchError(this.handleError)
    )
  };

  updateQuestions(data:any, id:string):Observable<any>{
    return this.http.put(`${this.apiUrl}/questions/${id}`, data).pipe(
      catchError(this.handleError)
    )
  };

  deleteQuestionById(id:any):Observable<any>{
    return this.http.delete(`${this.apiUrl}/questions/${id}`).pipe(
      catchError(this.handleError)
    )
  };
}
