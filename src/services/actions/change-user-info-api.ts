import checkResponse from '../checkResponse';
import { customFetch } from '../custom-fetch';
import { refreshToken } from '../refresh-token';
import { loadStateFromLocalstorage } from '../../components/localstorage';
import { Dispatch } from 'redux';
import { IUserInfo } from '../types/data';

import {
    getUserInfo,
    userInfoRequestFailed,
    userInfoRequestSuccess,
} from './user-info';


function changeUserInfoApi(data: IUserInfo) {
    return function(dispatch: Dispatch){
      dispatch(getUserInfo())
      customFetch({
          endpoint: "auth/user", 
          method: "PATCH", 
          body: data, 
          header: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + loadStateFromLocalstorage('token')
      }})!
        .then(checkResponse)
        .then( (res) => {
          if (res && res.success) {
            dispatch(userInfoRequestSuccess(res.user))
            return res
      } else {
          dispatch(userInfoRequestFailed())
          if(res.message === "jwt expired" && loadStateFromLocalstorage('refreshToken') ){
            refreshToken()
            customFetch({
              endpoint: "auth/user", 
              method: "PATCH", 
              body: data, 
              header: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + loadStateFromLocalstorage('token')
          }})!
            .then(checkResponse).then(
              res => {
                if (res && res.success) {
                  dispatch(userInfoRequestSuccess(res.user))
                  return res
              }
            })
          }
          else {return res}
          
      }
      }).catch( err => {
          dispatch(userInfoRequestFailed())
          return
        })
  } 
}

export default changeUserInfoApi;