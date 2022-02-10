import { API_URL } from '../../utils/constants';
import checkResponse from '../checkResponse';
import { getCookie } from '../cookies';

import {
    getUserInfo,
    userInfoRequestFailed,
    userInfoRequestSuccess,
} from './user-info';

 function getUserInfoApi() {
    return function(dispatch){
      console.log('Bearer ' + getCookie('refreshToken'))
      dispatch(getUserInfo())
      fetch(`${API_URL}auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + getCookie('token')
          },
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


export default getUserInfoApi;