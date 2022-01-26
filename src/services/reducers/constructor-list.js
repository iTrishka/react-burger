import { GET_INGREDIENTS_CONSTRUCTOR_BUN, GET_INGREDIENTS_CONSTRUCTOR_MAIN , RESET_INGREDIENTS_CONSTRUCTOR, ADD_INGREDIENTS_CONSTRUCTOR_MAIN} from '../actions/constructor-list';

const initialState = {
    constructorList: {
        bun: [],
        main: []
    }
}

// Редьюсер списка ингридиентов в конструкторе
const constructorList = (state = initialState.constructorList, action) => {
    console.log("Тип", action.type) 
    switch(action.type) {
        case GET_INGREDIENTS_CONSTRUCTOR_BUN:
            return {
                ...state,
                bun: [action.payload]
            }
        case ADD_INGREDIENTS_CONSTRUCTOR_MAIN:
            return {
                ...state,
                main:
                [
                    ...state.main, action.payload
                ]
            }
        case GET_INGREDIENTS_CONSTRUCTOR_MAIN:
            return {
                ...state,
                main: action.payload
            }
        case RESET_INGREDIENTS_CONSTRUCTOR:
            return {
                bun: [],
                main: []
            }
        default:
            return state;
 }};

 export default constructorList;