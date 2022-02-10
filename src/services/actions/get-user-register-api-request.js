import { API_URL } from '../../utils/constants';
import checkResponse from '../checkResponse';

import {
    getUserRegisterApi,
    getUserRegisterApiFailed,
    getUserRegisterApiSuccess,
} from './user-register-api';

function getUserRegisterApiRequest(endpoint, body) {
    return function(dispatch) {
      dispatch(getUserRegisterApi())
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
          dispatch(getUserRegisterApiSuccess(res))
      } else {
          dispatch(getUserRegisterApiFailed())
      }
  }).catch( err => {
      dispatch(getUserRegisterApiFailed())
  })
  }
  } 


  export default getUserRegisterApiRequest;