import React, { useState, useEffect } from "react";
import { Redirect, Link, useHistory } from 'react-router-dom';
import AppHeader from "../components/app-header/app-header"
import { PasswordInput, Input, Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import userLoginRequest from "../services/actions/user-login-request";
import  getUserInfoApi from '../services/actions/get-user-info-api';
import { getCookie } from "../services/cookies";

import styles from './common.module.css';

export function LoginPage() {
    const { userInfo } = useSelector(state => state.userInfo)
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const inputRef = React.useRef(null);
    const { userLoginRequest1, uuserLoginFailed, userLogin } = useSelector(state => state.userLogin);
    const [isUserLoaded, setUserLoaded] = useState(false);


    const dispatch = useDispatch();
    const history = useHistory();

    //получить данные о пользователе 
    const init =  () => {
        // Вызовем запрос getUser и изменим состояние isUserLoaded
        dispatch(getUserInfoApi());
        setUserLoaded(true);
    };

    useEffect(() => {
        // При монтировании компонента запросим данные о пользователе
        init();
    }, []);


    //запрос к API, авторизация
    const onLogin = (e) => {
        e.preventDefault();
        let body = {
            "email": email, 
            "password": password, 
        }
        console.log("кнопка логин")
        dispatch(userLoginRequest("auth/login", body))
        if (userLogin.name) {
            return (
                history.push("/")
            )};
    }

    const onChange = e => {
        setPassword(e.target.value)
    }
  
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
    }

    if (!isUserLoaded) {
        return null;
    }


 if (!userInfo.name) {
        return (
        <>
            <AppHeader/>
            <main  className={styles.main}>
                <div className={styles.container}>
                    <p className={`text text_type_main-medium mb-6`}>Вход</p>
                    <form className={`${styles.form} mb-20`} >
                        <Input 
                        type={'email'}
                        placeholder={'E-mail'}
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'} />
                        <PasswordInput  onChange={onChange} value={password} name={'Пароль'}  />
                        <Button type="primary" size="medium" onClick={onLogin}>
                            Войти
                        </Button>
                    </form>
                    <div className={` text text_type_main-default text_color_inactive ${styles.disclaimer} mb-4`} >Вы — новый пользователь?  <Link to='/register'><Button type="secondary" size="medium">Зарегистрироваться</Button></Link></div>
                    <span className={` text text_type_main-default text_color_inactive ${styles.disclaimer} `}>Забыли пароль?  <Link to='/forgot-password'> <Button type="secondary" size="medium" >Восстановить пароль</Button></Link> </span>
                </div>
            </main>
        </>
        )
    } else return (
       <Redirect  to='/profile' />
    )
}