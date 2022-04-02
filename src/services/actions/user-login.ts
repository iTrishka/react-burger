import { API_URL } from '../../utils/constants';
import checkResponse from '../checkResponse';
import { saveStateInLocalstorage } from '../../components/localstorage';
import { addUserInfo } from './user-info'
import { Dispatch } from 'redux';

export const GET_USER_LOGIN: 'GET_USER_LOGIN' = 'GET_USER_LOGIN';
export const GET_USER_LOGIN_FAILED: 'GET_USER_LOGIN_FAILED' = 'GET_USER_LOGIN_FAILED';
export const GET_USER_LOGIN_SUCCESS: 'GET_USER_LOGIN_SUCCESS' = 'GET_USER_LOGIN_SUCCESS';

export interface IGetUserLogin{
  readonly type: typeof GET_USER_LOGIN;
}
export interface IGetUserLoginFailed{
  readonly type: typeof GET_USER_LOGIN_FAILED;
}
export interface IGetUserLoginSuccess{
  readonly type: typeof GET_USER_LOGIN_SUCCESS;
}

export type TUserLoginActions = 
    IGetUserLogin|
    IGetUserLoginFailed |
    IGetUserLoginSuccess |
    any;


function getUserLogin() {
    return {
      type: GET_USER_LOGIN
    }
}

function getUserLoginFailed() {
    return {
      type: GET_USER_LOGIN_FAILED,
    }
}

function getUserLoginSuccess() {
    return {
      type: GET_USER_LOGIN_SUCCESS,
    }
}

function userLoginRequest(endpoint:string, body:any) {
  return function(dispatch:Dispatch) {
    dispatch(getUserLogin())
    fetch(`${API_URL}${endpoint}`, {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(body)
    })
      .then(checkResponse)
      .then( res => {
        if (res && res.success) {
          let authToken;
          let refreshToken;
          if(res.accessToken){
          authToken = res.accessToken.split('Bearer ')[1];
          refreshToken = res.refreshToken
          }
          if(authToken){
            saveStateInLocalstorage('token', authToken);
            saveStateInLocalstorage('refreshToken', refreshToken);
            //setCookie('token', authToken);
            //setCookie('refreshToken', refreshToken);
            dispatch(addUserInfo(res.user))
          }
          
    } else {
        dispatch(getUserLoginFailed())
    }
}).catch( err => {
    dispatch(getUserLoginFailed())
})
}
} 




export {
    getUserLogin,
    getUserLoginFailed,
    getUserLoginSuccess, 
    userLoginRequest
}