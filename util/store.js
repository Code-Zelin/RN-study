

import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';



const TYPES = {
    ACTION_GETWEATHER_INIT: 'action_getweather_init',
    ACTION_GETWEATHER_SUCCESS: 'action_getweather_success'
}

/**
 * GetWeatherReducer.js
 * 这里可以初始化一个默认的实体类
 */
const initialState = {
    status: 'init',
    isSuccess: false,
    bean:null,
    message : '',
}
/**
 * 在这里可以拿到action并return给IndexReducers.js进行分发。
 *
 * 根据type判断了是从哪个action过来的数据，并进行选择性return。
 */
function GetWeatherReducer(state = initialState, action) {
    switch (action.type) {
        case TYPES.ACTION_GETWEATHER_INIT: // 初始状态
            return Object.assign({}, state, {
                status: 'init',
                isSuccess: false,
                bean: action.bean,
                message: action.message,
            });
            break;
        case TYPES.ACTION_GETWEATHER_SUCCESS: // 初始状态
            return Object.assign({}, state, {
                status: 'success',
                isSuccess: true,
                bean: action.bean,
                message: action.message,
            });
            break;
        default:
            return state;
    }
}

/***
 * static的reducer
 */
const initialStatic = {
    baseAddress: '',
    sasToken: ''
}
const STATIC_TYPE = {
    CHANGE_STATIC: 'CHANGE_STATIC'
}
function GetStaticReducer(state = initialStatic, action) {
    console.log("action!!!!!!",action)
    switch (action.type) {
        case STATIC_TYPE.CHANGE_STATIC: // 改变static
            return Object.assign({}, state, action.data);
            break;
        default:
            return state;
    }
}


/**
 * IndexReducers.js
 */
//这里面必须要有初始数据 - 否则报错
const rootReducer = combineReducers({
    GetWeatherReducer,
    GetStaticReducer
})
/**
 ************************************************************************************\
 * Store.js
 */
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);
    return store;
}
