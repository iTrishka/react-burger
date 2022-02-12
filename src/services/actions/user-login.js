export const GET_USER_LOGIN = 'GET_USER_LOGIN';
export const GET_USER_LOGIN_FAILED = 'GET_USER_LOGIN_FAILED';
export const GET_USER_LOGIN_SUCCESS = 'GET_USER_LOGIN_SUCCESS';


function getUserLogin(payload) {
    return {
      type: GET_USER_LOGIN ,
      payload
    }
}

function getUserLoginFailed() {
    return {
      type: GET_USER_LOGIN_FAILED,
    }
}

function getUserLoginSuccess(payload) {
    return {
      type: GET_USER_LOGIN_SUCCESS,
      payload
    }
}


export {
    getUserLogin,
    getUserLoginFailed,
    getUserLoginSuccess, 
}