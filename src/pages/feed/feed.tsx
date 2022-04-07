import React from 'react';
import OrderItem from "../../components/order-item/order-item";
import { useLocation } from 'react-router-dom';
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/websockets';

import styles from './feed.module.css';
import Modal from "../../components/modal/modal";
import OrderDetails from "../../components/order-details/order-details";
import { OrderPage } from "../order/order";
import { useAppSelector, useDispatch } from "../../services/hooks";



export const FeedPage = () => {
    const location = useLocation();
    const { wsConnected,  orders, total, totalToday } = useAppSelector(state => state.wsConnection);
    const dispatch = useDispatch();

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
                    {orders?.map((order) => {
                        return <OrderItem order={order}/>
                    })}
                </ul>
                <div className={`${styles.сommonInfo} ml-15`}>
                    <div className={`${styles.orderDisplay} mt-4 mb-15`}>
                        <div >
                            <p className="text text_type_main-medium mr-6 mb-6">
                                Готовы:
                            </p>
                            <p className={`${styles.waveColor}  text text_type_digits-default`}>
                                {getNumsOrdersbyStatus("done")?.map(item =>{
                                    return <><span>{item}</span><br/></>
                                })}
                            </p>
                        </div>
                        <div>
                            <p className="text text_type_main-medium mb-6" >
                                В работе:
                            </p>
                            <p className={`text text_type_digits-default`}>
                                {getNumsOrdersbyStatus("pending")?.map(item =>{
                                    return <><span>{item}</span><br/></>
                                })}
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className="text text_type_main-medium mt-15">
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