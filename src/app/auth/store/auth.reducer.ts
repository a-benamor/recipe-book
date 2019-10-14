import {UserModel} from '../user.model';
import * as AuthActions from './auth.actions';

export interface AuthStateType {
  user: UserModel;
}

const initialState: AuthStateType = {
  user: null,
};

export function authReducer(state = initialState, action: AuthActions.AuthActionsType) {
  switch (action.type) {
    case AuthActions.LOGIN: {
      const userAuth = new UserModel(action.payload.email, action.payload.id,
        action.payload.token, action.payload.tokenExpirationDate);
      return {
        ...state,
        user: userAuth,
      };
    }
    case AuthActions.LOGOUT: {
      return {
        ...state,
        user: null,
      };
    }
    default: {
      return state ;
    }

  }
}
