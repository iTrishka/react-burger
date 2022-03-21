import OrderItem from "../order-item/order-item";

const orderList = () => {
    return (
        <main>
            <h1>Лента заказов</h1>
            <section>
                <ul>
                    <OrderItem/>
                    <OrderItem/>
                    <OrderItem/>
                    <OrderItem/>
                </ul>
            </section>    
            <section>
                <div>
                    <div>
                        <h3>Готовы:</h3>
                    </div>
                    <div>
                        <h3>В работе:</h3>
                    </div>
                    <div> 
                        <p>Выполнено за всё время</p>
                        <p>28 752</p>
                    </div>
                    <div> 
                        <p>Выполнено за сегодня</p>
                        <p>138</p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default orderList;