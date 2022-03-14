
export const GET_RESET_PASSWORD_TOKEN_REQUEST = 'GET_RESET_PASSWORD_TOKEN_REQUEST';
export const GET_RESET_PASSWORD_TOKEN_SUCCESS = 'GET_RESET_PASSWORD_TOKEN_SUCCESS';
export const GET_RESET_PASSWORD_TOKEN_FAILED = 'GET_RESET_PASSWORD_TOKEN_FAILED';
export const GET_RESET_PASSWORD_TOKEN_STATUS = 'GET_RESET_PASSWORD_TOKEN_STATUS';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const RESET_PASSWORD_STATUS = 'RESET_PASSWORD_STATUS';


function getResetPasswordTokenRequest() {
    return {
      type: GET_RESET_PASSWORD_TOKEN_REQUEST ,
    }
}

function getResetPasswordTokenFailed() {
    return {
      type: GET_RESET_PASSWORD_TOKEN_FAILED,
    }
}

function getResetPasswordTokenSuccess() {
    return {
      type: GET_RESET_PASSWORD_TOKEN_SUCCESS
    }
}
function getResetPasswordTokenStatus(payload:string | undefined ) {
  return {
    type: GET_RESET_PASSWORD_TOKEN_STATUS,
    payload
  }
}
function resetPasswordRequest() {
    return {
      type: RESET_PASSWORD_REQUEST,
    }
}

function resetPasswordFailed() {
    return {
      type: RESET_PASSWORD_FAILED,
    }
}

function resetPasswordSuccess() {
    return {
      type: RESET_PASSWORD_SUCCESS
    }
}

function resetPasswordStatus(payload: string | undefined) {
  return {
    type: RESET_PASSWORD_STATUS,
    payload
  }
}


export {
    getResetPasswordTokenRequest,
    getResetPasswordTokenFailed,
    getResetPasswordTokenSuccess,
    getResetPasswordTokenStatus,
    resetPasswordRequest,
    resetPasswordFailed,
    resetPasswordSuccess, 
    resetPasswordStatus
}