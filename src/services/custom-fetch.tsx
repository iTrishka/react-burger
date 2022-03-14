import { API_URL } from '../utils/constants';

export interface ICustomFetch{
  endpoint: string;
  method: string;
  body?: any
  header?: {} | {[name: string]: string}
}

export const customFetch = ({endpoint, method="GET", body="", header={}}:ICustomFetch) =>{
  if(method==="GET"){
    return  fetch(`${API_URL}${endpoint}`, {
      method: 'GET', 
      headers: header,
    })
  }else if(method==="POST" || method==="PATCH"){
      return fetch(`${API_URL}${endpoint} `, {
        method: method, 
        headers: header,
        body: JSON.stringify(body)
      })

  }   
  }
