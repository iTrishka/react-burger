import React, { RefObject, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styleBurgerIngredient from './burger-ingredients.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import { useDispatch } from 'react-redux';
import getIngredientsApi from '../../services/actions/get-ingredients-api';
import { useAppSelector } from '../../services/reducers/root-reducer';



const BurgerIngredients = () => {
    const { dataApiRequest, dataApiFailed, dataApi } = useAppSelector(state => state.dataApiReducer);

    const dispatch = useDispatch();
    
    //запрос ингридиентов с API
    React.useEffect(()=> {
        if(dataApi.length < 1) {dispatch(getIngredientsApi("ingredients"))}
    }, [dispatch, dataApi.length])

    //табы
    const [current, setCurrent] = React.useState('Булки');
    const tabsName: string[] = ["Булки", "Начинки", "Соусы"];

    const refTitle = useRef<HTMLInputElement>(null);
    const refBun = useRef<HTMLInputElement>(null);
    const refMain = useRef<HTMLInputElement>(null);
    const reSauce = useRef<HTMLInputElement>(null); 

    const changeTab = (e: any) => {
        setCurrent(e)
        if(refMain && e === "Начинки"){
            refMain.current?.scrollIntoView({ behavior: "smooth"});
        }else if (refMain && e === "Соусы"){
            reSauce.current?.scrollIntoView({behavior: "smooth"});
        }else if(refMain && e === "Булки"){
            refBun.current?.scrollIntoView({ behavior: "smooth"});
        }

    }
   
    const getTabs = tabsName.map(tab => 
            <Tab key={tab} value={tab} active={current === tab} onClick={changeTab}>
                <p className="text text_type_main-default">
                        {tab}
                </p>
            </Tab>
    );

    //переключать табы при прокрутке 
     
    
    const getScroll = () => {
        const topTitle = refTitle.current?.getBoundingClientRect().top
        if(topTitle){
            if(refBun.current && refBun.current.getBoundingClientRect().top > topTitle && refBun.current.getBoundingClientRect().top < topTitle + 200 ){
                setCurrent("Булки")
            }else if(refMain.current && refMain.current.getBoundingClientRect().top > topTitle && refMain.current.getBoundingClientRect().top < topTitle + 200 ){
                setCurrent("Начинки")
            }else if(refMain.current && refMain.current.getBoundingClientRect().top > topTitle + 400 ){
                setCurrent("Булки")
            }
            else if(reSauce.current && reSauce.current.getBoundingClientRect().top > topTitle && reSauce.current.getBoundingClientRect().top < topTitle + 200 ){
                setCurrent("Соусы")
            } else if(reSauce.current && reSauce.current.getBoundingClientRect().top > topTitle + 400){
                setCurrent("Начинки")
            }
        } 
       
        
    };


    //верстка_блоки с ингрединтами
    const blockIngredientsType = (pKey:string, ulKey:string, name:string, refName: RefObject<HTMLInputElement>) => {
        const category = dataApi.filter((item) => {return item.type === pKey});
        return(
            <>
                <p key={pKey} className="text text_type_main-medium" ref={refName} >{name}</p> 
                <ul key={ulKey} className={`${styleBurgerIngredient.ingedientType} pl-1`} >
                    {category.map(card =>(                         
                        <IngredientCard card={card}  key={`${card._id}`} />
                        ))}
                </ul>
            </>
        )
    }

    //отрисовать данные по итогу запроса к API
    const getIngedients = () => {
        if (dataApiFailed) {
            return <p>Произошла ошибка при получении данных</p>
        } else if (dataApiRequest) { 
            return <p>Загрузка...</p>
        } else {
            return (
                <> 
                {blockIngredientsType("bun", "bunList", "Булки", refBun)}
                {blockIngredientsType("main", "mainList", "Начинки", refMain )}
                {blockIngredientsType("sauce", "sauceList", "Соусы", reSauce)}
                </>
            )  
        }
    }

    const ingredient = getIngedients()

    return(
        <section className={`${styleBurgerIngredient.wrapper} mt-10 mb-10 mr-10`}>
            <p className="text text_type_main-large mt-40" > Соберите бургер</p>
            <div className={`${styleBurgerIngredient.tabsWrapper}  mt-5`} ref={refTitle} >
                {getTabs}
            </div>
            <div className={`${styleBurgerIngredient.ingedientCardContainer} mt-10`} onScroll={getScroll} >                
               {ingredient}
            </div>
            
        </section>
    )
};  


export default BurgerIngredients;
