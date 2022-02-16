import {useState} from "react";
import { useDispatch } from 'react-redux';
import {
    Route,
    Switch,
    useLocation, useHistory
  } from "react-router-dom";
import IngredientDetails from "./ingredient-details/ingredient-details";
import { resetSelectedIngredient } from "../services/actions/selected-ingredient";
import Modal from "./modal/modal";
import { MainPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, NotFound404, IngredientPage } from '../pages';
import { ProtectedRoute } from "./protectedRoute";
import { saveStateInLocalstorage } from '../components/localstorage';


  
const ModalSwitch = () => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    let background = location.state && location.state.background;
    const [ isModalOpen, setIsModalOnen] = useState(false)

    const handleCloseModal = (e) => {
        dispatch(resetSelectedIngredient())
        setIsModalOnen(!isModalOpen)
        saveStateInLocalstorage('ingredientInModal', false);
        history.goBack();
    };


    return (
      <>
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
      </>
    );
  };


export default ModalSwitch;