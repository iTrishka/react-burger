import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const OrderDetails =  () => {
    return(
        <>
            <p className="text text_type_digits-large">034536</p> 
            <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
            <CheckMarkIcon type="primary" />
            <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mt-2">Дождитесь готовности на орбитальной станции</p>
        </>
    )
};  


export default OrderDetails;