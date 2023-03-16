import { ICryptoPriceData } from "../reducers/fetchCryptoPrice";

export const FETCH_CRYPTO_PRICE_REQUEST = "FETCH_CRYPTO_PRICE_REQUEST"
export const FETCH_CRYPTO_PRICE_SUCCESS = "FETCH_CRYPTO_PRICE_SUCCESS"
export const FETCH_CRYPTO_PRICE_ERROR = "FETCH_CRYPTO_PRICE_ERROR"

interface FetchCryptoPriceRequestAction {
    type: typeof FETCH_CRYPTO_PRICE_REQUEST;
}

interface FetchCryptoPriceSuccessAction {
    type: typeof FETCH_CRYPTO_PRICE_SUCCESS;
    payload: ICryptoPriceData[];
}
interface FetchCryptoPriceErrorAction {
    type: typeof FETCH_CRYPTO_PRICE_ERROR;
    payload: string;
}

export type CryptoPriceActionTypes =
    | FetchCryptoPriceRequestAction
    | FetchCryptoPriceSuccessAction
    | FetchCryptoPriceErrorAction;

export const fetchCryptoPriceRequest = (): CryptoPriceActionTypes => ({
    type: FETCH_CRYPTO_PRICE_REQUEST,
});

export const fetchCryptoPriceSuccess = (data: ICryptoPriceData[]): CryptoPriceActionTypes => ({
    type: FETCH_CRYPTO_PRICE_SUCCESS,
    payload: data,
});

export const fetchCryptoPriceError = (error: string): CryptoPriceActionTypes => ({
    type: FETCH_CRYPTO_PRICE_ERROR,
    payload: error,
});



