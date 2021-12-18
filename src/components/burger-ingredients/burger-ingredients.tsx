import React from 'react';
import {Tab, Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styleBurgerIngredient from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

const BurgerIngredients = ({data}) => {
    const [current, setCurrent] = React.useState('Булки');
    const [currentElement, setCurrentElement] = React.useState(null);
    const tabsName = ["Булки", "Начинки", "Соусы"];
    const bunList = data.filter((item)=> { return item.type === "bun"});
    const mainList = data.filter((item)=> { return item.type === "main"});
    const sauceList = data.filter((item)=> { return item.type === "sauce"});
   
    const getTabs = tabsName.map(tab => 
            <Tab key={tab} value={tab} active={current === tab} onClick={setCurrent}>
                <p className="text text_type_main-default">
                        {tab}
                </p>
            </Tab>
    );

    const getIngredientCard = (card) => {
        return(
            <li
                data-id={card._id}
                key={card._id}  
                className={`${styleBurgerIngredient.ingedientCard} mr-4 mt-5 mb-10`}
                onClick={handleOpenModal}
            >
                <img src={card.image} alt={card.name} className={`mr-4`} />
                <Counter count={1} size="default" />
                <div className={`mt-1`} style={{ display: 'flex' }}>
                    <p className={`text text_type_digits-default mt-1 mr-2` }  style={{ display: 'inline' }}>{card.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={`mt-1`} style={{ textAlign: 'center' }}>{card.name}</div>
            </li>
        )
    };
    
    const handleCloseModal = (e) => {
        setCurrentElement(null);
    };

    const handleOpenModal = (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const getCurrentElem =  data.filter((item) => {return item._id === id});
        setCurrentElement(getCurrentElem[0]);
    };

    const fillModal = (elem) => (
        <Modal header="Детали ингредиента" onClose={handleCloseModal}> 
             {currentElement ? <IngredientDetails elem={elem}/> : ""}
        </Modal>
      );

    return(
        <section className={`${styleBurgerIngredient.wrapper} mt-10 mb-10 mr-10`}>
            <p className="text text_type_main-large mt-40">
                Соберите бургер
            </p>
            <div className={`mt-5`} style={{ display: 'flex' }} >
                {getTabs}
            </div>
            <div className={`${styleBurgerIngredient.ingedientCardContainer} mt-10`}>
                {bunList.length ? <p key="bun" className="text text_type_main-medium">
                    Булки</p> : ""}
                <ul className={`${styleBurgerIngredient.ingedientType} pl-1`}>
                    {bunList.map(card =>(getIngredientCard(card)))}
                </ul>
                {mainList.length ? <p key="main" className="text text_type_main-medium">
                    Начинки</p>  : ""}
                <ul className={`${styleBurgerIngredient.ingedientType} pl-1`}>
                    {mainList.map(card =>(getIngredientCard(card)))}
                </ul>
                {bunList.length ? <p key="sauce" className="text text_type_main-medium">
                    Соусы</p> : ""}
                <ul className={`${styleBurgerIngredient.ingedientType} pl-1`}>
                    {sauceList.map(card =>(getIngredientCard(card)))}
                </ul>
            </div>
            {currentElement ? fillModal(currentElement) : null}
        </section>
    )
};  


// BurgerIngredients.propTypes = {
//     data: PropTypes.array,
//     current: PropTypes.string,
//     currentElement: PropTypes.object,
//     card: PropTypes.object,
//     tabsName: PropTypes.array,
//     bunList: PropTypes.object,
//     mainList: PropTypes.object,
//     sauceList: PropTypes.object,
//   }; 

export default BurgerIngredients;