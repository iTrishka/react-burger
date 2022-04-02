import React, {ChangeEvent, SyntheticEvent, useEffect} from "react";
import { Link, Redirect } from 'react-router-dom';
import { PasswordInput, Input, Button  } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUserRegisterApiRequest } from "../services/actions/user-register-api";
import { useAppSelector, useDispatch } from "../services/hooks";

import styles from './common.module.css';
import { getUserInfoApi } from "../services/actions/user-info";

export function RegisterPage() {
    const { userInfo, userInfoRequest } = useAppSelector(state => state.userInfo)
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');

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

    //запрос к API, регистрация
    const onRegister = (e: SyntheticEvent) => {
        e.preventDefault();
        let body = {
            "email": email, 
            "password": password, 
            "name": name 
        }
        dispatch(getUserRegisterApiRequest("auth/register", body))
    }
    
    const inputRef = React.useRef<HTMLInputElement>(null);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
  
    const onIconClick = () => {
        setTimeout(() => inputRef?.current?.focus(), 0)
    }

    if (userInfoRequest && userInfo && !userInfo.name   ) {
        return null;
    }


    return (
         userInfo && !userInfo.name ?
        <>
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
     :   <Redirect  to={"/"}/> )
}