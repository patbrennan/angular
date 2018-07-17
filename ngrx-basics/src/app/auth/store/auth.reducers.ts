import * as Auth from './auth.actions';

export interface State {
  token: string;
  authenticated: boolean;
}

const initialState: State = {
  token: null,
  authenticated: false
};

export function authReducer(state = initialState, action: Auth.Actions) {

  switch(action.type) {
    case Auth.SIGNUP:
    case Auth.SIGNIN:
      return {
        ...state,
        authenticated: true
      };

    case Auth.LOGOUT:
      return {
        ...state,
        token: null,
        authenticated: false
      };

    case Auth.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };

    default:
      return state;
  }
}
