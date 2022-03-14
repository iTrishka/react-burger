import { TAuthorization } from '../types/data'

export const GET_USER_REGISTER_API = 'GET_USER_REGISTER_API';
export const GET_USER_REGISTER_API_FAILED = 'GET_USER_REGISTER_API_FAILED';
export const GET_USER_REGISTER_API_SUCCESS = 'GET_USER_REGISTER_API_SUCCESS';
export const RESET_USER_REGISTER_API= 'RESET_USER_REGISTER_API';




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

export {
    getUserRegisterApi,
    getUserRegisterApiFailed,
    getUserRegisterApiSuccess,
    resetUserRegisterApi
}