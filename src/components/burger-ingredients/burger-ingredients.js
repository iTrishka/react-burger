import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styleBurgerIngredient from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import IngredientCard from '../ingredient-card/ingredient-card';
import PropTypes from 'prop-types';
import { MENUITEMPROPTYPES } from '../../utils/constants';

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
            <div className={`${styleBurgerIngredient.tabsWrapper}  mt-5`} >
                {getTabs}
            </div>
            <div className={`${styleBurgerIngredient.ingedientCardContainer} mt-10`}>
                {bunList.length ? <p key="bun" className="text text_type_main-medium">
                    Булки</p> : ""}
                <ul key="bunList" className={`${styleBurgerIngredient.ingedientType} pl-1`}>
                    {bunList.map((card) =>(
                        <IngredientCard card={card} handleOpenModal={handleOpenModal} key={`${card._id}`} />
                        ))}
                </ul>
                {mainList.length ? <p key="main" className="text text_type_main-medium">
                    Начинки</p>  : ""}
                <ul key="mainList" className={`${styleBurgerIngredient.ingedientType} pl-1`}>
                    {mainList.map(card =>(
                        <IngredientCard card={card} handleOpenModal={handleOpenModal} key={`${card._id}`} />
                        ))}
                </ul>
                {bunList.length ? <p key="sauce" className="text text_type_main-medium">
                    Соусы</p> : ""}
                <ul key="sauceList" className={`${styleBurgerIngredient.ingedientType} pl-1`}>
                    {sauceList.map(card =>(
                        <IngredientCard card={card} handleOpenModal={handleOpenModal} key={`${card._id}`} />
                        ))}
                </ul>
            </div>
            {currentElement ? fillModal(currentElement) : null}
        </section>
    )
};  


BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(MENUITEMPROPTYPES),
    card: MENUITEMPROPTYPES
  }; 

export default BurgerIngredients;