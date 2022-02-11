import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from '../protectedRoute';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-сonstructor/burger-constructor';
import { MainPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, NotFound404, IngredientPage } from '../../pages';
import styleApp from './app.module.css';
import { useParams, useRouteMatch} from 'react-router-dom';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


const App = () => {

   
   
  

  return (
      <div className={`${styleApp.app} mb-10`}>
          <Router>
            <Switch>
              <Route path="/" exact={true}>
                <MainPage />
              </Route>
              <Route path={`/ingredients/:id`} exact={true}>
                <IngredientPage />
              </Route>
              <Route  path="/login" exact={true}>
                <LoginPage />
              </Route >
              <Route path="/register" exact={true}>
                <RegisterPage />
              </Route>
              <Route path="/forgot-password" exact={true}>
                <ForgotPasswordPage />
              </Route>
              <Route path="/reset-password" exact={true}>
                <ResetPasswordPage />
              </Route>
              <ProtectedRoute path="/profile">
                <ProfilePage />
              </ProtectedRoute>
              <Route>
                <NotFound404 />
              </Route>
            </Switch>
          </Router>
      </div>
  );
}



export default App;
