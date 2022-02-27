export const GET_SELECTED_INGREDIENT = 'GET_CURRENT_INGREDIENT';
export const RESET_SELECTED_INGREDIENT = 'RESET_SELECTED_INGREDIENT';


function getSelectedIngredient(payload) {
    return {
      type: GET_SELECTED_INGREDIENT ,
      payload
    }
}

function resetSelectedIngredient() {
    return {
      type: RESET_SELECTED_INGREDIENT 
    }
}

export {
    getSelectedIngredient,
    resetSelectedIngredient
}