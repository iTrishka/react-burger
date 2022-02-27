export const GET_USER_INFO = 'GET_USER_INFO';
export const ADD_USER_INFO = 'ADD_USER_INFO';
export const USER_INFO_REQUEST_FAILED = 'USER_INFO_REQUEST_FAILED';
export const USER_INFO_REQUEST_SUCCESS = 'USER_INFO_REQUEST_SUCCESS';
export const RESET_USER_INFO = 'RESET_USER_INFO';
export const USER_INFO_STATUS = 'USER_INFO_STATUS';

function getUserInfo(payload) {
    return {
      type: GET_USER_INFO,
      payload
    }
}

function addUserInfo(payload) {
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

function userInfoRequestSuccess(payload) {
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

function userInfoStatus(payload) {
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