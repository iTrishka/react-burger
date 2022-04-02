import React, { useCallback, memo, useEffect, useState} from 'react';
import {ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import  { v4 as uuidv4 } from 'uuid';
import { useDrop } from "react-dnd";
import { IngrediendCardConstructor } from '../ingrediend-card-constructor/ingrediend-card-constructor';
import update from 'immutability-helper';
import { getOrder } from '../../services/actions/order-number';
import { getIngredientsConstructorBun, 
        getIngredientsConstructorMain, 
        addIngredientsConstructorMain,
        resetIngredientsConstructor,
        sortIngredientsConstructor  } from '../../services/actions/constructor-list';
import { setDataApi } from '../../services/actions/data-api';
import { resetOrder } from '../../services/actions/order-number';
import Spinner from '../spinner/spinner';
import { useAppSelector, useDispatch } from '../../services/hooks';
import { ICardSorting, IIngredient } from '../../services/types/data';

import styleBurgerConstructor from "./burger-constructor.module.css";
import { useHistory } from 'react-router-dom'; 

import { loadStateFromLocalstorage, saveStateInLocalstorage } from '../localstorage';

export const BurgerConstructor = memo(function BurgerConstructor()  {
    const dataApi = useAppSelector(state => state.dataApiReducer.dataApi);
    const { bun, main } = useAppSelector(state => state.constructorList);
    const {orderApiRequest, orderNumber, orderApiFailed} = useAppSelector(state => state.orderNumber);
    const { userInfo } = useAppSelector(state => state.userInfo)
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [isActiveStyleClass, setActiveStyleClass ] = useState<boolean>(false)
    
    const dispatch = useDispatch();  
    const history = useHistory(); 
   
    //Сохранение заказа в localStorage
    useEffect(()=> {
        saveStateInLocalstorage('burgerIngredient', {bun, main});

    },[bun, main])

    //получить данные из Localstorage
    useEffect(()=> {
        const {bun, main}  = loadStateFromLocalstorage('burgerIngredient')
        if(bun || main){
            dispatch(getIngredientsConstructorBun(bun))
            dispatch(getIngredientsConstructorMain(main))
        }
    }, [dispatch])


    //получение номера заказа    
    const getOrderNumberApi = () => {
        if(!bun){return}
        const allSelectedIdBun = [bun[0]._id]
        const allSelectedIdBMain = main.map((item: IIngredient) => item._id)
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
        //await dispatch(refreshToken)
        if(userInfo.name){getOrderNumberApi();}
        else if(!bun[0].name){}
        else{
            history.push({ pathname: '/login' });
        }          
    };

    //Спиннер при получении заказа


    const fillModal = () =>  (
        <Modal header="" onClose={handleCloseModal}> 
             {orderNumber ? <OrderDetails/> : ""}
             {!orderNumber && orderApiRequest ? <Spinner/> : "" }
             {orderApiFailed ? <>Произошла ошибка. Попробуйте позже</>: ""}
        </Modal>
    );


    //Рассчет итоговой стоимости  
    React.useMemo(() => { 
        let totalBun = 0;
        let totalIngedients = 0;
        if(main){
            main.forEach((item:IIngredient) => {
                totalIngedients += item.price;
        })}else{totalBun = 0;}
        
        if(bun[0] && bun[0].name){
            totalBun += bun[0].price*2
        }else{totalBun = 0;}
        setTotalPrice(totalBun + totalIngedients)
        
    }, [main, bun]);

    
     // удаление ингредиентов из конструктора
     const onDeleteIngredient = (uid:string, id:string) => {
        const newIngerientsAr = main.filter((item:IIngredient) => item.key !== uid);
        dispatch(getIngredientsConstructorMain(newIngerientsAr))

        const newArrDataApi:IIngredient[] = dataApi.map((item:IIngredient) => {
            if(item.counter){return {...item, counter: item?.counter-1}
            } else return item
        })

        dispatch(setDataApi(newArrDataApi))
    };

    

    //___________

    const getBunElement = (pos: "bottom" | "top") => {
        let textPosition = "верх"
        if(pos === "bottom"){
            textPosition = "низ"
        }
            return(
             <li key={uuidv4()} className="mr-4">
            <ConstructorElement
                type={pos}
                isLocked={true}
                text={`${bun[0].name} (${textPosition})`}
                price={bun[0].price}
                thumbnail={bun[0].image}
            />
        </li>   
        )
    };

    

    //сортировка 
    const findCard = useCallback((id: string): ICardSorting => {
        const card:IIngredient = main.filter((c:IIngredient) => `${c.key}` === id)[0];
        const index: number = main.findIndex((item: IIngredient) => { return item.key === card.key } )
        return {
            card,
            index
        };
    }, [main]);
    
    const moveCard = useCallback((id: string, atIndex: number) => {
        const { card, index } = findCard(id);
        const newArr = update(main, {$splice: [
                    [index, 1],
                    [atIndex, 0, card],
                ]})
        dispatch( sortIngredientsConstructor(newArr))
        
    }, [findCard, main, dispatch]);



    const [, dropSort] = useDrop(() => ({ accept: "sorting" }));

   

    const getIngridientElements = () => {
       
       return main.map((ingredient:IIngredient) => {  
        return (<IngrediendCardConstructor 
                key={ingredient.key} 
                ingredient={ingredient} 
                onDeleteIngredient={onDeleteIngredient}  
                id={`${ingredient.key}`} moveCard={moveCard} findCard={findCard}/>)
      }
       )};


    const [, drop] = useDrop({
        accept: 'constructor', 
        drop(item: any) {
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
                }else if(ingred.counter && ingred._id === item.card._id){
                    return {...ingred, counter: ingred.counter + 1}
                }else return ingred
            })
            
            dispatch(setDataApi(arrayWithNewCounter))
        },
    })

    //деактивировать кнопку
    useEffect(()=> {
        if(bun[0]){
            setActiveStyleClass(true)
        } else {setActiveStyleClass(false)}
    },[bun])

    const emptyBunTop = <li  className={`${styleBurgerConstructor.emptyTopElement} mr-4 text text_type_main-default`}>Выберите булку</li>
    const emptyBunBottom = <li  className={`${styleBurgerConstructor.emptyBottomElement} mr-4 text text_type_main-default`}>Выберите булку</li>
    const emptyMain = <li   className={`${styleBurgerConstructor.emptyIngredientElements} mr-4 text text_type_main-default`}>Выберите начинку</li>
  

    return (
        <>
            <section ref={ drop } className={styleBurgerConstructor.wrapper} >
                <ul  
               ref={dropSort}  
                className={`${styleBurgerConstructor.scroll} mt-25 pl-1`}> 
                    {bun[0]?.name  ? getBunElement("top") : emptyBunTop}
                    {main.length ? getIngridientElements() : emptyMain}
                    {bun[0]?.name ? getBunElement("bottom") : emptyBunBottom}
                </ul>
                <div  className={`${styleBurgerConstructor.totalWrapper} ${!isActiveStyleClass ? styleBurgerConstructor.nonActiveButton : ""} mt-10 mb-15`} >
                    <div className={`mr-10`} >
                    <p className={`text text_type_digits-medium mt-1 mr-2 ` }>{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="medium" onClick={handleOpenModal} >
                    Оформить заказ
                </Button>
                </div>
            </section>
            {orderNumber || orderApiRequest || orderApiFailed ? fillModal() : null}
        </>
    )
    
});  

