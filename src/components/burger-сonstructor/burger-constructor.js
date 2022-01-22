import React from 'react';
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { MENUITEMPROPTYPES } from '../../utils/constants';
import PropTypes from 'prop-types';
import { IngredientContext } from '../../services/ingredient-context';
import { URL } from '../../utils/constants';
import  { v4 as uuidv4 } from 'uuid';



import styleBurgerConstructor from "./burger-constructor.module.css";

const totalPrice = { price: 0 };

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
        const url = `${URL}orders`;
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
        setState(prevState => ({ ...prevState, orderNumber: 0 }));
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
      
    const getTotalPrice = () => {
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



    const getBunElement = (pos) => {
        let textPosition = "верх"
        if(pos === "bottom"){
            textPosition = "низ"
        }

        bun.map( bunItem => {
            return(
            <li key={`${bunItem._id}${pos}`} className="mr-4">
                <ConstructorElement
                    type={pos}
                    isLocked={true}
                    text={`${bun.name} (${textPosition})`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </li>    
        )})
    };

    const getIngridientElements = () => {
        ingedients.map(ingedient => {
            return(
                <li key={`${ingedient._id}`} className="mr-4">
                    <DragIcon type="primary"/>
                    <ConstructorElement
                    isLocked={false}
                    text={`${ingedient.name}`}
                    price={ingedient.price}
                    thumbnail={ingedient.image}
                    
                    />
                </li>
            )
        })
    };
    

    return(
        <>
            <section className={styleBurgerConstructor.wrapper}>
                <ul className={`${styleBurgerConstructor.scroll} mt-25 pl-1`}> 
                    {bun.length ? getBunElement("top"): <li className={`${styleBurgerConstructor.emptyTopElement} mr-4 text text_type_main-default`}>Выберите булку</li>}
                    {ingedients.length ? getIngridientElements() : <li className={`${styleBurgerConstructor.emptyIngredientElements} mr-4 text text_type_main-default`}>Выберите начинку</li>}
                    {bun.length ? getBunElement("bottom"): <li className={`${styleBurgerConstructor.emptyBottomElement} mr-4 text text_type_main-default`}>Выберите булку</li>}
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
    data: PropTypes.arrayOf(MENUITEMPROPTYPES),
    item: MENUITEMPROPTYPES,
    getTotalPrice: PropTypes.any
  }; 

export default BurgerConstructor;
