import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
  } from 'react-redux';

  import { AppDispatch, AppThunk, TRootState } from './types';

  // Теперь этот хук «знает» структуру хранилища
export const useAppSelector: TypedUseSelectorHook<TRootState> = selectorHook; 

// Хук не даст отправить экшен, который ему не знаком
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>(); 