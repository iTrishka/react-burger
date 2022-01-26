import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-сonstructor/burger-constructor';
import styleApp from './app.module.css';
import { IngredientContext } from '../../services/ingredient-context';
import { API_URL } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { GET_INGREDIENTS } from '../../services/actions/ingredients-list';


const App = () => {
  const dispatch = useDispatch();

  const [state, setState] = React.useState({ 
    dataIngredients: null,
    loading: false,
    error: false,
    selectedIngredients: {
      bun: [],
      main: []
    },
    orderNumber: 0
  });

React.useEffect(() => {
      setState({ ...state, loading: true });
      fetch(`${API_URL}ingredients`)
        .then(result => {
          if (result.ok) {
               return result.json();
          }
          return Promise.reject(result.status);
         })
        .then((result) => {
          setState(prevState => ({ ...prevState, error: false, dataIngredients: result.data.map(item => ({...item, "key": '', counter: 0 })), loading: false }));
          dispatch({
            type: GET_INGREDIENTS,
            payload: result
          })
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

  const value = React.useMemo(() => ([state, setState]), [state]);

   return (
    <IngredientContext.Provider value={value} >
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
