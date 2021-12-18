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

  const url = 'https://norma.nomoreparties.space/api/ingredients';

  
  React.useEffect(() => {
      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          setState({ ...state, dataIngredients: result.data, loading: false });
        })
        .catch((error) => {
          setState({...state, loading: false, error: true});
      });
  }, []);

  return (
    <div className={styleApp.app}>
      <AppHeader />
      <main>
        {state.dataIngredients ? 
        <>
        <BurgerIngredients data={state.dataIngredients} />
        <BurgerConstructor data={state.dataIngredients} />
        </>
      :  "Загрузка"}
      </main>
      
    </div>
  );
}



export default App;
