/* eslint-disable prettier/prettier */
import {createStore, applyMiddleware} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { loadState, saveState } from '../helpers/localStorage';

import promiseMiddleware from 'redux-promise-middleware';

import rootReducer from './reducers';

const persistConfig = { // configuration object for redux-persist
  key: 'root',
  storage: AsyncStorage, // define which storage to use
  whitelist: ['auth'],
  // blacklist: ['navigation', 'isLoading', 'isError'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer); // create a persisted reducer

const store = createStore(
  persistedReducer,
  applyMiddleware(promiseMiddleware, logger),
);

// store.subscribe(() => {
//   saveState(store.getState());
// });

const  persistor = persistStore(store); // used to create the persisted store, persistor will be used in the next step

export {store, persistor};
