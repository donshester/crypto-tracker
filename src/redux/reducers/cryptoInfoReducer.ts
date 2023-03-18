import { ICryptoInfoResponse } from '../thunks/fetchCryptoInfoThunk'
import { FetchCryptoInfoActions } from '../actions/fetchCryptoInfo'

export interface ICryptoInfoState {
  cryptoData: ICryptoInfoResponse | null
  fetchInfoError: string | null
}

const initialState: ICryptoInfoState = {
  cryptoData: null,
  fetchInfoError: null,
}

export const cryptoInfoReducer = (
  state = initialState,
  action: FetchCryptoInfoActions,
): ICryptoInfoState => {
  switch (action.type) {
    case 'FETCH_CRYPTO_INFO_SUCCESS':
      return {
        cryptoData: action.payload,
        fetchInfoError: null,
      }
    case 'FETCH_CRYPTO_INFO_ERROR':
      return {
        cryptoData: null,
        fetchInfoError: action.payload,
      }
    default:
      return state
  }
}
export default cryptoInfoReducer
