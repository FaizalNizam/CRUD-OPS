import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { getReducer } from './listReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const middleware=[thunk]

const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, getReducer)

/*const store=createStore(
    persistedReducer,
    applyMiddleware(...middleware)
)*/

/*export default ()=>{
    let store = createStore(persistedReducer,applyMiddleware(...middleware))
    let persistor = persistStore(store)
    return { store, persistor }
}*/

export const store= createStore(persistedReducer,applyMiddleware(...middleware))
export const persistor = persistStore(store)