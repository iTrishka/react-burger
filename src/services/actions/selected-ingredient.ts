import { IIngredient } from "../types/data";

export const GET_SELECTED_INGREDIENT: 'GET_SELECTED_INGREDIENT' = 'GET_SELECTED_INGREDIENT';
export const RESET_SELECTED_INGREDIENT: 'RESET_SELECTED_INGREDIENT' = 'RESET_SELECTED_INGREDIENT';

export interface IGetSelectedIngredient {
  readonly type: typeof GET_SELECTED_INGREDIENT,
  selectedIngredient: IIngredient
}
export interface IResetSelectedIngredient {
  readonly type: typeof RESET_SELECTED_INGREDIENT
}

export type TSelectedIngredientActions = 
    IGetSelectedIngredient | 
    IResetSelectedIngredient |
    any;


function getSelectedIngredient(payload: IIngredient) {
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