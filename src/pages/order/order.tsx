import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./order.module.css";

export const OrderPage = () => {

    const ingredientInOrder = (
        <li>
                 <img src="" alt="" className={`mr-4`}/>
                 <p className={`text text_type_main-medium mb-4`}>название ингредиента</p>
                 <div>
                        количечество
                        x 
                        цена
                        <CurrencyIcon type="primary" />
                    </div>
            </li>
    ) 

    return(
        <main className={styles.orderMain}>
           <section className={`${styles.wrapper}`}>
                <p className="text text_type_main-medium mb-10">#034535</p>
                <h2 className="text text_type_main-medium mb-3">Death Star Starship Main бургер</h2>
                <p className="text text_type_main-small mb-15 textColor2">Статус</p>

                <p className="text text_type_main-medium mb-6">Состав</p>
                <ul>
                    {ingredientInOrder}
                    {ingredientInOrder}
                </ul>
                
                <div className={`${styles.footer}`}>
                    <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
                    <div>
                        цена
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
           </section>
        </main>
    )
}