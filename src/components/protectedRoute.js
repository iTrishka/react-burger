import { Redirect, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getUserInfoApi from '../services/actions/get-user-info-api';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


export function ProtectedRoute({ children, ...rest }) {
    const { userInfo, userInfoStatus } = useSelector(state => state.userInfo)
    const [isUserLoaded, setUserLoaded] = useState(false);
    const dispatch = useDispatch();
    let location = useLocation();
   
    useEffect(() => {
      const init = () => {
        // Вызовем запрос getUser и изменим состояние isUserLoaded
        dispatch(getUserInfoApi());
      };
      // При монтировании компонента запросим данные о пользователе
        init();
    }, [dispatch]);

    useEffect(()=>{
      if(userInfoStatus){
        setUserLoaded(true)
      }
    },[userInfoStatus,userInfo])


    if (!isUserLoaded) {
        return <>Спиннер</>;
    }

    return (
        <Route
          {...rest}
          render={() =>
         // Если пользователь есть, используем компонент, который передан в ProtectedRoute
         userInfo.email ? (
              children
            ) : (
                // Если пользователя нет в хранилище, происходит переадресация на роут /login
                <Redirect to={{ pathname: "/login", state: { from: location } }}/>
            )
          }
        />
      );
    } 