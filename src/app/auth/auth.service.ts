import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {UserModel} from './user.model';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   user = new BehaviorSubject<UserModel>(null);
   token: string;
   tokenExpirationTimer: any;
  constructor(private httpClient: HttpClient, private route: Router) { }

  signup(email: string, password: string) {
    const ENDPOINT_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fireBaseApiKey;
    return this.httpClient.post<AuthResponseData>(ENDPOINT_URL, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(
      (response) => {
       this.handleAuthentification(response.email, response.localId, response.idToken, response.expiresIn);
      }
    ));
  }

  signIn(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseApiKey, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(response => {
      this.handleAuthentification(response.email, response.localId, response.idToken, response.expiresIn);
    }));
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    // localStorage.clear();
    this.route.navigate(['auth']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData')) ;
    if (!userData) {
      return ;
    }
    const userAuthTokenExpirationDate = new Date(userData._tokenExpirationDate);
    const userLoaded = new UserModel(userData.email, userData.id, userData._token, userAuthTokenExpirationDate);
    if (userLoaded.token) {
      const expireTime = userAuthTokenExpirationDate.getTime() - new Date().getTime();
      this.user.next(userLoaded);
      this.autoLogout(expireTime);
    }

  }

  autoLogout(expirationDuration: number) {
    console.log('the expiration duration : ' + expirationDuration);
    this.tokenExpirationTimer =  setTimeout( () => {
        this.logout();
      } , expirationDuration);
  }

  handleAuthentification(email: string, localId: string, token: string, expiresIn: string) {
    const userExpireToken = new Date(new Date().getTime() + +expiresIn * 1000);
    const userResponse = new UserModel(email, localId, token, userExpireToken);
    this.user.next(userResponse);
    this.autoLogout((+expiresIn) * 1000);
    localStorage.setItem('userData', JSON.stringify(userResponse));
    this.token = token;

  }

  private handleError(responseError: HttpErrorResponse) {
    let customResponseError = 'An error was occured';
    if (!responseError.error || !responseError.error.error) {
      return throwError(customResponseError);
    }
    switch (responseError.error.error.message) {
      case 'EMAIL_EXISTS': {
        customResponseError = 'The email address is already in use by another account';
        break;
    }
      case 'EMAIL_NOT_FOUND': {
        customResponseError = 'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      }
      case 'INVALID_PASSWORD': {
        customResponseError = 'The password is invalid or the user does not have a password';
        break;
      }
      case 'USER_DISABLED': {
        customResponseError = 'The user account has been disabled by an administrator.';
        break;
      }
    }
    return throwError(customResponseError);
  }

}

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

