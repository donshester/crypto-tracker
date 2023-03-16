import { combineReducers } from "redux";
import { cryptoPriceReducer } from "./fetchCryptoPrice";


const rootReducer = combineReducers({
    cryptoPrice: cryptoPriceReducer,
})

export default rootReducer;