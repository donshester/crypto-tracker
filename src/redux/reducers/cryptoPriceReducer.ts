import { CryptoPriceActionTypes } from "../actions/fetchCryptoPrice";

export interface ICryptoPriceData {
    date: string
    priceUsd: number;
}
export interface CryptoPriceState {
    loading: boolean;
    data: ICryptoPriceData[];
    error: string | null;
}

const initialState: CryptoPriceState = {
    loading: false,
    data: [],
    error: null,
}

export const cryptoPriceReducer = ( state = initialState, action: CryptoPriceActionTypes): CryptoPriceState => {
    switch (action.type){
        case "FETCH_CRYPTO_PRICE_REQUEST":
            return {...state, loading: true}
        case "FETCH_CRYPTO_PRICE_SUCCESS":
            return  {...state, loading: false, data: action.payload, error: null }
        case "FETCH_CRYPTO_PRICE_ERROR":
            return {...state, loading: false, data: [], error: action.payload }
        default:
            return state;
    }
}