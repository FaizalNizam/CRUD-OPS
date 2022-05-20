import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { getReducer } from './listReducer'

const middleware=[thunk]

const store=createStore(
    getReducer,
    applyMiddleware(...middleware)
)

export default store