import checkResponse from '../checkResponse';
import { customFetch } from '../custom-fetch';
import { refreshToken } from '../refresh-token';
import { loadStateFromLocalstorage } from '../../components/localstorage';

import {
    getUserInfo,
    userInfoRequestFailed,
    userInfoRequestSuccess,
    userInfoStatus
} from './user-info';
import { Dispatch } from 'redux';

 function getUserInfoApi() {
    return function(dispatch:Dispatch){
      dispatch(getUserInfo())
      customFetch({
        endpoint: "auth/user", 
        method: "GET",
        body:  "" ,
        header: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + loadStateFromLocalstorage('token')}})!
        .then(checkResponse)
        .then( res => {
          if (res && res.success) {
            dispatch(userInfoRequestSuccess(res.user))
            dispatch(userInfoStatus(res.success))
            return res
      } else {
          dispatch(userInfoRequestFailed())
          dispatch(userInfoStatus(res.message))
          if(res.message === "jwt expired" && loadStateFromLocalstorage('refreshToken')){
            refreshToken()
            customFetch({
              endpoint: "auth/user", 
              method: "GET",
              body:  "" ,
              header: {
              'Content-Type': 'application/json',
              'authorization': 'Bearer ' + loadStateFromLocalstorage('token')}})!
            .then(checkResponse).then(
              res => {
                if (res && res.success) {
                  dispatch(userInfoRequestSuccess(res.user))
                  dispatch(userInfoStatus(res.success))
                  return res
              }
            })
          }
          else {
            dispatch(userInfoRequestFailed())
            dispatch(userInfoStatus(res.message))}
      }
      }).catch( err => {
          dispatch(userInfoRequestFailed())
          dispatch(userInfoStatus(err.message))
        })
  } 
}


export default getUserInfoApi;