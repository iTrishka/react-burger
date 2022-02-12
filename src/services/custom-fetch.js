import { API_URL } from '../utils/constants';
import { setCookie, getCookie } from './cookies';


export function customFetch(endpoint, method="GET", body="", header={}) {
  if(method==="GET"){
    return  fetch(`${API_URL}${endpoint}`, {
      method: 'GET', 
      headers: header,
    })
  }else if(method==="POST" | method==="PATCH"){
      return fetch(`${API_URL}${endpoint} `, {
        method: method, 
        headers: header,
        body: JSON.stringify(body)
      })

  }   
  }
  
//   return  fetch(`${API_URL}${endpoint}`, {
//        method: 'GET', 
//        headers: {
//            'Content-Type': 'application/json',
//            'authorization': 'Bearer ' + getCookie('token')
//          },
//      })



// export function customFetchAuth() {
//    return  fetch(`${API_URL}auth/user`, {
//         method: 'GET', 
//         headers: {
//             'Content-Type': 'application/json',
//             'authorization': 'Bearer ' + getCookie('token')
//           },
//       })
// }


// export function customFetchChangeInfo(data) {
//    return  fetch(`${API_URL}auth/user`, {
//       method: 'PATCH',
//       headers: {
//           'Content-Type': 'application/json',
//           'authorization': 'Bearer ' + getCookie('token')
//         },
//       body: JSON.stringify(data)
//     })
// }
