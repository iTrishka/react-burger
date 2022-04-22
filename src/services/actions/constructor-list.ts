import { IIngredient } from "../types/data";

export const GET_INGREDIENTS_CONSTRUCTOR_BUN: 'GET_INGREDIENTS_CONSTRUCTOR_BUN' = 'GET_INGREDIENTS_CONSTRUCTOR_BUN';
export const GET_INGREDIENTS_CONSTRUCTOR_MAIN: 'GET_INGREDIENTS_CONSTRUCTOR_MAIN' = 'GET_INGREDIENTS_CONSTRUCTOR_MAIN';
export const ADD_INGREDIENTS_CONSTRUCTOR_MAIN: "ADD_INGREDIENTS_CONSTRUCTOR_MAIN" ="ADD_INGREDIENTS_CONSTRUCTOR_MAIN";
export const RESET_INGREDIENTS_CONSTRUCTOR: "RESET_INGREDIENTS_CONSTRUCTOR" ="RESET_INGREDIENTS_CONSTRUCTOR";
export const SORT_INGREDIENTS_CONSTRUCTOR: "SORT_INGREDIENTS_CONSTRUCTOR" ="SORT_INGREDIENTS_CONSTRUCTOR";

export interface IGetIngredientsConstructorBun{
  readonly type: typeof GET_INGREDIENTS_CONSTRUCTOR_BUN
  bun: Array<IIngredient>
}
export interface IGetIngredientsConstructorMain{
  readonly type: typeof GET_INGREDIENTS_CONSTRUCTOR_MAIN
  main: Array<IIngredient>
}
export interface IAddIngredientsConstructorMain{
  readonly type: typeof ADD_INGREDIENTS_CONSTRUCTOR_MAIN
  main: IIngredient
}
export interface IResetIngredientsConstructor{
  readonly type: typeof RESET_INGREDIENTS_CONSTRUCTOR
}
export interface ISortIngredientsConstructor{
  readonly type: typeof SORT_INGREDIENTS_CONSTRUCTOR;
  main: IIngredient[]
}

export type TConstructorListActions = 
    IGetIngredientsConstructorBun | 
    IGetIngredientsConstructorMain |
    IAddIngredientsConstructorMain | 
    IResetIngredientsConstructor |
    ISortIngredientsConstructor |
    any;



function getIngredientsConstructorBun(payload:IIngredient) {
    return {
      type: GET_INGREDIENTS_CONSTRUCTOR_BUN,
      payload
    }
}

function getIngredientsConstructorMain(payload:IIngredient[]) {
    return {
      type: GET_INGREDIENTS_CONSTRUCTOR_MAIN,
      payload
    }
}

function addIngredientsConstructorMain(payload:IIngredient) {
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

function sortIngredientsConstructor(payload:IIngredient[]) {
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
    sortIngredientsConstructor }