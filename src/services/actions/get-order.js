import { API_URL } from '../../utils/constants';
import checkResponse from '../checkResponse';

import {
  getOrderApi,
  getOrderFailed,
  getOrderSuccess,
} from './order-number'

function getOrder(endpoint, data) {
    return function(dispatch) {
      dispatch(getOrderApi())
      fetch(`${API_URL}${endpoint}`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                    },
                body: JSON.stringify({ 
                    "ingredients": data
                }) 
                })
        .then(checkResponse)
        .then( res => {
          if (res && res.success) {
          dispatch(getOrderSuccess(res.order.number))
          return res
      } else {
          dispatch(getOrderFailed())
          return res
      }
  }).catch( err => {
       dispatch(getOrderFailed())
       return err
  })
  }
  } 

  export default getOrder;