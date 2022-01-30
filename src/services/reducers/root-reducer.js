import { combineReducers } from "redux";
import constructorList from "./constructor-list";
import selectedIngidient from "./selected-ingedient";
import { orderNumber }  from "./order-number";
import { dataApiReducer } from "./data-api";

const rootReducer = combineReducers({
    dataApiReducer,
    constructorList,
    selectedIngidient,
    orderNumber    
})

export default rootReducer;