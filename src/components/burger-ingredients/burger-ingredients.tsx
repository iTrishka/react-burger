import React from "react";
import IngredientsFilter from "../ingredients-filter/ingredients-filter";
import Ingredients from "../ingredients/ingredients";

import styleBurgerIngredient from "./burger-ingredients.module.css";

const BurgerIngredients=  () => {
    return(
        <section className={styleBurgerIngredient.wrapper}>
            <h1> Соберите бургер</h1>
            <IngredientsFilter/>
            <div>
                <Ingredients/>
                <Ingredients/>
                <Ingredients/>
            </div>
        </section>
    )
};  


export default BurgerIngredients;