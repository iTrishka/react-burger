import { combineReducers} from "redux";
import ingredientsList from "./ingredients-list";
import constructorList from "./constructor-list";
import selectedIngidient from "./selected-ingedient";
import orderNumber from "./order-number";

const rootReducer = combineReducers({
    ingredientsList,
    constructorList,
    selectedIngidient,
    orderNumber
})

export default rootReducer;