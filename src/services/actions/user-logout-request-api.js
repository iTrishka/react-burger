import { API_URL } from '../../utils/constants';
import checkResponse from '../checkResponse';
import { setCookie } from '../cookies';

import {
    userLogoutRequest,
    userLogoutFailed,
    userLogoutSuccess
} from './user-logout';

import {
  resetUserInfo
} from './user-info'



function userLogoutRequestApi(refreshToken) {
    return function(dispatch) {
      dispatch(userLogoutRequest())
      fetch(`${API_URL}auth/logout `, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(refreshToken)
      })
        .then(checkResponse)
        .then( res => {
          if (res && res.success) {
            if (res && res.success) {
              setCookie('token', "");
              setCookie('refreshToken', "");
              dispatch(userLogoutSuccess())
              dispatch(resetUserInfo()) 
              return res                
            } else {
                throw res.err
    
            }
      } else {
          dispatch(userLogoutFailed())
          return res
      }
  }).catch( err => {
      dispatch(userLogoutFailed())
      return err
  })
  }
  } 


  export default userLogoutRequestApi;