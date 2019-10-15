import {Actions, Effect, ofType} from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {AuthResponseData} from '../auth.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {of, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
   authLogin = this.actions$.pipe(
     ofType(AuthActions.LOGIN_START),
     switchMap((authData: AuthActions.LoginStartAction) => {
       return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseApiKey, {
         email: authData.payload.email,
         password: authData.payload.password,
         returnSecureToken: true
       }).pipe(map( (respData: AuthResponseData) => {
           // Execute some logic
           // return an observable with no error is crucial
           const userExpireToken = new Date(new Date().getTime() + +respData.expiresIn * 1000);
           return new AuthActions.LoginAction({
             email: respData.email,
             id: respData.localId,
             token: respData.idToken,
             tokenExpirationDate: userExpireToken
           });
         }),
         catchError((responseError: HttpErrorResponse) => {
         // the logic to handle error
         // return an observable with non error is crucial.
           let customResponseError = 'An error was occured';
           if (!responseError.error || !responseError.error.error) {
             return of(new AuthActions.LoginFailAction(customResponseError));
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
           return of(new AuthActions.LoginFailAction(customResponseError));
         }),
        );
     })
   );
  @Effect({dispatch: false})
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap(() => {
      this.router.navigate(['/recipes']);
    }),
  );

  constructor(private actions$: Actions, private httpClient: HttpClient,
              private router: Router) {}
}
