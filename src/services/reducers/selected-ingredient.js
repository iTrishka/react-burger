import { GET_SELECTED_INGREDIENT, RESET_SELECTED_INGREDIENT } from '../actions/selected-ingredient';

const initialState = null

// Редьюсер отображения выбранного ингредиента
const selectedIngredient = (state = initialState, action) => { 
    switch(action.type) {
        case GET_SELECTED_INGREDIENT:
            return action.payload
        case RESET_SELECTED_INGREDIENT:
            return null
        default:
            return state;
 }};

 export default selectedIngredient;