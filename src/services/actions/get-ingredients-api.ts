import { Dispatch } from 'redux';
import { API_URL } from '../../utils/constants';
import checkResponse from '../checkResponse';
import {
    getDataApi,
    getDataApiFailed,
    getDataApiSuccess,
} from './data-api';


function getIngredientsApi(endpoint:string) {
    return function(dispatch:Dispatch) {
      dispatch(getDataApi())
      fetch(`${API_URL}${endpoint}`)
        .then(checkResponse)
        .then( res => {
          if (res && res.success) {
          dispatch(getDataApiSuccess(res.data))
      } else {
          dispatch(getDataApiFailed())
      }
  }).catch( err => {
      dispatch(getDataApiFailed())
  })
  }
  } 


  export default getIngredientsApi;