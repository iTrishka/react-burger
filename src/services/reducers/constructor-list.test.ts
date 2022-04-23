import * as actionType from '../actions/constructor-list';
import constructorList, {initialState} from './constructor-list';


//const for tests
const TEST_BUN_1 = {_id:"60d3b41abdacab0026a733c7",
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
key:"8303fc04-eb86-40e9-ae0c-d2eecda31134"}

const TEST_MAIN_1 = {
    _id:"60d3b41abdacab0026a733c9",
name:"Мясо бессмертных моллюсков Protostomia",
type:"main",
proteins:433,
fat:244,
carbohydrates:33,
calories:420,
price:1337,
image:"https://code.s3.yandex.net/react/code/meat-02.png",
image_mobile:"https://code.s3.yandex.net/react/code/meat-02-mobile.png",
image_large:"https://code.s3.yandex.net/react/code/meat-02-large.png",
__v:0,
key:"3f9bb5c0-2c00-434e-bd9c-f65b7c57a66c"
};

const TEST_MAIN_2 = {
        _id:"60d3b41abdacab0026a733d3",
        name:"Мини-салат Экзо-Плантаго",
        type:"main",
        proteins:1,
        fat:2,
        carbohydrates:3,
        calories:6,
        price:4400,
        image:"https://code.s3.yandex.net/react/code/salad.png",
        image_mobile:"https://code.s3.yandex.net/react/code/salad-mobile.png",
        image_large:"https://code.s3.yandex.net/react/code/salad-large.png",
        __v:0,
        key:"5d721bb4-7dfe-4095-a1a6-af37924762f3"
    };

//tests    

describe('constructor-list reducer', () => {
    it('Должен вернуть начальное состояние', () => {
        expect(constructorList(undefined, {})).toEqual(initialState)
    })
});

it('Should add bun', () => {
    expect(constructorList(initialState, {
            type: actionType.GET_INGREDIENTS_CONSTRUCTOR_BUN,
            payload: TEST_BUN_1
            
        }
    )).toEqual({
            bun: [TEST_BUN_1], 
            main: []
    })
})

it('Should add ingedient in main', () => {
    expect(constructorList({
            bun: [],
            main: [TEST_MAIN_1]
        }, {
            type: actionType.ADD_INGREDIENTS_CONSTRUCTOR_MAIN,
            payload: TEST_MAIN_2
        }
    )).toEqual({
            bun: [], 
            main: [TEST_MAIN_1,TEST_MAIN_2]
    })
})

it('Should add main', () => {
    expect(constructorList(initialState, {
            type: actionType.GET_INGREDIENTS_CONSTRUCTOR_MAIN,
            payload:[TEST_MAIN_1,TEST_MAIN_2]
        }
    )).toEqual({
            bun: [], 
            main: [TEST_MAIN_1,TEST_MAIN_2]
    })
})

it('Reset ingredients in constructor', () => {
    expect(constructorList({
            bun: [TEST_BUN_1],
            main: [TEST_MAIN_1,TEST_MAIN_2]
        }, {
            type: actionType.RESET_INGREDIENTS_CONSTRUCTOR,
        }
    )).toEqual(initialState)
})

it('Should sort ingredients in main', () => {
    expect(constructorList({
            bun: [TEST_BUN_1],
            main: [TEST_MAIN_1,TEST_MAIN_2]
        }, {
            type: actionType.SORT_INGREDIENTS_CONSTRUCTOR,
            payload: [TEST_MAIN_2, TEST_MAIN_1]
        }
    )).toEqual({
            bun:[TEST_BUN_1], 
            main: [TEST_MAIN_2, TEST_MAIN_1]
    })
})