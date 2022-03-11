export const GET_ORDER_API = 'GET_ORDER_API';
export const GET_ORDER_API_FAILED = 'GET_ORDER_API_FAILED';
export const GET_ORDER_API_SUCCESS = 'GET_ORDER_API_SUCCESS';
export const RESET_ORDER= 'RESET_ORDER';

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

export type TOrderNumber = 
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

export {
    getOrderApi,
    getOrderFailed,
    getOrderSuccess,
    resetOrder
}