import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-сonstructor/burger-constructor';
import styleApp from './app.module.css';
import { IngredientContext } from '../../services/ingredient-context';
import { URL } from '../../utils/constants';


const App = () => {
  const [state, setState] = React.useState({ 
    dataIngredients: null,
    loading: false,
    error: false,
    selectedIngredients: {
      "bun": [],
      "main": []
    },
    totalPrice: 0,
    orderNumber: 0
  });

React.useEffect(() => {
      setState({ ...state, loading: true });
      fetch(`${URL}ingredients`)
        .then(result => {
          if (result.ok) {
               return result.json();
          }
          return Promise.reject(result.status);
         })
        .then((result) => {
          setState(prevState => ({ ...prevState, error: false, dataIngredients: result.data, loading: false }));
        })
        .catch((error) => {
          setState(prevState => ({...prevState, loading: false, error: true}));
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
      <div className={`${styleApp.app} mt-10 mb-10`}>
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
