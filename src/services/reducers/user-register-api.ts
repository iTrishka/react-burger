import {
    GET_USER_REGISTER_API, 
    GET_USER_REGISTER_API_FAILED, 
    GET_USER_REGISTER_API_SUCCESS } from '../actions/user-register-api';

import {TAuthorization} from '../types/data';
import { TUserRegisterActions } from '../actions/user-register-api';

export interface IUserRegisterInit {
    userRegisterApiRequest: boolean,
    userRegisterApiFailed: boolean,
    userRegisterApi: TAuthorization | {}
}

export const initialState: IUserRegisterInit = {
    userRegisterApiRequest: false,
    userRegisterApiFailed: false,
    userRegisterApi: {}   
}

export const userRegisterApi = (state = initialState, action: TUserRegisterActions): IUserRegisterInit => { 
    switch(action.type) {
        case GET_USER_REGISTER_API: {
            return {
              ...state,
              userRegisterApiRequest: true,
              userRegisterApiFailed: false,
            }
        }
        case GET_USER_REGISTER_API_SUCCESS: {
            return { 
                      ...state, 
                      userRegisterApi: action.payload, 
                      userRegisterApiRequest: false 
                  };
          }
        case GET_USER_REGISTER_API_FAILED: {
        return { 
                    ...state, 
                    userRegisterApiFailed: true, 
                    userRegisterApiRequest: false 
                };
        }
        default: {
            return state
        }
    }
}
 