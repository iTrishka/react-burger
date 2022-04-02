import { API_URL } from '../../utils/constants';
import checkResponse from '../checkResponse';
import { saveStateInLocalstorage } from '../../components/localstorage';
import { Dispatch } from 'redux';
import {
  resetUserInfo
} from './user-info'

export const USER_LOGOUT_REQUEST: 'USER_LOGOUT_REQUEST' = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_REQUEST_FAILED: 'USER_LOGOUT_REQUEST_FAILED' = 'USER_LOGOUT_REQUEST_FAILED';
export const USER_LOGOUT_REQUEST_SUCCESS: 'USER_LOGOUT_REQUEST_SUCCESS'= 'USER_LOGOUT_REQUEST_SUCCESS';


export interface IUserLogoutRequest{
  readonly type: typeof USER_LOGOUT_REQUEST;
}
export interface IUserLogoutFailed{
  readonly type: typeof USER_LOGOUT_REQUEST_FAILED;
}
export interface IUserLogoutSuccess{
  readonly type: typeof USER_LOGOUT_REQUEST_SUCCESS;
}

export type TUserLogoutActions = 
    IUserLogoutRequest |
    IUserLogoutFailed |
    IUserLogoutFailed |
    any;

function userLogoutRequest() {
    return {
      type: USER_LOGOUT_REQUEST,
    }
}

function userLogoutFailed() {
    return {
      type: USER_LOGOUT_REQUEST_FAILED,
    }
}

function userLogoutSuccess() {
    return {
      type: USER_LOGOUT_REQUEST_SUCCESS,
    }
}



function userLogoutRequestApi(refreshToken: {[key:string]: string}) {
  return function(dispatch: Dispatch) {
    dispatch(userLogoutRequest())
    fetch(`${API_URL}auth/logout `, {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(refreshToken)
    })
      .then(checkResponse)
      .then( res => {
        if (res && res.success) {
          if (res && res.success) {
            saveStateInLocalstorage('token', "");
            saveStateInLocalstorage('refreshToken', "");
            dispatch(userLogoutSuccess())
            dispatch(resetUserInfo()) 
            return res                
          } else {
              throw res.err
  
          }
    } else {
        dispatch(userLogoutFailed())
        return res
    }
}).catch( err => {
    dispatch(userLogoutFailed())
    return err
})
}
} 



export {
    userLogoutRequest,
    userLogoutFailed,
    userLogoutSuccess, 
    userLogoutRequestApi
}