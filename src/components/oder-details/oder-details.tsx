import React from 'react';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientContext } from '../../utils/ingredient-context';

const OrderDetails =  () => {
    const {state, setState} = React.useContext(IngredientContext);
    return(
        <>
            <p className="text text_type_digits-large">{state.orderNumber}</p> 
            <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
            <CheckMarkIcon type="primary" />
            <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mt-2">Дождитесь готовности на орбитальной станции</p>
        </>
    )
};  


export default OrderDetails;