
import { AppThunk } from '../types';
import { loadStateFromLocalstorage } from '../../components/localstorage';
import { API_URL } from '../../utils/constants';
import checkResponse from '../checkResponse';

export const GET_ORDER_API: 'GET_ORDER_API' = 'GET_ORDER_API';
export const GET_ORDER_API_FAILED: 'GET_ORDER_API_FAILED' =  'GET_ORDER_API_FAILED';
export const GET_ORDER_API_SUCCESS: 'GET_ORDER_API_SUCCESS' = 'GET_ORDER_API_SUCCESS';
export const RESET_ORDER: 'RESET_ORDER'= 'RESET_ORDER';

export interface IGetOrderApi{
  readonly type: typeof GET_ORDER_API
}
export interface IGetOrderFailed{
  readonly type: typeof GET_ORDER_API_FAILED
}
export interface IGetOrderSuccess{
  readonly type: typeof GET_ORDER_API_SUCCESS;
  orderNumber: string
}
export interface IResetOrder{
  readonly type: typeof GET_ORDER_API_SUCCESS
}

export type TOrderNumberActions = 
    IGetOrderApi | 
    IGetOrderFailed |
    IGetOrderSuccess | 
    IResetOrder |
    any;

function getOrderApi() {
    return {
      type: GET_ORDER_API 
    }
}

function getOrderFailed() {
    return {
      type: GET_ORDER_API_FAILED,
    }
}

function getOrderSuccess(payload: string) {
    return {
      type: GET_ORDER_API_SUCCESS,
      payload
    }
}

function resetOrder() {
    return {
      type: RESET_ORDER,
    }
}

const getOrder:AppThunk = (endpoint:string, data:Array<string>) => {
  return function(dispatch) {
    dispatch(getOrderApi())
    fetch(`${API_URL}${endpoint}`, { 
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                  'Authorization': 'Bearer ' + loadStateFromLocalstorage('token')
                  },
              body: JSON.stringify({ 
                  "ingredients": data
              }) 
              })
      .then(checkResponse)
      .then( res => {
        if (res && res.success) {
        dispatch(getOrderSuccess(res.order!.number))
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

export {
    getOrderApi,
    getOrderFailed,
    getOrderSuccess,
    resetOrder, 
    getOrder
}