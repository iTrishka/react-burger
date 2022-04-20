import * as actionType from '../actions/websockets';
import { wsConnection } from './websockets';

describe('wsConnection reducer', () => {
    it('Должен вернуть начальное состояние', () => {
        expect(wsConnection(undefined, {})).toEqual({
            wsConnected: false,
            orders: [],
            total: null,
            totalToday: null
        })
    })
});

it('Should show status success wsConnection', () => {
    expect(wsConnection({
        wsConnected: false,
        orders: [],
        total: null,
        totalToday: null,
        error: undefined
    }, {
            type: actionType.WS_CONNECTION_SUCCESS
        }
    )).toEqual({
        orders: [],
        total: null,
        totalToday: null,
        error: undefined,
        wsConnected: true
    })
})

it('Should show status failed wsConnection', () => {
    expect(wsConnection({
        wsConnected: false,
        orders: [],
        total: null,
        totalToday: null,
        error: undefined
    }, {
            type: actionType.WS_CONNECTION_ERROR,
            payload: "error"
        }
    )).toEqual({
        orders: [],
        total: null,
        totalToday: null,
        error: "error",
        wsConnected: false
    })
})

it('Should show status close wsConnection', () => {
    expect(wsConnection({
        wsConnected: true,
        orders: [],
        total: null,
        totalToday: null,
        error: undefined
    }, {
            type: actionType.WS_CONNECTION_CLOSED
        }
    )).toEqual({
        total: null,
        totalToday: null,
        error: undefined,
        orders: [],
        wsConnected: false,
    })
})

it('Should get orders from back wsConnection', () => {
    expect(wsConnection({
        wsConnected: true,
        orders: [],
        total: null,
        totalToday: null
    }, {
            type: actionType.WS_GET_ORDERS,
            payload: {
                orders: [
                    {
                        createdAt: "2022-04-20T17:08:12.318Z",
                        ingredients: ["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733cd"],
                        name: "Флюоресцентный space бургер",
                        number: 14251,
                        status: "done",
                        updatedAt: "2022-04-20T17:08:12.640Z",
                        _id: "62603dfca4b934001d58c78a"
                    },
                    {
                        createdAt: "2022-04-20T17:07:15.120Z",
                        ingredients: ["60d3b41abdacab0026a733cd", "60d3b41abdacab0026a733cf", "60d3b41abdacab0026a733cb"],
                        name: "Антарианский флюоресцентный био-марсианский space бургер",
                        number: 14250,
                        status: "done",
                        updatedAt: "2022-04-20T17:07:15.381Z",
                        _id: "62603dc3a4b934001d58c786",
                    }
                ],
                success: true,
                total: 14164,
                totalToday: 130
                            }
        }
    )).toEqual({
        wsConnected: true,
        orders: [
            {
                createdAt: "2022-04-20T17:08:12.318Z",
                ingredients: ["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733cd"],
                name: "Флюоресцентный space бургер",
                number: 14251,
                status: "done",
                updatedAt: "2022-04-20T17:08:12.640Z",
                _id: "62603dfca4b934001d58c78a"
            },
            {
                createdAt: "2022-04-20T17:07:15.120Z",
                ingredients: ["60d3b41abdacab0026a733cd", "60d3b41abdacab0026a733cf", "60d3b41abdacab0026a733cb"],
                name: "Антарианский флюоресцентный био-марсианский space бургер",
                number: 14250,
                status: "done",
                updatedAt: "2022-04-20T17:07:15.381Z",
                _id: "62603dc3a4b934001d58c786",
            }
        ],
        total: 14164,
        totalToday: 130
    })
})