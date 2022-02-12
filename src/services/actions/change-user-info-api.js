import { API_URL } from '../../utils/constants';
import checkResponse from '../checkResponse';
import { getCookie } from '../cookies';
import { customFetch } from '../custom-fetch';
import { refreshToken } from '../refresh-token';

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
        'authorization': 'Bearer ' + getCookie('token')
      })
        .then(checkResponse)
        .then( res => {
          if (res && res.success) {
            dispatch(userInfoRequestSuccess(res.user))
            return res
      } else {
          dispatch(userInfoRequestFailed())
          if(res.message === "jwt expired"){
            refreshToken()
            customFetch("auth/user", "PATCH", data, {
              'Content-Type': 'application/json',
              'authorization': 'Bearer ' + getCookie('token')
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