import { Dispatch } from 'redux';
import checkResponse from '../checkResponse';
import { customFetch } from '../custom-fetch';

import {
    resetPasswordRequest,
    resetPasswordFailed,
    resetPasswordSuccess, 
    resetPasswordStatus
} from './password';


function resetPassword(data: {"password": string; "token": string}) {
    return function(dispatch: Dispatch){
        dispatch(resetPasswordRequest())
        customFetch({
          endpoint: "password-reset/reset", 
          method: "POST", 
          body: data ,
          header:{
          'Content-Type': 'application/json'}})!
          .then(checkResponse)
          .then( res => {
            if (res && res.success) {
              dispatch(resetPasswordSuccess())
              dispatch(resetPasswordStatus(res.message))
              return res
        } else throw Promise.reject(res.message)
        }).catch( err => {
            dispatch(resetPasswordFailed())
            dispatch(resetPasswordStatus(err.message))
            return err
          })
    } 
}

export default resetPassword;