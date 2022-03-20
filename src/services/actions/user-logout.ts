export const USER_LOGOUT_REQUEST: 'USER_LOGOUT_REQUEST' = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_REQUEST_FAILED: 'USER_LOGOUT_REQUEST_FAILED' = 'USER_LOGOUT_REQUEST_FAILED';
export const USER_LOGOUT_REQUEST_SUCCESS: 'USER_LOGOUT_REQUEST_SUCCESS'= 'USER_LOGOUT_REQUEST_SUCCESS';


export interface IUserLogoutRequest{
  readonly type: typeof USER_LOGOUT_REQUEST;
}
export interface IUserLogoutFailed{
  readonly type: typeof USER_LOGOUT_REQUEST_FAILED;
}
export interface IUserLogoutSuccess{
  readonly type: typeof USER_LOGOUT_REQUEST_SUCCESS;
}

export type TUserLogoutActions = 
    IUserLogoutRequest |
    IUserLogoutFailed |
    IUserLogoutFailed |
    any;

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