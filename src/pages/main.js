import React from "react";
import AppHeader from "../components/app-header/app-header"; 
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../components/burger-сonstructor/burger-constructor";
import { DndProvider } from "react-dnd"; 
import { HTML5Backend } from "react-dnd-html5-backend";
import getUserInfoApi from '../services/actions/get-user-info-api';
import { useDispatch } from 'react-redux';
import { useParams, useRouteMatch} from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IngredientPage } from '../pages';


export function MainPage() {
    const dispatch = useDispatch();

    React.useEffect(()=> {
        dispatch(getUserInfoApi())
    }, [dispatch])
    return (
        <>
        <AppHeader/>
                <main>
                  <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                  </DndProvider>
                </main> 
        </>
    )
}