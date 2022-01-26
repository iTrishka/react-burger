import { GET_INGREDIENTS } from '../actions/ingredients-list';

const initialState = {
    ingredientsList: null
}

// Редьюсер списка ингридиентов
const ingredientsList = (state = initialState, action) => { 
    switch(action.type) {
        case GET_INGREDIENTS:
            return [...action.payload.data.map(item => ({...item, "key": '', counter: 0 }))]  
        default:
            return state;
 }};

 export default ingredientsList;