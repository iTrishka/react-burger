import{
    GET_RESET_PASSWORD_TOKEN_REQUEST, 
    GET_RESET_PASSWORD_TOKEN_SUCCESS, 
    GET_RESET_PASSWORD_TOKEN_FAILED, 
    GET_RESET_PASSWORD_TOKEN_STATUS,
    RESET_PASSWORD_REQUEST, 
    RESET_PASSWORD_SUCCESS, 
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_STATUS 
} from '../actions/password';
import { TPasswordActions } from '../actions/password';

export interface IPasswordInit {
    getTokenRequest: boolean,
    getTokenFailed: boolean,
    getTokenStatus: string,
    resetPasswordRequest: boolean,
    resetPasswordFailed: boolean,
    resetPasswordStatus: string
}

const initialState: IPasswordInit = {
    getTokenRequest: false,
    getTokenFailed: false,
    getTokenStatus: "",
    resetPasswordRequest: false,
    resetPasswordFailed: false,
    resetPasswordStatus: "",
    
}

export const password = (state:IPasswordInit = initialState, action: TPasswordActions): IPasswordInit => { 
    switch(action.type) {
        case GET_RESET_PASSWORD_TOKEN_REQUEST: {
            return {
              ...state,
              getTokenRequest: true,
              getTokenFailed: false,
            }
        }
        case GET_RESET_PASSWORD_TOKEN_SUCCESS: {
            return {
              ...state,
              getTokenFailed: false
            }
        }
        case GET_RESET_PASSWORD_TOKEN_FAILED: {
            return {
                ...state, 
                getTokenFailed: true, 
                getTokenRequest: false 
            }
        }
        case GET_RESET_PASSWORD_TOKEN_STATUS: {
            return {
                ...state, 
                getTokenStatus: action.payload
            }
        }
        case RESET_PASSWORD_REQUEST: {
            return {
              ...state,
              resetPasswordRequest: true,
              resetPasswordFailed: false,
            }
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
              ...state,
              resetPasswordFailed: false
            }
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state, 
                resetPasswordFailed: true, 
                resetPasswordRequest: false 
            }
        }
        case RESET_PASSWORD_STATUS: {
            return {
                ...state, 
                resetPasswordStatus: action.payload
            }
        }
        default: {
            return state
        }
    }
}
 