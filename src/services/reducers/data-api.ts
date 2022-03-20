import {GET_DATA_API , GET_DATA_API_FAILED , GET_DATA_API_SUCCESS, SET_DATA_API} from '../actions/data-api';
import { IIngredient } from '../types/data';
import { TDataApiActions } from '../actions/data-api';

export interface IDataApi {
    dataApiRequest: boolean,
    dataApiFailed: boolean,
    dataApi: Array<IIngredient> | []
}

const initialState = {
    dataApiRequest: false,
    dataApiFailed: false,
    dataApi: []
}


export const dataApiReducer = (state:IDataApi = initialState, action: TDataApiActions ): IDataApi => {
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
