import {GET_INGREDIENTS, GET_INGREDIENTS_CONSTRUCTOR, GET_SELECTED_INGREDIENT, GET_ORDER} from '../actions/ingredients';

const initialState: any = {
    ingridientsList: null,
    ingridientsConstructor: null,
    selectedIngidient: null,
    order: null
  }


const ingredients = (state = initialState , action) => {
    switch(action.type) {
        case GET_INGREDIENTS:
            return {
                ...state,
                ingridientsList: [1, "ingridientsConstructor", 3]
            } 
        case GET_INGREDIENTS_CONSTRUCTOR:
            return {
                ...state,
                ingridientsConstructor: [1, "ingridientsList", 3]
            } 
        case GET_SELECTED_INGREDIENT:
            return {
                ...state,
                selectedIngidient: {1: "один", 2: "two"}
            } 
        case GET_ORDER:
            return {
                ...state,
                order: {1: "один", 2: "two"}
            } 
        default:
            return state;
    }
};




export default ingredients;