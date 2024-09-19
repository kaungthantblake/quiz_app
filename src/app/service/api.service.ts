import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServicService {
  private apiUrlUser = 'http://localhost:3000/api/users';
  private token: string | null = null; // Variable to store token

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      Accept: 'text/html,application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError('Something bad happened; please try again later.');
  }

  register(data: { email: string, username: string, password: string, admin: boolean }) {
    return this.http.post<any>(`${this.apiUrlUser}/register`, data).pipe(
      tap(response => {
        this.token = response.token; // Save token in service
        localStorage.setItem('token', this.token || '');
        console.log(this.token, 'login successful') // Handle null case with empty string
      }),
      catchError(this.handleError)
    );
  }

  login(data: { email: string, password: string }) {
    return this.http.post<any>(`${this.apiUrlUser}/login`, data).pipe(
      tap(response => {
        this.token = response.token; // Save token in service
        localStorage.setItem('token', this.token || '',);
        console.log(this.token, 'login successful') // Handle null case with empty string
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    // Retrieve token from service or localStorage if needed
    return this.token || localStorage.getItem('token');
  }

  getUsers() {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrlUser}/getUsers`,{headers} ).pipe(
      catchError(this.handleError)
    );
  }

  getUserById(id: any) {
    const headers = this.getHeaders();

    return this.http.get(`${this.apiUrlUser}/users/${id}`, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(data: any[], id: any) {
    const headers = this.getHeaders();
    return this.http.put(`${this.apiUrlUser}/updateUser/${id}`, data, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  deleteUserById(id: any) {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrlUser}/deleteUser/${id}`, {headers}).pipe(
      catchError(this.handleError)
    );
  }
  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<any>(`${this.apiUrlUser}/profile`, { headers });
  }
}