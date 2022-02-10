import React, { useState, useCallback, useEffect } from "react";
import { useParams, useRouteMatch} from 'react-router-dom';
import { useSelector } from "react-redux";
import AppHeader from "../components/app-header/app-header"
import { menuItemPropTypes } from '../utils/constants';
import { useDispatch } from "react-redux";
import getIngredientsApi from '../services/actions/get-ingredients-api';

import StyleIngredientDetails from '../components/ingredient-details/ingredient-details';
import StyleIngredient from './ingredient.module.css';
import { getSelectedIngredient } from '../services/actions/selected-ingredient'
import getIngredientsAndCurrent from "../services/actions/get-ingredients-and-current";

export function IngredientPage() {
    const ingredientsList = useSelector(state => state.dataApiReducer.dataApi)
    const {selectedIngredient } = useSelector(store => ({selectedIngredient: store.selectedIngredient}));
    const { id } = useParams()

    const dispatch = useDispatch(); 

    //запрос ингридиентов с API
    React.useEffect(()=> {
        dispatch(getIngredientsAndCurrent(id));
    }, [dispatch])

    return ( selectedIngredient ?
        <>
        <AppHeader/>
        <main>
            <section className={`${StyleIngredient.wrapper}`}>
                <div className={StyleIngredient.card}>
                    <img src={selectedIngredient.image_large} alt={selectedIngredient.name} className={`mr-4`}/>
                    <p className={`text text_type_main-medium mb-4`}>
                    {selectedIngredient.name}</p>
                    <p className="text text_type_main-small mb-4">
                        Превосходные котлеты из марсианской Магнолии для фирменных космических бургеров, набирающий популярность по всей вселенной
                    </p>
                    <ul className={`${StyleIngredient.modalProps} pl-1 mt-8`}>
                        <li className={`mr-5`}>
                        <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                        <p className="text text_type_main-default text_color_inactive">{selectedIngredient.calories}</p>
                        </li >
                        <li className={`mr-5`}>
                        <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                        <p className="text text_type_main-default text_color_inactive">{selectedIngredient.proteins}</p>
                        </li>
                        <li className={`mr-5`}>
                        <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                        <p className="text text_type_main-default text_color_inactive">{selectedIngredient.fat}</p>
                        </li>
                        <li>
                        <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                        <p className="text text_type_main-default text_color_inactive">{selectedIngredient.carbohydrates}</p>
                        </li>
                    </ul>
                </div>
                </section>
        </main>
        </>
        
     :  (<><AppHeader/></>)
     )
}

// IngredientPage.propTypes  = {
//     selectedIngredient: menuItemPropTypes.isRequired
// }


