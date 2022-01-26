import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styleBurgerIngredient from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import IngredientCard from '../ingredient-card/ingredient-card';
import PropTypes from 'prop-types';
import { menuItemPropTypes } from '../../utils/constants';
import { IngredientContext } from '../../services/ingredient-context';


const BurgerIngredients = ({data}) => {
    const [state, setState] = React.useContext(IngredientContext);
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
        if(getCurrentElem[0].type === "bun"){
            setState( prevState => ({
                ...prevState, 
                selectedIngredients: {
                    ...prevState.selectedIngredients,
                    bun: getCurrentElem
                }
            }))
        } else (
            setState( prevState => ({
                ...prevState, 
                selectedIngredients: {
                    ...prevState.selectedIngredients, 
                    main: [
                        ...prevState.selectedIngredients.main,
                        getCurrentElem[0]
                    ]
                }
            }))
        ) 

        //счетчик
        
        const newArr = state.dataIngredients.map(item => {
            if(item.type === 'bun' && getCurrentElem[0].type === "bun"){
                if(item._id === id){
                    return {...item, counter:  1}
                }else  {
                    return  {...item, counter: 0}
                }
            }else if(item._id === id){
                return {...item, counter: item.counter + 1}
            }else return item
        })

        setState(prevState => ({
            ...prevState, 
            dataIngredients: newArr
        }))
        
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
    data: PropTypes.arrayOf(menuItemPropTypes),
    card: menuItemPropTypes
  }; 

export default BurgerIngredients;