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
    case AuthActions.AUTHENTICATE_SUCCESS: {
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
    case AuthActions.AUTHENTICATE_FAIL: {
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };
    }
    case AuthActions.SIGNUP_START: {
      return {
        ...state,
        authError: null,
        loading: true,
      };
    }
    case AuthActions.CLEAR_ERROR: {
      return {
        ...state,
        authError: null,
      };
    }
    default: {
      return {...state} ;
    }

  }
}
