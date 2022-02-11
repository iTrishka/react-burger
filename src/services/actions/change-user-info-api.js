import { API_URL } from '../../utils/constants';
import checkResponse from '../checkResponse';
import { getCookie } from '../cookies';

import {
    getUserInfo,
    userInfoRequestFailed,
    userInfoRequestSuccess,
} from './user-info';

function changeUserInfoApi(data) {
    return function(dispatch){
      console.log("Пытаемся changeUserInfoApi")
      console.log('Bearer ' + getCookie('refreshToken'))
      dispatch(getUserInfo())
      fetch(`${API_URL}auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + getCookie('token')
          },
        body: JSON.stringify(data)
      })
        .then(checkResponse)
        .then( res => {
          if (res && res.success) {
            dispatch(userInfoRequestSuccess(res.user))
      } else {
          dispatch(userInfoRequestFailed())
      }
      }).catch( err => {
          dispatch(userInfoRequestFailed())
          console.log("провал", err)
        })
  } 
}

export default changeUserInfoApi;