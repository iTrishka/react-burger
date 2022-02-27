import { useEffect } from 'react';
import { useParams, useRouteMatch} from "react-router-dom";
import StyleIngredientDetails from './ingredient-details.module.css';
import { useSelector } from 'react-redux';
import { saveStateInLocalstorage } from '../localstorage';

const IngredientDetails = () => {
  const { dataApi } = useSelector(state => state.dataApiReducer)
  let { ingredientId } = useParams();
  const elem = dataApi.filter(item => item._id === ingredientId)[0]
  const { url } = useRouteMatch();

  //Сохранение дынных об открутой модальном окне в localStorage
  useEffect(()=> {
    if(url){
        saveStateInLocalstorage('ingredientInModal', url);
    }
  },[url])

    if(elem) {return(
        <section className={`${StyleIngredientDetails.modalMain} `}>
            <img src={elem.image_large} alt={elem.name} className={`mr-4`}/>
            <p className={`text text_type_main-medium mb-4`}>
              {elem.name}</p>
            <p className="text text_type_main-small mb-4">
                Превосходные котлеты из марсианской Магнолии для фирменных космических бургеров, набирающий популярность по всей вселенной
            </p>
            <ul className={`${StyleIngredientDetails.modalProps} pl-1 mt-8`}>
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
    )} else return (<></>)
};  

export default IngredientDetails;