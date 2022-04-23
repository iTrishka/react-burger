import * as actionType from '../actions/selected-ingredient';
import selectedIngredient from './selected-ingredient';


const TEST_INGREDIENT = {
    _id:"60d3b41abdacab0026a733c7",
    name:"Флюоресцентная булка R2-D3",
    type:"bun",
    proteins:44,
    fat:26,
    carbohydrates:85,
    calories:643,
    price:988,
    image:"https://code.s3.yandex.net/react/code/bun-01.png",
    image_mobile:"https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    image_large:"https://code.s3.yandex.net/react/code/bun-01-large.png",
    __v:0,
    key:"8303fc04-eb86-40e9-ae0c-d2eecda31134"    
}

describe('selectedIngredient reducer', () => {
    it('Должен вернуть начальное состояние', () => {
        expect(selectedIngredient(undefined, {})).toEqual(null)
    })
});

it('Should show selected ingredient', () => {
    expect(selectedIngredient(null, {
            type: actionType.GET_SELECTED_INGREDIENT,
            payload: TEST_INGREDIENT 
        }
    )).toEqual(TEST_INGREDIENT)
})

it('Should delete selected ingredient', () => {
    expect(selectedIngredient(TEST_INGREDIENT, {
            type: actionType.RESET_SELECTED_INGREDIENT
        }
    )).toEqual(null)
})