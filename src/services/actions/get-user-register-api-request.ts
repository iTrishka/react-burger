import { API_URL } from '../../utils/constants';
import checkResponse from '../checkResponse';
import { customFetch } from '../custom-fetch';
import { IUserInfo } from '../types/data';
import { Dispatch } from 'redux';


import {
    getUserRegisterApi,
    getUserRegisterApiFailed,
    getUserRegisterApiSuccess,
} from './user-register-api';

import {
  addUserInfo
} from './user-info'


function getUserRegisterApiRequest(endpoint:string, body:IUserInfo ) {
    return function(dispatch:Dispatch) {
      dispatch(getUserRegisterApi())
      customFetch({endpoint, method: "POST", body})
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
          dispatch(addUserInfo(res.user))
      } else {
          dispatch(getUserRegisterApiFailed())
      }
  }).catch( err => {
      dispatch(getUserRegisterApiFailed())
  })
  }
  } 


  export default getUserRegisterApiRequest;