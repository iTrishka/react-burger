import { TAuthorization } from '../types/data'
import { API_URL } from '../../utils/constants';
import checkResponse from '../checkResponse';
import { customFetch } from '../custom-fetch';
import { IUserInfo } from '../types/data';
import { Dispatch } from 'redux';
import {
  addUserInfo
} from './user-info'

export const GET_USER_REGISTER_API: 'GET_USER_REGISTER_API' = 'GET_USER_REGISTER_API';
export const GET_USER_REGISTER_API_FAILED: 'GET_USER_REGISTER_API_FAILED' = 'GET_USER_REGISTER_API_FAILED';
export const GET_USER_REGISTER_API_SUCCESS: 'GET_USER_REGISTER_API_SUCCESS' = 'GET_USER_REGISTER_API_SUCCESS';
export const RESET_USER_REGISTER_API: 'RESET_USER_REGISTER_API'= 'RESET_USER_REGISTER_API';

export interface IGetUserRegisterApi{
  readonly type: typeof GET_USER_REGISTER_API;
}
export interface IGetUserRegisterApiFailed{
  readonly type: typeof GET_USER_REGISTER_API_FAILED;
}
export interface IGetUserRegisterApiSuccess{
  readonly type: typeof GET_USER_REGISTER_API_SUCCESS;
  userRegisterApi: TAuthorization
}
export interface IResetUserRegisterApi{
  readonly type: typeof RESET_USER_REGISTER_API;
}

export type TUserRegisterActions = 
    IGetUserRegisterApi |
    IGetUserRegisterApiFailed |
    IGetUserRegisterApiSuccess |
    IResetUserRegisterApi |
    any;


function getUserRegisterApi() {
    return {
      type: GET_USER_REGISTER_API 
    }
}

function getUserRegisterApiFailed() {
    return {
      type: GET_USER_REGISTER_API_FAILED,
    }
}

function getUserRegisterApiSuccess(payload: TAuthorization) {
    return {
      type: GET_USER_REGISTER_API_SUCCESS,
      payload
    }
}

function resetUserRegisterApi() {
    return {
      type: RESET_USER_REGISTER_API,
    }
}

function getUserRegisterApiRequest(endpoint:string, body:IUserInfo ) {
  return function(dispatch:Dispatch) {
    dispatch(getUserRegisterApi())
    customFetch({endpoint, method: "POST", body})
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
        dispatch(getUserRegisterApiSuccess(res))
        dispatch(addUserInfo(res.user))
    } else {
        dispatch(getUserRegisterApiFailed())
    }
}).catch( err => {
    dispatch(getUserRegisterApiFailed())
})
}
} 


export {
    getUserRegisterApi,
    getUserRegisterApiFailed,
    getUserRegisterApiSuccess,
    resetUserRegisterApi, 
    getUserRegisterApiRequest
}