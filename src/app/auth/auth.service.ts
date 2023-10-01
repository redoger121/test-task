import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _token: string | null = null;


  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http
      .post<{ token: string }>('https://reqres.in/api/login', {
        email: email,
        password: password,
      })
      .pipe(
        catchError((errorRes) => {
          console.log(errorRes);
          const err = new Error('An unknown error');
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(() => err);
          }

          switch (errorRes.error.error) {
            case 'user not found':
              err.message = 'User not found';
          }

          return throwError(() => err.message);
        }),
        tap(({ token }) => {
          this._token = token;
          localStorage.setItem('token', JSON.stringify(token));
        })
      );
  }

  signup(email: string, password: string) {
    return this.http
      .post<{ id: number; token: string }>('https://reqres.in/api/register', {
        email: email,
        password: password,
      })
      .pipe(
        catchError((errorRes) => {
          console.log(errorRes);
          const err = new Error('An unknown error');
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(() => err);
          }

          switch (errorRes.error.error) {
            case 'Note: Only defined users succeed registration':
              err.message = 'Only defined users succeed registration';
          }

          return throwError(() => err.message);
        }),
        tap(({ token }) => {
          this._token = token;
          localStorage.setItem('token', JSON.stringify(token));
        })
      );
  }

  get isAuthenticate() {
    return !!this._token;
   
  }

  getUserToken() {
    return this._token;
  }
  autoLogin() {
    const token: string = JSON.parse(localStorage.getItem('token')!);
    this._token = token;
  }

  logout() {
    this._token = null;
    this.router.navigate(['/auth']);
    localStorage.removeItem('token');
  }
}
