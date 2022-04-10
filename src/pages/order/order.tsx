import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import stylesOrder from "./order.module.css";
import React from "react";
import  { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useAppSelector, useDispatch } from "../../services/hooks";
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/websockets';
import { IIngredient, IMessageWS, TOrder } from '../../services/types/data';
import { getDataOrder } from '../../utils/utils';
import { getIngredientsApi } from '../../services/actions/data-api';
import { OrderComponent } from '../../components/order-component/order-component';

export const OrderPage = () => {

    return(
            <div className={`${stylesOrder.wrapper}`}>
            <OrderComponent/>
        </div>
    )
}