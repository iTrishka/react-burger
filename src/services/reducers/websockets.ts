import {
    WS_CONNECTION_SUCCESS, 
    WS_CONNECTION_PROFILE_START,
    WS_CONNECTION_ERROR, 
    WS_CONNECTION_CLOSED,
    WS_GET_ORDERS
} from '../actions/websockets';

import { TWsConnectionActions } from '../actions/websockets';
import { TOrder, IMessageWS } from '../types/data';


const wsConnectionState: IMessageWS = {
    wsConnected: false,
    orders: [],
    total: null,
    totalToday: null
}

export const wsConnection = (state: IMessageWS =wsConnectionState, action: TWsConnectionActions):IMessageWS => {
    switch(action.type) {
        case WS_CONNECTION_SUCCESS: {
            return{
                ...state,
                error: undefined,
                wsConnected: true
            }
        }
        case WS_CONNECTION_ERROR: {
            return{
                ...state,
                error: action.payload,
                wsConnected: false
            }
        }
        case WS_CONNECTION_CLOSED: {
            return {
                ...state,
                wsConnected: false
            };
        }
        case WS_GET_ORDERS: {
            return{
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday
            }
        }        
        default: {
            return state
        }
    }
} 