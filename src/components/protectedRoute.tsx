import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserInfoApi } from '../services/actions/user-info';
import { useAppSelector, useDispatch } from "../services/hooks";
import { ILocationState } from '../services/types/data';


export function ProtectedRoute({ children, ...rest }: RouteProps) {
    const { userInfo, userInfoStatus } = useAppSelector(state => state.userInfo)
    const [isUserLoaded, setUserLoaded] = useState<boolean>(false);
    const dispatch = useDispatch();
    let location = useLocation<ILocationState>();
   
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