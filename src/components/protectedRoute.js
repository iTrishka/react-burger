import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getUserInfoApi from '../services/actions/get-user-info-api';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { apiFetchRefresh } from '../services/refresh-token';


export function ProtectedRoute({ children, ...rest }) {
    const { userInfo } = useSelector(state => state.userInfo)
    const [isUserLoaded, setUserLoaded] = useState(false);

    const dispatch = useDispatch();

    const init = () => {
        // Вызовем запрос getUser и изменим состояние isUserLoaded
        console.log("Пытаемся получить UserInfo")
        console.log(dispatch(getUserInfoApi))
        setUserLoaded(true);
    };

    useEffect(() => {
    // При монтировании компонента запросим данные о пользователе
        init();
    }, []);

    // if (!isUserLoaded) {
    //     return null;
    // }

    return (
        <Route
          {...rest}
          render={() =>
                    // Если пользователь есть, используем компонент, который передан в ProtectedRoute
        userInfo.name ? (
              children
            ) : (
                // Если пользователя нет в хранилище, происходит переадресация на роут /login
                <Redirect
                    to='/login'
      />
            )
          }
        />
      );
    } 