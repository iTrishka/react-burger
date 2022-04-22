import { IMessageWS } from '../types/data';

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED'= 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';


export interface IWsConnectionStart{
    readonly type: typeof WS_CONNECTION_START;
}

export interface IWsConnectionSuccess{
    readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsConnectionError{
    readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IWsConnectionClosed{
    readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsGetOrders{
    readonly type: typeof  WS_GET_ORDERS;
    readonly payload: IMessageWS
}

export type TWsConnectionActions = 
IWsConnectionStart |
IWsConnectionSuccess |
IWsConnectionError |
IWsConnectionClosed |
IWsGetOrders |
any;

function wsConnectionStart(payload: string) {
    return {
        type: WS_CONNECTION_START, 
        payload
    }
}

function wsConnectionSuccess() {
    return {
        type: WS_CONNECTION_SUCCESS
    }
}
function wsConnectionError() {
    return {
        type: WS_CONNECTION_ERROR
    }
}
function wsConnectionClosed() {
    return {
        type: WS_CONNECTION_CLOSED
    }
}

function wsGetOrders(message: IMessageWS){
    return  {
        type: WS_GET_ORDERS,
        payload: message        
    }
}

export const wsActions = {
    wsConnectionStart,
    wsConnectionSuccess,
    wsConnectionError, 
    wsConnectionClosed,
    wsGetOrders
}

export {
    wsConnectionStart,
    wsConnectionSuccess,
    wsConnectionError, 
    wsConnectionClosed,
    wsGetOrders
}