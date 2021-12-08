import React from 'react';

import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burgerIngredients/burger-ingredients';
import BurgerConstructor from './components/burger-сonstructor/burger-constructor';

import styleApp from './app.module.css';

function App() {
  return (
    <div className={styleApp.app}>
      <AppHeader />
      <BurgerIngredients />
      <BurgerConstructor />
    </div>
  );
}

export default App;
