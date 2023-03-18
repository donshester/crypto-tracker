import { ThunkAction } from 'redux-thunk'
import {
  FetchCryptoInfoActions,
  fetchCryptoInfoError,
  fetchCryptoInfoSuccess,
} from '../actions/fetchCryptoInfo'
import { AppState } from '../store'
interface ICoincapResponse {
  id: string
  rank: string
  symbol: string
  name: string
  supply: string
  maxSupply: string
  marketCapUsd: string
  volumeUsd24Hr: string
  priceUsd: string
  changePercent24Hr: string
  vwap24Hr: string
  explorer: string
}

export type ICryptoInfoResponse = Omit<ICoincapResponse, 'explorer'>

export const fetchCryptoInfo =
  (id: string): ThunkAction<Promise<void>, AppState, {}, FetchCryptoInfoActions> =>
  async (dispatch) => {
    try {
      const result = await fetch(`https://api.coincap.io/v2/assets/${id}`)
      const data = await result.json()
      const { explorer, ...responseArr } = data.data
      dispatch(fetchCryptoInfoSuccess(responseArr))
    } catch (error) {
      dispatch(fetchCryptoInfoError('Something went wrong!'))
    }
  }
