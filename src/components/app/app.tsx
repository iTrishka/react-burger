import React from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-сonstructor/burger-constructor';
import data from '../../utils/data';
import styleApp from './app.module.css';


function App() {
  const dataList = data;
  console.log(dataList);
  return (
    <div className={styleApp.app}>
      <AppHeader />
      <main>
        <BurgerIngredients data={dataList} />
        <BurgerConstructor data={dataList} />
      </main>
    </div>
  );
}



export default App;
