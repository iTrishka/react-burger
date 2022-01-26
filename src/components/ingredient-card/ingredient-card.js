import styleIngredientCard from './ingredient-card.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { menuItemPropTypes } from '../../utils/constants';
import PropTypes from 'prop-types';

const IngredientCard = ({card, handleOpenModal}) => {
    return (
        <li
            data-id={card._id}
            className={`${styleIngredientCard.ingedientCard} mr-4 mt-5 mb-10`}
            onClick={handleOpenModal}
            >
                <img src={card.image} alt={card.name} className={`mr-4`} />
                {card.counter > 0 ? <Counter count={card.counter } size="default" /> : ""}
                <div className={`${styleIngredientCard.priceWrapper} mt-1`} >
                    <p className={`text text_type_digits-default mt-1 mr-2` } >{card.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`${styleIngredientCard.titleCard} text text_type_main-default  mt-1`}>{card.name}</p>
            </li>
      );
};


IngredientCard.propTypes = {
    card: menuItemPropTypes,
    handleOpenModal: PropTypes.func
  };

export default IngredientCard;