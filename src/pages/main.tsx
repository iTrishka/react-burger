import React from "react";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../components/burger-сonstructor/burger-constructor";
import { DndProvider } from "react-dnd"; 
import { HTML5Backend } from "react-dnd-html5-backend";
import { getUserInfoApi } from "../services/actions/user-info";
import { useDispatch } from "../services/hooks";


export function MainPage() {
    const dispatch = useDispatch();


    React.useEffect(()=> {
        dispatch(getUserInfoApi())
    }, [dispatch])
    return (
        <>
          <main>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main> 
        </>
    )
}