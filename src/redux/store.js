import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { getReducer } from './listReducer'
//import { persistStore, persistReducer } from 'redux-persist'
//import storage from 'redux-persist/lib/storage'

const middleware=[thunk]

/*const persistConfig = {
    key: 'root',
    storage,
  }*/

//const persistedReducer = persistReducer(persistConfig, getReducer)


export const store= createStore(getReducer,applyMiddleware(...middleware))
//export const persistor = persistStore(store)