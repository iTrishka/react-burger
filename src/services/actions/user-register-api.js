export const GET_USER_REGISTER_API = 'GET_USER_INFO_API';
export const GET_USER_REGISTER_API_FAILED = 'GET_USER_INFO_API_FAILED';
export const GET_USER_REGISTER_API_SUCCESS = 'GET_USER_INFO_API_SUCCESS';
export const RESET_USER_REGISTER_API= 'RESET_USER_INFO_API';

function getUserRegisterApi(payload) {
    return {
      type: GET_USER_REGISTER_API ,
      payload
    }
}

function getUserRegisterApiFailed() {
    return {
      type: GET_USER_REGISTER_API_FAILED,
    }
}

function getUserRegisterApiSuccess(payload) {
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