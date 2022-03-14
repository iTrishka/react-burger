import { GET_SELECTED_INGREDIENT, RESET_SELECTED_INGREDIENT } from '../actions/selected-ingredient';
import { IIngredient } from '../types/data';
import { TSelectedIngredient } from '../actions/selected-ingredient';


const initialState: null | IIngredient = null



// Редьюсер отображения выбранного ингредиента
const selectedIngredient  = (state:null | IIngredient = initialState, action: TSelectedIngredient):null | IIngredient => { 
    switch(action.type) {
        case GET_SELECTED_INGREDIENT:
            return action.payload
        case RESET_SELECTED_INGREDIENT:
            return null
        default:
            return state;
 }};

 export default selectedIngredient;