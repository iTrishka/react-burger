import * as actionType from '../actions/data-api';
import { dataApiReducer } from './data-api';


describe('dataAPi reducer', () => {
    it('Должен вернуть начальное состояние', () => {
        expect(dataApiReducer(undefined, {})).toEqual({
            dataApiRequest: false,
            dataApiFailed: false,
            dataApi: []
        })
    })
});

it('Should show the status at the begginning of the request', () => {
    expect(dataApiReducer({
        dataApiRequest: false,
        dataApiFailed: false,
        dataApi: []
        }, {
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
            payload:  [{
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
            },
            {
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
            }]          
        }
    )).toEqual({
        dataApiRequest: false,
        dataApiFailed: false,
        dataApi: [{
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
        },
        {
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
        }] 
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
    expect(dataApiReducer({
        dataApiRequest: false,
        dataApiFailed: false,
        dataApi: []
        }, {
            type: actionType.SET_DATA_API,
            payload:  [{
                _id: '60d3b41abdacab0026a733c7',
                name: 'Флюоресцентная булка R2-D3',
                type: 'bun',
                proteins: 44,
                fat: 26,
                carbohydrates: 85,
                calories: 643,
                price: 988,
                image: 'https://code.s3.yandex.net/react/code/bun-01.png',
                image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
                __v: 0,
                counter: 0
            },
            {
                _id: '60d3b41abdacab0026a733c6',
                name: 'Краторная булка N-200i',
                type: 'bun',
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: 'https://code.s3.yandex.net/react/code/bun-02.png',
                image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
                image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
                __v: 0,
                counter: 0
            }]          
        }
    )).toEqual({
        dataApiRequest: false,
        dataApiFailed: false,
        dataApi: [{
            _id: '60d3b41abdacab0026a733c7',
            name: 'Флюоресцентная булка R2-D3',
            type: 'bun',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/bun-01.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
            __v: 0,
            counter: 0
        },
        {
            _id: '60d3b41abdacab0026a733c6',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
            __v: 0,
            counter: 0
        }]   
    })
})
