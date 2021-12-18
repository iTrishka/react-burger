import React from 'react';
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import OrderDetails from '../oder-details/oder-details';

import styleBurgerConstructor from "./burger-constructor.module.css";

const BurgerConstructor =  ({data}) => {
    const[modalVisible, setModalVisible] = React.useState(false);
    const dataChecked = data.filter((item)=> { return item.type === "main"});

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

    return(
        <>
            <section className={styleBurgerConstructor.wrapper}>
                <ul className={`${styleBurgerConstructor.scroll} mt-25 pl-1`} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}> 
                    {dataChecked.map( item => (
                            <li  key={item._id} className={styleBurgerConstructor.constructorCard}>
                                <DragIcon type="primary"/>
                                <ConstructorElement
                                    type={item.type}
                                    isLocked={true}
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}
                                />
                            </li>
                    ))}
                </ul>
                <div className={`${styleBurgerConstructor.totalWrapper} mt-10 mb-15`} >
                    <div className={`mr-10`} >
                        <p className={`text text_type_digits-medium mt-1 mr-2 ` }  style={{ display: 'inline' }}>610</p>
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


BurgerConstructor.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
      })
  }; 

export default BurgerConstructor;