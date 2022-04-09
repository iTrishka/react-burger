import React, {useState} from 'react';
import OrderItem from "../../components/order-item/order-item";
import { Switch, useLocation, useHistory, Route } from 'react-router-dom';
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/websockets';
import  { v4 as uuidv4 } from 'uuid';

import styles from './feed.module.css';
import Modal from "../../components/modal/modal";
import OrderDetails from "../../components/order-details/order-details";
import { OrderPage } from "../order/order";
import { getIngredientsApi } from '../../services/actions/data-api';
import { useAppSelector, useDispatch } from "../../services/hooks";
import { IBackgroundLocation } from '../../services/types/data';



export const FeedPage = () => {
    const location = useLocation<IBackgroundLocation>();
    const history = useHistory();
    let background = location.state && location.state.background;
    const { dataApi } = useAppSelector(state => state.dataApiReducer);
    const { wsConnected,  orders, total, totalToday } = useAppSelector(state => state.wsConnection);
    const dispatch = useDispatch();

    
     //запрос ингридиентов с API
     React.useEffect(()=> {
        if(dataApi.length < 1) {dispatch(getIngredientsApi("ingredients"))}
    }, [dispatch, dataApi.length])

    //запрос заказов с API
    React.useEffect(()=> {
        dispatch(wsConnectionStart())
    }, [dispatch])

    //Получить количество заказов в статусе "Готово"
    const getNumsOrdersbyStatus = (statusOrder: "done" | "pending") => {
        const numsOrdersByDone: number[] = [];
        const numsOrdersByPending: number[]  = [];

        orders.map((order) => {
            if(order.status === 'done' && numsOrdersByDone.length < 20){
                numsOrdersByDone.push(order.number)
            }
            else if(order.status === 'pending' && numsOrdersByPending.length <  20){
                numsOrdersByPending.push(order.number)
            }   
        })
        if(statusOrder === 'done'){
            return numsOrdersByDone
        }else if(statusOrder === 'pending'){
            return numsOrdersByPending
        }
    }
    return (
        <>
        <main className={styles.container}>
                <h1 className="text text_type_main-large mb-5 mt-10">Лента заказов</h1>
                <section className={styles.wrapperOrder}>
                    <ul className={`${styles.orderList} mr-4 mb-5 `}>
                        {dataApi.length>1 ? orders?.map((order) => {
                            return <OrderItem key={uuidv4()} order={order}/>
                        }): ""}
                    </ul>
                    <div className={`${styles.сommonInfo} ml-15`}>
                        <div className={`${styles.orderDisplay} mt-4 mb-15`}>
                            <div >
                                <p className="text text_type_main-medium mr-6 mb-6">
                                    Готовы:
                                </p>
                                <p className={`${styles.waveColor} ${styles.wrapperStatus}  text text_type_digits-default`}>
                                    {getNumsOrdersbyStatus("done")?.map(item =>{
                                        return <span key={uuidv4()}>{item}</span>
                                    })}
                                </p>
                            </div>
                            <div>
                                <p className={`text text_type_main-medium mb-6`} >
                                    В работе:
                                </p>
                                <p className={`${styles.wrapperStatus} text text_type_digits-default`}>
                                    {getNumsOrdersbyStatus("pending")?.map(item =>{
                                        return <><span key={uuidv4()}>{item}</span><br/></>
                                    })}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="text text_type_main-medium ">
                                Выполнено за все время:
                            </p>
                            <p className={`${styles.digits} text text_type_digits-large`}>
                                {total}
                            </p>
                        </div>
                        <div>
                            <p className='text text_type_main-medium mt-15'>
                                Выполнено за сегодня:
                            </p>
                            <p className={`${styles.digits} text text_type_digits-large`}>
                                {totalToday}
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}