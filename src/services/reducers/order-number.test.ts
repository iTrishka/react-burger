import * as actionType from '../actions/order-number';
import { orderNumber } from './order-number';


describe('orderNumber reducer', () => {
    it('Должен вернуть начальное состояние', () => {
        expect(orderNumber(undefined, {})).toEqual({
            orderApiRequest: false,
            orderApiFailed: false,
            orderNumber: ""
        })
    })
});

it('Should show the status at the begginning of the request', () => {
    expect(orderNumber({
            orderApiRequest: false,
            orderApiFailed: false,
            orderNumber: ""
        }, {
            type: actionType.GET_ORDER_API           
        }
    )).toEqual({
        orderApiRequest: true,
        orderApiFailed: false,
        orderNumber: ""
    })
})

it('Should add the incoming order', () => {
    expect(orderNumber({
            orderApiRequest: true,
            orderApiFailed: false,
            orderNumber: ""
        }, {
            type: actionType.GET_ORDER_API_SUCCESS,
            payload: "900"          
        }
    )).toEqual({
        orderApiRequest: false,
        orderApiFailed: false,
        orderNumber: "900" 
    })
})

it('should show the error status', () => {
    expect(orderNumber({
        orderApiRequest: true,
        orderApiFailed: false,
        orderNumber: ""
        }, {
            type: actionType.GET_ORDER_API_FAILED          
        }
    )).toEqual({
        orderNumber: "",
        orderApiRequest: false,
        orderApiFailed: true
    })
})

it('Reset order', () => {
    expect(orderNumber({
        orderApiRequest: false,
        orderApiFailed: false,
        orderNumber: "900"           
        }, {
            type: actionType.RESET_ORDER,
        }
    )).toEqual({
        orderApiRequest: false,
        orderApiFailed: false,
        orderNumber: ""  
    })
})
