import styleHeader from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';


const AppHeader =  () => {
    return(
        <header className={`${styleHeader.header} text text_type_main-default  pt-4 pb-4`}>
            <div className={styleHeader.wrapper}>
                <section>
                    <button className={`${styleHeader.btn} pr-5  mr-2`}>
                        <Link to="/">
                        <BurgerIcon type="primary" />
                        <span className={styleHeader.primaryColor}>Конструктор</span>
                        </Link>
                    </button>
                    <button className={`${styleHeader.btn} pr-5  mr-2`}>
                        <Link to="/profile">
                        <ListIcon type="secondary" />
                        <span className={styleHeader.secondaryColor}>Лента заказов</span>
                        </Link>
                    </button>
                </section>
                <section>
                    <Link to="/">
                    <Logo/>
                    </Link>
                </section>
                <section className={styleHeader.btn }>
                    <Link to="/profile">
                    <ProfileIcon type="secondary" />
                    <span className={styleHeader.secondaryColor}>Личный кабинет</span>
                    </Link>
                </section>
            </div>
        </header>
    )
};  


export default AppHeader;