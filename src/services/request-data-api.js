import { GET_DATA_API, GET_DATA_API_FAILED , GET_DATA_API_SUCCESS} from './actions/data-api';
import { API_URL } from '../utils/constants';

function getDataApi(endpoint) {
    return function(dispatch) {
      dispatch({
          type: GET_DATA_API
        })
      fetch(`${API_URL}${endpoint}`).then( res  => {return res.json()})
        .then( res => {
          if (res && res.success) {
          dispatch({
              type: GET_DATA_API_SUCCESS,
              data: res.data
            })
      } else {
        console.log(res)
          dispatch({
              type: GET_DATA_API_FAILED
              })
      }
  }).catch( err => {
    console.log(err)
      dispatch({
          type: GET_DATA_API_FAILED
      })
  })
  }
  } 


  export default getDataApi;