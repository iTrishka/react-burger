import React, { useCallback, memo} from 'react';
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
import { get_ingredients_constructor_bun, 
        get_ingredients_constructor_main, 
        add_ingredients_constructor_main,
        reset_ingredients_constructor,
        sort_ingredients_constructor } from '../../services/actions/constructor-list';
import { setDataApi } from '../../services/actions/data-api';
import { resetOrder } from '../../services/actions/order-number';

import styleBurgerConstructor from "./burger-constructor.module.css";

export const BurgerConstructor = memo(function BurgerConstructor()  {
    const { dataApi } = useSelector(state => state.dataApiReducer);
    const { bun, main } = useSelector(state => state.constructorList);
    const orderNumber = useSelector(state => state.orderNumber.orderNumber);
    let totalPrice = 0;
    
    const dispatch = useDispatch();  

    //получение номера заказа    
    const getOrderNumberApi = () => {
        if(!bun[0]){return}
        const allSelectedIdBun = [bun[0]._id]
        const allSelectedIdBMain = main.map(item => item._id)
        const allSelectedId = allSelectedIdBun.concat(allSelectedIdBMain);
        dispatch(getOrder("orders", allSelectedId))     
    }


    //модальное окно
    const handleCloseModal = () => {
        dispatch(resetOrder())
        dispatch(reset_ingredients_constructor())
        const arrayWithZeroCounter = dataApi.map(item => {
                return {...item, counter: 0}})
        dispatch(setDataApi(arrayWithZeroCounter))

    };

    const handleOpenModal = () => {
        getOrderNumberApi();        
    };

    const fillModal = () =>  (
        <Modal header="" onClose={handleCloseModal}> 
             {orderNumber > 0 ? <OrderDetails/> : ""}
        </Modal>
    );


    //Рассчет итоговой стоимости  
    totalPrice = React.useMemo(() => { 
        let totalBun = 0;
        let totalIngedients = 0;

        if(main.length){
            main.forEach(item => {
                totalIngedients += item.price;
        })}
        
        if(bun.length){
            bun.forEach(item => {
                totalBun += item.price;
            })
            totalBun = totalBun*2
        }

        return (totalBun + totalIngedients)
        
    }, [bun, main]);

    
     // удаление ингредиентов из конструктора
     const onDeleteIngredient = (uid, id) => {
        const newIngerientsAr = main.filter(item => item.key !== uid);
        dispatch(get_ingredients_constructor_main(newIngerientsAr))

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
        return bun.map(bunItem => {
            return(
            <li key={uuidv4()} className="mr-4">
                <ConstructorElement
                    type={pos}
                    isLocked={true}
                    text={`${bunItem.name} (${textPosition})`}
                    price={bunItem.price}
                    thumbnail={bunItem.image}
                />
            </li>    
        )})
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
        dispatch( sort_ingredients_constructor(newArr))
        
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
                dispatch(get_ingredients_constructor_bun({...item.card, key: uuidv4()}));    
            }else{dispatch(add_ingredients_constructor_main({...item.card, key: uuidv4()}))}

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
  

    return(
        <>
            <section ref={ drop } className={styleBurgerConstructor.wrapper} >
                <ul  
               
               ref={dropSort}  
                className={`${styleBurgerConstructor.scroll} mt-25 pl-1`}> 
                    {bun.length ? getBunElement("top"): <li  className={`${styleBurgerConstructor.emptyTopElement} mr-4 text text_type_main-default`}>Выберите булку</li>}
                    {main.length ? getIngridientElements() : <li   className={`${styleBurgerConstructor.emptyIngredientElements} mr-4 text text_type_main-default`}>Выберите начинку</li>}
                    {bun.length ? getBunElement("bottom"): <li className={`${styleBurgerConstructor.emptyBottomElement} mr-4 text text_type_main-default`}>Выберите булку</li>}
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


