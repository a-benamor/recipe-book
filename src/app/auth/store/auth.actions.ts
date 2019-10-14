import {Action} from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export type AuthActionsType = LoginAction | LogoutAction ;

export class LoginAction implements Action {
  readonly type = LOGIN;
  constructor( public payload: {
    email: string,
    id: string,
    token: string,
    tokenExpirationDate: Date
  }) {}
}

export class LogoutAction implements Action {
  readonly type = LOGOUT;
}
