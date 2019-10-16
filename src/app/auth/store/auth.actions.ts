import {Action} from '@ngrx/store';

export const LOGIN_START = '[Auth] Login start';
export const AUTHENTICATE_SUCCESS = '[Auth] Autheticate success';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate fail';
export const SIGNUP_START = '[Auth] Sign up start'
export const LOGOUT = '[Auth] Logout';
export const CLEAR_ERROR = '[Auth] Clear error';
export const AUTO_LOGIN = '[Auth] Auto login';

export type AuthActionsType = AuthenticateSuccessAction | LogoutAction | LoginStartAction
  | AuthenticateFailAction | SignupStartAction | ClearErrorAction | AutoLoginAction ;

export class AuthenticateSuccessAction implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
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

export class AuthenticateFailAction implements Action {
  readonly type = AUTHENTICATE_FAIL;
  constructor( public payload: string) {}
}

export class SignupStartAction implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload: {email: string, password: string}) {}
}

export class ClearErrorAction implements Action {
  readonly type = CLEAR_ERROR;
}

export class AutoLoginAction implements Action {
  readonly type = AUTO_LOGIN;
}
