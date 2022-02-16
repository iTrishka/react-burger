import { useHistory, Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getUserInfoApi from '../services/actions/get-user-info-api';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


export function ProtectedRoute({ children, ...rest }) {
    const { userInfo } = useSelector(state => state.userInfo)
    const [isUserLoaded, setUserLoaded] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    let lastPage = "" 
    if(history.location.state){
      lastPage =  history.location.state.lastPage 
    }
  
    
    useEffect(() => {
      const init = () => {
        // Вызовем запрос getUser и изменим состояние isUserLoaded
        dispatch(getUserInfoApi);
        setUserLoaded(true);
    };
    // При монтировании компонента запросим данные о пользователе
        init();
    }, [dispatch]);

    if (!isUserLoaded) {
        return null;
    }

    return (
        <Route
          {...rest}
          render={() =>
         // Если пользователь есть, используем компонент, который передан в ProtectedRoute
        userInfo.name ? (
              children
            ) : (
                // Если пользователя нет в хранилище, происходит переадресация на роут /login
                <Redirect to={{pathname: "/login", state: { lastPage: lastPage }}}/>
            )
          }
        />
      );
    } 