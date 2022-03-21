import OrderItem from "../../components/order-item/order-item";

import styles from './feed.module.css';

export const FeedPage = () => {
    return (
        <main className={styles.container}>
            <h1 className="text text_type_main-large mb-5 mt-10">Лента заказов</h1>
            <section className={styles.wrapperOrder}>
                <ul className={`${styles.orderList} mr-4 mb-5 `}>
                    <OrderItem/>
                    <OrderItem/>
                    <OrderItem/>
                    <OrderItem/>
                    <OrderItem/>
                    <OrderItem/>
                    <OrderItem/>
                    <OrderItem/>
                    <OrderItem/>
                    <OrderItem/>
                    <OrderItem/>
                    <OrderItem/>
                    <OrderItem/>
                    <OrderItem/>
                    <OrderItem/>
                </ul>
                <div className={`${styles.сommonInfo} ml-15`}>
                    <div className={`${styles.orderDisplay} mt-4 mb-15`}>
                        <div >
                            <p className="text text_type_main-medium mr-6 mb-6">
                                Готовы:
                            </p>
                            <p className={`${styles.waveColor}  text text_type_digits-default`}>
                                    0000
                            </p>
                        </div>
                        <div>
                            <p className="text text_type_main-medium mb-6" >
                                В работе:
                            </p>
                            <p className={`text text_type_digits-default`}>
                                    0000
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className="text text_type_main-medium mt-15">
                            Выполнено за все время:
                        </p>
                        <p className={`${styles.digits} text text_type_digits-large`}>
                                0000
                        </p>
                    </div>
                    <div>
                        <p className='text text_type_main-medium mt-15'>
                            Выполнено за сегодня:
                        </p>
                        <p className={`${styles.digits} text text_type_digits-large`}>
                            0000
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
}