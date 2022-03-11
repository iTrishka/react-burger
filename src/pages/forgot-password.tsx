import React, {useEffect} from "react";
import { useHistory, Link, Redirect } from 'react-router-dom';
import { Input, Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import  getUserInfoApi from '../services/actions/get-user-info-api';
import getResetPasswordToken from "../services/actions/get-reset-password-token";
import { getResetPasswordTokenStatus } from "../services/actions/password";
import { TRootState } from "../services/reducers/root-reducer";


import styles from './common.module.css';


export function ForgotPasswordPage() {
    const getTokenStatusText = useSelector((state:TRootState)=> state.password.getTokenStatus)
    const { userInfo, userInfoRequest } = useSelector((state:TRootState) => state.userInfo)
    const [value, setValue] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);
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
        setTimeout(() => inputRef?.current?.focus(), 0)
    }

    const onForgotPassword = (e:any) => {
        e.preventDefault();
        dispatch(getResetPasswordToken({"email": value}))
    }

    useEffect(()=> {
        if(getTokenStatusText === "Reset email sent"){
            setValue("")
            dispatch(getResetPasswordTokenStatus(""))
        history.replace({ pathname: '/reset-password' , state: { fromForgotPassword: true }});
        
    }
    },[getTokenStatusText, dispatch, history])

    

    if (userInfoRequest && userInfo && !userInfo.name) {
        return null;
    }

    return (
        userInfo && !userInfo.name ?
        <>
            <main  className={styles.main}>
                <div className={styles.container}>
                    <p className={`text text_type_main-medium mb-6`}>Восстановление пароля</p>
                    <form className={`${styles.form} mb-20`} onSubmit={onForgotPassword} >
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
                        <Button type="primary" size="medium">
                            Восстановить
                        </Button>
                    </form>
                    <div className={` text text_type_main-default text_color_inactive ${styles.disclaimer} mb-4`} >Вспомнили пароль?  <Link to='/login'><Button type="secondary" size="medium">Войти</Button></Link></div>
                </div>
            </main>
        </>
     :   <Redirect  to={"/"}/> )
}