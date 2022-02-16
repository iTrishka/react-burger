import { API_URL } from '../utils/constants';


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
