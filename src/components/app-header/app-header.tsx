import React from "react";
import styleHeader from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'


const AppHeader =  () => {
    return(
        <header className={styleHeader.header} >
            <section>
                <button className={styleHeader.btn}>
                    <BurgerIcon type="primary" />
                    <span>Конструктор</span>
                </button>
                <button className={styleHeader.btn}>
                    <ListIcon type="secondary" />
                    <span>Лента заказов</span>
                </button>
            </section>
                <Logo/>
            <section className={styleHeader.btn}>
                <ProfileIcon type="secondary" />
                <span>Личный кабинет</span>
            </section>
        </header>
    )
};  


export default AppHeader;