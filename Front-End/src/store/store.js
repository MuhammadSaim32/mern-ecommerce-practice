import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist' // persistReducer helps store Redux state in local storage.
// persistStore ensures the store is rehydrated (restored) when the app reloads. 
import storage from 'redux-persist/lib/storage' // Uses localStorage for persistence
import Authreducer from './AuthSlice'
import  Cartreducer from "./CartSlice"
import { combineReducers } from '@reduxjs/toolkit'

const persistConfig = {
    key: 'root', // The key for storing data in localStorage
    storage,     // The storage engine (localStorage)
    whitelist: ['AuthSlice', 'CartSlice'] // Only persist these reducers

  }


  const rootReducer = combineReducers({
    AuthSlice: Authreducer,
    CartSlice: Cartreducer
});
  const persistedReducer = persistReducer(persistConfig, rootReducer)  //It creates a persisted version of Authreducer, so its state is saved in localStorage and remains after a page refresh. 🚀


 
export const store = configureStore({ //Creates the Redux store.

 //The AuthSlice key in configureStore defines a specific part of the Redux store where the authSlice state will be stored. 
//Uses persistedReducer instead of a normal reducer, meaning this state will be saved in localStorage.
  reducer:persistedReducer,

middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // to ignore serilization checks
    },
  }),
    
})

export const persistor = persistStore(store) //persistStore(store): Creates a persistor that syncs the Redux store with localStorage.
//persistor ensures that the saved state is rehydrated when the app reloads.
