import React, { useCallback, memo, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { menuItemPropTypes } from '../../utils/constants';
import PropTypes from 'prop-types';
import  { v4 as uuidv4 } from 'uuid';
import { useDrop } from "react-dnd";
import { IngrediendCardConstructor } from '../ingrediend-card-constructor/ingrediend-card-constructor';
import update from 'immutability-helper';
import getOrder from '../../services/actions/get-order';
import { getIngredientsConstructorBun, 
        getIngredientsConstructorMain, 
        addIngredientsConstructorMain,
        resetIngredientsConstructor,
        sortSngredientsConstructor  } from '../../services/actions/constructor-list';
import { setDataApi } from '../../services/actions/data-api';
import { resetOrder } from '../../services/actions/order-number';

import styleBurgerConstructor from "./burger-constructor.module.css";
import { useHistory } from 'react-router-dom'; 

import { loadStateFromLocalstorage, saveStateInLocalstorage } from '../localstorage';

export const BurgerConstructor = memo(function BurgerConstructor()  {
    const dataApi = useSelector(state => state.dataApiReducer.dataApi);
    const { bun, main } = useSelector(state => state.constructorList);
    const orderNumber = useSelector(state => state.orderNumber.orderNumber);
    const { userInfo } = useSelector(state => state.userInfo)
    const [totalPrice, setTotalPrice] = useState(0)
    
    const dispatch = useDispatch();  
    const history = useHistory(); 
    // history.push({ pathname: '/' });
   
    //Сохранение заказа в localStorage
    useEffect(()=> {
        saveStateInLocalstorage('burgerIngredient', {bun, main});

    },[bun, main])

    //получить данные из Localstorage
    useEffect(()=> {
        const {bun, main} = loadStateFromLocalstorage('burgerIngredient')
        if(bun || main){
            dispatch(getIngredientsConstructorBun(bun))
            dispatch(getIngredientsConstructorMain(main))
        }
    }, [dispatch])


    //получение номера заказа    
    const getOrderNumberApi = () => {
        if(!bun){return}
        const allSelectedIdBun = [bun._id]
        const allSelectedIdBMain = main.map(item => item._id)
        const allSelectedId = allSelectedIdBun.concat(allSelectedIdBMain);
        dispatch(getOrder("orders", allSelectedId))     
    }


    //модальное окно
    const handleCloseModal = () => {
        dispatch(resetOrder())
        dispatch(resetIngredientsConstructor())
        const arrayWithZeroCounter = dataApi.map(item => {
                return {...item, counter: 0}})
        dispatch(setDataApi(arrayWithZeroCounter));
    };

    const handleOpenModal = () => {
        if(userInfo.name){getOrderNumberApi();}
        else{
            history.push({ pathname: '/login' });
        }
        
               
    };

    const fillModal = () =>  (
        <Modal header="" onClose={handleCloseModal}> 
             {orderNumber > 0 ? <OrderDetails/> : ""}
        </Modal>
    );


    //Рассчет итоговой стоимости  
    React.useMemo(() => { 
        let totalBun = 0;
        let totalIngedients = 0;
        if(main){
            main.forEach(item => {
                totalIngedients += item.price;
        })}else{totalBun = 0;}
        
        if(bun.name){
            totalBun += bun.price*2
        }else{totalBun = 0;}
        setTotalPrice(totalBun + totalIngedients)
        
    }, [main, bun]);

    
     // удаление ингредиентов из конструктора
     const onDeleteIngredient = (uid, id) => {
        const newIngerientsAr = main.filter(item => item.key !== uid);
        dispatch(getIngredientsConstructorMain(newIngerientsAr))

        const newArrDataApi = dataApi.map(item => {
            if(item._id === id){
                return {...item, counter: item.counter-1}
            } else return item
        })

        dispatch(setDataApi(newArrDataApi))
    };

    

    //___________

    const getBunElement = (pos) => {
        let textPosition = "верх"
        if(pos === "bottom"){
            textPosition = "низ"
        }
            return(
             <li key={uuidv4()} className="mr-4">
            <ConstructorElement
                type={pos}
                isLocked={true}
                text={`${bun.name} (${textPosition})`}
                price={bun.price}
                thumbnail={bun.image}
            />
        </li>   
        )
    };

    

    //сортировка 
    const findCard = useCallback((id) => {
        const card = main.filter((c) => `${c.key}` === id)[0];
        return {
            card,
            index: main.indexOf(card),
        };
    }, [main]);
    
    const moveCard = useCallback((id, atIndex) => {
        const { card, index } = findCard(id);
        const newArr = update(main, {$splice: [
                    [index, 1],
                    [atIndex, 0, card],
                ]})
        dispatch( sortSngredientsConstructor(newArr))
        
    }, [findCard, main, dispatch]);



    const [, dropSort] = useDrop(() => ({ accept: "sorting" }));

   

    const getIngridientElements = () => {
       
       return main.map((ingredient) => {  
        return (<IngrediendCardConstructor 
                key={ingredient.key} 
                ingredient={ingredient} 
                onDeleteIngredient={onDeleteIngredient}  
                id={`${ingredient.key}`} moveCard={moveCard} findCard={findCard}/>)
      }
       )};


    const [, drop] = useDrop({
        accept: 'constructor', 
        drop(item) {
            if(item.card.type === 'bun'){
                dispatch(getIngredientsConstructorBun({...item.card, key: uuidv4()}));    
            }else{dispatch(addIngredientsConstructorMain({...item.card, key: uuidv4()}))}

            const arrayWithNewCounter = dataApi.map(ingred => {
                if(ingred.type === 'bun' && item.card.type === "bun"){
                    if(ingred._id === item.card._id){
                        return {...ingred, counter:  1}
                    }else  {
                        return  {...ingred, counter: 0}
                    }
                }else if( !ingred.counter && ingred._id === item.card._id){
                    return {...ingred, counter: 1}
                }else if(ingred.counter > 0 & ingred._id === item.card._id){
                    return {...ingred, counter: ingred.counter + 1}
                }else return ingred
            })
            
            dispatch(setDataApi(arrayWithNewCounter))
        },
    })

    const emptyBunTop = <li  className={`${styleBurgerConstructor.emptyTopElement} mr-4 text text_type_main-default`}>Выберите булку</li>
    const emptyBunBottom = <li  className={`${styleBurgerConstructor.emptyBottomElement} mr-4 text text_type_main-default`}>Выберите булку</li>
    const emptyMain = <li   className={`${styleBurgerConstructor.emptyIngredientElements} mr-4 text text_type_main-default`}>Выберите начинку</li>
  

    return (
        <>
            <section ref={ drop } className={styleBurgerConstructor.wrapper} >
                <ul  
               
               ref={dropSort}  
                className={`${styleBurgerConstructor.scroll} mt-25 pl-1`}> 
                    {bun.name  ? getBunElement("top") : emptyBunTop}
                    {main.length ? getIngridientElements() : emptyMain}
                    {bun.name ? getBunElement("bottom") : emptyBunBottom}
                </ul>
                <div className={`${styleBurgerConstructor.totalWrapper} mt-10 mb-15`} >
                    <div className={`mr-10`} >
                    <p className={`text text_type_digits-medium mt-1 mr-2 ` }>{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="medium" onClick={handleOpenModal} >
                    Оформить заказ
                </Button>
                </div>
            </section>
            {orderNumber > 0 ? fillModal() : null}
        </>
    )
    
});  

BurgerConstructor.defaultProps = {
    isLocked: true
  };


BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(menuItemPropTypes),
    item: menuItemPropTypes,
    getTotalPrice: PropTypes.func
  }; 


