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
  (
    id: string,
  ): ThunkAction<Promise<ICryptoInfoResponse>, AppState, undefined, FetchCryptoInfoActions> =>
  async (dispatch) => {
    try {
      const result = await fetch(`https://api.coincap.io/v2/assets/${id}`)
      const data = await result.json()
      const { explorer, ...responseArr } = data.data
      dispatch(fetchCryptoInfoSuccess(responseArr))
      if (!responseArr) {
        throw new Error('Invalid response')
      }
      return responseArr as ICryptoInfoResponse
    } catch (error) {
      dispatch(fetchCryptoInfoError('Something went wrong!'))
      throw error
    }
  }
