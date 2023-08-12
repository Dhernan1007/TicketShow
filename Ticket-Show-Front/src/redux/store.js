import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';


const loggerMiddleware = createLogger();

const persistConfig = {
  key: 'root',
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(thunk, loggerMiddleware))
);

const persistor = persistStore(store);

export  {store, persistor};