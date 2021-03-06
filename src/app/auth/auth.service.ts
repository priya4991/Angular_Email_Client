import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SignupCredentials, SignedinResponse, SigninCredentials } from './auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://api.angular-email.com/auth';
  username = '';

  //community convention to add $ at the end of an observable
  signedin$: any = new BehaviorSubject(null); //can assign a initial value to BehaviorSubject

  constructor(private http: HttpClient) { }

  validateusername(username: string) {
    return this.http.post<{ available: boolean }>(this.apiUrl + '/username', {
      username
    });
  }

  signup(credentials: SignupCredentials) {
    //interceptor is setting withCredentials
    return this.http.post<{ username: string }>(this.apiUrl + '/signup', credentials)
      .pipe(
        //error coming out of the observable will skip over the tap operator
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
    );
  }

  checkAuth() {
    //interceptor is setting withCredentials
    return this.http.get<SignedinResponse>(this.apiUrl + '/signedin')
      .pipe(
        tap(({ authenticated, username }) => {
            this.signedin$.next(authenticated);
            this.username = username;
        })
      );
  }

  signout() {
    return this.http.post<any>(this.apiUrl + '/signout', {})
    .pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    );
  }

  signin(credentials: SigninCredentials) {
    return this.http.post<{ username: string }>(this.apiUrl + '/signin', credentials)
    .pipe(
      tap(({ username }) => {
        this.signedin$.next(true);
        this.username = username;
      })
    );
  }
}
