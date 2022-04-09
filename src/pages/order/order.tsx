import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import stylesOrder from "./order.module.css";
import React from "react";
import  { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useAppSelector, useDispatch } from "../../services/hooks";
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/websockets';
import { IIngredient, IMessageWS, TOrder } from '../../services/types/data';
import { getDataOrder } from '../../utils/utils';

export const OrderPage = () => {
    const { dataApi } = useAppSelector(state => state.dataApiReducer);
    const { orders } = useAppSelector(state => state.wsConnection);
    const { id }: {[name: string] : string} = useParams()
    const dispatch = useDispatch(); 

    const currentOrder = orders.find(order => order._id === id)
    const uniquListIngredient  = Array.from(new Set(currentOrder?.ingredients));


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
        currentOrder?.ingredients.map( item => {
            if(item === id.id){ 
                count++
            }
        })

        return(
            dataApi && <li className={`${stylesOrder.wrapperLi} mb-2`}>
            <div className={`${stylesOrder.wrapperIconImg} mr-4` }>
                <div><img src={currentIngredient?.image} alt="icon"/></div>
            </div>
            <p className={`${stylesOrder.liText} text text_type_main-small mr-6`}>{currentIngredient?.name}</p>
            <div className={`${stylesOrder.liCount} mr-4`}>
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

    

    return(
        <main className={stylesOrder.orderMain}>
           <section className={`${stylesOrder.wrapper}`}>
                <p className="text text_type_main-medium mb-10">#{currentOrder?.number}</p>
                <h2 className="text text_type_main-medium mb-3">{currentOrder?.name}</h2>
                <p className="text text_type_main-small mb-15 textColor2">{getStatus(currentOrder?.status)}</p>

                <p className="text text_type_main-medium mb-6">Состав</p>
                <ul className="mb-8">
                    {uniquListIngredient.map(item => {
                       return <IngredientInOrder id={item} key={uuidv4()}/>
                    })}
                </ul>
                
                <div className={`${stylesOrder.footer}`}>
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