import { API_URL } from '../../utils/constants';
import checkResponse from '../checkResponse';
import {
    getDataApi,
    getDataApiFailed,
    getDataApiSuccess,
} from './data-api';

import { getSelectedIngredient } from "../actions/selected-ingredient";


function getIngredientsAndCurrent(id) {
    return function(dispatch) {
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
       const currentIngredient =  res.data.filter((item) => {return item._id === id});
       console.log(currentIngredient[0])
       dispatch(getSelectedIngredient(currentIngredient[0]))
     }
  ).catch( err => {
      dispatch(getDataApiFailed())
  })
  }
  } 


  export default getIngredientsAndCurrent;