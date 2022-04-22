import { TOrderNumberActions } from '../actions/order-number';
import {
    GET_ORDER_API, 
    GET_ORDER_API_FAILED, 
    GET_ORDER_API_SUCCESS, 
    RESET_ORDER } from '../actions/order-number';



export type TOrderNumberInit = {
    orderApiRequest: boolean,
    orderApiFailed: boolean,
    orderNumber: string
}

const initialState:TOrderNumberInit = {
    orderApiRequest: false,
    orderApiFailed: false,
    orderNumber: ""
}
    
 //Редьюсер номера заказа

 export const orderNumber = (state:TOrderNumberInit = initialState, action: TOrderNumberActions):TOrderNumberInit => { 
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
                      orderNumber: action.payload, 
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
                orderApiRequest: false,
                orderApiFailed: false,
                orderNumber: ""
            }
        }
        default: {
            return state
        }
    }
}
 
