import { GET_SELECTED_INGREDIENT, RESET_SELECTED_INGREDIENT } from '../actions/selected-ingedient';

const initialState = {
    selectedIngidient: null
}

// Редьюсер отображения выбранного ингредиента
const selectedIngidient = (state = initialState.selectedIngidient, action) => { 
    switch(action.type) {
        case GET_SELECTED_INGREDIENT:
            return action.payload
        case RESET_SELECTED_INGREDIENT:
            return null
        default:
            return state;
 }};

 export default selectedIngidient;