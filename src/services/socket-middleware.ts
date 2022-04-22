import type { Middleware, MiddlewareAPI } from "redux";
import { TWsConnectionActions } from "./actions/websockets";
import type { AppDispatch, TAppActions, TRootState } from "./types";
import { WS_CONNECTION_START } from '../services/actions/websockets';

export const socketMiddleware  = (wsActions: TWsConnectionActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, TRootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TAppActions) => {
            const { dispatch }  = store; 
            const { type, payload } = action;
            const { 
                wsConnectionSuccess,
                wsConnectionError, 
                wsConnectionClosed,
                wsGetOrders
            } = wsActions;

            if(type === WS_CONNECTION_START) {
                socket = new WebSocket(payload);
            }
                
            if(socket){
                //функция вызывается при открытии сокета
                socket.onopen = () => {
                    dispatch(wsConnectionSuccess())
                };

                //функция вызывается при ошибке соединения
                socket.onerror = () => {
                    dispatch(wsConnectionError)
                };

                //функция вызывается при получении события от сервера
                socket.onmessage = event => {
                    const {data} = event;
                    const parsedData = JSON.parse(data);
                    dispatch(wsGetOrders(parsedData))
                };
                //функция вызывается при получении закрытии
                socket.onclose = event => {
                    dispatch(wsConnectionClosed)
                }
            } 
            next (action)
        }; 
    }) as Middleware
};