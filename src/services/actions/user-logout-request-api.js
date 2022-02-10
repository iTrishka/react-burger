import { API_URL } from '../../utils/constants';
import checkResponse from '../checkResponse';
import { setCookie, getCookie } from '../cookies';

import {
    userLogoutRequest,
    userLogoutFailed,
    userLogoutSuccess
} from './user-logout';



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
              console.log("Successful logout")  
              userLogoutSuccess()                   
            } else {
                throw res.err
            }
      } else {
          dispatch(userLogoutFailed())
      }
  }).catch( err => {
      dispatch(userLogoutFailed())
  })
  }
  } 


  export default userLogoutRequestApi;