import {
    GET_USER_LOGIN, 
    GET_USER_LOGIN_FAILED, 
    GET_USER_LOGIN_SUCCESS, 
} from '../actions/user-login';

const initialState = {
    userLoginRequest1: false,
    userLoginFailed: false,  
}

export const userLogin = (state = initialState, action) => { 
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
 