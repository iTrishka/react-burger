import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./order.module.css";
import React from "react";
import { useParams } from 'react-router-dom';
import { useAppSelector, useDispatch } from "../../services/hooks";
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/websockets';
import { IIngredient, IMessageWS, TOrder } from '../../services/types/data';

export const OrderPage = () => {
    const { wsConnected,  orders, total, totalToday } = useAppSelector(state => state.wsConnection);
    const { id }: {[name: string] : string} = useParams()
    const dispatch = useDispatch(); 

    const currentOrder = orders.find(order => order._id === id)

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

    const ingredientInOrder = (ingredient: IIngredient) => {
        
        return(
            <li>
            <div className={`${styles.wrapperIconImg}`}>
                <div><img src={ingredient.image} alt="icon"/></div>
            </div>
            <p className={`text text_type_main-medium mb-4`}>{ingredient.name}</p>
            <div>
                количечество
                x 
                {ingredient.price}
            <CurrencyIcon type="primary" />
            </div>
        </li>
        )
    }

    return(
        <main className={styles.orderMain}>
           <section className={`${styles.wrapper}`}>
                <p className="text text_type_main-medium mb-10">#{currentOrder?.number}</p>
                <h2 className="text text_type_main-medium mb-3">{currentOrder?.name}</h2>
                <p className="text text_type_main-small mb-15 textColor2">{getStatus(currentOrder?.status)}</p>

                <p className="text text_type_main-medium mb-6">Состав</p>
                <ul>
                    {/* {ingredientInOrder}
                    {ingredientInOrder} */}
                </ul>
                
                <div className={`${styles.footer}`}>
                    <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
                    <div>
                        цена
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
           </section>
        </main>
    )
}