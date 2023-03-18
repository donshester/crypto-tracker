import { combineReducers } from 'redux'
import { cryptoPriceReducer } from './cryptoPriceReducer'
import cryptoInfoReducer from './cryptoInfoReducer'
import { cryptosReducer } from './cryptosReducer';

const rootReducer = combineReducers({
  cryptoPrice: cryptoPriceReducer,
  cryptoInfo: cryptoInfoReducer,
  cryptos: cryptosReducer
})

export default rootReducer;
