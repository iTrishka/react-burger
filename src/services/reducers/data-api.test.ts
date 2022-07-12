import * as actionType from '../actions/data-api';
import { dataApiReducer, initialState } from './data-api';


//const for tests
const TEST_INGREDIENT_1 = {
    _id:"60d3b41abdacab0026a733c6",
    name:"Краторная булка N-200i",
    type:"bun",
    proteins:80,
    fat:24,
    carbohydrates:53,
    calories:420,
    price:1255,
    image:"https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile:"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large:"https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v:0
}

const TEST_INGREDIENT_2 = {
    _id:"60d3b41abdacab0026a733d4",
    name:"Сыр с астероидной плесенью",
    type:"main",
    proteins:84,
    fat:48,
    carbohydrates:420,
    calories:3377,
    price:4142,
    image:"https://code.s3.yandex.net/react/code/cheese.png",
    image_mobile:"https://code.s3.yandex.net/react/code/cheese-mobile.png",
    image_large:"https://code.s3.yandex.net/react/code/cheese-large.png",
    __v:0
};

//tests    


describe('dataAPi reducer', () => {
    it('Должен вернуть начальное состояние', () => {
        expect(dataApiReducer(undefined, {})).toEqual(initialState)
    })
});

it('Should show the status at the begginning of the request', () => {
    expect(dataApiReducer(initialState, {
            type: actionType.GET_DATA_API            
        }
    )).toEqual({
        dataApiRequest: true,
        dataApiFailed: false,
        dataApi: []
    })
})

it('Should add the incoming ingredients to array', () => {
    expect(dataApiReducer({
        dataApiRequest: true,
        dataApiFailed: false,
        dataApi: []
        }, {
            type: actionType.GET_DATA_API_SUCCESS,
            payload:  [TEST_INGREDIENT_1, TEST_INGREDIENT_2]          
        }
    )).toEqual({
        dataApiRequest: false,
        dataApiFailed: false,
        dataApi: [TEST_INGREDIENT_1, TEST_INGREDIENT_2] 
    })
})

it('should show the error status', () => {
    expect(dataApiReducer({
        dataApi: [],
        dataApiFailed: false,
        dataApiRequest: true
        }, {
            type: actionType.GET_DATA_API_FAILED            
        }
    )).toEqual({
        dataApi: [],
        dataApiFailed: true,
        dataApiRequest: false
    })
})

it('Should add the incoming ingredients to array', () => {
    expect(dataApiReducer(initialState, {
            type: actionType.SET_DATA_API,
            payload:  [TEST_INGREDIENT_1, TEST_INGREDIENT_2]          
        }
    )).toEqual({
        dataApiRequest: false,
        dataApiFailed: false,
        dataApi: [TEST_INGREDIENT_1, TEST_INGREDIENT_2]   
    })
})
