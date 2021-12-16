import React from "react";
import { Tab, Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

import styleBurgerIngredient from "./burger-ingredients.module.css";


const BurgerIngredients =  ({data}) => {
    const [current, setCurrent] = React.useState('one')

    const ingredientCard = (card) => {

        return(
            <div key={card.id} className={`${styleBurgerIngredient.ingedientCard} mr-4 mt-5 mb-10`} >
                <img src={card.image} alt={card.name} className={`mr-4`}/>
                <Counter count={1} size="default" />
                <div className={`mt-1`} style={{ display: 'flex' }}>
                    <p className={`text text_type_digits-default mt-1 mr-2` }  style={{ display: 'inline' }}>{card.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={`mt-1`} style={{ textAlign: 'center' }}>{card.name}</div>
            </div>
        )

    }
    
    const bunList = data.filter((item)=> { return item.type === "bun"});
    const mainList = data.filter((item)=> { return item.type === "main"});
    const sauce = data.filter((item)=> { return item.type === "sauce"});
    console.log(bunList.length)
    return(
        <section className={`${styleBurgerIngredient.wrapper} mt-10 mb-10 mr-10`}>
            <p className="text text_type_main-large mt-40">
                Соберите бургер
            </p>
            <div className={`mt-5`} style={{ display: 'flex' }} >
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    <p className="text text_type_main-default">
                         Булки
                    </p>
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    <p className="text text_type_main-default">
                         Соусы
                    </p>
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    <p className="text text_type_main-default">
                         Начинки
                    </p>
                </Tab>
            </div>
            <div className={`${styleBurgerIngredient.ingedientCardContainer} mt-10`}>
                {bunList.length ? <p className="text text_type_main-medium">Булки</p> : ""}
                <section className={styleBurgerIngredient.ingedientType}>
                    {bunList.map(card =>(
                        ingredientCard(card)
                        )
                    )}
                </section>
                {mainList.length ? <p className="text text_type_main-medium">Начинки</p>  : ""}
                <section className={styleBurgerIngredient.ingedientType}> 
                    {mainList.map(card =>(
                        ingredientCard(card)
                        )
                    )}
                </section>
                {bunList.length ? <p className="text text_type_main-medium">Соусы</p> : ""}
                <section className={styleBurgerIngredient.ingedientType}>
                    {sauce.map(card =>(
                        ingredientCard(card)
                        )
                    )}
                </section>
            </div>
        
        </section>
    )
};  


BurgerIngredients.propTypes = {
    data: PropTypes.array,
  }; 

export default BurgerIngredients;