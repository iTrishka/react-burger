import stylesOrder from "./order.module.css";
import { OrderComponent } from '../../components/order-component/order-component';

export const OrderPage = () => {

    return(
            <div className={`${stylesOrder.wrapper}`}>
            <OrderComponent/>
        </div>
    )
}