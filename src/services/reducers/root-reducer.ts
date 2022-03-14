import { combineReducers } from "redux";
import constructorList from "./constructor-list";
import selectedIngredient from "./selected-ingredient";
import { orderNumber }  from "./order-number";
import { dataApiReducer } from "./data-api";
import { userRegisterApi } from "./user-register-api";
import { userLogin } from "./user-login";
import { userLogout } from "./user-logout";
import { password } from "./password";
import { userInfo } from "./user-info";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


export const useAppDispatch = () => useDispatch()
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector


const rootReducer = combineReducers({
    dataApiReducer,
    constructorList,
    selectedIngredient,
    orderNumber, 
    userRegisterApi, 
    userLogin, 
    userLogout,
    password,
    userInfo,
} )

export type TRootState= ReturnType<typeof rootReducer>;

export default rootReducer;