import { API_URL } from '../../utils/constants';
import checkResponse from '../checkResponse';
import {
    getDataApi,
    getDataApiFailed,
    getDataApiSuccess,
} from './data-api';

import { getSelectedIngredient } from "./selected-ingredient";
import {  IIngredient } from '../types/data';
import { Dispatch } from 'redux';


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


  export default getIngredientsAndCurrent;