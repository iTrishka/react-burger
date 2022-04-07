import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import styles from './order-item.module.css';
import { getDataOrder, setShortName } from '../../utils/utils';


const OrderItem = (order:any) => {
    const {createdAt, number, status, _id, name} = order.order;    
    const location = useLocation();

    

    return(
        <li key={_id} className={`${styles.container} p-6 ml-0 mr-6 mb-4 mt-4`}>
            <Link 
             to={{
                pathname: `/orders/1`,
                state: { background: location }}}
                className={`${styles.ingedientCard} `}
             >
                <div className={`${styles.headerCard} `}>
                    <p className="text text_type_main-medium">#{number}</p>
                    <p className="text text_type_main-default text_color_inactive">{getDataOrder(createdAt)}</p>
                </div>
                <h2 className="text text_type_main-medium">{setShortName(name)}</h2>
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