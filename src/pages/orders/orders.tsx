import styles from "./orders.module.css";
import OrderItem from "../../components/order-item/order-item";

export const OrdersPage = () => {

    return(
        <section className={styles.section}>
            <ul className={`${styles.orderList} mr-4 mb-5 `}>
                    <OrderItem/>
                    <OrderItem/>
                    <OrderItem/>
                    <OrderItem/>
                    <OrderItem/>
                </ul>
        </section>
    )
}