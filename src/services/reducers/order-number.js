import {
    GET_ORDER_API, 
    GET_ORDER_API_FAILED, 
    GET_ORDER_API_SUCCESS, 
    RESET_ORDER } from '../actions/order-number';


const initialState = {
    orderApiRequest: false,
    orderApiFailed: false,
    orderNumber: 0
}

 //Редьюсер номера заказа

 export const orderNumber = (state = initialState, action) => { 
    switch(action.type) {
        case GET_ORDER_API: {
            return {
              ...state,
              orderApiRequest: true,
              orderApiFailed: false,
            }
        }
        case GET_ORDER_API_SUCCESS: {
            return { 
                      ...state, 
                      orderNumber: action.data, 
                      orderApiRequest: false 
                  };
          }
        case GET_ORDER_API_FAILED: {
        return { 
                    ...state, 
                    orderApiFailed: true, 
                    orderApiRequest: false 
                };
        }
        case RESET_ORDER: {
            return {
                ...state, 
                orderNumber: 0
            }
        }
        default: {
            return state
        }
    }
}
 
