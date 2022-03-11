import { API_URL } from '../utils/constants';
import checkResponse from './checkResponse';
import { saveStateInLocalstorage, loadStateFromLocalstorage } from '../components/localstorage';
import {
    userInfoRequestSuccess,
    userInfoRequestFailed,
    userInfoStatus
} from './actions/user-info';


export function refreshToken() { 
    fetch(`${API_URL}auth/token`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({"token": loadStateFromLocalstorage('refreshToken')})
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
              saveStateInLocalstorage('token', authToken);
              saveStateInLocalstorage('refreshToken', refreshToken);
              userInfoRequestSuccess(res.user)
            }
            return res
      } else {
        userInfoRequestFailed()
        userInfoStatus(res.status)
      }
  }).catch( err => {
      userInfoRequestFailed()
      userInfoStatus(err.status)
  })
}

   




  
