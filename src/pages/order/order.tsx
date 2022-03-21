import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order.module.css";

export const OrderPage = () => {

    const orderIngredient = (
        <li className={`${styles.item} mr-6`}>
            <div className={styles.right}>
                <img className={styles.icon} src="" alt="" />
                <p className="text text_type_main-default">Название ингредиента</p>
            </div>
            <div className={styles.left}>
                <span className='text_type_digits-default mr-2'>2 x 350</span>
                <CurrencyIcon type="primary"/>
            </div>
        </li>
    )


    return(
        <section className={styles.section}>
            <div className={styles.header}>
                <span className="text text_type_digits-default mb-10">#000000</span>
            </div>
            <h2 className="text text_type_main-medium ">Название бургера</h2>
            <span className={`${styles.status} text text_type_main-default mt-3`}>Статус</span>
            <p className="text text_type_main-medium mt-10">Состав:</p>
            <ul className={`${styles.ingredientsList} mt-6`}>
                {orderIngredient}
                {orderIngredient}
                {orderIngredient}
                {orderIngredient}
                {orderIngredient}
                {orderIngredient}
                {orderIngredient}
                {orderIngredient}
                {orderIngredient}
            </ul>
            <div className={`${styles.footer} mt-10`}>
                <p className='text text_type_main-default text_color_inactive'>Вчера, 13:50 i-GMT+3</p>
                <div>
                    <span className='text_type_digits-default mr-2'>510</span>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </section>
    )
}