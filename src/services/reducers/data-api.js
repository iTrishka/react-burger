import { GET_DATA_API, GET_DATA_API_FAILED , GET_DATA_API_SUCCESS, SET_DATA_API} from '../actions/data-api';




const initialState = {
    dataApiRequest: false,
    dataApiFailed: false,
    dataApi: []
}


export const dataApiReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_API: {
          return {
            ...state,
            dataApiRequest: true,
            dataApiFailed: false,
          };
        }
        case GET_DATA_API_SUCCESS: {
            return { 
                      ...state, 
                      dataApi: action.payload, 
                      dataApiRequest: false 
                  };
          }
        case GET_DATA_API_FAILED: {
        return { 
                    ...state, 
                    dataApiFailed: true, 
                    dataApiRequest: false 
                };
        }
        case SET_DATA_API: {
            return { 
                        ...state, 
                        dataApi: action.payload
                    };
            }
        default: {
            return state
        }
    }
} 
