import { API_URL } from '../../utils/constants';
import checkResponse from '../checkResponse';
import { setCookie, getCookie } from '../cookies';


export function refreshToken(body) {
    return function(dispatch) {
      fetch(`${API_URL}token`, {
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
            }
      } else {
          throw res.err
      }
  }).catch( err => {
      console.log(err)
  })
  }
  } 

  
