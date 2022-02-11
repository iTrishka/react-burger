import { API_URL } from '../utils/constants';
import checkResponse from './checkResponse';
import { setCookie, getCookie } from './cookies';
import {
    getUserInfo,
    userInfoRequestFailed,
    userInfoRequestSuccess,
} from '../services/actions/user-info';




export function refreshToken() { 
    fetch(`${API_URL}token`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({"token": getCookie('refreshToken')})
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
              userInfoRequestSuccess(res.user)
            }
            return res
      } else {
          throw res.err
      }
  }).catch( err => {
      console.log(err)
  })
}


export function apiFetchRefresh(f){
    console.log("INSIDE REFRESH")
    let res = f.apply(this)
    res = res()
    console.log("RES: ", res)
    if (res === 'jwt expired') {
        refreshToken()
        f.apply(this)
    }
}
        




  
