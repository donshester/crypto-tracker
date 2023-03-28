import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import {
  fetchCryptoPriceError,
  fetchCryptoPriceRequest,
  fetchCryptoPriceSuccess,
} from '../actions/fetchCryptoPrice'
import { ICryptoPriceData } from '../reducers/cryptoPriceReducer'
import { AppState } from '../store'

interface IResponse {
  priceUsd: number
  time: number
  date: string
}

export const fetchCryptoPrice =
  (id: string): ThunkAction<void, AppState, undefined, Action<string>> =>
  async (dispatch) => {
    dispatch(fetchCryptoPriceRequest())

    try {
      const response = await fetch(`https://api.coincap.io/v2/assets/${id}/history?interval=d1`)
      const data = await response.json()
      const responseArr: IResponse[] = data.data
      const chartData: ICryptoPriceData[] = responseArr.map(({ date, priceUsd }) => ({
        date,
        priceUsd,
      }))
      dispatch(fetchCryptoPriceSuccess(chartData))
    } catch (error) {
      dispatch(fetchCryptoPriceError('Something went wrong.'))
    }
  }
