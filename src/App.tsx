import React from 'react';

import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-сonstructor/burger-constructor';

import styleApp from './app.module.css';

function App() {
  return (
    <div className={styleApp.app}>
      <AppHeader />
      <main>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
