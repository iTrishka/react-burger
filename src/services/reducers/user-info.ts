import {
    GET_USER_INFO, 
    ADD_USER_INFO,
    USER_INFO_REQUEST_FAILED,
    USER_INFO_REQUEST_SUCCESS,
    RESET_USER_INFO,
    USER_INFO_STATUS
} from '../actions/user-info';
import { IUserInfo } from '../types/data';
import { TUserActions } from '../actions/user-info';



export interface IUserInfoInitial {
    userInfoRequest: boolean;
    userInfoRequestFailed: boolean;
    userInfoStatus: string;
    userInfo: IUserInfo
}

const initialState: IUserInfoInitial = {
    userInfoRequest: false,
    userInfoRequestFailed: false,
    userInfoStatus: "",
    userInfo: {
        name: "",
        email: ""
    }   
}

export const userInfo = (state:IUserInfoInitial = initialState, action: TUserActions):IUserInfoInitial => { 
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
                      userInfoRequest: false,
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
                        userInfo: {
                            name: "",
                            email: ""
                        } 
                    };
            }
        
        case USER_INFO_STATUS: {
            return { 
                    ...state, 
                    userInfoStatus: action.payload
                    };
            }
        default: {
            return state
        }
    }
}
 