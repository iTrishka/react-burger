
import PropTypes from 'prop-types';

import StyleIngredientDetails from './ingredient-details.module.css';

const IngredientDetails =  ({elem}) => {
    return(
        <section className={`${StyleIngredientDetails.modalMain} `}>
            <img src={elem.image_large} alt={elem.name} className={`mr-4`}/>
            <p className={`text text_type_main-medium mb-4`} style={{ textAlign: 'center' }}>{elem.name}</p>
            <p className="text text_type_main-small mb-4">
                Превосходные котлеты из марсианской Магнолии для фирменных космических бургеров, набирающий популярность по всей вселенной
            </p>
            <ul className={`${StyleIngredientDetails.modalProps} pl-1 mb-8`}>
                <li className={`mr-5`}>
                  <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                  <p className="text text_type_main-default text_color_inactive">{elem.calories}</p>
                </li >
                <li className={`mr-5`}>
                  <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                  <p className="text text_type_main-default text_color_inactive">{elem.proteins}</p>
                </li>
                <li className={`mr-5`}>
                  <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                  <p className="text text_type_main-default text_color_inactive">{elem.fat}</p>
                </li>
                <li>
                  <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                  <p className="text text_type_main-default text_color_inactive">{elem.carbohydrates}</p>
                </li>
            </ul>
            </section>
    )
};  

// IngredientDetails.propTypes = {
//   elem: PropTypes.object
// }


export default IngredientDetails;