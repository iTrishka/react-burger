import { API_URL } from '../../utils/constants';
import checkResponse from '../checkResponse';
import { saveStateInLocalstorage } from '../../components/localstorage';
import { Dispatch } from 'redux';

import {
    userLogoutRequest,
    userLogoutFailed,
    userLogoutSuccess
} from './user-logout';

import {
  resetUserInfo
} from './user-info'




function userLogoutRequestApi(refreshToken: {[key:string]: string}) {
    return function(dispatch: Dispatch) {
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
              saveStateInLocalstorage('token', "");
              saveStateInLocalstorage('refreshToken', "");
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