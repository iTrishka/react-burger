import {
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_REQUEST_FAILED, 
    USER_LOGOUT_REQUEST_SUCCESS, 
} from '../actions/user-logout';
import { TUserLogoutActions } from '../actions/user-logout';

export interface IUserLogoutInit {
    userLogoutRequest: boolean,
    userLogoutRequestFailed: boolean,
}


export const initialState:IUserLogoutInit = {
    userLogoutRequest: false,
    userLogoutRequestFailed: false,
}

export const userLogout = (state:IUserLogoutInit = initialState, action: TUserLogoutActions): IUserLogoutInit => { 
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
                      userLogoutRequest: false,
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
 