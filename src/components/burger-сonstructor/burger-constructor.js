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

const BurgerConstructor =  () => {
    const [state, setState] = React.useContext(IngredientContext);
    const bun = state.selectedIngredients.bun;
    const ingedients = state.selectedIngredients.main;
    let totalPrice = 0;

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
                setState(prevState=> ({...prevState, orderNumber: result.order.number}))
            })
            .catch((error) => {
                console.log("Ошибка: " + error);
            });
            
    }

   

    //модальное окно
    const handleCloseModal = () => {
        setState(prevState => ({ ...prevState, orderNumber: 0 }));
    };

    const handleOpenModal = () => {
        getOrderNumberApi();
    };

    const fillModal = () =>  (
        <Modal header="" onClose={handleCloseModal}> 
             {state.orderNumber ? <OrderDetails/> : ""}
        </Modal>
    );


    //Рассчет итоговой стоимости  
    
    const getTotalPrice = () => {
        let totalBun = 0;
        let totalIngedients = 0;

        if(state.selectedIngredients.main.length){
            state.selectedIngredients.main.forEach(item => {
                totalIngedients += item.price;
        })}
        
        if(state.selectedIngredients.bun.length){
            state.selectedIngredients.bun.forEach(item => {
                totalBun += item.price;
            })
            totalBun = totalBun*2
        }

        return (totalBun + totalIngedients)
    };

    totalPrice = React.useMemo(() => getTotalPrice(), [state.selectedIngredients]);

    
     // удаление ингредиенты из конструктора
    
     const onDeleteIngredient = (uid, id) => {
        const newIngerientsAr = state.selectedIngredients.main.filter(item => item.key !== uid);
        setState( prevState => ({
            ...prevState, 
            selectedIngredients: {
                ...prevState.selectedIngredients, 
                main: newIngerientsAr
            }
        }))

        const newArr = state.dataIngredients.map(item => {
            if(item._id === id){
                return {...item, counter: item.counter-1}
            } else return item
        })
    
    
        setState(prevState => ({
            ...prevState, 
            dataIngredients: newArr
        }))
    };

    

    //___________

    const getBunElement = (pos) => {
        let textPosition = "верх"
        if(pos === "bottom"){
            textPosition = "низ"
        }
        return bun.map(bunItem => {
            return(
            <li key={uuidv4()} className="mr-4">
                <ConstructorElement
                    type={pos}
                    isLocked={true}
                    text={`${bunItem.name} (${textPosition})`}
                    price={bunItem.price}
                    thumbnail={bunItem.image}
                />
            </li>    
        )})
    };

    const getIngridientElements = () => {
       return ingedients.map(ingredient => {
           const uid = uuidv4();
           ingredient.key = uid;
            return(
                <li key={uid} className="mr-4">
                    <DragIcon type="primary"/>
                    <ConstructorElement
                    isLocked={false}
                    text={`${ingredient.name}`}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    handleClose={() => onDeleteIngredient(uid, ingredient._id )}
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
                    <p className={`text text_type_digits-medium mt-1 mr-2 ` }>{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="medium" onClick={handleOpenModal} >
                    Оформить заказ
                </Button>
                </div>
            </section>
            {state.orderNumber ? fillModal() : null}
        </>
    )
    
};  

BurgerConstructor.defaultProps = {
    isLocked: true
  };


BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(MENUITEMPROPTYPES),
    item: MENUITEMPROPTYPES,
    getTotalPrice: PropTypes.func
  }; 

export default BurgerConstructor;
