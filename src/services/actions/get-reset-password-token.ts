import { Dispatch } from 'redux';
import checkResponse from '../checkResponse';
import { customFetch } from '../custom-fetch';

import {
    getResetPasswordTokenRequest,
    getResetPasswordTokenFailed,
    getResetPasswordTokenSuccess,
    getResetPasswordTokenStatus
} from './password';


function getResetPasswordToken(data: {email: string}) {
    return function(dispatch:Dispatch){
        dispatch(getResetPasswordTokenRequest())
        customFetch({
          endpoint: "password-reset", 
          method: "POST", 
          body: data ,
          header: {
          'Content-Type': 'application/json'}})!
          .then(checkResponse)
          .then( res => {
            if (res && res.success) {
              dispatch(getResetPasswordTokenSuccess())
              dispatch(getResetPasswordTokenStatus(res.message))
              return res
        } else throw Promise.reject(res.message)
        }).catch( err => {
            dispatch(getResetPasswordTokenFailed())
            dispatch(getResetPasswordTokenStatus(err.message))
            return err
          })
    } 
}

export default getResetPasswordToken;