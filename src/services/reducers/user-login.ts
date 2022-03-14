import {
    GET_USER_LOGIN, 
    GET_USER_LOGIN_FAILED, 
    GET_USER_LOGIN_SUCCESS, 
} from '../actions/user-login';
import {ITypeAction} from '../types/data';

export interface IUserLogin {
    userLoginRequest1: boolean,
    userLoginFailed: boolean,
}

const initialState:IUserLogin = {
    userLoginRequest1: false,
    userLoginFailed: false,  
}

export const userLogin = (state:IUserLogin = initialState, action: ITypeAction<`GET_USER_LOGIN` | `GET_USER_LOGIN_FAILED` | `GET_USER_LOGIN_SUCCESS`>) => { 
    switch(action.type) {
        case GET_USER_LOGIN: {
            return {
              ...state,
              userLoginRequest1: true,
              userLoginFailed: false,
            }
        }
        case GET_USER_LOGIN_SUCCESS: {
            return { 
                      ...state, 
                      userLoginFailed: false 
                  };
          }
        case GET_USER_LOGIN_FAILED: {
        return { 
                    ...state, 
                    userLoginFailed: true, 
                    userLoginRequest1: false 
                };
        }
        default: {
            return state
        }
    }
}
 