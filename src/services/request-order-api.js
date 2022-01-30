import { GET_ORDER_API, GET_ORDER_API_FAILED, GET_ORDER_API_SUCCESS} from './actions/order-number';
import { API_URL } from '../utils/constants';

function getOrderApi(endpoint, data) {
    return function(dispatch) {
      dispatch({
          type: GET_ORDER_API
        })
      fetch(`${API_URL}${endpoint}`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                    },
                body: JSON.stringify({ 
                    "ingredients": data
                }) 
                })
        .then( res  => {return res.json()})
        .then( res => {
          if (res && res.success) {
          dispatch({
              type: GET_ORDER_API_SUCCESS,
              data: res.order.number
            })
      } else {
          dispatch({
              type: GET_ORDER_API_FAILED
              })
      }
  }).catch( err => {
    console.log(err)
      dispatch({
          type: GET_ORDER_API_FAILED
      })
  })
  }
  } 

  export default getOrderApi;