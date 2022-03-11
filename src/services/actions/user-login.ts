export const GET_USER_LOGIN = 'GET_USER_LOGIN';
export const GET_USER_LOGIN_FAILED = 'GET_USER_LOGIN_FAILED';
export const GET_USER_LOGIN_SUCCESS = 'GET_USER_LOGIN_SUCCESS';


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


export {
    getUserLogin,
    getUserLoginFailed,
    getUserLoginSuccess, 
}