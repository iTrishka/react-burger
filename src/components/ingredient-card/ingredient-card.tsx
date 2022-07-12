import styleIngredientCard from './ingredient-card.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

import {useLocation, Link} from "react-router-dom";
import { IIngredient } from '../../services/types/data';

const IngredientCard = ({card}: {card: IIngredient}) => {

    const location = useLocation();
    const ingredientId = card['_id'];

    const [ { isDragging }  , drag] = useDrag({
        type: 'constructor',
        item: { card: card },
        collect: monitor => ({
          isDragging: monitor.isDragging()
        })
      });

    const opacity = isDragging ? 0.4 : 1;

    return (
        <li
            data-id={card._id}
            data-cypress="ingredient"
            className={`${styleIngredientCard.ingedientCard} mr-4 mt-5 mb-10`}
            style={{ opacity }}
            ref={drag}
            >
              <Link
                key={ingredientId}
                to={{
                  pathname: `/ingredients/${ingredientId}`,
                  state: { background: location },
                }}
                className={`${styleIngredientCard.ingedientCard} `}
              >
                <img src={card.image} alt={card.name} className={`mr-4`} />
                {card.counter && card.counter > 0 ? <Counter count={card.counter } size="default" /> : ""}
                <div className={`${styleIngredientCard.priceWrapper} mt-1`} >
                    <p className={`text text_type_digits-default mt-1 mr-2` } >{card.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`${styleIngredientCard.titleCard} text text_type_main-default  mt-1`}>{card.name}</p>
                </Link>
        </li>
      );
};


export default IngredientCard;