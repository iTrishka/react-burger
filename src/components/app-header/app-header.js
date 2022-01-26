import styleHeader from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'


const AppHeader =  () => {
    return(
        <header className={`${styleHeader.header} text text_type_main-default  pt-4 pb-4`}>
            <div className={styleHeader.wrapper}>
                <section>
                    <button className={`${styleHeader.btn} pr-5  mr-2`}>
                        <BurgerIcon type="primary" />
                        <span className={styleHeader.primaryColor}>Конструктор</span>
                    </button>
                    <button className={`${styleHeader.btn} pr-5  mr-2`}>
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
            </div>
        </header>
    )
};  


export default AppHeader;