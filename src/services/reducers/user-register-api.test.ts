import * as actionType from '../actions/user-register-api';
import { userRegisterApi } from './user-register-api';

describe('userRegisterApi reducer', () => {
    it('Должен вернуть начальное состояние', () => {
        expect(userRegisterApi(undefined, {})).toEqual({
            userRegisterApiRequest: false,
            userRegisterApiFailed: false,
            userRegisterApi: {} 
        })
    })
});

it('Should show status the begginner userRegisterApi request', () => {
    expect(userRegisterApi({
        userRegisterApiRequest: false,
        userRegisterApiFailed: false,
        userRegisterApi: {} 
    }, {
            type: actionType.GET_USER_REGISTER_API
        }
    )).toEqual({
        userRegisterApi: {},
        userRegisterApiRequest: true,
        userRegisterApiFailed: false,
    })
})

it('Should show success status userRegisterApi request', () => {
    expect(userRegisterApi({
        userRegisterApiRequest: false,
        userRegisterApiFailed: false,
        userRegisterApi: {}  
    }, {
            type: actionType.GET_USER_REGISTER_API_SUCCESS,
            payload: {
                success: true,
                accessToken: "1234",
                refreshToken: "4321",
                user: {
                    email: "Snowflak@ya.ru",
                    name: "Крис",
                    password: "****"
                }
            }
        }
    )).toEqual({
        userRegisterApiFailed: false,
        userRegisterApi: {
            success: true,
            accessToken: "1234",
            refreshToken: "4321",
            user: {
                email: "Snowflak@ya.ru",
                name: "Крис",
                password: "****"
            }
        }, 
        userRegisterApiRequest: false 

    })
})

it('Should show failed status userRegisterApi request', () => {
    expect(userRegisterApi({
        userRegisterApiRequest: false,
        userRegisterApiFailed: false,
        userRegisterApi: {}  
    }, {
            type: actionType.GET_USER_REGISTER_API_FAILED
        }
    )).toEqual({
        userRegisterApi: {},
        userRegisterApiFailed: true, 
        userRegisterApiRequest: false      
    })
})