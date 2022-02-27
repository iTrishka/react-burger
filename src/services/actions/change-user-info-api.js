import checkResponse from '../checkResponse';
import { customFetch } from '../custom-fetch';
import { refreshToken } from '../refresh-token';
import { loadStateFromLocalstorage } from '../../components/localstorage';

import {
    getUserInfo,
    userInfoRequestFailed,
    userInfoRequestSuccess,
} from './user-info';

function changeUserInfoApi(data) {
    return function(dispatch){
      dispatch(getUserInfo())
      customFetch("auth/user", "PATCH", data, {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + loadStateFromLocalstorage('token')
      })
        .then(checkResponse)
        .then( res => {
          if (res && res.success) {
            dispatch(userInfoRequestSuccess(res.user))
            return res
      } else {
          dispatch(userInfoRequestFailed())
          if(res.message === "jwt expired" && loadStateFromLocalstorage('refreshToken') ){
            refreshToken()
            customFetch("auth/user", "PATCH", data, {
              'Content-Type': 'application/json',
              'authorization': 'Bearer ' + loadStateFromLocalstorage('token')
            })
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