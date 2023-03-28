import { combineReducers } from 'redux'
import { cryptoPriceReducer } from './cryptoPriceReducer'
import cryptoInfoReducer from './cryptoInfoReducer'
import { cryptosReducer } from './cryptosReducer'
import { portfolioReducer } from './portfolioReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
  key: 'portfolio',
  storage,
  whitelist: ['balance', 'portfolioPrice', 'currencies']
};
const rootReducer = combineReducers({
  cryptoPrice: cryptoPriceReducer,
  cryptoInfo: cryptoInfoReducer,
  cryptos: cryptosReducer,
  portfolio: persistReducer(persistConfig,portfolioReducer)
})

export default rootReducer;
