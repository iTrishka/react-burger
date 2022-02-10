import {
    GET_USER_LOGIN, 
    GET_USER_LOGIN_FAILED, 
    GET_USER_LOGIN_SUCCESS, 
    RESET_USER_LOGIN 
} from '../actions/user-login';

const initialState = {
    userLoginRequest1: false,
    userLoginFailed: false,
    userLogin: {}   
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
                      userLogin: action.payload, 
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
        case RESET_USER_LOGIN : {
            return { 
                        ...state, 
                        userLogin:{}
                    };
            }
        default: {
            return state
        }
    }
}
 