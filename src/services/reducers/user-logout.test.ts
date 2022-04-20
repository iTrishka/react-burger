import * as actionType from '../actions/user-logout';
import { userLogout } from './user-logout';

describe('userLogout reducer', () => {
    it('Должен вернуть начальное состояние', () => {
        expect(userLogout(undefined, {})).toEqual({
            userLogoutRequest: false,
            userLogoutRequestFailed: false,
        })
    })
});

it('Should show status the begginner Logout request', () => {
    expect(userLogout({
        userLogoutRequest: false,
        userLogoutRequestFailed: false, 
    }, {
            type: actionType.USER_LOGOUT_REQUEST
        }
    )).toEqual({
        userLogoutRequest: true,
        userLogoutRequestFailed: false,
    })
})

it('Should show success status Logout request', () => {
    expect(userLogout({
        userLogoutRequest: true,
        userLogoutRequestFailed: false,  
    }, {
            type: actionType.USER_LOGOUT_REQUEST_SUCCESS
        }
    )).toEqual({
        userLogoutRequest: false,
        userLogoutRequestFailed: false  
    })
})

it('Should show failed status Logout request', () => {
    expect(userLogout({
        userLogoutRequest: true,
        userLogoutRequestFailed: false,
    }, {
            type: actionType.USER_LOGOUT_REQUEST_FAILED
        }
    )).toEqual({
        userLogoutRequestFailed: true, 
        userLogoutRequest: false        
    })
})