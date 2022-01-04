import React from 'react';
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../oder-details/oder-details';
import menuItemPropTypes from '../../utils/constants';
import PropTypes from 'prop-types';


import styleBurgerConstructor from "./burger-constructor.module.css";

const BurgerConstructor =  ({data}) => {
    const[modalVisible, setModalVisible] = React.useState(false);
    const dataChecked = data.filter((item)=> { return item.type === "main"});
    const dataCheckedBun = data.filter((item)=> { return item.type === "bun"});

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const fillModal = () =>  (
        <Modal header="" onClose={handleCloseModal}> 
             {modalVisible ? <OrderDetails/> : ""}
        </Modal>
    );

    const burgerIngredientItem = (item, index, isLocked) => {
        let title = "";    
        if(index === -1){
            title = item.name + " (верх)"
        }else if (index === -2){
            title = item.name + " (низ)"
        }else {
            title = item.name
        }

        return(
        <li  key={index} className={styleBurgerConstructor.constructorCard}>
            {!isLocked ? <DragIcon type="primary"/> : ""}
            <ConstructorElement
                type={item.type}
                isLocked={isLocked}
                text={title}
                price={item.price}
                thumbnail={item.image}
            />
        </li>
    )}

    return(
        <>
            <section className={styleBurgerConstructor.wrapper}>
                <ul className={`${styleBurgerConstructor.scroll} mt-25 pl-1`}> 
                    {burgerIngredientItem(dataCheckedBun[1], -1, true)}
                    {dataChecked.map( (item, index) => (
                            burgerIngredientItem(item, index, false)
                    ))}
                    {burgerIngredientItem(dataCheckedBun[1], -2,  true)}
                </ul>
                <div className={`${styleBurgerConstructor.totalWrapper} mt-10 mb-15`} >
                    <div className={`mr-10`} >
                        <p className={`text text_type_digits-medium mt-1 mr-2 ` }>610</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button type="primary" size="medium" onClick={handleOpenModal}>
                        Оформить заказ
                    </Button>
                </div>
            </section>
            {modalVisible ? fillModal() : null}
        </>
    )
};  

BurgerConstructor.defaultProps = {
    isLocked: true
  };


BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(menuItemPropTypes),
    item: menuItemPropTypes
  }; 

export default BurgerConstructor;