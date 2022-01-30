export const GET_ORDER_API = 'GET_ORDER_API';
export const GET_ORDER_API_FAILED = 'GET_ORDER_API_FAILED';
export const GET_ORDER_API_SUCCESS = 'GET_ORDER_API_SUCCESS';
export const RESET_ORDER= 'RESET_ORDER';



function getOrderApi(payload) {
    return {
      type: GET_ORDER_API ,
      payload
    }
}

function getOrderFailed() {
    return {
      type: GET_ORDER_API_FAILED,
    }
}

function getOrderSuccess(payload) {
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