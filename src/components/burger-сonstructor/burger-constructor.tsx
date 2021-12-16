import React from "react";
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'


import styleBurgerConstructor from "./burger-constructor.module.css"

const BurgerConstructor =  ({data}) => {

    const dataChecked = data.filter((item)=> { return item.type === "bun"});
    return(
        <>
            <section className={styleBurgerConstructor.wrapper}>
                <div className={`${styleBurgerConstructor.scroll} mt-25`} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}> 
                    {dataChecked.map( item => (
                            <div  key={item.id} className={styleBurgerConstructor.constructorCard}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    type={item.type}
                                    isLocked={true}
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}
                                />
                            </div>
                    ))}
                </div>
                <div className={`${styleBurgerConstructor.totalWrapper} mt-10 mb-15`} >
                    <div className={`mr-10`} >
                        <p className={`text text_type_digits-medium mt-1 mr-2 ` }  style={{ display: 'inline' }}>610</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button type="primary" size="medium">
                        Оформить заказ
                    </Button>
                </div>
            </section>
        </>
    )
};  


export default BurgerConstructor;