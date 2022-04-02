import { IDataApi } from "../reducers/data-api";
import { IIngredient } from "../types/data";
import { Dispatch } from 'redux';
import { API_URL } from '../../utils/constants';
import checkResponse from '../checkResponse';
import { getSelectedIngredient } from "./selected-ingredient";

export const GET_DATA_API: 'GET_DATA_API' = 'GET_DATA_API';
export const GET_DATA_API_FAILED: 'GET_DATA_API_FAILED' = 'GET_DATA_API_FAILED';
export const GET_DATA_API_SUCCESS: 'GET_DATA_API_SUCCESS' = 'GET_DATA_API_SUCCESS';
export const SET_DATA_API: 'SET_DATA_API'= 'SET_DATA_API';

export interface IGetDataApi{
  readonly type: typeof GET_DATA_API
}
export interface IGetDataApiFailed{
  readonly type: typeof GET_DATA_API_FAILED
}
export interface IGetDataApiSuccess{
  readonly type: typeof GET_DATA_API_SUCCESS
  dataApi: Array<IIngredient>
}
export interface ISetDataApi{
  readonly type: typeof SET_DATA_API
  dataApi: Array<IIngredient>
}

export type TDataApiActions = 
    IGetDataApi | 
    IGetDataApiFailed |
    IGetDataApiSuccess | 
    ISetDataApi |
    any;

function getDataApi() {
    return {
      type: GET_DATA_API
    }
}

function getDataApiFailed() {
    return {
      type: GET_DATA_API_FAILED,
    }
}

function getDataApiSuccess(payload:IDataApi) {
    return {
      type: GET_DATA_API_SUCCESS,
      payload
    }
}

function setDataApi(payload: IIngredient[]) {
    return {
      type: SET_DATA_API,
      payload
    }
}


function getIngredientsApi(endpoint:string) {
  return function(dispatch:Dispatch) {
    dispatch(getDataApi())
    fetch(`${API_URL}${endpoint}`)
      .then(checkResponse)
      .then( res => {
        if (res && res.success) {
        dispatch(getDataApiSuccess(res.data))
    } else {
        dispatch(getDataApiFailed())
    }
}).catch( err => {
    dispatch(getDataApiFailed())
})
}
} 

function getIngredientsAndCurrent(id:string) {
  return function(dispatch: Dispatch) {
    dispatch(getDataApi())
    fetch(`${API_URL}ingredients`)
      .then(checkResponse)
      .then( res => {
        if (res && res.success) {
        dispatch(getDataApiSuccess(res.data))
        return res
    } else {
        dispatch(getDataApiFailed())
    }
   }).then(res => {
     console.log(res)
     const currentIngredient =  res?.data.filter((item:IIngredient) => {return item._id === id});
     dispatch(getSelectedIngredient(currentIngredient[0]))
   }
).catch( err => {
    dispatch(getDataApiFailed())
})
}
} 


export {
    getDataApi,
    getDataApiFailed,
    getDataApiSuccess,
    setDataApi, 
    getIngredientsApi, 
    getIngredientsAndCurrent
}
