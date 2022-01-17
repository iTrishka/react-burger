import React from 'react';
import {ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import menuItemPropTypes from '../../utils/constants';
import PropTypes from 'prop-types';
import { IngredientContext } from '../../utils/ingredient-context';



import styleBurgerConstructor from "./burger-constructor.module.css";

const totalPrice:any = { price: 0 };

function reducer(state , action){
    switch (action.type) {
        case "total":
            return state
        default:
          throw new Error(`Wrong type of action: ${action.type}`);
      }
}

const BurgerConstructor =  () => {
    const [state, setState] = React.useContext(IngredientContext);
    const bun = state.selectedIngredients.bun;
    const ingedients = state.selectedIngredients.main;

    //получение номера заказа
    const getOrderNumberApi = () => {
        const url = "https://norma.nomoreparties.space/api/orders";
        const allSelectedIdBun = [bun._id]
        const allSelectedIdBMain = ingedients.map(item => item._id)
        const allSelectedId = allSelectedIdBun.concat(allSelectedIdBMain)
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

    //модальное окно
    const[modalVisible, setModalVisible] = React.useState(false);
    const handleCloseModal = () => {
        setModalVisible(false);
        setState({...state, orderNumber: 0})
    };

    const handleOpenModal = () => {
        getOrderNumberApi();
        setModalVisible(true);
    };

    const fillModal = () =>  (
        <Modal header="" onClose={handleCloseModal}> 
             {modalVisible ? <OrderDetails/> : ""}
        </Modal>
    );


    //Рассчет итоговой стоимости  
      
    const getTotalPrice = ():any => {
        let total = 0;
        ingedients.map(item => total += item.price);
        total += bun.price *2
        return total
    }

    const [statePrice, dispatch] = React.useReducer(reducer, totalPrice, getTotalPrice);
   
    React.useEffect(() => {
        setState({
            ...state,
            totalPrice: getTotalPrice()
        })
    }, [state.selectedIngredients])
    

    return(
        <>
            <section className={styleBurgerConstructor.wrapper}>
                <ul className={`${styleBurgerConstructor.scroll} mt-25 pl-1`}> 
                    <li key={`${bun._id}up` }>{bun && (
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (вверх)`}
                            price={bun.price}
                            thumbnail={bun.image}
                            />)}</li>
                    {ingedients && (
                        ingedients.map(ingedient => {
                            return(
                                <li key={`${ingedient._id}${Math.random()*1000}`}><ConstructorElement
                                isLocked={false}
                                text={`${ingedient.name}`}
                                price={ingedient.price}
                                thumbnail={ingedient.image}
                                /></li>
                            )
                        })
                    )}
                    <li key={`${bun._id}down`}>{bun && (
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price}
                            thumbnail={bun.image}
                            />)}</li>   
                </ul>
                <div className={`${styleBurgerConstructor.totalWrapper} mt-10 mb-15`} >
                    <div className={`mr-10`} >
                    <p className={`text text_type_digits-medium mt-1 mr-2 ` }>{state.totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="medium" onClick={handleOpenModal} >
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
