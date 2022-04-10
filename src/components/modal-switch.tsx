import {useState} from "react";
import {
    Route,
    Switch, useLocation, useHistory, Router
  } from "react-router-dom";
import IngredientDetails from "./ingredient-details/ingredient-details";
import { resetSelectedIngredient } from "../services/actions/selected-ingredient";
import Modal from "./modal/modal";
import { MainPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, NotFound404, IngredientPage, FeedPage, OrdersPage, OrderPage } from '../pages';
import { ProtectedRoute } from "./protectedRoute";
import { saveStateInLocalstorage } from './localstorage';
import AppHeader from "./app-header/app-header";
import { useDispatch } from "../services/hooks";
import { IBackgroundLocation } from "../services/types/data";
import { OrderComponent } from "./order-component/order-component";

  
const ModalSwitch = () => {

    const location = useLocation<IBackgroundLocation>();
    const history = useHistory();
    const dispatch = useDispatch();
    let background = location.state && location.state.background;
    const [ isModalOpen, setIsModalOnen] = useState(false)

    const handleCloseModal = () => {
        dispatch(resetSelectedIngredient())
        setIsModalOnen(!isModalOpen)
        saveStateInLocalstorage('ingredientInModal', false);
        history.goBack();
    };


    return (
      <>
        <AppHeader/>
        <Switch location={background || location}>
            <Route path='/' exact>
                <MainPage />
            </Route>
            <Route path='/ingredients/:ingredientId' exact>
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
            <Route path='/feed/:id' exact>
                <OrderPage/>
            </Route>
            <Route path="/feed">
                <FeedPage/>
            </Route>
            <Route>
                <NotFound404 />
            </Route>
        </Switch>

        {background && (
          <Route exact
            path='/ingredients/:ingredientId'
            children={
              <Modal header="Детали ингредиента" onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
        )}
        {background && (
          <Route exact
            path='/feed/:id'
            children={
              <Modal header="" onClose={handleCloseModal}>
                <OrderComponent />
              </Modal>
            }
          />
        )}
      </>
    );
  };


export default ModalSwitch;