import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';

import store from '../store';

import { TDataApiActions } from '../actions/data-api';
import { TConstructorListActions } from '../actions/constructor-list';
import { TSelectedIngredientActions } from '../actions/selected-ingredient';
import { TOrderNumberActions } from "../actions/order-number";
import { TUserRegisterActions } from "../actions/user-register-api";
import { TUserLoginActions } from "../actions/user-login";
import { TUserLogoutActions } from "../actions/user-logout";
import { TPasswordActions } from "../actions/password";
import { TUserActions } from "../actions/user-info";



//тип нашего хранилища
export type TRootState= ReturnType<typeof store.getState>;

//типизация всех экшенов приложения
export type TAppActions = 
        TDataApiActions |
        TConstructorListActions |
        TSelectedIngredientActions |
        TOrderNumberActions |
        TUserRegisterActions |
        TUserLoginActions | 
        TUserLogoutActions | 
        TPasswordActions |
        TUserActions;

// Типизация thunk'ов в нашем приложении

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, TRootState, TAppActions>
>; 

// Типизация метода dispatch

export type AppDispatch = Dispatch<TAppActions>; 