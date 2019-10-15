import {UserModel} from '../user.model';
import * as AuthActions from './auth.actions';

export interface AuthStateType {
  user: UserModel;
  authError: string;
  loading: boolean;
}

const initialState: AuthStateType = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(state = initialState, action: AuthActions.AuthActionsType) {
  switch (action.type) {
    case AuthActions.LOGIN: {
      const userAuth = new UserModel(action.payload.email, action.payload.id,
        action.payload.token, action.payload.tokenExpirationDate);
      return {
        ...state,
        authError: null,
        user: userAuth,
        loading: false,
      };
    }
    case AuthActions.LOGOUT: {
      return {
        ...state,
        user: null,
      };
    }
    case AuthActions.LOGIN_START: {
      return {
        ...state,
        authError: null,
        loading: true,
      };
    }
    case AuthActions.LOGIN_FAIL: {
      console.log(action.payload);
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };
    }
    default: {
      return {...state} ;
    }

  }
}
