import { API_URL } from '../utils/constants';
import checkResponse from './checkResponse';
import { loadStateFromLocalstorage } from '../components/localstorage';
import {
    userInfoRequestSuccess,
    userInfoRequestFailed,
    userInfoStatus
} from '../services/actions/user-info';


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
              loadStateFromLocalstorage('token', authToken);
              loadStateFromLocalstorage('refreshToken', refreshToken);
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

   




  
