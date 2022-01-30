export const GET_INGREDIENTS_CONSTRUCTOR_BUN = 'GET_INGREDIENTS_CONSTRUCTOR_BUN';
export const GET_INGREDIENTS_CONSTRUCTOR_MAIN = 'GET_INGREDIENTS_CONSTRUCTOR_MAIN';
export const ADD_INGREDIENTS_CONSTRUCTOR_MAIN ="ADD_INGREDIENTS_CONSTRUCTOR_MAIN";
export const RESET_INGREDIENTS_CONSTRUCTOR ="RESET_INGREDIENTS_CONSTRUCTOR";
export const SORT_INGREDIENTS_CONSTRUCTOR ="SORT_INGREDIENTS_CONSTRUCTOR";


function get_ingredients_constructor_bun(payload) {
    return {
      type: GET_INGREDIENTS_CONSTRUCTOR_BUN,
      payload
    }
}

function get_ingredients_constructor_main(payload) {
    return {
      type: GET_INGREDIENTS_CONSTRUCTOR_MAIN,
      payload
    }
}

function add_ingredients_constructor_main(payload) {
    return {
      type: ADD_INGREDIENTS_CONSTRUCTOR_MAIN,
      payload
    }
}

function reset_ingredients_constructor() {
    return {
      type: RESET_INGREDIENTS_CONSTRUCTOR
    }
}

function sort_ingredients_constructor(payload) {
    return {
      type: SORT_INGREDIENTS_CONSTRUCTOR,
      payload
    }
}


export {
    get_ingredients_constructor_bun, 
    get_ingredients_constructor_main, 
    add_ingredients_constructor_main,
    reset_ingredients_constructor,
    sort_ingredients_constructor }