import React from "react";
import { useParams } from 'react-router-dom';
import { useAppSelector, useDispatch } from "../../services/hooks";

import StyleIngredient from './ingredient.module.css';
import { getIngredientsAndCurrent } from "../../services/actions/data-api";

export function IngredientPage(){
    const {selectedIngredient } = useAppSelector(state=> ({selectedIngredient: state.selectedIngredient}));
    const { ingredientId }: {[name: string] : string} = useParams()
    const dispatch = useDispatch(); 

    //запрос ингридиентов с API
    React.useEffect(()=> {
        dispatch(getIngredientsAndCurrent(ingredientId));
    }, [dispatch, ingredientId])

    return (selectedIngredient ?  <>
        <main>
            <section className={`${StyleIngredient.wrapper}`}>
                <div className={StyleIngredient.card}>
                    <img src={selectedIngredient!.image_large} alt={selectedIngredient!.name} className={`mr-4`}/>
                    <p className={`text text_type_main-medium mb-4`}>
                    {selectedIngredient!.name}</p>
                    <p className="text text_type_main-small mb-4">
                        Превосходные котлеты из марсианской Магнолии для фирменных космических бургеров, набирающий популярность по всей вселенной
                    </p>
                    <ul className={`${StyleIngredient.modalProps} pl-1 mt-8`}>
                        <li className={`mr-5`}>
                        <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                        <p className="text text_type_main-default text_color_inactive">{selectedIngredient!.calories}</p>
                        </li >
                        <li className={`mr-5`}>
                        <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                        <p className="text text_type_main-default text_color_inactive">{selectedIngredient!.proteins}</p>
                        </li>
                        <li className={`mr-5`}>
                        <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                        <p className="text text_type_main-default text_color_inactive">{selectedIngredient!.fat}</p>
                        </li>
                        <li>
                        <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                        <p className="text text_type_main-default text_color_inactive">{selectedIngredient!.carbohydrates}</p>
                        </li>
                    </ul>
                </div>
                </section>
        </main> </>: <></> 
     )
}



