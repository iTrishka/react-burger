import React, { useCallback, useEffect, useState, MouseEvent, SyntheticEvent } from "react";
import {  useRouteMatch, NavLink, Redirect } from 'react-router-dom';
import {  Input, Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import getUserInfoApi from "../services/actions/get-user-info-api";
import userLogoutRequestApi from "../services/actions/user-logout-request-api";
import changeUserInfoApi from "../services/actions/change-user-info-api";
import { Switch, Route } from 'react-router-dom';
import { refreshToken } from "../services/refresh-token";
import { loadStateFromLocalstorage } from "../components/localstorage";
import { useAppSelector, useDispatch } from "../services/hooks";


import ProfileStyles  from './profile.module.css';
import { TICons } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

export function ProfilePage() {
    const email = useAppSelector(state => state.userInfo.userInfo!.email)
    const name = useAppSelector(state => state.userInfo.userInfo!.name)
    const  userInfoRequestFailed  = useAppSelector(state => state.userInfo.userInfoRequestFailed)
    const [inputName, setInputName] = React.useState('имя')
    const [login, setLogin] = React.useState<string>('email')
    const [password, setPassword] = React.useState('')
    const inputRefName = React.useRef<HTMLInputElement>(null);
    const inputRefEmail = React.useRef<HTMLInputElement>(null);
    const inputRefPassword = React.useRef<HTMLInputElement>(null);

    const { url } = useRouteMatch();
    const dispatch = useDispatch();

    React.useEffect(()=> {
        refreshToken();
        dispatch(getUserInfoApi)
    }, [dispatch])

    useEffect(()=> {
        if( email || name){
            setInputName(name)
            setLogin(email)
    }
     }, [email, name])


    const onLogout = (e:  SyntheticEvent) => {
        e.preventDefault();
        let refreshToken =  loadStateFromLocalstorage('refreshToken');
        dispatch(userLogoutRequestApi({"token" :  refreshToken}))
    }

    //изменить данные 
    const [isButtonShow, setIsButtonShow] = useState(false);

    const [iconName, setIconName] = useState<keyof TICons>('EditIcon');
    const [iconEmail, setIconEmail] = useState<keyof TICons>('EditIcon');
    const [iconPassword, setIconPassword] = useState<keyof TICons>('EditIcon');

    const [disableName, setdisableName] = useState(true);
    const [disableEmail, setdisableEmail] = useState(true);
    const [disablePassword, setdisablePassword] = useState(true);

    const [typeInputPassword, setTypeInputPassword] = useState<"password" | "email" | "text" | undefined>("password");

    useEffect(() =>{
        if(iconPassword === "CheckMarkIcon"){
            setTypeInputPassword("text") 
        } else(setTypeInputPassword("password"))
    }, [iconPassword])

    const showButton = () => {
        if(!isButtonShow) {setIsButtonShow(true)}
    }

    const onChangeUserInfo = useCallback(
        () => {
            let body = {
                "email": login, 
                "name": inputName, 
                "password": password
            }
            dispatch(changeUserInfoApi(body))  
            if(userInfoRequestFailed){
                setInputName(name);
                setLogin(email);
                setPassword("") 
                setIsButtonShow(false);
                setIconNameAll()
            }else {
            setIsButtonShow(false)  
            setIconNameAll()
            setPassword("")  
            }
        },
        [login, inputName, password, userInfoRequestFailed, dispatch, email, name],
      );
    

    const ChangeButton = <div className={ProfileStyles.changeButton}>
        <Button type="primary" size="medium" > Сохранить </Button>   
        <span className="mr-2"></span>  
        <Button type="secondary" size="medium" onClick={()=> {
            setInputName(name);
            setLogin(email);
            setIsButtonShow(false);
            setIconNameAll()
        }} > Отменить </Button>  
    </div>

    const setIconNameAll = () => {
        setIconName('EditIcon')
        setIconEmail('EditIcon')
        setIconPassword('EditIcon')
        setdisableName(true)
        setdisableEmail(true)
        setdisablePassword(true)
        }

    const onChangeName = (e: MouseEvent<HTMLElement>) => {
        showButton()
        setdisableName(!disableName)
        disableName ? setIconName('CheckMarkIcon') : setIconName('EditIcon');
        setTimeout(() => inputRefName?.current?.focus(), 0);
    }

    const onChangeEmail = (e: MouseEvent<HTMLElement>) => {
        showButton()
        setdisableEmail(!disableEmail)
        disableEmail ? setIconEmail('CheckMarkIcon') : setIconEmail('EditIcon');
        setTimeout(() => inputRefEmail?.current?.focus(), 0);
    }

    const onChangePassword = (e: MouseEvent<HTMLElement>) => {
        showButton()
        setdisablePassword(!disablePassword)
        disablePassword ? setIconPassword('CheckMarkIcon') : setIconPassword('EditIcon');
        setTimeout(() => inputRefPassword?.current?.focus(), 0)
    }

    

    const Profile = (
        <form className="mb-20" onSubmit={(e)=> {
            e.preventDefault();
            onChangeUserInfo()}}><Input
        type={'text'}
        placeholder={'Имя'}
        onChange={e => {setInputName(e.target.value); showButton()}}
        icon={iconName}
        value={inputName}
        name={'name'}
        error={false}
        ref={inputRefName}
        onIconClick={onChangeName}
        errorText={'Ошибка'}
        size={'default'}
        disabled={disableName}
        key={'1userProfile'}
    />
    <Input
        type={'email'}
        placeholder={'Логин'}
        onChange={e => {setLogin(e.target.value); showButton()}}
        icon={iconEmail}
        value={login}
        name={'email'}
        error={false}
        ref={inputRefEmail}
        onIconClick={onChangeEmail}
        errorText={'Ошибка'}
        size={'default'}
        disabled={disableEmail}
        key={'2userProfile'}
    />
    <Input
        type={typeInputPassword}
        placeholder={'Пароль'}
        onChange={e => {setPassword(e.target.value); showButton()}}
        icon={iconPassword}
        value={password}
        name={'password'}
        error={false}
        ref={inputRefPassword}
        onIconClick={onChangePassword}
        errorText={'Ошибка'}
        size={'default'}
        disabled={disablePassword}
        key={'3userProfile'}
        
    />
    {isButtonShow ? ChangeButton : ""}
    </form>
    );
    const Orders = <div className="text  text_type_main-default">Здесь будет храниться история Ваших заказов</div>
      

    const loginView = <Redirect to="/login" />
    const profileView = (<main>
        <div className={`${ProfileStyles.container} mt-30`}>
            <section className="mr-15"> 
            <NavLink  exact 
                to={`${url}`}
                className={`text text_type_main-medium pt-4 pb-4 ${ProfileStyles.secondary}`}
                activeClassName={ProfileStyles.primary}
            > Профиль </NavLink>
            <NavLink exact 
                to={`${url}/orders`} 
                className={`text text_type_main-medium pt-4 pb-4  ${ProfileStyles.secondary}`}
                activeClassName={ProfileStyles.primary}
            > История заказов </NavLink>

            <Button type="secondary" size="medium" onClick={onLogout}>
                <span className={`text text_type_main-medium text_color_inactive ${ProfileStyles.textBtn}`}> Выход</span>
            </Button>
                <p className="text text_type_main-default text_color_inactive mt-20">
                    В этом разделе вы можете
                    изменить свои персональные данные
                </p>
        </section>
        <section>
            <Switch>
            <Route path={`${url}`} exact > 
            {Profile}
            </Route>
            <Route path={`${url}/orders`} exact> {Orders} </Route> 
            </Switch>
        </section>
        </div>
    </main>)


    return (
        email ? profileView : loginView 

    )

    
}         


