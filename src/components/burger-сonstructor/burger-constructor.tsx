import React from "react";
import ConstructorIngedient from "../constructor-ingedient/constructor-ingedients";

import styleBurgerConstructor from "./burger-constructor.module.css"

const BurgerConstructor =  () => {
    return(
        <>
            <section className={styleBurgerConstructor.wrapper}> 
                <ConstructorIngedient/>
                <ConstructorIngedient/>     
                <ConstructorIngedient/>
                <div>610 руб </div>
                <button>Оформить заказ</button>
            </section>
        </>
    )
};  


export default BurgerConstructor;