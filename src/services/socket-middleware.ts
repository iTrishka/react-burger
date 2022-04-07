import type { Middleware, MiddlewareAPI } from "redux";
import { wsConnectionError, wsConnectionSuccess, wsGetOrders } from "./actions/websockets";
import type { AppDispatch, TAppActions, TRootState } from "./types";

export const socketMiddleware  = (wsURL: string): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, TRootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TAppActions) => {
            const { dispatch, getState }  = store; 
            const { type, payload } = action;

            if(type === 'WS_CONNECTION_START'){
                socket = new WebSocket(wsURL);
            }
            if(socket){
                //функция вызывается при открытии сокета
                socket.onopen = event => {
                    dispatch(wsConnectionSuccess())
                };

                //функция вызывается при ошибке соединения
                socket.onerror = event => {
                    dispatch(wsConnectionError)
                };

                //функция вызывается при получении события от сервера
                socket.onmessage = event => {
                    const {data} = event;
                    const parsedData = JSON.parse(data);
                    dispatch(wsGetOrders(parsedData))
                }
            } 
            next (action)
        }; 
    }) as Middleware
};