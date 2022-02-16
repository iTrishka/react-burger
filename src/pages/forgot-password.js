import React, {useEffect} from "react";
import { useHistory, Link, Redirect } from 'react-router-dom';
import AppHeader from "../components/app-header/app-header"
import { Input, Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import { API_URL } from "../utils/constants";
import { useDispatch, useSelector } from 'react-redux';
import checkResponse from "../services/checkResponse";
import  getUserInfoApi from '../services/actions/get-user-info-api';

import styles from './common.module.css';

export function ForgotPasswordPage() {
    const { userInfo, userInfoRequest } = useSelector(state => state.userInfo)
    const [value, setValue] = React.useState('');
    const inputRef = React.useRef(null);
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
  
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
    }

    const onForgotPassword = (e) => {
        e.preventDefault()
        fetch(`${API_URL}password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify( {
                "email": value
            })            
        })
        .then(checkResponse)
        .then(res => {
            if(res && res.success){
                console.log(res.message)
                setValue("")
                history.replace({ pathname: '/reset-password' , state: { fromForgotPassword: true } });
            }else throw Promise.reject('ошибка')
        }).catch(function(e) {
            console.log(e); 
        })

    }

    if (userInfoRequest && !userInfo.name   ) {
        return null;
    }

    return (
        !userInfo.name ?
        <>
            <AppHeader/>
            <main  className={styles.main}>
                <div className={styles.container}>
                    <p className={`text text_type_main-medium mb-6`}>Восстановление пароля</p>
                    <form className={`${styles.form} mb-20`} >
                        <Input 
                        type={'email'}
                        placeholder={'Укажите e-mail'}
                        onChange={e => setValue(e.target.value)}
                        value={value}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'} />
                        <Button type="primary" size="medium" onClick={onForgotPassword}>
                            Восстановить
                        </Button>
                    </form>
                    <div className={` text text_type_main-default text_color_inactive ${styles.disclaimer} mb-4`} >Вспомнили пароль?  <Link to='/login'><Button type="secondary" size="medium">Войти</Button></Link></div>
                </div>
            </main>
        </>
     :   <Redirect  to={"/"}/> )
}