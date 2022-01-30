export const GET_DATA_API = 'GET_DATA_API';
export const GET_DATA_API_FAILED = 'GET_DATA_API_FAILED';
export const GET_DATA_API_SUCCESS = 'GET_DATA_API_SUCCESS';
export const SET_DATA_API= 'SET_DATA_API';


function getDataApi(payload) {
    return {
      type: GET_DATA_API ,
      payload
    }
}

function getDataApiFailed() {
    return {
      type: GET_DATA_API_FAILED,
    }
}

function getDataApiSuccess(payload) {
    return {
      type: GET_DATA_API_SUCCESS,
      payload
    }
}

function setDataApi(payload) {
    return {
      type: SET_DATA_API,
      payload
    }
}

export {
    getDataApi,
    getDataApiFailed,
    getDataApiSuccess,
    setDataApi
}
