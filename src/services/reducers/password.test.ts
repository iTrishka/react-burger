import * as actionType from '../actions/password';
import { password } from './password';

describe('password reducer', () => {
    it('Должен вернуть начальное состояние', () => {
        expect(password(undefined, {})).toEqual({
            getTokenRequest: false,
            getTokenFailed: false,
            getTokenStatus: "",
            resetPasswordRequest: false,
            resetPasswordFailed: false,
            resetPasswordStatus: "",
        })
    })
});

it('Should show the status at the begginning of the token request', () => {
    expect(password({
            getTokenRequest: false,
            getTokenFailed: false,
            getTokenStatus: "",
            resetPasswordRequest: false,
            resetPasswordFailed: false,
            resetPasswordStatus: "",
        }, {
            type: actionType.GET_RESET_PASSWORD_TOKEN_REQUEST          
        }
    )).toEqual({
        getTokenStatus: "",
        resetPasswordRequest: false,
        resetPasswordFailed: false,
        resetPasswordStatus: "",
        getTokenRequest: true,
        getTokenFailed: false,
    })
})

it('Should show the success status', () => {
    expect(password({
            getTokenRequest: false,
            getTokenFailed: false,
            getTokenStatus: "",
            resetPasswordRequest: false,
            resetPasswordFailed: false,
            resetPasswordStatus: "",
        }, {
            type: actionType.GET_RESET_PASSWORD_TOKEN_SUCCESS          
        }
    )).toEqual({
        getTokenStatus: "",
        resetPasswordRequest: false,
        resetPasswordFailed: false,
        resetPasswordStatus: "",
        getTokenRequest: false,
        getTokenFailed: false,
    })
})

it('Should show the failed status', () => {
    expect(password({
            getTokenRequest: false,
            getTokenFailed: false,
            getTokenStatus: "",
            resetPasswordRequest: false,
            resetPasswordFailed: false,
            resetPasswordStatus: "",
        }, {
            type: actionType.GET_RESET_PASSWORD_TOKEN_FAILED          
        }
    )).toEqual({
        getTokenStatus: "",
        resetPasswordRequest: false,
        resetPasswordFailed: false,
        resetPasswordStatus: "",
        getTokenRequest: false,
        getTokenFailed: true,
    })
})

it('Should show token status', () => {
    expect(password({
            getTokenRequest: false,
            getTokenFailed: false,
            getTokenStatus: "",
            resetPasswordRequest: false,
            resetPasswordFailed: false,
            resetPasswordStatus: "",
        }, {
            type: actionType.GET_RESET_PASSWORD_TOKEN_STATUS,
            payload: "ok"         
        }
    )).toEqual({
        resetPasswordRequest: false,
        resetPasswordFailed: false,
        resetPasswordStatus: "",
        getTokenRequest: false,
        getTokenFailed: false,
        getTokenStatus: "ok"
    })
})

it('Should show the status at the begginning of the token reset request', () => {
    expect(password({
            getTokenRequest: false,
            getTokenFailed: false,
            getTokenStatus: "",
            resetPasswordRequest: false,
            resetPasswordFailed: false,
            resetPasswordStatus: "",
        }, {
            type: actionType.RESET_PASSWORD_REQUEST,       
        }
    )).toEqual({
        getTokenRequest: false,
        getTokenFailed: false,
        getTokenStatus: "",
        resetPasswordFailed: false,
        resetPasswordStatus: "",    
        resetPasswordRequest: true  
    })
})

it('Should show the success status reset request', () => {
    expect(password({
            getTokenRequest: false,
            getTokenFailed: false,
            getTokenStatus: "",
            resetPasswordRequest: false,
            resetPasswordFailed: false,
            resetPasswordStatus: "",
        }, {
            type: actionType.RESET_PASSWORD_SUCCESS,       
        }
    )).toEqual({
        getTokenRequest: false,
        getTokenFailed: false,
        getTokenStatus: "",
        resetPasswordRequest: false,
        resetPasswordStatus: "",    
        resetPasswordFailed: false    
    })
})

it('Should show the failed status reset request', () => {
    expect(password({
            getTokenRequest: false,
            getTokenFailed: false,
            getTokenStatus: "",
            resetPasswordRequest: false,
            resetPasswordFailed: false,
            resetPasswordStatus: "", 
        }, {
            type: actionType.RESET_PASSWORD_FAILED,       
        }
    )).toEqual({
        getTokenRequest: false,
        getTokenFailed: false,
        getTokenStatus: "",
        resetPasswordStatus: "",  
        resetPasswordRequest: false,
        resetPasswordFailed: true,      
    })
})

it('Should show status reset request', () => {
    expect(password({
            getTokenRequest: false,
            getTokenFailed: false,
            getTokenStatus: "",
            resetPasswordRequest: false,
            resetPasswordFailed: false,
            resetPasswordStatus: "",
        }, {
            type: actionType.RESET_PASSWORD_STATUS,
            payload: "done"       
        }
    )).toEqual({
        getTokenStatus: "",
        resetPasswordRequest: false,
        resetPasswordFailed: false,
        getTokenRequest: false,
        getTokenFailed: false,
        resetPasswordStatus: "done"        
    })
})

