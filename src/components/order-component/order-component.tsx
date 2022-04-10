import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import stylesOrderComp from "./order-component.module.css";
import React from "react";
import  { v4 as uuidv4 } from 'uuid';
import { useParams, useLocation } from 'react-router-dom';
import { useAppSelector, useDispatch } from "../../services/hooks";
import { wsConnectionStart, wsConnectionProfileStart } from '../../services/actions/websockets';
import { IIngredient } from '../../services/types/data';
import { getDataOrder } from '../../utils/utils';
import { getIngredientsApi } from '../../services/actions/data-api';
import { loadStateFromLocalstorage } from '../localstorage';
import { IBackgroundLocation } from "../../services/types/data";

export const OrderComponent = () => {
    const { dataApi } = useAppSelector(state => state.dataApiReducer);
    const { orders } = useAppSelector(state => state.wsConnection);
    const { id }: {[name: string] : string} = useParams()
    const location = useLocation<IBackgroundLocation>();
    let background = location.state && location.state.background;
    const dispatch = useDispatch(); 

    const currentOrder = orders.find(order => order._id === id)
    const uniquListIngredient  = Array.from(new Set(currentOrder?.ingredients));

    //запрос ингридиентов с API
    React.useEffect(()=> {
        if(dataApi.length < 1) {dispatch(getIngredientsApi("ingredients"))}
    }, [dispatch, dataApi.length])

    //запрос заказов с API
    React.useEffect(()=> {
        const token = loadStateFromLocalstorage('token');
        if(token){
            dispatch(wsConnectionProfileStart())
        }else dispatch(wsConnectionStart())
    }, [dispatch])


    //Получить текст статуса
    const getStatus = (status: "done" | "pending" | "created" | undefined) =>{
        switch(status){
            case "done": 
                return  "Выполнен";
            case 'pending':
                return "Готовится";
            case 'created':
                return "Создан";
            default: 
                return ""
            
        }
    }

    //Ингридиент
    const IngredientInOrder = (id: {id: string}) => {
        const currentIngredient: IIngredient | undefined = dataApi.find(item => item._id === id.id)
        let count = 0;
        currentOrder?.ingredients.forEach( item => {
            if(item === id.id){ 
                count++
            }
        })

        return(
            dataApi && <li className={`${stylesOrderComp.wrapperLi} mb-2`}>
            <div className={`${stylesOrderComp.wrapperIconImg} mr-4` }>
                <div><img src={currentIngredient?.image} alt="icon"/></div>
            </div>
            <p className={`${stylesOrderComp.liText} text text_type_main-small mr-6`}>{currentIngredient?.name}</p>
            <div className={`${stylesOrderComp.liCount} mr-4`}>
                <div className="text text_type_main-default mr-2"> {count} </div>
                <div className="text text_type_main-default mr-2"> x </div>
                <div className="text text_type_main-default mr-2">  {currentIngredient?.price} </div>    
                <CurrencyIcon type="primary" />
            </div>
        </li>
        )
    }

    //сумма заказа

    let sum: number = 0;   
    
    currentOrder?.ingredients.forEach((_id:string) => {
        const foundIngredient: IIngredient | undefined= dataApi.find((item)=> item._id === _id)
        sum = sum + foundIngredient!.price;
    });

    //Стиль номера заказа
    const stylуOrderNumber = () => {
        if(!background){
            return stylesOrderComp.numberOrderCenter
        }else return stylesOrderComp.numberOrderleft
    }

    return(
        <main className={stylesOrderComp.orderMain}>
           <section className={`${stylesOrderComp.wrapper}`}>
                <p className={`${stylуOrderNumber()} text text_type_main-medium mb-10`}>#{currentOrder?.number}</p>
                <h2 className="text text_type_main-medium mb-3">{currentOrder?.name}</h2>
                <p className="text text_type_main-small mb-15 textColor2">{getStatus(currentOrder?.status)}</p>

                <p className="text text_type_main-medium mb-6">Состав</p>
                <ul className="mb-8">
                    {uniquListIngredient.map(item => {
                       return <IngredientInOrder id={item} key={uuidv4()}/>
                    })}
                </ul>
                
                <div className={`${stylesOrderComp.footer}`}>
                    <p className="text text_type_main-default text_color_inactive">{currentOrder && getDataOrder(currentOrder?.createdAt)}</p>
                    <div className="mr-4">
                        <span className="text text_type_main-default mr-2">{sum}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
           </section>
        </main>
    )
}