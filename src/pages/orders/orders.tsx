import React from 'react';
import styles from "./orders.module.css";
import { useAppSelector, useDispatch } from "../../services/hooks";
import OrderItem from "../../components/order-item/order-item";
import { getIngredientsApi } from '../../services/actions/data-api';
import { wsConnectionClosed, wsConnectionProfileStart } from '../../services/actions/websockets';
import  { v4 as uuidv4 } from 'uuid';

export const OrdersPage = () => {
    const { dataApi } = useAppSelector(state => state.dataApiReducer);
    const { orders } = useAppSelector(state => state.wsConnection);
    const dispatch = useDispatch();

     //запрос ингридиентов с API
     React.useEffect(()=> {
        if(dataApi.length < 1) {dispatch(getIngredientsApi("ingredients"))}
    }, [dispatch, dataApi.length])

    //запрос заказов с API
    React.useEffect(()=> {
        dispatch(wsConnectionProfileStart())
        return (): void => {
            dispatch(wsConnectionClosed())
        }
    }, [dispatch])

    if (!orders.length) {
        return <div>Загрузка заказов...</div>;
    }

    return(
        <section className={styles.section}>
            <ul className={`${styles.ordersList} mr-4 mb-5 `}>
                { orders?.map((order) => {
                    return <OrderItem key={uuidv4()} order={order} path="profile/orders"/>
                })}
            </ul>
        </section>
    )
}