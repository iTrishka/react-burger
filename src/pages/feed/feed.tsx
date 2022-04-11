import React from 'react';
import OrderItem from "../../components/order-item/order-item";
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/websockets';
import  { v4 as uuidv4 } from 'uuid';

import styles from './feed.module.css';
import { getIngredientsApi } from '../../services/actions/data-api';
import { useAppSelector, useDispatch } from "../../services/hooks";



export const FeedPage = () => {
    const { dataApi } = useAppSelector(state => state.dataApiReducer);
    const { orders, total, totalToday } = useAppSelector(state => state.wsConnection);
    const dispatch = useDispatch();

    
     //запрос ингридиентов с API
     React.useEffect(()=> {
        if(dataApi.length < 1) {dispatch(getIngredientsApi("ingredients"))}
    }, [dispatch, dataApi.length])

    //запрос заказов с API
    React.useEffect(()=> {
        dispatch(wsConnectionStart())
        return (): void => {
            dispatch(wsConnectionClosed())
        }
    }, [dispatch])

    //Получить количество заказов в статусе "Готово"
    const getNumsOrdersbyStatus = (statusOrder: "done" | "pending") => {
        const numsOrdersByDone: number[] = [];
        const numsOrdersByPending: number[]  = [];

        orders.forEach((order) => {
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

    if (!orders.length) {
        return <div>Загрузка заказов...</div>;
    }
    return (
        <>
        <main className={styles.container}>
                <h1 className="text text_type_main-large mb-5 mt-10">Лента заказов</h1>
                <section className={styles.wrapperOrder}>
                    <ul className={`${styles.orderList} mr-4 mb-5 `}>
                        {dataApi.length>1 ? orders?.map((order) => {
                            return <OrderItem key={uuidv4()} order={order} path="feed"/>
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