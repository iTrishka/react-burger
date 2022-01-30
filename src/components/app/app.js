import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-сonstructor/burger-constructor';
import styleApp from './app.module.css';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


const App = () => {

  return (
      <div className={`${styleApp.app} mt-10 mb-10`}>
        <AppHeader />
        <main>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main> 
      </div>
  );
}



export default App;
