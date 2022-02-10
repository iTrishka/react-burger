import React, { useState } from "react";
import { Redirect, Link } from 'react-router-dom';
import AppHeader from "../components/app-header/app-header"
import { PasswordInput, Input, Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import getUserRegisterApiRequest from "../services/actions/get-user-register-api-request";

import styles from './common.module.css';

export function RegisterPage() {

    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const { userRegisterApiRequest, userRegisterApiFailed, userRegisterApi } = useSelector(state => state.userRegisterApi);

    const dispatch = useDispatch();

    //запрос к API, регистрация
    const onRegister = (e) => {
        e.preventDefault();
        let body = {
            "email": email, 
            "password": password, 
            "name": name 
        }
    
        dispatch(getUserRegisterApiRequest("auth/register", body))
    }




    
    const inputRef = React.useRef(null);

    const onChange = e => {
        setPassword(e.target.value)
    }
  
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
    }


    return (
        <>
            <AppHeader/>
            <main  className={styles.main}>
                <div className={styles.container}>
                    <p className={`text text_type_main-medium mb-6`}>Регистрация</p>
                    <form className={`${styles.form} mb-20`} >
                        
                        <Input 
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => setName(e.target.value)}
                        value={name}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'} />

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
                        <Button type="primary" size="medium" onClick={onRegister}>
                            Зарегистрироваться
                        </Button>
                    </form>
                    <div className={` text text_type_main-default text_color_inactive ${styles.disclaimer} mb-4`} >Уже зарегистрированы?  <Link to='/login'><Button type="secondary" size="medium">Войти</Button></Link></div>
                </div>
            </main>
        </>
    )
}