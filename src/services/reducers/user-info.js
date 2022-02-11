import {
    GET_USER_INFO, 
    ADD_USER_INFO,
    USER_INFO_REQUEST_FAILED,
    USER_INFO_REQUEST_SUCCESS,
    RESET_USER_INFO
} from '../actions/user-info';

const initialState = {
    userInfoRequest: false,
    userInfoRequestFailed: false,
    userInfo: {}   
}

export const userInfo = (state = initialState, action) => { 
    switch(action.type) {
        case ADD_USER_INFO: {
            return {
              ...state,
              userInfo: action.payload
            }
        }
        case GET_USER_INFO: {
            return {
              ...state,
              userInfoRequest: true,
              userInfoRequestFailed: false,
            }
        }
        case USER_INFO_REQUEST_SUCCESS: {
            return { 
                      ...state, 
                      userInfo: action.payload, 
                      userInfoRequestFailed: false 
                  };
          }
        case USER_INFO_REQUEST_FAILED: {
        return { 
                    ...state, 
                    userInfoRequestFailed: true, 
                    userInfoRequest: false 
                };
        }
        case RESET_USER_INFO : {
            return { 
                        ...state, 
                        userInfo:{}
                    };
            }
        default: {
            return state
        }
    }
}
 