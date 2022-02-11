import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import AppHeader from "../components/app-header/app-header"
import { PasswordInput, Input, Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import { getCookie } from "../services/cookies";
import getUserInfoApi from "../services/actions/get-user-info-api";
import { useDispatch, useSelector } from 'react-redux';
import userLogoutRequestApi from "../services/actions/user-logout-request-api";
import changeUserInfoApi from "../services/actions/change-user-info-api";
import { resetUserInfo } from "../services/actions/user-info";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { apiFetchRefresh } from "../services/refresh-token";


import ProfileStyles  from './profile.module.css';
import { ProtectedRoute } from "../components/protectedRoute";

export function ProfilePage() {
    const { email, name} = useSelector(state => state.userInfo.userInfo)

    const [value, setValue] = React.useState('имя')
    const [login, setLogin] = React.useState('email')
    const inputRefName = React.useRef(null)
    const inputRefEmail = React.useRef(null)
    const inputRefPassword = React.useRef(null)

    const { url } = useRouteMatch();
    const dispatch = useDispatch();
    const history = useHistory();

    // React.useEffect(() = > {
    //     if 
    // }, [])

    React.useEffect(()=> {
        apiFetchRefresh(getUserInfoApi)
    }, [dispatch])

    useEffect(()=> {
        if(email || name){
            setValue(name)
            setLogin(email)
    }
     }, [email, name])


    const onLogout = (e) => {
        e.preventDefault();
        let refreshToken =  getCookie('refreshToken');
        dispatch(userLogoutRequestApi({"token" : refreshToken}));
        history.push("/login");
    }

    //изменить данные 
    const [isButtonShow, setIsButtonShow] = useState(false);

    const [iconName, setIconName] = useState('EditIcon');
    const [iconEmail, setIconEmail] = useState('EditIcon');
    const [iconPassword, setIconPassword] = useState('EditIcon');

    const [disableName, setdisableName] = useState(true);
    const [disableEmail, setdisableEmail] = useState(true);
    const [disablePassword, setdisablePassword] = useState(true);

    const showButton = () => {
        if(!isButtonShow) {setIsButtonShow(true)}
    }

    const onChangeUserInfo = useCallback(
        () => {
            //e.preventDefault();
            let body = {
                "email": login, 
                "name": value, 
            }
            dispatch(changeUserInfoApi(body))  
            setIsButtonShow(false)    
        },
        [login,value],
      );
    

    const ChangeButton = <div>
        <Button type="primary" size="small" onClick={()=>onChangeUserInfo()}> Сохранить </Button>
        <span className="mr-2"></span>
        <Button type="primary" size="small" onClick={()=> {
            setValue(name);
            setLogin(email);
            setIsButtonShow(false)
        }} > Отменить </Button>
    </div>

    const onChangeName = (e) => {
        showButton()
        setdisableName(!disableName)
        disableName ? setIconName('CheckMarkIcon') : setIconName('EditIcon');
        setTimeout(() => inputRefName.current.focus(), 0);
        // if(!disableName){onChangeUserInfo()}
    }

    const onChangeEmail = (e) => {
        showButton()
        setdisableEmail(!disableEmail)
        disableEmail ? setIconEmail('CheckMarkIcon') : setIconEmail('EditIcon');
        setTimeout(() => inputRefEmail.current.focus(), 0);
        console.log(!disableEmail)
        // if(disableEmail){onChangeUserInfo()}
    }

    const onChangePassword = (e) => {
        showButton()
        setdisablePassword(!disablePassword)
        disablePassword ? setIconPassword('CheckMarkIcon') : setIconPassword('EditIcon');
        setTimeout(() => inputRefPassword.current.focus(), 0)
        // if(!disablePassword){onChangeUserInfo()}
    }

    

    // const [password, setPassword] = React.useState('password')
    // const onChange = e => {
    //     setValue(e.target.value)
    // }

    const Profile = (
        <form className="mb-20"><Input
        type={'text'}
        placeholder={'Имя'}
        onChange={e => {setValue(e.target.value); showButton()}}
        icon={iconName}
        value={value}
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
        name={'name'}
        error={false}
        ref={inputRefEmail}
        onIconClick={onChangeEmail}
        errorText={'Ошибка'}
        size={'default'}
        disabled={disableEmail}
        key={'2userProfile'}
    />
    <Input
        type={'password'}
        placeholder={'Пароль'}
        onChange={e => {setLogin(e.target.value); showButton()}}
        icon={iconPassword}
        value={login}
        name={'name'}
        error={false}
        ref={inputRefPassword}
        onIconClick={onChangePassword}
        errorText={'Ошибка'}
        size={'default'}
        disabled={disablePassword}
        key={'3userProfile'}
    />
    </form>
    );
    const Orders = <div>Orders</div>

    
    

    return (
        <>
            <AppHeader/>
                <main>
                    <div className={`${ProfileStyles.container} mt-30`}>
                        <section className="mr-15"> 
                        <Button type="secondary" size="medium">
                            <Link to={`${url}`} className={`text text_type_main-medium  ${ProfileStyles.textBtn} ${ProfileStyles.active}`}> Профиль</Link>
                        </Button>
                        <Button type="secondary" size="medium">
                            <Link to={`${url}/orders`} className={`text text_type_main-medium text_color_inactive ${ProfileStyles.textBtn}`}> История заказов</Link>
                        </Button>
                        <Button type="secondary" size="medium" onClick={onLogout}>
                            <a className={`text text_type_main-medium text_color_inactive ${ProfileStyles.textBtn}`}> Выход</a>
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
                        {isButtonShow ? ChangeButton : ""}
                        </Route>
                        <Route path={`${url}/orders`} exact> {Orders} </Route> 
                        </Switch>
                    </section>
                    </div>
                </main>
        </>
    )
}         


