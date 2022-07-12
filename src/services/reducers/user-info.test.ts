import * as actionType from '../actions/user-info';
import { userInfo, initialState } from './user-info';

describe('userInfo reducer', () => {
    it('Должен вернуть начальное состояние', () => {
        expect(userInfo(undefined, {})).toEqual(initialState)
    })
});

it('Should add user name and email', () => {
    expect(userInfo(initialState, {
            type: actionType.ADD_USER_INFO,
            payload: {
                name: "Kris",
                email: "Snowflak@ya.ru"
            }
        }
    )).toEqual({
        ...initialState,
        userInfo: {
            name: "Kris",
            email: "Snowflak@ya.ru"
        }
    })
})

it('Should show status user info request', () => {
    expect(userInfo(initialState, {
            type: actionType.GET_USER_INFO
        }
    )).toEqual({
        ...initialState,
        userInfoRequest: true,
        userInfoRequestFailed: false
    })
})

it('Should show status success user info request', () => {
    expect(userInfo(initialState, {
            type: actionType.USER_INFO_REQUEST_SUCCESS,
            payload: {
                name: "Kris",
                email: "Snowflak@ya.ru"
            }
        }
    )).toEqual({
        ...initialState,
        userInfo: {
            name: "Kris",
            email: "Snowflak@ya.ru"
        }, 
        userInfoRequestFailed: false 
    })
})

it('Should show status failed user info request', () => {
    expect(userInfo(initialState, {
            type: actionType.USER_INFO_REQUEST_FAILED
        }
    )).toEqual({
        ...initialState,
        userInfoRequestFailed: true,
        userInfoRequest: false
    })
})

it('Should reset user info', () => {
    expect(userInfo({
            ...initialState,
            userInfo: {
                name: "Kris",
                email: "Snowflak@ya.ru"
            }
        }, {
            type: actionType.RESET_USER_INFO
        }
    )).toEqual(initialState)
})

it('Should show status', () => {
    expect(userInfo(initialState, {
            type: actionType.USER_INFO_STATUS,
            payload: "Nice to meet you"
        }
    )).toEqual({
        ...initialState,
        userInfoStatus: "Nice to meet you"
    })
})