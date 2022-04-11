import { useAppSelector } from '../../services/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import styles from './order-item.module.css';
import { getDataOrder, setShortName } from '../../utils/utils';
import { IIngredient, TOrder } from '../../services/types/data';
import { FC } from 'react';
import  { v4 as uuidv4 } from 'uuid';


const OrderItem = (order: {order: TOrder; path: string}) => {
    
    const {createdAt, number, _id, name, ingredients, status} = order.order; 
    const { dataApi } = useAppSelector(state => state.dataApiReducer);
    const location = useLocation();


    let orderedIngredients: IIngredient[] | [] = [];
    let sum: number = 0;   
    ingredients.forEach((_id:string) => {
        const foundIngredient: IIngredient | undefined= dataApi.find((item)=> item._id === _id)
        if (foundIngredient){
            sum = sum + foundIngredient!.price;
            orderedIngredients = [...orderedIngredients, foundIngredient]
        }
    });

    //получить иконки
    
    
    const IconsIngredient: FC<{ingredient: IIngredient; indexIcon: number; length: number; key ?: string}> = ({ingredient, indexIcon, length}) =>{
        return ( 
            <div className={`${styles.wrapperIconImg}`}>
                <div>
                    <img src={ingredient.image} alt="icon"/>
                    {indexIcon === 5 && length > 6 ? <span className={`${styles.lastIconIngredient} text text_type_main-default`}>+{length - 6}</span>: null}
                </div>
            </div>
        )
    }


    //получить статус

    //Получить текст статуса
    const getStatus = (status: "done" | "pending" | "created" | undefined) =>{
        switch(status){
            case "done": 
                return  "Выполнен";
            case 'pending':
                return "Готовится";
            case 'created':
                return "Создан";
            default: 
                return ""
            
        }
    }
    return(
        <li key={_id} className={`${styles.container} p-6 ml-0 mr-6 mb-4 mt-4`}>
            <Link 
             to={{
                pathname: `/${order.path}/${_id}`,
                state: { background: location }
            }}
                className={`${styles.ingedientCard} `}
             >
                <div className={`${styles.headerCard} mb-2`}>
                    <p className="text text_type_main-medium">#{number}</p>
                    <p className="text text_type_main-default text_color_inactive">{getDataOrder(createdAt)}</p>
                </div>
                <h2 className="text text_type_main-medium mb-2">{setShortName(name)}</h2>
                { order.path === "feed" ? '' : <p className="text text_type_main-small mb-2 textColor2">{getStatus(status)}</p>}
                <div className={`${styles.footerCard} `}>
                    <div className={`${styles.wrapperIcons}`}>
                        {orderedIngredients.map((item, index) => {
                            return  index <= 5   &&  <IconsIngredient key={uuidv4()} ingredient={item} indexIcon={index} length={orderedIngredients.length} />
                        })}
                    </div>
                    <div className={`${styles.wrapperPrice}`}>
                        <span className={` text text_type_main-medium pr-2`} >{sum}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default OrderItem;