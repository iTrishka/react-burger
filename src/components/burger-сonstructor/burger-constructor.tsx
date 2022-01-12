import React from 'react';
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../oder-details/oder-details';
import menuItemPropTypes from '../../utils/constants';
import PropTypes from 'prop-types';
import { IngredientContext } from '../../utils/ingredient-context';


import styleBurgerConstructor from "./burger-constructor.module.css";
import { isTemplateExpression } from 'typescript';

const BurgerConstructor =  () => {
    const {state, setState} = React.useContext(IngredientContext);
    const[modalVisible, setModalVisible] = React.useState(false);
    

    const getTotalPrice = () => {
        const sumDataChecked =  state.selectedIngredients.main.reduce((sum, { price }) => sum + price , 0)
        const sumdataCheckedBun =  state.selectedIngredients.bun.reduce((sum, { price }) => sum + price , 0)
        return sumDataChecked + sumdataCheckedBun
     }

    const initialState = getTotalPrice();

    function reducer(totalPrice2, action){
        switch (action.type) {
            case "count":
              return getTotalPrice();
            default:
              throw new Error(`Wrong type of action: ${action.type}`);
          }
    }

    const [totalPrice2, dispatch] = React.useReducer(reducer, initialState);

    const getOrderNumberApi = () => {
        const url = "https://norma.nomoreparties.space/api/orders";
        const allSelectedIdBun = state.selectedIngredients.bun.map(item => item._id)
        const allSelectedIdBMain = state.selectedIngredients.main.map(item => item._id)
        const allSelectedId = allSelectedIdBun.concat(allSelectedIdBMain)
        console.log(allSelectedId)
        fetch(url, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
            body: JSON.stringify({ 
                "ingredients": allSelectedId
            }) 
            })
            .then(result => {
            if (result.ok) {
                return result.json();
            }
            return Promise.reject(result.status);
            })
            .then((result) => {
                setState({...state, orderNumber: result.order.number})
            })
            .catch((error) => {
                console.log("Ошибка: " + error);
            });
         
    }

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleOpenModal = () => {
        getOrderNumberApi();
        dispatch({ type: "count" });

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
                    {burgerIngredientItem(state.selectedIngredients.bun[0], -1, true)}
                    {state.selectedIngredients.main.map( (item, index) => (
                            burgerIngredientItem(item, index, false)
                    ))}
                    {burgerIngredientItem(state.selectedIngredients.bun[0], -2,  true)}
                </ul>
                <div className={`${styleBurgerConstructor.totalWrapper} mt-10 mb-15`} >
                    <div className={`mr-10`} >
                        <p className={`text text_type_digits-medium mt-1 mr-2 ` }>{totalPrice2}</p>
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
    //data: PropTypes.arrayOf(menuItemPropTypes),
    //item: menuItemPropTypes
  }; 

export default BurgerConstructor;