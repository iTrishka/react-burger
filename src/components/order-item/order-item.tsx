import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import styles from './order-item.module.css';

const OrderItem = () => {
    const location = useLocation();

    return(
        <li className={`${styles.container} p-6 ml-0 mr-6 mb-4 mt-4`}>
            <Link 
             to={{
                pathname: `/orders/1`,
                state: { background: location }}}
                className={`${styles.ingedientCard} `}
             >
                <div className={`${styles.headerCard} `}>
                    <p className="text text_type_main-medium">#034535</p>
                    <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
                </div>
                <h2 className="text text_type_main-medium">Death Star Starship Main бургер</h2>
                <div className={`${styles.footerCard} `}>
                    <div>иконки</div>
                    <div>
                        цена
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default OrderItem;