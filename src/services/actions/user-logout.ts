export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_REQUEST_FAILED = 'USER_LOGOUT_REQUEST_FAILED';
export const USER_LOGOUT_REQUEST_SUCCESS = 'USER_LOGOUT_REQUEST_SUCCESS';

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

export {
    userLogoutRequest,
    userLogoutFailed,
    userLogoutSuccess
}