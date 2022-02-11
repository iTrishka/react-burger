import { API_URL } from '../../utils/constants';
import checkResponse from '../checkResponse';

import {
  getOrderApi,
  getOrderFailed,
  getOrderSuccess,
} from './order-number'

function getOrder(endpoint, data) {
    return function(dispatch) {
      console.log("Пытаемся getOrder")
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
      } else {
          dispatch(getOrderFailed())
      }
  }).catch( err => {
    console.log(err)
       dispatch(getOrderFailed())
  })
  }
  } 

  export default getOrder;