import { IUserInfo } from "../types/data";
import { Dispatch } from 'redux';
import checkResponse from '../checkResponse';
import { customFetch } from '../custom-fetch';
import { refreshToken } from '../refresh-token';
import { loadStateFromLocalstorage } from '../../components/localstorage';


export const GET_USER_INFO: 'GET_USER_INFO' = 'GET_USER_INFO';
export const ADD_USER_INFO: 'ADD_USER_INFO' = 'ADD_USER_INFO';
export const USER_INFO_REQUEST_FAILED: 'USER_INFO_REQUEST_FAILED' = 'USER_INFO_REQUEST_FAILED';
export const USER_INFO_REQUEST_SUCCESS: 'USER_INFO_REQUEST_SUCCESS' = 'USER_INFO_REQUEST_SUCCESS';
export const RESET_USER_INFO: 'RESET_USER_INFO' = 'RESET_USER_INFO';
export const USER_INFO_STATUS: 'USER_INFO_STATUS' = 'USER_INFO_STATUS';

export interface IGetUserInfo {
  readonly type: typeof GET_USER_INFO,
  user: IUserInfo
}
export interface IAddUserInfo {
  readonly type: typeof GET_USER_INFO,
  user: IUserInfo
}
export interface IUserInfoRequestFailed {
  readonly type: typeof USER_INFO_REQUEST_FAILED
}
export interface IUserInfoRequestSuccess{
  readonly type: typeof USER_INFO_REQUEST_SUCCESS
  user: IUserInfo
}
export interface IResetUserInfo{
  readonly type: typeof RESET_USER_INFO
  user: IUserInfo
}
export interface IUserInfoStatus{
  readonly type: typeof USER_INFO_STATUS
  userInfoStatus: string
}




export type TUserActions = 
    IGetUserInfo | 
    IAddUserInfo |
    IUserInfoRequestFailed | 
    IUserInfoRequestSuccess |
    IResetUserInfo |
    IUserInfoStatus |
    any;


function getUserInfo(){
    return {
      type: GET_USER_INFO,
    }
}

function addUserInfo(payload:IUserInfo | undefined) {
   return {
     type: ADD_USER_INFO,
     payload
   }
}

function userInfoRequestFailed() {
  return {
    type: USER_INFO_REQUEST_FAILED,
  }
}

function userInfoRequestSuccess(payload:IUserInfo | undefined) {
  return {
    type: USER_INFO_REQUEST_SUCCESS,
    payload
  }
}

function resetUserInfo() {
  return {
    type: RESET_USER_INFO
  }
}

function userInfoStatus(payload:string | undefined) {
  return {
    type: USER_INFO_STATUS,
    payload
  }
}

function getUserInfoApi() {
  return function(dispatch:Dispatch){
    dispatch(getUserInfo())
    customFetch({
      endpoint: "auth/user", 
      method: "GET",
      body:  "" ,
      header: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + loadStateFromLocalstorage('token')}})!
      .then(checkResponse)
      .then( res => {
        if (res && res.success) {
          dispatch(userInfoRequestSuccess(res.user))
          dispatch(userInfoStatus(res.success))
          return res
    } else {
        dispatch(userInfoRequestFailed())
        dispatch(userInfoStatus(res.message))
        if(res.message === "jwt expired" && loadStateFromLocalstorage('refreshToken')){
          refreshToken()
          customFetch({
            endpoint: "auth/user", 
            method: "GET",
            body:  "" ,
            header: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + loadStateFromLocalstorage('token')}})!
          .then(checkResponse).then(
            res => {
              if (res && res.success) {
                dispatch(userInfoRequestSuccess(res.user))
                dispatch(userInfoStatus(res.success))
                return res
            }
          })
        }
        else {
          dispatch(userInfoRequestFailed())
          dispatch(userInfoStatus(res.message))}
    }
    }).catch( err => {
        dispatch(userInfoRequestFailed())
        dispatch(userInfoStatus(err.message))
      })
} 
}


function changeUserInfoApi(data: IUserInfo) {
  return function(dispatch: Dispatch){
    dispatch(getUserInfo())
    customFetch({
        endpoint: "auth/user", 
        method: "PATCH", 
        body: data, 
        header: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + loadStateFromLocalstorage('token')
    }})!
      .then(checkResponse)
      .then( (res) => {
        if (res && res.success) {
          dispatch(userInfoRequestSuccess(res.user))
          return res
    } else {
        dispatch(userInfoRequestFailed())
        if(res.message === "jwt expired" && loadStateFromLocalstorage('refreshToken') ){
          refreshToken()
          customFetch({
            endpoint: "auth/user", 
            method: "PATCH", 
            body: data, 
            header: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + loadStateFromLocalstorage('token')
        }})!
          .then(checkResponse).then(
            res => {
              if (res && res.success) {
                dispatch(userInfoRequestSuccess(res.user))
                return res
            }
          })
        }
        else {return res}
        
    }
    }).catch( err => {
        dispatch(userInfoRequestFailed())
        return
      })
} 
}


export {
  getUserInfo,
  addUserInfo,
  userInfoRequestFailed,
  userInfoRequestSuccess,
  resetUserInfo,
  userInfoStatus, 
  getUserInfoApi, 
  changeUserInfoApi
}