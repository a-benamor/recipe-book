import {Action} from '@ngrx/store';

export const LOGIN_START = '[Auth] Login start';
export const LOGIN = '[Auth] Login';
export const LOGIN_FAIL = '[Auth] Login fail';
export const LOGOUT = '[Auth] Logout';

export type AuthActionsType = LoginAction | LogoutAction | LoginStartAction | LoginFailAction ;

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

export class LoginStartAction implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: {email: string, password: string}) {}
}

export class LoginFailAction implements Action {
  readonly type = LOGIN_FAIL;
  constructor( public payload: string) {}
}
