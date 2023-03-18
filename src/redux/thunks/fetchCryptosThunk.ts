import { fetchCoinDataFailure, fetchCoinDataRequest, fetchCoinDataSuccess } from '../actions/fetchCryptos';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { AppState } from '../store';

export type ICryptoTable = {
    id: string;
    rank: number;
    name: string;
    abbreviation: string;
    price: number;
    marketCap: number;
    change24h: number;
}
export const fetchCoinData = (start: number, limit: number): ThunkAction<void, AppState, undefined, Action<string>> => async (dispatch) => {
    dispatch(fetchCoinDataRequest());
    try {
        const response = await fetch(`https://api.coincap.io/v2/assets?offset=${start}&limit=${limit}`);
        const data = await response.json();

        const coinData = data.data.map((coin: any) => ({
            id: coin.id,
            rank: coin.rank,
            abbreviation: coin.symbol,
            name: coin.name,
            marketCap: coin.marketCapUsd,
            price: coin.priceUsd,
            change24h: coin.changePercent24Hr,
        }));
        dispatch(fetchCoinDataSuccess(coinData));
    } catch (error) {
        dispatch(fetchCoinDataFailure('Something went wrong!'));
    }
};