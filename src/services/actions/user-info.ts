import { IUserInfo } from "../types/data";

export const GET_USER_INFO = 'GET_USER_INFO';
export const ADD_USER_INFO = 'ADD_USER_INFO';
export const USER_INFO_REQUEST_FAILED = 'USER_INFO_REQUEST_FAILED';
export const USER_INFO_REQUEST_SUCCESS = 'USER_INFO_REQUEST_SUCCESS';
export const RESET_USER_INFO = 'RESET_USER_INFO';
export const USER_INFO_STATUS = 'USER_INFO_STATUS';

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

export {
  getUserInfo,
  addUserInfo,
  userInfoRequestFailed,
  userInfoRequestSuccess,
  resetUserInfo,
  userInfoStatus
}