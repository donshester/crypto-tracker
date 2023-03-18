import { ICryptoInfoResponse } from '../thunks/fetchCryptoInfoThunk'
import { FETCH_CRYPTO_INFO_ERROR, FETCH_CRYPTO_INFO_SUCCESS } from '../constants'

interface FetchCryptoInfoSuccessAction {
  type: typeof FETCH_CRYPTO_INFO_SUCCESS
  payload: ICryptoInfoResponse
}

interface FetchCryptoInfoErrorAction {
  type: typeof FETCH_CRYPTO_INFO_ERROR
  payload: string
}

export type FetchCryptoInfoActions = FetchCryptoInfoSuccessAction | FetchCryptoInfoErrorAction

export const fetchCryptoInfoSuccess = (data: ICryptoInfoResponse): FetchCryptoInfoActions => ({
  type: FETCH_CRYPTO_INFO_SUCCESS,
  payload: data,
})

export const fetchCryptoInfoError = (data: string): FetchCryptoInfoActions => ({
  type: FETCH_CRYPTO_INFO_ERROR,
  payload: data,
})
