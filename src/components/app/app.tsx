import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-сonstructor/burger-constructor';
import styleApp from './app.module.css';



const App = () => {
  const [state, setState] = React.useState({ 
    dataIngredients: null,
    loading: false,
    error: false
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
          setState({ error: false, dataIngredients: result.data, loading: false });
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
    <div className={styleApp.app}>
      <AppHeader />
      <main>
        {state.loading ? loading : ""}
        {state.error ? error : ""} 
        {state.dataIngredients ? 
        <>
        <BurgerIngredients data={state.dataIngredients} />
        <BurgerConstructor data={state.dataIngredients} />
        </>
      :  ""}
      </main>
      
    </div>
  );
}



export default App;
