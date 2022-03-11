import {
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_REQUEST_FAILED, 
    USER_LOGOUT_REQUEST_SUCCESS, 
} from '../actions/user-logout';
import {ITypeAction} from '../types/data';

export interface IUserLogout {
    userLogoutRequest: boolean,
    userLogoutRequestFailed: boolean,
}


const initialState:IUserLogout = {
    userLogoutRequest: false,
    userLogoutRequestFailed: false,
}

export const userLogout = (state:IUserLogout = initialState, action: ITypeAction<`USER_LOGOUT_REQUEST` | `USER_LOGOUT_REQUEST_FAILED` | `USER_LOGOUT_REQUEST_SUCCESS`>) => { 
    switch(action.type) {
        case USER_LOGOUT_REQUEST: {
            return {
              ...state,
              userLogoutRequest: true,
              userLogoutRequestFailed: false,
            }
        }
        case USER_LOGOUT_REQUEST_SUCCESS: {
            return { 
                      ...state, 
                      userLogoutRequestFailed: false 
                  };
          }
        case USER_LOGOUT_REQUEST_FAILED: {
        return { 
                    ...state, 
                    userLogoutRequestFailed: true, 
                    userLogoutRequest: false 
                };
        }
        default: {
            return state
        }
    }
}
 