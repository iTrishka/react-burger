import * as actionType from '../actions/user-login';
import { userLogin } from './user-login';

describe('userLogin reducer', () => {
    it('Должен вернуть начальное состояние', () => {
        expect(userLogin(undefined, {})).toEqual({
            userLoginRequest1: false,
            userLoginFailed: false,  
        })
    })
});

it('Should show status the begginner Login request', () => {
    expect(userLogin({
        userLoginRequest1: false,
        userLoginFailed: false,  
    }, {
            type: actionType.GET_USER_LOGIN
        }
    )).toEqual({
        userLoginRequest1: true,
        userLoginFailed: false,  
    })
})

it('Should show success status Login request', () => {
    expect(userLogin({
        userLoginRequest1: true,
        userLoginFailed: false,  
    }, {
            type: actionType.GET_USER_LOGIN_SUCCESS
        }
    )).toEqual({
        userLoginRequest1: false,
        userLoginFailed: false,  
    })
})

it('Should show failed status Login request', () => {
    expect(userLogin({
        userLoginRequest1: true,
        userLoginFailed: false,  
    }, {
            type: actionType.GET_USER_LOGIN_FAILED
        }
    )).toEqual({
        userLoginRequest1: false,
        userLoginFailed: true,  
    })
})