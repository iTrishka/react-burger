import { API_URL } from '../../utils/constants';
import checkResponse from '../checkResponse';
import { setCookie } from '../cookies';

import {
    getUserLogin,
    getUserLoginFailed,
} from './user-login';

import { addUserInfo } from './user-info'

function userLoginRequest(endpoint, body) {
    return function(dispatch) {
      dispatch(getUserLogin())
      fetch(`${API_URL}${endpoint}`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(body)
      })
        .then(checkResponse)
        .then( res => {
          if (res && res.success) {
            let authToken;
            let refreshToken;
            if(res.accessToken){
            authToken = res.accessToken.split('Bearer ')[1];
            refreshToken = res.refreshToken
            }
            if(authToken){
              setCookie('token', authToken);
              setCookie('refreshToken', refreshToken);
              dispatch(addUserInfo(res.user))
            }
            
      } else {
          dispatch(getUserLoginFailed())
      }
  }).catch( err => {
      dispatch(getUserLoginFailed())
  })
  }
  } 


  export default userLoginRequest;