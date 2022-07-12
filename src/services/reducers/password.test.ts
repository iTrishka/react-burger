import * as actionType from '../actions/password';
import { password, initialState } from './password';

describe('password reducer', () => {
    it('Должен вернуть начальное состояние', () => {
        expect(password(undefined, {})).toEqual(initialState)
    })
});

it('Should show the status at the begginning of the token request', () => {
    expect(password(initialState, {
            type: actionType.GET_RESET_PASSWORD_TOKEN_REQUEST          
        }
    )).toEqual({
       ...initialState,
        getTokenRequest: true,
        getTokenFailed: false,
    })
})

it('Should show the success status', () => {
    expect(password({
            ...initialState,
            getTokenRequest: true,
        }, {
            type: actionType.GET_RESET_PASSWORD_TOKEN_SUCCESS          
        }
    )).toEqual({
        ...initialState,
        getTokenRequest: false,
        getTokenFailed: false
        
    })
})

it('Should show the failed status', () => {
    expect(password(initialState, {
            type: actionType.GET_RESET_PASSWORD_TOKEN_FAILED          
        }
    )).toEqual({
        ...initialState,
        getTokenRequest: false,
        getTokenFailed: true,
    })
})

it('Should show token status', () => {
    expect(password(initialState, {
            type: actionType.GET_RESET_PASSWORD_TOKEN_STATUS,
            payload: "ok"         
        }
    )).toEqual({
        ...initialState,
        getTokenStatus: "ok"
    })
})

it('Should show the status at the begginning of the token reset request', () => {
    expect(password(initialState, {
            type: actionType.RESET_PASSWORD_REQUEST,       
        }
    )).toEqual({
        ...initialState,   
        resetPasswordRequest: true  
    })
})

it('Should show the success status reset request', () => {
    expect(password({
            ...initialState,
            resetPasswordRequest: true
        }, {
            type: actionType.RESET_PASSWORD_SUCCESS,       
        }
    )).toEqual({
        ...initialState,
        resetPasswordRequest: false,  
        resetPasswordFailed: false    
    })
})

it('Should show the failed status reset request', () => {
    expect(password(initialState, {
            type: actionType.RESET_PASSWORD_FAILED,       
        }
    )).toEqual({
        ...initialState, 
        resetPasswordRequest: false,
        resetPasswordFailed: true,      
    })
})

it('Should show status reset request', () => {
    expect(password(initialState, {
            type: actionType.RESET_PASSWORD_STATUS,
            payload: "done"       
        }
    )).toEqual({
        ...initialState,
        resetPasswordStatus: "done"        
    })
})

