import {
  FETCH_COIN_DATA_ERROR,
  FETCH_COIN_DATA_REQUEST,
  FETCH_COIN_DATA_SUCCESS,
} from '../constants'
import { ICryptoTable } from '../thunks/fetchCryptosThunk'
import { FetchCoinsActions } from '../actions/fetchCryptos'

export interface ICoinDataState {
  data: ICryptoTable[]
  isLoading: boolean
  error: string | null
}

const initialState: ICoinDataState = {
  data: [],
  isLoading: false,
  error: null,
}

export const cryptosReducer = (state = initialState, action: FetchCoinsActions): ICoinDataState => {
  switch (action.type) {
    case FETCH_COIN_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case FETCH_COIN_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      }
    case FETCH_COIN_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
