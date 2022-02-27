import {
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_REQUEST_FAILED, 
    USER_LOGOUT_REQUEST_SUCCESS, 
} from '../actions/user-logout';

const initialState = {
    userLogoutRequest: false,
    userLogoutRequestFailed: false,
}

export const userLogout = (state = initialState, action) => { 
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
 