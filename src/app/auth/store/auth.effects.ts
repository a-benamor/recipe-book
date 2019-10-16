import {Actions, Effect, ofType} from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {SignupStartAction} from './auth.actions';
import {UserModel} from '../user.model';
import {AuthResponseData, AuthService} from '../auth.service';

@Injectable()
export class AuthEffects {

   handleAuthentication = (expiresIn: string, email: string, localId: string, idToken: string ) => {
    const userExpireToken = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new UserModel(email, localId, idToken, userExpireToken);
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.AuthenticateSuccessAction({
      email: user.email,
      id: user.id,
      token: user.token,
      tokenExpirationDate: userExpireToken
    });
  }
   handleError = (responseError: HttpErrorResponse) => {
    let customResponseError = 'An error was occured';
    if (!responseError.error || !responseError.error.error) {
      return of(new AuthActions.AuthenticateFailAction(customResponseError));
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
    return of(new AuthActions.AuthenticateFailAction(customResponseError));
  }

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((authData: SignupStartAction) => {
      return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fireBaseApiKey, {
        email: authData.payload.email,
        password: authData.payload.password,
        returnSecureToken: true,
      }).pipe(
        tap((authData: AuthResponseData) => {
          this.authService.setLogoutTimer(+authData.expiresIn * 1000);
        }),
        map((respData: AuthResponseData) => {
          return this.handleAuthentication(respData.expiresIn, respData.email, respData.localId, respData.idToken);
        }),
        catchError((responseError: HttpErrorResponse) => {
          return this.handleError(responseError);
        })
      );
    })
  );

  @Effect()
   authLogin = this.actions$.pipe(
     ofType(AuthActions.LOGIN_START),
     switchMap((authData: AuthActions.LoginStartAction) => {
       return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseApiKey, {
         email: authData.payload.email,
         password: authData.payload.password,
         returnSecureToken: true
       }).pipe(
         tap((authData: AuthResponseData) => {
           this.authService.setLogoutTimer(+authData.expiresIn * 1000);
         }),
         map( (respData: AuthResponseData) => {
          return this.handleAuthentication(respData.expiresIn, respData.email, respData.localId, respData.idToken);
         }),
         catchError((responseError: HttpErrorResponse) => {
           return this.handleError(responseError);
         }),
        );
     })
   );
  @Effect({dispatch: false})
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT ),
    tap((action: AuthActions.AuthenticateSuccessAction | AuthActions.LogoutAction) => {
      switch ( action.type) {
        case AuthActions.AUTHENTICATE_SUCCESS: {
          this.router.navigate(['/recipes']);
          break;
        }
        case AuthActions.LOGOUT: {
          this.router.navigate(['/auth']);
          break;
        }
      }
    }),
  );

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      this.authService.clearLogoutTimer();
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string,
        id: string,
        _token: string,
        _tokenExpirationDate: string
      } = JSON.parse(localStorage.getItem('userData')) ;
      if (!userData) {
        return {type: 'default'};
      }
      const userAuthTokenExpirationDate = new Date(userData._tokenExpirationDate);
      const userLoaded = new UserModel(userData.email, userData.id, userData._token, userAuthTokenExpirationDate);
      if (userLoaded.token) {
        const expireTime = userAuthTokenExpirationDate.getTime() - new Date().getTime();
        this.authService.setLogoutTimer(expireTime);
        return new AuthActions.AuthenticateSuccessAction({
          email: userLoaded.email,
          id: userLoaded.id,
          token: userLoaded.token,
          tokenExpirationDate: userLoaded.tokenExpirationDate,
        });
    }
      return {type: 'default'} ;
    })
  )

  constructor(private actions$: Actions, private httpClient: HttpClient,
              private router: Router, private authService: AuthService) {}
}
