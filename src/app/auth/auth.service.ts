import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromAppGlobalReducer from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   tokenExpirationTimer: any;
  constructor(private store: Store<fromAppGlobalReducer.ApplicationStateType>) { }

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer =  setTimeout( () => {
        this.store.dispatch(new AuthActions.LogoutAction());
      } , expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
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
