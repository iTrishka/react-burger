import styleHeader from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'


const AppHeader =  () => {
    return(
        <header className={`${styleHeader.header} mt-4 mb-4`}>
            <section>
                <button className={`${styleHeader.btn} pr-5 pl-5 mr-2`}>
                    <BurgerIcon type="primary" />
                    <span className={styleHeader.primaryColor}>Конструктор</span>
                </button>
                <button className={`${styleHeader.btn} pr-5 pl-5 mr-2`}>
                    <ListIcon type="secondary" />
                    <span className={styleHeader.secondaryColor}>Лента заказов</span>
                </button>
            </section>
            <section>
                <Logo/>
            </section>
            <section className={styleHeader.btn }>
                <ProfileIcon type="secondary" />
                <span className={styleHeader.secondaryColor}>Личный кабинет</span>
            </section>
        </header>
    )
};  


export default AppHeader;