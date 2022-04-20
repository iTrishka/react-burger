import * as actionType from '../actions/user-info';
import { userInfo } from './user-info';

describe('userInfo reducer', () => {
    it('Должен вернуть начальное состояние', () => {
        expect(userInfo(undefined, {})).toEqual({
            userInfoRequest: false,
            userInfoRequestFailed: false,
            userInfoStatus: "",
            userInfo: {
                name: "",
                email: ""
            } 
        })
    })
});

it('Should add user name and email', () => {
    expect(userInfo({
            userInfoRequest: false,
            userInfoRequestFailed: false,
            userInfoStatus: "",
            userInfo: {
                name: "",
                email: ""
            }
        }, {
            type: actionType.ADD_USER_INFO,
            payload: {
                name: "Kris",
                email: "Snowflak@ya.ru"
            }
        }
    )).toEqual({
        userInfoRequest: false,
        userInfoRequestFailed: false,
        userInfoStatus: "",
        userInfo: {
            name: "Kris",
            email: "Snowflak@ya.ru"
        }
    })
})

it('Should show status user info request', () => {
    expect(userInfo({
            userInfoRequest: false,
            userInfoRequestFailed: false,
            userInfoStatus: "",
            userInfo: {
                name: "",
                email: ""
            }
        }, {
            type: actionType.GET_USER_INFO
        }
    )).toEqual({
        userInfoStatus: "",
        userInfo: {
            name: "",
            email:  ""
        },
        userInfoRequest: true,
        userInfoRequestFailed: false
    })
})

it('Should show status success user info request', () => {
    expect(userInfo({
            userInfoRequest: false,
            userInfoRequestFailed: false,
            userInfoStatus: "",
            userInfo: {
                name: "",
                email: ""
            }
        }, {
            type: actionType.USER_INFO_REQUEST_SUCCESS,
            payload: {
                name: "Kris",
                email: "Snowflak@ya.ru"
            }
        }
    )).toEqual({
        userInfoStatus: "",
        userInfoRequest: false,
        userInfo: {
            name: "Kris",
            email: "Snowflak@ya.ru"
        }, 
        userInfoRequestFailed: false 
    })
})

it('Should show status failed user info request', () => {
    expect(userInfo({
            userInfoRequest: false,
            userInfoRequestFailed: false,
            userInfoStatus: "",
            userInfo: {
                name: "",
                email: ""
            }
        }, {
            type: actionType.USER_INFO_REQUEST_FAILED
        }
    )).toEqual({
        userInfoStatus: "",
        userInfo: {
            name: "",
            email: ""
        },
        userInfoRequestFailed: true,
        userInfoRequest: false
    })
})

it('Should reset user info', () => {
    expect(userInfo({
            userInfoRequest: false,
            userInfoRequestFailed: false,
            userInfoStatus: "",
            userInfo: {
                name: "Kris",
                email: "Snowflak@ya.ru"
            }
        }, {
            type: actionType.RESET_USER_INFO
        }
    )).toEqual({
        userInfoRequest: false,
        userInfoRequestFailed: false,
        userInfoStatus: "",
        userInfo: {
            name: "",
            email: ""
        }
    })
})

it('Should show status', () => {
    expect(userInfo({
            userInfoRequest: false,
            userInfoRequestFailed: false,
            userInfoStatus: "",
            userInfo: {
                name: "",
                email: ""
            }
        }, {
            type: actionType.USER_INFO_STATUS,
            payload: "Nice to meet you"
        }
    )).toEqual({
        userInfoRequest: false,
        userInfoRequestFailed: false,
        userInfo: {
            name: "",
            email: ""
        },
        userInfoStatus: "Nice to meet you"
    })
})