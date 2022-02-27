import React, { useEffect} from "react";
import { useHistory, Link ,Redirect} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PasswordInput, Input, Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import resetPassword from "../services/actions/reset-password";
import { resetPasswordStatus } from "../services/actions/password";


import styles from './common.module.css';

export function ResetPasswordPage() {
    const resetPasswordStatusText = useSelector(state => state.password.resetPasswordStatus)
    const [password, setPassword] = React.useState('');
    const [value, setValue] = React.useState('');
    const inputRef = React.useRef(null);
    const history = useHistory();
    const dispatch = useDispatch();
    const onChange = e => {
        setPassword(e.target.value)
    }
  
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
    }

    const onResetPassword = (e) => {
        e.preventDefault()
        dispatch(resetPassword({"password": password, "token": value }))

    }

    useEffect(()=> {
        if(resetPasswordStatusText === "Password successfully reset"){
        history.replace({ pathname: '/login' });
        dispatch(resetPasswordStatus(""))
    }
    },[resetPasswordStatusText, dispatch, history])



    let isFromForgotPage = false

    if(history.location.state){
        isFromForgotPage = history.location.state.fromForgotPassword
    }

    return (
        isFromForgotPage ? 
        <>
            <main  className={styles.main}>
                <div className={styles.container}>
                    <p className={`text text_type_main-medium mb-6`}>Восстановление пароля</p>
                    <form className={`${styles.form} mb-20`}  onSubmit={onResetPassword}>
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
                        <Button type="primary" size="medium" >
                            Сохранить
                        </Button>
                    </form>
                    <div className={` text text_type_main-default text_color_inactive ${styles.disclaimer} mb-4`} >Вспомнили пароль?  <Link to='/login'><Button type="secondary" size="medium">Войти</Button></Link></div>
                </div>
            </main>
        </>
    : <Redirect  to={{pathname: "/forgot-password", state: { fromForgotPassword: false }}} /> )
}