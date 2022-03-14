import { IDataApi } from "../reducers/data-api";
import { IIngredient } from "../types/data";

export const GET_DATA_API = 'GET_DATA_API';
export const GET_DATA_API_FAILED = 'GET_DATA_API_FAILED';
export const GET_DATA_API_SUCCESS = 'GET_DATA_API_SUCCESS';
export const SET_DATA_API= 'SET_DATA_API';

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

export type TDataApi = 
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

export {
    getDataApi,
    getDataApiFailed,
    getDataApiSuccess,
    setDataApi
}
