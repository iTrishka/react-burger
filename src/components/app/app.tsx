import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-сonstructor/burger-constructor';
import styleApp from './app.module.css';
import { IngredientContext } from '../../utils/ingredient-context';


const App = () => {
  const [state, setState] = React.useState({ 
    dataIngredients: null,
    loading: false,
    error: false,
    selectedIngredients: {
      "bun": {"_id":"60d3b41abdacab0026a733c6","name":"Краторная булка N-200i","type":"bun","proteins":80,"fat":24,"carbohydrates":53,"calories":420,"price":1255,"image":"https://code.s3.yandex.net/react/code/bun-02.png","image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png","image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png","__v":0},
      "main": [
        {"_id":"60d3b41abdacab0026a733d4","name":"Сыр с астероидной плесенью","type":"main","proteins":84,"fat":48,"carbohydrates":420,"calories":3377,"price":4142,"image":"https://code.s3.yandex.net/react/code/cheese.png","image_mobile":"https://code.s3.yandex.net/react/code/cheese-mobile.png","image_large":"https://code.s3.yandex.net/react/code/cheese-large.png","__v":0},
        {"_id":"60d3b41abdacab0026a733cf","name":"Соус с шипами Антарианского плоскоходца","type":"sauce","proteins":101,"fat":99,"carbohydrates":100,"calories":100,"price":88,"image":"https://code.s3.yandex.net/react/code/sauce-01.png","image_mobile":"https://code.s3.yandex.net/react/code/sauce-01-mobile.png","image_large":"https://code.s3.yandex.net/react/code/sauce-01-large.png","__v":0},
        {"_id":"60d3b41abdacab0026a733cc","name":"Соус Spicy-X","type":"sauce","proteins":30,"fat":20,"carbohydrates":40,"calories":30,"price":90,"image":"https://code.s3.yandex.net/react/code/sauce-02.png","image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png","image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png","__v":0}
      ]},
    totalPrice: 0,
    orderNumber: 0
  });

  

  const url = 'https://norma.nomoreparties.space/api/ingredients ';

  
  React.useEffect(() => {
      fetch(url)
        .then(result => {
          if (result.ok) {
               return result.json();
          }
          return Promise.reject(result.status);
         })
        .then((result) => {
          setState({ ...state, error: false, dataIngredients: result.data, loading: false });
        })
        .catch((error) => {
          setState({...state, loading: false, error: true});
      });
  }, []);

  const error = (
    <>
      Что-то пошло не так. Повторите попытку позже. 
    </>
  )

  const loading = (
    <>
      Загрузка 
    </>
  )

   return (
    <IngredientContext.Provider value={[state, setState]} >
      <div className={styleApp.app}>
        <AppHeader />
        <main>
          {state.loading ? loading : ""}
          {state.error ? error : ""} 
          {state.dataIngredients ? 
          <>
          <BurgerIngredients data={state.dataIngredients} />
          <BurgerConstructor />
          </>
        :  ""}
        </main> 
      </div>
    </IngredientContext.Provider>

  );
}



export default App;
