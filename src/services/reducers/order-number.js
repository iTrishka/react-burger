import {GET_ORDER, RESET_ORDER} from '../actions/order-number';

const initialState = 0

 //Редьюсер номера заказа

const orderNumber = (state = initialState, action) => { 
    switch(action.type) {
        case GET_ORDER:
            return action.payload
        case RESET_ORDER:
            return 0
        default:
            return state;
 }};


export default orderNumber;