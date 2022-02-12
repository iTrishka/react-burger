export const GET_INGREDIENTS_CONSTRUCTOR_BUN = 'GET_INGREDIENTS_CONSTRUCTOR_BUN';
export const GET_INGREDIENTS_CONSTRUCTOR_MAIN = 'GET_INGREDIENTS_CONSTRUCTOR_MAIN';
export const ADD_INGREDIENTS_CONSTRUCTOR_MAIN ="ADD_INGREDIENTS_CONSTRUCTOR_MAIN";
export const RESET_INGREDIENTS_CONSTRUCTOR ="RESET_INGREDIENTS_CONSTRUCTOR";
export const SORT_INGREDIENTS_CONSTRUCTOR ="SORT_INGREDIENTS_CONSTRUCTOR";


function getIngredientsConstructorBun(payload) {
    return {
      type: GET_INGREDIENTS_CONSTRUCTOR_BUN,
      payload
    }
}

function getIngredientsConstructorMain(payload) {
    return {
      type: GET_INGREDIENTS_CONSTRUCTOR_MAIN,
      payload
    }
}

function addIngredientsConstructorMain(payload) {
    return {
      type: ADD_INGREDIENTS_CONSTRUCTOR_MAIN,
      payload
    }
}

function resetIngredientsConstructor() {
    return {
      type: RESET_INGREDIENTS_CONSTRUCTOR
    }
}

function sortSngredientsConstructor(payload) {
    return {
      type: SORT_INGREDIENTS_CONSTRUCTOR,
      payload
    }
}


export {
    getIngredientsConstructorBun, 
    getIngredientsConstructorMain, 
    addIngredientsConstructorMain,
    resetIngredientsConstructor,
    sortSngredientsConstructor }