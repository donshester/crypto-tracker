import {
  FETCH_COIN_DATA_ERROR,
  FETCH_COIN_DATA_REQUEST,
  FETCH_COIN_DATA_SUCCESS,
} from '../constants'
import { ICryptoTable } from '../thunks/fetchCryptosThunk'

interface FetchCoinsRequestAction {
  type: typeof FETCH_COIN_DATA_REQUEST
}

interface FetchCoinsSuccessAction {
  type: typeof FETCH_COIN_DATA_SUCCESS
  payload: ICryptoTable[]
}
interface FetchCoinsErrorAction {
  type: typeof FETCH_COIN_DATA_ERROR
  payload: string
}

export type FetchCoinsActions =
  | FetchCoinsRequestAction
  | FetchCoinsSuccessAction
  | FetchCoinsErrorAction

export const fetchCoinDataRequest = (): FetchCoinsActions => ({
  type: FETCH_COIN_DATA_REQUEST,
})

export const fetchCoinDataSuccess = (payload: ICryptoTable[]): FetchCoinsActions => ({
  type: FETCH_COIN_DATA_SUCCESS,
  payload: payload,
})

export const fetchCoinDataFailure = (error: string): FetchCoinsActions => ({
  type: FETCH_COIN_DATA_ERROR,
  payload: error,
})
