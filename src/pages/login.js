import React, { useState, useEffect,useCallback } from "react";
import { useHistory,  Redirect, Link } from 'react-router-dom';
import AppHeader from "../components/app-header/app-header"
import { PasswordInput, Input, Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import userLoginRequest from "../services/actions/user-login-request";
import  getUserInfoApi from '../services/actions/get-user-info-api';

import styles from './common.module.css';

export function LoginPage() {
    const { userInfo, userInfoRequest } = useSelector(state => state.userInfo)
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [lastPage, setLastPage] = React.useState('');
    const inputRef = React.useRef(null);
    const [pathRedirect, setPathRedirect] = useState('');
    const history = useHistory();

    const dispatch = useDispatch();

    useEffect(() => {
        //получить данные о пользователе 
        const init =  () => {
            // Вызовем запрос getUser и изменим состояние isUserLoaded
            dispatch(getUserInfoApi());
        };
        // При монтировании компонента запросим данные о пользователе
        init();
    }, [dispatch]);


    //запрос к API, авторизация
    const onLogin =  useCallback(
        e => {
        e.preventDefault(); 
        let body = {
            "email": email, 
            "password": password, 
        }
        dispatch(userLoginRequest("auth/login", body))   
    },[email, password, dispatch])

    const onChange = e => {
        setPassword(e.target.value)
    }
  
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
    }

    
    useEffect(()=> {
        if(history.location.state){
            setLastPage(history.location.state.lastPage)
            setPathRedirect(lastPage)
        }
    }, [history.location.state, lastPage] )

    if (userInfoRequest && !userInfo.name   ) {
        return null;
    }

    return (
        !userInfo.name ?
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
        
  :   <Redirect  to={{pathname: pathRedirect, state: { lastPage: "" }}}/> )
  
}