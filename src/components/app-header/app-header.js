import styleHeader from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';



const AppHeader =  () => {
    const [colorConstructor, setColorConstructor] = useState("secondary")
    const [colorOrders, setColorOrders] = useState("secondary")
    const [colorProfile, setColorProfiles] = useState("secondary")

    let history = useHistory(); 

    useEffect(()=> {
        const setActiveMenu = () => {
            if(history.location.pathname === "/"){
                setColorConstructor("primary")
                setColorOrders("secondary")
                setColorProfiles("secondary")
            }else if(history.location.pathname === "/profile/orders"){
                setColorConstructor("secondary")
                setColorOrders("primary")
                setColorProfiles("secondary")
            } else if(history.location.pathname.includes("/profile")){
                setColorConstructor("secondary")
                setColorOrders("secondary")
                setColorProfiles("primary")
            }
        }
        setActiveMenu()
    }, [history.location.pathname])

    return(
        <header className={`${styleHeader.header} text text_type_main-default  pt-4 pb-4`}>
            <div className={styleHeader.wrapper}>
                <section>
                    <button className={`${styleHeader.btn} pr-5  mr-2`}>
                        <Link to="/">
                        <BurgerIcon type={colorConstructor} />
                        <span className={styleHeader[colorConstructor]}>Конструктор</span>
                        </Link>
                    </button>
                    <button className={`${styleHeader.btn} pr-5  mr-2`}>
                        <Link to={{pathname: "/profile/orders", state: { lastPage: "/profile/orders" }}}>
                        <ListIcon type={colorOrders} />
                        <span className={styleHeader[colorOrders]}>Лента заказов</span>
                        </Link>
                    </button>
                </section>
                <section>
                    <Link to="/">
                    <Logo/>
                    </Link>
                </section>
                <section className={styleHeader.btn }>
                    <Link to={{pathname: "/profile", state: { lastPage: "/profile" }}}>
                    <ProfileIcon type={colorProfile} />
                    <span className={styleHeader[colorProfile]}>Личный кабинет</span>
                    </Link>
                </section>
            </div>
        </header>
    )
};  


export default AppHeader;