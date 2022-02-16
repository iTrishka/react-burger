import React from "react";
import { useHistory, Link ,Redirect} from 'react-router-dom';
import AppHeader from "../components/app-header/app-header"
import { PasswordInput, Input, Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import { API_URL } from "../utils/constants";
import checkResponse from "../services/checkResponse";


import styles from './common.module.css';

export function ResetPasswordPage() {
    const [password, setPassword] = React.useState('');
    const [value, setValue] = React.useState('');
    const inputRef = React.useRef(null);
    const history = useHistory();

    const onChange = e => {
        setPassword(e.target.value)
    }
  
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
    }

    const onResetPassword = (e) => {
        e.preventDefault()
        fetch(`${API_URL}password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify( {
                "password": password,
                "token": value
            })            
        })
        .then(checkResponse)
        .then(res => {
            if(res && res.success){
                history.replace("/login")
                return res.message
                
            }else throw Promise.reject(res.message)
        }).catch(function(e) {
            return e
        })
    }

    let isFromForgotPage = false

    if(history.location.state){
        isFromForgotPage = history.location.state.fromForgotPassword
        console.log("isFromForgotPage", isFromForgotPage)
    }

    return (
        isFromForgotPage ? 
        <>
            <AppHeader/>
            <main  className={styles.main}>
                <div className={styles.container}>
                    <p className={`text text_type_main-medium mb-6`}>Восстановление пароля</p>
                    <form className={`${styles.form} mb-20`} >
                        <PasswordInput  onChange={onChange} value={password} name={'Пароль'}  />
                        <Input 
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={e => setValue(e.target.value)}
                        value={value}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'} />
                        <Button type="primary" size="medium" onClick={onResetPassword}>
                            Сохранить
                        </Button>
                    </form>
                    <div className={` text text_type_main-default text_color_inactive ${styles.disclaimer} mb-4`} >Вспомнили пароль?  <Link to='/login'><Button type="secondary" size="medium">Войти</Button></Link></div>
                </div>
            </main>
        </>
    : <Redirect  to={{pathname: "/forgot-password", state: { fromForgotPassword: false }}} /> )
}