import React, { useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styleBurgerIngredient from './burger-ingredients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import IngredientCard from '../ingredient-card/ingredient-card';
import PropTypes from 'prop-types';
import { menuItemPropTypes } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import getIngredientsApi from '../../services/actions/get-ingredients-api';
import { getSelectedIngredient, resetSelectedIngredient } from '../../services/actions/selected-ingedient';


const BurgerIngredients = () => {
    const { dataApiRequest, dataApiFailed, dataApi } = useSelector(state => state.dataApiReducer);
    const { selectedIngidient } = useSelector(store => ({selectedIngidient: store.selectedIngidient}));
    
    const dispatch = useDispatch();
    
    //запрос ингридиентов с API
    React.useEffect(()=> {
        dispatch(getIngredientsApi("ingredients"))
    }, [dispatch])

    //табы
    const [current, setCurrent] = React.useState('Булки');
    const tabsName = ["Булки", "Начинки", "Соусы"];

    const refTitle = useRef(null);
    const refBun = useRef(null);
    const refMain = useRef(null);
    const reSauce = useRef(null); 

    const changeTab = (e) => {
        setCurrent(e)
        if(refMain && e === "Начинки"){
            refMain.current.scrollIntoView({ behavior: "smooth"});
        }else if (refMain && e === "Соусы"){
            reSauce.current.scrollIntoView({behavior: "smooth"});
        }else if(refMain && e === "Булки"){
            refBun.current.scrollIntoView({ behavior: "smooth"});
        }

    }
   
    const getTabs = tabsName.map(tab => 
            <Tab key={tab} value={tab} active={current === tab} onClick={changeTab}>
                <p className="text text_type_main-default">
                        {tab}
                </p>
            </Tab>
    );

    //переключать табы при прокрутке 
     
    
    const getScroll = () => {
        const topTitle = refTitle.current.getBoundingClientRect().top
        
        if(refBun.current && refBun.current.getBoundingClientRect().top > topTitle && refBun.current.getBoundingClientRect().top < topTitle + 200 ){
            setCurrent("Булки")
        }else if(refMain.current && refMain.current.getBoundingClientRect().top > topTitle && refMain.current.getBoundingClientRect().top < topTitle + 200 ){
            setCurrent("Начинки")
        }else if(refMain.current && refMain.current.getBoundingClientRect().top > topTitle + 400 ){
            setCurrent("Булки")
        }
        else if(reSauce.current && reSauce.current.getBoundingClientRect().top > topTitle && reSauce.current.getBoundingClientRect().top < topTitle + 200 ){
            setCurrent("Соусы")
        } else if(reSauce.current && reSauce.current.getBoundingClientRect().top > topTitle + 400){
            setCurrent("Начинки")
        }
        
    };

    //модальное окно    
    const handleCloseModal = (e) => {
        dispatch(resetSelectedIngredient())
    };

    const handleOpenModal = (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const getCurrentElem =  dataApi.filter((item) => {return item._id === id});
       
        dispatch(getSelectedIngredient(getCurrentElem[0]))
        
    };

    //верстка_блоки с ингрединтами
    const blockIngredientsType = (pKey, ulKey, name, refName) => {
        const category = dataApi.filter((item) => {return item.type === pKey});
        return(
            <>
                <p key={pKey} className="text text_type_main-medium" ref={refName} >{name}</p> 
                <ul key={ulKey} className={`${styleBurgerIngredient.ingedientType} pl-1`} >
                    {category.map(card =>(                         
                        <IngredientCard card={card} handleOpenModal={handleOpenModal} key={`${card._id}`} />
                        ))}
                </ul>
            </>
        )
    }

    //отрисовать данные по итогу запроса к API
    const getIngedients = () => {
        if (dataApiFailed) {
            return <p>Произошла ошибка при получении данных</p>
        } else if (dataApiRequest) { 
            return <p>Загрузка...</p>
        } else {
            return (
                <> 
                {blockIngredientsType("bun", "bunList", "Булки", refBun)}
                {blockIngredientsType("main", "mainList", "Начинки", refMain )}
                {blockIngredientsType("sauce", "sauceList", "Соусы", reSauce)}
                </>
            )  
        }
    }

    const ingredient = getIngedients()

    const fillModal = (elem) => (
        <Modal header="Детали ингредиента" onClose={handleCloseModal}> 
             {selectedIngidient ? <IngredientDetails elem={elem}/> : ""}
        </Modal>
      );

    return(
        <section className={`${styleBurgerIngredient.wrapper} mt-10 mb-10 mr-10`}>
            <p className="text text_type_main-large mt-40" > Соберите бургер</p>
            <div className={`${styleBurgerIngredient.tabsWrapper}  mt-5`} ref={refTitle} >
                {getTabs}
            </div>
            <div className={`${styleBurgerIngredient.ingedientCardContainer} mt-10`} onScroll={getScroll} >                
               {ingredient}
            </div>
            {selectedIngidient ? fillModal(selectedIngidient) : null}
        </section>
    )
};  


BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(menuItemPropTypes),
    card: menuItemPropTypes
  }; 

export default BurgerIngredients;
